# DevPortfolio Pro - Personal Web Application

A modern, responsive portfolio website showcasing web development skills, projects, and technical expertise. Built with HTML5, CSS3, and JavaScript (ES6+).

## 🌟 Features

### Core Requirements Met ✅
- **Home page and child pages**: Complete with Projects, Blog, and Contact pages
- **Web hosting ready**: Optimized for deployment on GitHub Pages
- **Significant textual content**: Rich, engaging content throughout all pages
- **Images**: Placeholder images and optimized image structure
- **Working links**: Full navigation between all pages
- **Wireframe implementation**: Follows the approved site plan design
- **Responsive design**: Mobile-first approach with breakpoints
- **Visual appeal**: Modern design with smooth animations
- **Valid HTML and CSS**: Semantic markup and clean styling
- **Lighthouse optimization**: Targeting 96+ scores

### JavaScript Dynamic Elements ✅
- **Multiple functions**: Modular ES6 class structure
- **DOM interaction**: Element selection, modification, and event handling
- **Event listeners**: Comprehensive event management
- **Conditional branching**: Smart logic throughout the application
- **Objects**: Structured data management
- **Arrays**: Data manipulation and filtering
- **Array methods**: forEach, map, reduce, filter, find, some

## 🏗️ Project Structure

```
portfolio-website/
├── index.html              # Home page
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   ├── main.js             # Main application file
│   └── modules/
│       ├── themeManager.js      # Dark/light theme
│       ├── navigationManager.js # Mobile navigation
│       ├── projectManager.js    # Project filtering
│       ├── blogManager.js       # Blog functionality
│       ├── animationManager.js  # Scroll animations
│       ├── statsManager.js      # Statistics counter
│       └── contactForm.js       # Form validation
├── projects/
│   └── index.html          # Projects page
├── blog/
│   └── index.html          # Blog page
├── contact/
│   └── index.html          # Contact page
├── images/
│   ├── placeholder.svg     # Placeholder image
│   └── projects/           # Project images
└── README.md               # This file
```

## 🚀 Technologies Used

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript ES6+**: Modules, classes, arrow functions, destructuring
- **Google Fonts**: Inter and Source Sans Pro typography
- **Responsive Design**: Mobile-first approach
- **CSS Animations**: Smooth transitions and micro-interactions

## 🎨 Design System

### Color Palette
- **Primary**: #2D3748 (Dark Gray)
- **Secondary**: #4A5568 (Medium Gray)
- **Accent**: #ED8936 (Orange)
- **Light**: #F7FAFC (Light Gray)
- **White**: #FFFFFF

### Typography
- **Headings**: Inter (300, 400, 600, 700)
- **Body**: Source Sans Pro (400, 600, 700)

### Spacing System
- **XS**: 0.25rem (4px)
- **SM**: 0.5rem (8px)
- **MD**: 1rem (16px)
- **LG**: 1.5rem (24px)
- **XL**: 2rem (32px)
- **2XL**: 3rem (48px)
- **3XL**: 4rem (64px)

## 🔧 JavaScript Modules

### ThemeManager
- Dark/light theme switching
- localStorage persistence
- System preference detection

### NavigationManager
- Mobile menu functionality
- Smooth scrolling
- Active link management

### ProjectManager
- Project data management
- Category filtering
- Dynamic project display

### BlogManager
- Blog post management
- Search functionality
- Category filtering

### AnimationManager
- Scroll-triggered animations
- Skill bar animations
- Intersection Observer usage

### StatsManager
- Animated counters
- Statistics tracking
- Performance optimization

### ContactForm
- Form validation
- Real-time feedback
- Submission handling

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

## 🎯 Performance Features

- **Lazy loading**: Images and content
- **CSS optimization**: Efficient selectors and properties
- **JavaScript optimization**: Modular loading and efficient algorithms
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **SEO optimization**: Meta tags, structured data, clean URLs

## 🚀 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch (main or gh-pages)
4. Access live site at `https://username.github.io/repository-name/`

### Local Development
1. Clone the repository
2. Open `index.html` in a web browser
3. For development server: `python -m http.server 8000`

## 📋 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🔍 Lighthouse Scores (Target)

- **Performance**: 96+
- **Accessibility**: 96+
- **Best Practices**: 96+
- **SEO**: 96+

## 📝 Content Management

### Projects
- Add new projects in `js/modules/projectManager.js`
- Update project images in `images/projects/`
- Configure categories and technologies

### Blog Posts
- Add new posts in `js/modules/blogManager.js`
- Configure categories and tags
- Update post metadata

### Contact Information
- Update contact details in `contact/index.html`
- Configure social media links
- Update email addresses

## 🛠️ Customization

### Colors
Update CSS custom properties in `css/style.css`:
```css
:root {
    --primary-color: #2D3748;
    --secondary-color: #4A5568;
    --accent-color: #ED8936;
    /* ... */
}
```

### Typography
Update Google Fonts import in HTML files:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Source+Sans+Pro:wght@400;600;700&display=swap" rel="stylesheet">
```

### Content
- Update personal information in HTML files
- Modify project data in JavaScript modules
- Customize blog posts and categories

## 📄 License

This project is created for educational purposes as part of the WDD 131 course assignment.

## 👨‍💻 Author

**Oluwaseyi Peter Omowole**
- GitHub: [@Oluwaseyi1219](https://github.com/Oluwaseyi1219)
- Email: oluwaseyi@example.com

---

*Built with ❤️ using modern web technologies* 