# Todo List - Modern Web Application

A clean, modern, and fully-featured Todo List web application built with vanilla HTML, CSS, and JavaScript. This application provides an intuitive interface for managing tasks with features like filtering, editing, local storage persistence, and responsive design.

## Features

### ✨ Core Functionality
- **Add Tasks**: Create new tasks with a simple text input and button
- **Edit Tasks**: Inline editing with save/cancel functionality
- **Delete Tasks**: Remove tasks with confirmation dialog
- **Toggle Complete**: Mark tasks as completed or uncompleted
- **Local Storage**: All tasks are automatically saved to browser localStorage
- **Time Tracking**: Shows when each task was created (e.g., "2m ago", "3h ago")
- **Task Counter**: Displays the number of active tasks remaining

### 🎨 User Experience
- **Filter Tasks**: View All, Active only, or Completed tasks
- **Clear Completed**: Bulk delete all completed tasks
- **Smooth Animations**: Micro-interactions and transitions for better UX
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Accessibility**: ARIA labels, keyboard navigation, and focus management

### 🔧 Technical Features
- **No Dependencies**: Pure HTML, CSS, and JavaScript
- **Modular Code**: Clean, commented, and maintainable structure
- **Error Handling**: Graceful fallbacks for localStorage issues
- **Semantic HTML**: Proper use of HTML5 semantic elements
- **Keyboard Shortcuts**: Enter to submit, Escape to cancel

## How to Run

### Method 1: Direct File Opening
Simply open `index.html` in any modern web browser.

### Method 2: Local Server (Recommended)
For best results, serve the files through a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## Project Structure

```
todo-list/
│
├── index.html              # Main HTML file
├── static/
│   ├── css/
│   │   └── style.css      # All styles and animations
│   └── js/
│       └── app.js         # Application logic
└── README.md              # This file
```

## Tech Stack

- **HTML5**: Semantic markup with ARIA attributes
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript**: ES6+ features, classes, localStorage API

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Usage

1. **Adding a Task**: Type in the input field and click "Add" or press Enter
2. **Completing a Task**: Click the checkbox or the task itself
3. **Editing a Task**: Click the "Edit" button, modify the text, and click "Save" or press Enter
4. **Deleting a Task**: Click the "Delete" button and confirm
5. **Filtering Tasks**: Use the All/Active/Completed buttons to filter the task list
6. **Clearing Completed**: Click "Clear Completed" to remove all finished tasks

## Design Philosophy

The application follows modern design principles with:
- Clean, minimal interface with lots of white space
- Consistent blue color scheme (#0d6efd)
- Smooth micro-animations for better perceived performance
- Mobile-first responsive design
- Accessibility-first approach with ARIA attributes and keyboard support

## License

Free to use for personal and commercial projects.
