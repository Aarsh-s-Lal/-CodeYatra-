# 🚀 कोडयात्रा (CodeYatra)

**Track your LeetCode progress with style!**

कोडयात्रा (CodeYatra) is a modern, responsive web application that provides comprehensive analytics and visualizations for your LeetCode coding journey. Get detailed insights into your problem-solving progress with an intuitive and elegant interface.

![LeetMetric Preview](https://img.shields.io/badge/Status-Active-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 📊 **Comprehensive Statistics**
- **Progress Circles**: Visual representation of solved problems by difficulty (Easy, Medium, Hard)
- **Detailed Cards**: Total problems solved, submission statistics, and acceptance rates
- **Real-time Data**: Fetches live data directly from LeetCode's GraphQL API
- **Performance Metrics**: Acceptance rate calculation and problem-solving analytics

### 🎨 **Modern User Interface**
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Elegant fade-in effects and hover interactions
- **Toast Notifications**: Non-intrusive success/error messages
- **Loading States**: Visual feedback during data fetching
- **Interactive Elements**: Hover effects on cards and progress circles

### 🛠 **Enhanced User Experience**
- **Keyboard Support**: Press Enter to search
- **Input Validation**: Username format validation with helpful error messages
- **Error Handling**: Graceful handling of network issues and invalid usernames
- **Local Storage**: Automatic saving of recent searches (future feature)
- **Cross-browser Compatibility**: Works on all modern browsers

## 🏗 **Technical Architecture**

### **Frontend Technologies**
- **HTML5**: Semantic markup with proper accessibility considerations
- **CSS3**: Modern styling with Flexbox, CSS Grid, animations, and responsive design
- **Vanilla JavaScript**: ES6+ features including async/await, arrow functions, and modern DOM manipulation

### **API Integration**
- **LeetCode GraphQL API**: Direct integration with LeetCode's official GraphQL endpoint
- **CORS Proxy**: Utilizes `cors-anywhere.herokuapp.com` to bypass CORS restrictions
- **Data Parsing**: Robust JSON parsing with comprehensive error handling

### **Key Technical Features**

#### 🔗 **API Communication**
```javascript
// GraphQL Query Structure
query userSessionProgress($username: String!) {
  allQuestionsCount {
    difficulty
    count
  }
  matchedUser(username: $username) {
    submitStats {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
      totalSubmissionNum {
        difficulty
        count
        submissions
      }
    }
  }
}
```

#### 📱 **Responsive Design**
- **Mobile-first approach** with breakpoints at 768px and 480px
- **Flexible layouts** that adapt to different screen sizes
- **Touch-friendly interface** optimized for mobile interactions

#### 🎭 **CSS Animations & Effects**
- **Conic Gradients**: Used for progress circle visualizations
- **CSS Custom Properties**: Dynamic progress degree calculations
- **Keyframe Animations**: Smooth fade-in effects and loading spinners
- **Transform Transitions**: Hover effects and interactive feedback

#### 🔧 **JavaScript Functionality**
- **Async/Await Pattern**: Modern promise handling for API calls
- **Error Boundaries**: Comprehensive try-catch blocks with specific error types
- **DOM Manipulation**: Efficient element selection and content updates
- **Event Handling**: Keyboard and click event management
- **Data Validation**: Regex-based username validation

## 🚀 **Installation & Setup**

### **Quick Start**
1. **Clone the repository**
   ```bash
   git clone https://github.com/Aarsh-s-Lal/CodeYatra.git
   cd CodeYatra
   ```

2. **Open in browser**
   ```bash
   # Using VS Code Live Server
   code .
   # Or simply open index.html in your browser
   ```

3. **Start tracking!**
   - Enter any valid LeetCode username
   - Press Enter or click Search
   - View comprehensive statistics

### **File Structure**
```
CodeYatra/
│
├── index.html          # Main HTML structure
├── style.css           # All styling and responsive design
├── script.js           # JavaScript functionality and API calls
└── README.md           # Project documentation
```

## 🎯 **Why कोडयात्रा (CodeYatra) is a Great Asset**

### **For Individual Developers**
- **🎯 Progress Tracking**: Visual representation of your coding journey
- **📈 Performance Analysis**: Understand your strengths and areas for improvement
- **🏆 Motivation**: See your progress in an engaging, visual format
- **📊 Data-Driven Insights**: Make informed decisions about your study plan

### **For Educators & Mentors**
- **👥 Student Monitoring**: Track multiple students' progress
- **📋 Assessment Tool**: Quick overview of coding proficiency
- **🎓 Goal Setting**: Help students set and achieve coding targets
- **📈 Progress Reports**: Visual data for performance discussions

### **For Recruiters & Hiring Managers**
- **🔍 Quick Assessment**: Instantly evaluate candidate's coding activity
- **📊 Skill Verification**: Verify claimed coding experience
- **🎯 Talent Identification**: Identify dedicated and active developers
- **⚡ Efficient Screening**: Streamline the technical screening process

### **For Development Teams**
- **👥 Team Challenges**: Create friendly coding competitions
- **📈 Skill Development**: Track team members' continuous learning
- **🎯 Hiring Decisions**: Assess potential team members objectively
- **📊 Performance Metrics**: Data-driven approach to skill assessment

## 🔧 **API Details**

### **LeetCode GraphQL Endpoint**
- **URL**: `https://leetcode.com/graphql/`
- **Method**: POST
- **Content-Type**: `application/json`

### **Data Retrieved**
- Total questions count by difficulty
- User's solved problems count
- Submission statistics (accepted vs total)
- Success rate calculations

### **CORS Handling**
Currently uses `cors-anywhere.herokuapp.com` as a proxy. For production use, consider:
- Setting up your own CORS proxy
- Using a backend service
- Implementing server-side API calls

## 🛡 **Error Handling**

The application includes comprehensive error handling for:
- **Network Issues**: Connection timeouts and server errors
- **Invalid Usernames**: Non-existent or malformed usernames
- **API Errors**: GraphQL errors and rate limiting
- **Data Parsing**: Malformed or unexpected API responses

## 🔮 **Future Enhancements**

### **Planned Features**
- [ ] Historical progress tracking with charts
- [ ] Multiple user comparison
- [ ] Contest performance analytics
- [ ] Problem recommendation system
- [ ] Dark/Light theme toggle
- [ ] Export functionality (PDF/PNG)
- [ ] Social sharing capabilities
- [ ] Goal setting and reminders

### **Technical Improvements**
- [ ] Backend API for better CORS handling
- [ ] Database integration for data persistence
- [ ] Progressive Web App (PWA) features
- [ ] Advanced caching mechanisms
- [ ] TypeScript migration
- [ ] Unit testing implementation

## 🤝 **Contributing**

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Contribution Guidelines**
- Follow existing code style and conventions
- Add comments for complex functionality
- Test your changes across different browsers
- Update README if adding new features

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **LeetCode** for providing the GraphQL API
- **CORS Anywhere** for the proxy service
- **Font Awesome** for inspiration on icons
- **CSS-Tricks** for modern CSS techniques

## 📞 **Support & Contact**

- **GitHub Issues**: [Report bugs or request features](https://github.com/Aarsh-s-Lal/CodeYatra/issues)
- **Email**: [Your email for support]
- **LinkedIn**: [Your LinkedIn profile]

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Aarsh-s-Lal](https://github.com/Aarsh-s-Lal)

![Visitors](https://visitor-badge.glitch.me/badge?page_id=Aarsh-s-Lal.CodeYatra)

</div>