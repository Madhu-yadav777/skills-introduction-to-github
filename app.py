import datetime as dt
from urllib.parse import urlencode

import numpy as np
import pandas as pd
import plotly.graph_objects as go
import streamlit as st
import yfinance as yf
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split

st.set_page_config(
    page_title="StockVision",
    page_icon="📈",
    layout="wide",
    initial_sidebar_state="expanded",
)

st.markdown(
    """
    <style>
    :root {
        --bg: #f4f6f8;
        --card: #ffffff;
        --card-border: #e2e8f0;
        --text: #111827;
        --muted: #4b5563;
        --cyan: #2563eb;
        --blue: #2563eb;
        --green: #059669;
        --red: #dc2626;
        --gold: #d97706;
    }
    .block-container { padding-top: 1.2rem; padding-bottom: 2rem; }
    [data-testid="stAppView"] { background: var(--bg); }
    [data-testid="stSidebar"] { background: #ffffff; border-right: 1px solid var(--card-border); }
    h1, h2, h3, h4 { color: var(--text); letter-spacing: .01em; }
    .stMarkdown { color: var(--muted); }
    .stMetric { background: var(--card); border: 1px solid var(--card-border); border-radius: 0.9rem; padding: 1rem; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05); }
    .stMetric > label { color: var(--muted); font-weight: 600; }
    .stMetric > div { color: var(--text); font-weight: 700; }
    .glass-card {
        background: var(--card);
        border: 1px solid var(--card-border);
        border-radius: 1rem;
        padding: 1rem;
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
        backdrop-filter: none;
    }
    .hero-title {
        font-size: 2.8rem;
        font-weight: 800;
        background: none;
        -webkit-background-clip: initial;
        background-clip: initial;
        color: #0f172a;
        margin-bottom: .2rem;
    }
    .subtle { color: var(--muted); font-size: .95rem; }
    .tag {
        display: inline-flex;
        align-items: center;
        gap: .35rem;
        padding: .3rem .65rem;
        border-radius: 999px;
        background: #eef2ff;
        color: #3730a3;
        border: 1px solid #c7d2fe;
        font-size: .82rem;
        font-weight: 700;
    }
    .footer { margin-top: 1.4rem; color: #6b7280; font-size: .82rem; }
    </style>
    """,
    unsafe_allow_html=True,
)


def normalize_yf(df: pd.DataFrame) -> pd.DataFrame:
    if df is None or df.empty:
        return df
    if isinstance(df.columns, pd.MultiIndex):
        if "Close" in df.columns.get_level_values(-1):
            df = df.xs("Close", axis=1, level=-1)
        elif df.shape[1] > 1:
            df.columns = df.columns.get_level_values(0)
    required = {"Open", "High", "Low", "Close", "Volume"}
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"Missing columns from yfinance response: {sorted(missing)}")
    df = df.copy()
    df = df[["Open", "High", "Low", "Close", "Volume"]].copy()
    df.index = pd.to_datetime(df.index)
    df = df.sort_index()
    df = df.dropna()
    return df


@st.cache_data(ttl=600, show_spinner=False)
def fetch_stock_data(ticker: str, start: str, end: str) -> pd.DataFrame:
    raw = yf.download(
        ticker,
        start=start,
        end=end,
        auto_adjust=False,
        progress=False,
        threads=False,
    )
    return normalize_yf(raw)


def compute_rsi(series: pd.Series, period: int = 14) -> pd.Series:
    delta = series.diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)
    avg_gain = gain.ewm(alpha=1 / period, adjust=False, min_periods=period).mean()
    avg_loss = loss.ewm(alpha=1 / period, adjust=False, min_periods=period).mean()
    rs = avg_gain / avg_loss.replace(0, np.nan)
    rsi = 100 - (100 / (1 + rs))
    return rsi.replace([np.inf, -np.inf], np.nan)


def compute_macd(df: pd.DataFrame) -> pd.DataFrame:
    data = df[["Close"]].copy()
    data["EMA_12"] = data["Close"].ewm(span=12, adjust=False).mean()
    data["EMA_26"] = data["Close"].ewm(span=26, adjust=False).mean()
    data["MACD"] = data["EMA_12"] - data["EMA_26"]
    data["Signal"] = data["MACD"].ewm(span=9, adjust=False).mean()
    data["Histogram"] = data["MACD"] - data["Signal"]
    return data


def build_model_features(df: pd.DataFrame) -> pd.DataFrame:
    data = df[["Close", "Volume"]].copy()
    data["Day"] = np.arange(len(data))
    data["MA_5"] = data["Close"].rolling(5).mean()
    data["MA_20"] = data["Close"].rolling(20).mean()
    data["RSI_14"] = compute_rsi(data["Close"], 14)
    data = data.dropna()
    features = data[["Day", "MA_5", "MA_20", "RSI_14"]]
    target = data["Close"]
    return features, target


def make_price_chart(df: pd.DataFrame) -> go.Figure:
    close = df["Close"]
    ma5 = close.rolling(5).mean()
    ma20 = close.rolling(20).mean()

    fig = go.Figure()
    fig.add_trace(
        go.Candlestick(
            x=df.index,
            open=df["Open"],
            high=df["High"],
            low=df["Low"],
            close=df["Close"],
            name="Price",
            increasing={"line": {"color": "#34d399"}},
            decreasing={"line": {"color": "#fb7185"}},
        )
    )
    fig.add_trace(go.Scatter(x=df.index, y=ma5, name="MA 5", line=dict(color="#fbbf24", width=2)))
    fig.add_trace(go.Scatter(x=df.index, y=ma20, name="MA 20", line=dict(color="#38bdf8", width=2)))
    fig.update_layout(
        height=440,
        margin=dict(l=10, r=10, t=35, b=10),
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(0,0,0,0)",
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1),
        hovermode="x unified",
    )
    return fig


def make_volume_chart(df: pd.DataFrame) -> go.Figure:
    colors = np.where(df["Close"] >= df["Open"], "#34d399", "#fb7185")
    fig = go.Figure(
        go.Bar(
            x=df.index,
            y=df["Volume"],
            marker_color=colors,
            opacity=0.62,
            name="Volume",
        )
    )
    fig.update_layout(
        height=240,
        margin=dict(l=10, r=10, t=25, b=10),
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(0,0,0,0)",
        showlegend=False,
        hovermode="x unified",
    )
    return fig


def make_rsi_chart(df: pd.DataFrame) -> go.Figure:
    rsi = compute_rsi(df["Close"], 14)
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=df.index, y=rsi, name="RSI 14", line=dict(color="#c084fc", width=2.5)))
    fig.add_hline(y=70, line_dash="dash", line_color="#fb7185")
    fig.add_hline(y=30, line_dash="dash", line_color="#34d399")
    fig.add_annotation(text="Overbought 70", xref="paper", yref="y", y=70, showarrow=False, yshift=10, font=dict(color="#fb7185"))
    fig.add_annotation(text="Oversold 30", xref="paper", yref="y", y=30, showarrow=False, yshift=-10, font=dict(color="#34d399"))
    fig.update_layout(
        height=260,
        yaxis=dict(range=[0, 100], title="RSI"),
        margin=dict(l=10, r=10, t=35, b=10),
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(0,0,0,0)",
        showlegend=False,
        hovermode="x unified",
    )
    return fig


def make_macd_chart(df: pd.DataFrame) -> go.Figure:
    macd = compute_macd(df)
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=macd.index, y=macd["MACD"], name="MACD", line=dict(color="#38bdf8", width=2)))
    fig.add_trace(go.Scatter(x=macd.index, y=macd["Signal"], name="Signal", line=dict(color="#fbbf24", width=2)))
    fig.add_trace(
        go.Bar(
            x=macd.index,
            y=macd["Histogram"],
            name="Histogram",
            marker_color=np.where(macd["Histogram"] >= 0, "#34d399", "#fb7185"),
            opacity=0.55,
        )
    )
    fig.add_hline(y=0, line_color="#94a3b8", line_width=1)
    fig.update_layout(
        height=300,
        margin=dict(l=10, r=10, t=35, b=10),
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(0,0,0,0)",
        hovermode="x unified",
    )
    return fig


def make_model_chart(actual: pd.Series, predicted: pd.Series) -> go.Figure:
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=actual.index, y=actual.values, mode="lines", name="Actual", line=dict(color="#38bdf8", width=2.5)))
    fig.add_trace(go.Scatter(x=actual.index, y=predicted.values, mode="lines", name="Predicted", line=dict(color="#fbbf24", width=2.5)))
    fig.update_layout(
        height=360,
        margin=dict(l=10, r=10, t=35, b=10),
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(0,0,0,0)",
        hovermode="x unified",
        title="Linear Regression Forecast Model",
    )
    return fig


def make_forecast_chart(model: LinearRegression, features: pd.DataFrame, target: pd.Series, days: int = 30) -> go.Figure:
    future_features = features.tail(1).copy()
    future_features["Day"] = np.arange(len(features), len(features) + days)
    forecast = model.predict(future_features)
    forecast_index = pd.bdate_range(daysAgo=0, periods=days)
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=features.index, y=target.values, mode="lines", name="Historical Close", line=dict(color="#38bdf8", width=2.5)))
    fig.add_trace(go.Scatter(x=forecast_index, y=forecast, mode="lines+markers", name="Forecast", line=dict(color="#fbbf24", width=3), marker=dict(size=8)))
    fig.update_layout(
        height=380,
        margin=dict(l=10, r=10, t=35, b=10),
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(0,0,0,0)",
        hovermode="x unified",
        title="30-Day Trend Forecast",
    )
    return fig


def format_date(value: pd.Timestamp) -> str:
    return pd.Timestamp(value).strftime("%b %d, %Y")


def main():
    st.markdown(
        """
        <div class="glass-card">
            <div class="tag">📈 Portfolio Dashboard</div>
            <h1 class="hero-title">StockVision</h1>
            <p class="subtle">Real-time market data, technical indicators, and machine learning forecasting in one clean dashboard.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )

    with st.sidebar:
        st.markdown("## Controls")
        ticker = st.text_input("Ticker", "AAPL", help="Example: AAPL, MSFT, TSLA, NVDA").upper().strip()
        quick_range = st.selectbox("Quick range", ["1M", "3M", "6M", "1Y", "5Y"])
        today = dt.date.today()
        ranges = {
            "1M": dt.timedelta(days=31),
            "3M": dt.timedelta(days=92),
            "6M": dt.timedelta(days=183),
            "1Y": dt.timedelta(days=366),
            "5Y": dt.timedelta(days=1826),
        }
        if quick_range:
            start = today - ranges[quick_range]
        else:
            start = today - dt.timedelta(days=366)
        end = today + dt.timedelta(days=1)
        start_date = st.date_input("Start date", start)
        end_date = st.date_input("End date", end)
        if st.button("Analyze Stock", type="primary"):
            st.session_state.run_analysis = True

    if not st.session_state.get("run_analysis", False):
        st.session_state.run_analysis = True

    if ticker and start_date and end_date:
        try:
            with st.spinner("Fetching market data..."):
                df = fetch_stock_data(ticker, start_date.isoformat(), end_date.isoformat())
            if df.empty:
                st.error(f"No data found for {ticker}. Check the ticker symbol and date range.")
                return
            df = df.sort_index()
            latest = df.iloc[-1]
            previous = df.iloc[-2] if len(df) > 1 else latest
            change = latest["Close"] - previous["Close"]
            change_pct = change / previous["Close"] * 100
            high_52 = df.tail(252)["High"].max()
            low_52 = df.tail(252)["Low"].min()
            volume = latest["Volume"]

            st.markdown(f'<div class="tag">🚀 {ticker} Dashboard</div>', unsafe_allow_html=True)
            col1, col2, col3, col4 = st.columns(4)
            with col1:
                st.metric("Latest Close", f"${latest['Close']:,.2f}")
            with col2:
                color = "green" if change >= 0 else "red"
                st.metric("Daily Change", f"{change:+.2f}  ({change_pct:+.2f}%)", help="Compared with previous trading day")
            with col3:
                st.metric("52W High", f"${high_52:,.2f}")
            with col4:
                st.metric("52W Low", f"${low_52:,.2f}")

            rsi = compute_rsi(df["Close"], 14).iloc[-1]
            macd = compute_macd(df).iloc[-1]
            st.caption(f"Latest RSI: **{rsi:.2f}**  •  MACD: **{macd['MACD']:.2f}**  •  Signal: **{macd['Signal']:.2f}**  •  Volume: **{volume:,.0f}**")

            st.markdown("## Price Action")
            price_col, volume_col = st.columns([2, 1])
            with price_col:
                st.plotly_chart(make_price_chart(df), use_container_width=True)
            with volume_col:
                st.plotly_chart(make_volume_chart(df), use_container_width=True)

            st.markdown("## Technical Indicators")
            rsi_col, macd_col = st.columns(2)
            with rsi_col:
                st.plotly_chart(make_rsi_chart(df), use_container_width=True)
            with macd_col:
                st.plotly_chart(make_macd_chart(df), use_container_width=True)

            st.markdown("## Machine Learning Forecast")
            features, target = build_model_features(df)
            if len(features) >= 30:
                X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.25, shuffle=False)
                model = LinearRegression()
                model.fit(X_train, y_train)
                predictions = model.predict(X_test)
                mae = mean_absolute_error(y_test, predictions)
                r2 = r2_score(y_test, predictions)
                forecast_model = LinearRegression()
                forecast_model.fit(features, target)
                forecast_fig = make_forecast_chart(forecast_model, features, target, days=30)

                metric1, metric2, metric3, metric4 = st.columns(4)
                with metric1:
                    st.metric("MAE", f"${mae:,.2f}")
                with metric2:
                    st.metric("R² Score", f"{r2:.3f}")
                with metric3:
                    st.metric("Predicted Today", f"${model.predict(features.tail(1))[0]:,.2f}")
                with metric4:
                    st.metric("Forecast 30D", f"${forecast_model.predict(features.tail(1))[0]:,.2f}")

                chart_col, model_col = st.columns(2)
                with chart_col:
                    st.plotly_chart(forecast_fig, use_container_width=True)
                with model_col:
                    st.plotly_chart(make_model_chart(y_test, predictions), use_container_width=True)
                    st.info("Model uses Day, 5-day moving average, 20-day moving average, and RSI to estimate price direction.")
            else:
                st.warning("Not enough data for the ML model. Choose a longer date range.")

            st.markdown("## Download Data")
            csv = df.reset_index().to_csv(index=False)
            st.download_button("Download CSV", data=csv, file_name=f"{ticker}_stockvision.csv", mime="text/csv")
            st.markdown(
                '<p class="footer">Built with Streamlit, yfinance, pandas, Plotly, and scikit-learn. Educational use only; not financial advice.</p>',
                unsafe_allow_html=True,
            )
        except Exception as e:
            st.error(f"Something went wrong while loading the dashboard: {e}")
    else:
        st.warning("Enter a ticker and date range to begin.")


if __name__ == "__main__":
    main()
