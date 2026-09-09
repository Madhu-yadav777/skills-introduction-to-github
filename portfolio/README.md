# Madhumitha V - Data Analyst Portfolio

An elegant, professional portfolio website designed for a Data Analyst with expertise in SQL, Power BI, Python, and AI/ML technologies.

## 🎯 Features

- **Modern & Elegant Design**: Clean, professional layout with smooth animations
- **Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- **Interactive Elements**: Hover effects, animated counters, smooth scrolling
- **Comprehensive Sections**: Home, About, Skills, Experience, Projects, Certificates, Education, Contact
- **SEO Friendly**: Semantic HTML structure
- **Performance Optimized**: Efficient CSS and minimal JavaScript

## 📁 File Structure

```
portfolio/
├── index.html          # Main portfolio file
└── README.md           # This file
```

## 🚀 How to Deploy

### Option 1: Google Sites (Recommended)

1. Go to [Google Sites](https://sites.google.com)
2. Create a new site or open an existing one
3. Click "Insert" → "Embed" → "Embed code"
4. Copy and paste the entire content of `index.html` into the embed code box
5. Click "Next" then "Insert"
6. Adjust the embed size as needed
7. Publish your site

### Option 2: GitHub Pages

1. Create a new GitHub repository
2. Upload the `index.html` file to the repository
3. Go to repository Settings → Pages
4. Select the main branch and / (root) folder
5. Click Save
6. Your site will be published at `https://yourusername.github.io/portfolio`

### Option 3: Netlify (Drag & Drop)

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop the `index.html` file
3. Your site will be published instantly with a random subdomain
4. You can customize the domain in Site settings

### Option 4: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to the portfolio folder: `cd portfolio`
3. Run: `vercel`
4. Follow the prompts to deploy

## 🎨 Customization

### Changing Colors
The color scheme uses CSS variables in the `:root` section:
- `--primary`: Main accent color (Indigo)
- `--secondary`: Secondary accent (Pink)
- `--accent`: Tertiary accent (Cyan)
- `--dark`/`--darker`: Background colors
- `--light`: Text color
- `--gray`: Secondary text

To change colors, modify the values in the `:root` section at the top of the CSS.

### Updating Content
All content is in the HTML file. Simply:
1. Open `index.html` in any text editor
2. Find the section you want to update (About, Skills, Experience, etc.)
3. Replace the text with your information
4. Save the file

### Adding Social Media Links
In the footer section, update the href attributes:
```html
<a href="https://linkedin.com/in/yourprofile" target="_blank"><i class="fab fa-linkedin-in"></i></a>
```

### Adding/Removing Skills
In the Skills section, each skill category has `.skill-tags` div:
```html
<div class="skill-tags">
    <span class="skill-tag">Python</span>
    <span class="skill-tag">SQL</span>
    <!-- Add more spans as needed -->
</div>
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, Animations, Variables
- **JavaScript** - DOM interactions, scroll animations
- **Font Awesome 6** - Icons
- **Google Fonts** - Inter & JetBrains Mono typography

## 📱 Responsiveness Breakpoints

- **> 1024px**: Desktop layout with multi-column grids
- **768px - 1024px**: Tablet layout (stacked sections)
- **< 768px**: Mobile layout (single column, mobile menu)

## ✨ Features Breakdown

### Home Section
- Animated hero with gradient text
- Call-to-action buttons
- Statistics counter
- Floating decorative shapes

### About Section
- Profile image placeholder
- Personal bio
- Key highlights cards

### Skills Section
- Categorized skill display
- Interactive skill tags
- Visual icons for each category

### Experience Section
- Vertical timeline layout
- Hover effects on timeline items
- Date indicators

### Projects Section
- Project cards with hover animations
- Technology badges
- Live demo/GitHub links

### Certificates Section
- Certificate cards with icons
- Achievement badges
- Publication highlights

### Contact Section
- Working contact form
- Direct contact links (email, LinkedIn, etc.)
- Social media icons

## 🎓 Educational Background Highlighted

- **B.Tech Computer Science and Business Systems**
- Rajalakshmi Institute of Technology (2022-2026)
- Final year project: DeepfakeX - multimodal deepfake detection

## 💼 Experience Timeline

- **Data Analyst Intern** - Elevate Labs (2026-Present)
- **Data Science & Analytics** - HP Life (2025)
- **Intern** - Ixley Technologies (2024)

## 📄 Certifications & Achievements

- Paper published at NIT Puducherry
- HP Life Data Science & Analytics Certification
- Ixley Technologies Internship Completion
-2024
- Power BI Data Analysis Certification
- SQL for Data Science Certification
- Machine Learning Fundamentals Certification

## 🔧 Technical Skills

**Languages**: Python, SQL, R, HTML/CSS, JavaScript
**Analytics**: Data Analysis, Statistical Analysis, Predictive Modeling
**Visualization**: Power BI, Tableau, Matplotlib, Seaborn, Plotly
**Databases**: MySQL, PostgreSQL, MongoDB, SQL Server, BigQuery
**AI/ML**: PyTorch, TensorFlow, Scikit-learn, OpenCV, Keras
**Tools**: Jupyter, VS Code, Git/GitHub, Kaggle, Google Colab

## 📞 Contact

Feel free to reach out for collaborations, opportunities, or just to connect:
- **Email**: madhumitha.v@email.com
- **LinkedIn**: linkedin.com/in/madhumithav
- **GitHub**: github.com/madhumithav
- **Kaggle**: kaggle.com/madhumithav

---

*Made with ❤️ for Madhumitha V - Aspiring Data Analyst & AI Enthusiast*