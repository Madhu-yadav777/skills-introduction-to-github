// ============================================================
//  All site content lives here — edit this one file to update
//  the whole portfolio. Links/images can be added anytime.
// ============================================================

export const profile = {
  name: "Madhumitha V",
  firstName: "Madhumitha",
  role: "B.tech Computer Science and Business Systems",
  tagline: "Software development · Data · AI/ML",
  intro:
    "I'm a B.Tech Computer Science and Business Systems graduate with hands-on experience in Python, Java, SQL, Power BI and Machine Learning. I enjoy software development, data analysis, and building useful digital products — from deepfake detection research to interactive dashboards.",
  location: "Hosur, Tamil Nadu, India",
  phone: "+91 7604942266",
  email: "vmadhuyadav927@gmail.com",
  resumeUrl: "/resume.pdf",
  photo: "/profile.jpg",
  socials: {
    github: "https://github.com/Madhu-yadav777",
    linkedin: "https://www.linkedin.com/in/madhu-mitha-v-548a32293",
  },
};

export const about = {
  paragraphs: [
    "I'm Madhumitha — a Computer Science & Business Systems graduate from Rajalakshmi Institute of Technology, Chennai. My work sits at the intersection of software development and data: I've built machine learning systems for deepfake detection, desktop applications in Java, and interactive Power BI dashboards that make data easy to read.",
    "I presented my research on multimodal deepfake detection at IC3DCM 2026, hosted at NIT Puducherry — a project combining EfficientNet-B2, Bi-LSTM and Audio-CRNN models with contrastive learning. The manuscript is currently in production with Springer Nature.",
    "Beyond ML, I care about the craft of software itself — clean logic, careful testing, and interfaces that feel considered. I've interned as a web developer at IXLY Technologies, where I worked on real features with HTML, CSS, JavaScript and Python-based logic.",
  ],
  lookingFor:
    "I'm currently seeking entry-level opportunities in Software Development and Data & AI — where I can contribute, learn from experienced teams, and keep growing.",
  currentlyLearning: ["Deep Learning", "AWS Cloud Architecture", "Data Visualization", "React"],
};

export const skills = [
  { name: "Python", category: "Languages", level: 88 },
  { name: "Java", category: "Languages", level: 82 },
  { name: "JavaScript", category: "Languages", level: 78 },
  { name: "SQL / MySQL", category: "Data", level: 82 },
  { name: "HTML", category: "Frontend", level: 88 },
  { name: "CSS", category: "Frontend", level: 85 },
  { name: "Power BI", category: "Data", level: 85 },
  { name: "Machine Learning", category: "AI/ML", level: 80 },
  { name: "Deep Learning", category: "AI/ML", level: 75 },
  { name: "JavaFX / Eclipse", category: "Tools", level: 78 },
  { name: "Data Visualization", category: "Data", level: 82 },
];

export const projects = [
  {
    id: "multimodal-deepfake-detection",
    title: "Multimodal Deepfake Detection",
    short:
      "A deep learning system that fuses visual, temporal and audio features to detect AI-manipulated videos.",
    problem:
      "Deepfakes are becoming convincing enough to fool human reviewers. Detection needs to look beyond single frames — manipulation leaves traces in facial motion over time and in audio-visual mismatches.",
    description:
      "The system combines EfficientNet-B2 for spatial features, Bi-LSTM for temporal inconsistencies and Audio-CRNN for audio cues, trained with contrastive triplet loss to improve generalization. Evaluated on the FaceForensics++ and FakeAVCeleb benchmark datasets. This work was presented at IC3DCM 2026 at NIT Puducherry.",
    problemSolved:
      "Automated multimodal detection of AI-manipulated media across visual, temporal and audio channels",
    tech: ["Python", "EfficientNet-B2", "Bi-LSTM", "Audio-CRNN", "Machine Learning"],
    image: "/projects/deepfake.svg",
    github: null,
    demo: null,
    featured: true,
  },
  {
    id: "sales-management-system",
    title: "History of Sales Management System",
    short:
      "A Java desktop application for managing, validating and reporting on historical sales data.",
    problem:
      "Sales records scattered across files are hard to audit. The system centralizes retrieval, validation and reporting in one testable desktop application.",
    description:
      "Built with Java and JavaFX backed by MySQL, with dedicated modules for data retrieval, input validation and reporting. Developed structured test scenarios and performed functional testing, identifying and resolving bugs across development.",
    problemSolved:
      "Reliable, validated desktop management of historical sales data with reporting",
    tech: ["Java", "JavaFX", "MySQL", "SQL", "Eclipse"],
    image: "/projects/sales-system.svg",
    github: null,
    demo: null,
    featured: false,
  },
  {
    id: "powerbi-sales-dashboard",
    title: "Sales Dashboard — Power BI",
    short:
      "An interactive dashboard surfacing sales trends, revenue growth and customer insights at a glance.",
    problem:
      "Raw sales spreadsheets hide trends. Business stakeholders need visuals that make revenue movement and customer behaviour obvious without writing queries.",
    description:
      "Designed and built an interactive Power BI dashboard modelling sales data into trend lines, revenue breakdowns and customer insight visuals — giving business users self-serve analysis and clearer reporting.",
    problemSolved:
      "Turning raw sales data into interactive, decision-ready business visuals",
    tech: ["Power BI", "Data Analysis", "Data Visualization"],
    image: "/projects/powerbi.svg",
    github: null,
    demo: null,
    featured: false,
  },
  {
    id: "furniture-website",
    title: "Furniture Website",
    short:
      "A clean, responsive furniture showcase website with a modern storefront experience.",
    problem:
      "Furniture businesses need an affordable, good-looking online presence without heavy platform fees.",
    description:
      "A responsive furniture website built with HTML, CSS and JavaScript — product showcase pages, smooth navigation and a layout that adapts cleanly from desktop to mobile.",
    problemSolved:
      "Affordable, polished web storefront for furniture retail",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/projects/furniture.svg",
    github: null,
    demo: null,
    featured: false,
  },
];

export const timeline = [
  {
    type: "education",
    title: "B.Tech — Computer Science & Business Systems",
    org: "Rajalakshmi Institute of Technology, Chennai",
    period: "2022 — 2026",
    description:
      "Core computer science with a business systems perspective — data structures, DBMS, machine learning and software engineering.",
    current: false,
  },
  {
    type: "internship",
    title: "Web Development Intern",
    org: "IXLY Technologies · Coimbatore",
    period: "Jul 2024 — Aug 2024",
    description:
      "Developed web features with HTML, CSS, JavaScript and Python-based logic. Assisted with debugging, testing, requirement analysis and documentation.",
  },
  {
    type: "achievement",
    title: "DeepFakeX — Research Presentation, IC3DCM 2026",
    org: "National Institute of Technology Puducherry",
    period: "May 2026",
    description:
      "Presented research on multimodal deepfake detection using spatiotemporal and contrastive supervision. Manuscript in production with Springer Nature.",
  },
  {
    type: "certification",
    title: "AWS Solutions Architecture — Virtual Experience",
    org: "Forage",
    period: "Certification",
    description: "Job-simulation experience covering cloud architecture fundamentals on AWS.",
  },
  {
    type: "certification",
    title: "Software Engineering — Virtual Experience",
    org: "Forage · Accenture",
    period: "Certification",
    description: "Virtual program covering software engineering workflow, development and testing practices.",
  },
  {
    type: "certification",
    title: "Power BI Data Visualization Fundamentals",
    org: "Workshop",
    period: "Certification",
    description: "Hands-on fundamentals of data visualization and dashboard building in Power BI.",
  },
  {
    type: "certification",
    title: "Frontend & Web Development Training",
    org: "IXLY Technologies",
    period: "Training",
    description: "Structured training in frontend development with HTML, CSS and JavaScript.",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];
