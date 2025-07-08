// DayDream AI Coding Application
class DayDreamAI {
    constructor() {
        this.prompts = [
            {
                id: 1,
                category: "components",
                name: "Navigation Bar",
                description: "Create a responsive navigation component",
                template: "Create a responsive navigation bar with logo, menu items, and mobile hamburger menu"
            },
            {
                id: 2,
                category: "forms",
                name: "Contact Form",
                description: "Build a contact form with validation",
                template: "Create a contact form with name, email, message fields and client-side validation"
            },
            {
                id: 3,
                category: "animations",
                name: "Loading Animation",
                description: "Create smooth loading animations",
                template: "Design a loading spinner with smooth CSS animations and fade effects"
            },
            {
                id: 4,
                category: "visualization",
                name: "Chart Component",
                description: "Build data visualization charts",
                template: "Create an interactive bar chart using Canvas API with hover effects"
            },
            {
                id: 5,
                category: "api",
                name: "Data Fetching",
                description: "Implement API data fetching",
                template: "Create a function to fetch data from an API with error handling and loading states"
            },
            {
                id: 6,
                category: "layout",
                name: "Card Grid",
                description: "Design responsive card layouts",
                template: "Create a responsive grid of cards with hover effects and proper spacing"
            }
        ];

        this.aiResponses = [
            "I'll help you create that component! Let me generate the code with proper annotations so you can understand each part.",
            "Great idea! I'll build that for you with modern best practices and include explanatory comments.",
            "Perfect! I'll create an optimized solution with clear documentation for each function.",
            "Excellent choice! Let me craft that with responsive design and accessibility features.",
            "I'll generate clean, maintainable code with detailed annotations for learning purposes."
        ];

        this.currentLanguage = 'html';
        this.annotationsVisible = false;
        this.chatHistory = [];
        this.savedPrompts = [...this.prompts];

        this.initializeEventListeners();
        this.renderPrompts();
        this.updateLineNumbers();
        this.generateParticles();
    }

    initializeEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Chat functionality
        document.getElementById('sendChat').addEventListener('click', () => this.sendChatMessage());
        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendChatMessage();
        });

        // Prompt library
        document.getElementById('promptSearch').addEventListener('input', (e) => this.filterPrompts(e.target.value));
        document.getElementById('categoryFilter').addEventListener('change', (e) => this.filterPrompts('', e.target.value));

        // Code editor
        document.getElementById('codeEditor').addEventListener('input', () => this.updateLineNumbers());
        document.getElementById('codeEditor').addEventListener('scroll', () => this.syncScrolling());
        document.getElementById('languageSelect').addEventListener('change', (e) => this.changeLanguage(e.target.value));
        document.getElementById('toggleAnnotations').addEventListener('click', () => this.toggleAnnotations());
        document.getElementById('runCode').addEventListener('click', () => this.runCode());

        // Preview controls
        document.getElementById('refreshPreview').addEventListener('click', () => this.refreshPreview());
        document.getElementById('clearConsole').addEventListener('click', () => this.clearConsole());

        // Modal controls
        document.getElementById('cancelSave').addEventListener('click', () => this.closeModal());
        document.getElementById('confirmSave').addEventListener('click', () => this.savePrompt());

        // Auto-run code on changes
        document.getElementById('codeEditor').addEventListener('input', 
            this.debounce(() => this.runCode(), 1000)
        );
    }

    generateParticles() {
        const particlesContainer = document.querySelector('.particles');
        
        // Create additional floating particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #FFD700;
                border-radius: 50%;
                box-shadow: 0 0 4px #FFD700;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: sparkle ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    sendChatMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;

        this.addChatMessage(message, 'user');
        input.value = '';

        // Simulate AI response
        setTimeout(() => {
            const response = this.generateAIResponse(message);
            this.addChatMessage(response, 'ai');
            
            // Generate code based on the message
            if (message.toLowerCase().includes('create') || message.toLowerCase().includes('build')) {
                setTimeout(() => this.generateCode(message), 1000);
            }
        }, 1000);
    }

    addChatMessage(message, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${DOMPurify.sanitize(message)}</p>`;
        
        messageDiv.appendChild(messageContent);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateAIResponse(userMessage) {
        // Simple keyword-based response generation
        const keywords = {
            'navigation': 'I\'ll create a responsive navigation bar with smooth animations and mobile-friendly design.',
            'form': 'I\'ll build a form with proper validation and user-friendly error handling.',
            'animation': 'I\'ll design smooth CSS animations with proper timing and easing functions.',
            'chart': 'I\'ll create an interactive chart with hover effects and responsive design.',
            'api': 'I\'ll implement proper API handling with loading states and error management.',
            'layout': 'I\'ll design a responsive layout that works beautifully on all devices.'
        };

        for (const [keyword, response] of Object.entries(keywords)) {
            if (userMessage.toLowerCase().includes(keyword)) {
                return response;
            }
        }

        return this.aiResponses[Math.floor(Math.random() * this.aiResponses.length)];
    }

    generateCode(message) {
        let code = '';
        let language = 'html';

        if (message.toLowerCase().includes('navigation')) {
            code = `<!-- Responsive Navigation Bar -->
<nav class="navbar">
    <div class="nav-container">
        <div class="nav-logo">
            <h2>Logo</h2>
        </div>
        <div class="nav-menu">
            <a href="#" class="nav-link">Home</a>
            <a href="#" class="nav-link">About</a>
            <a href="#" class="nav-link">Services</a>
            <a href="#" class="nav-link">Contact</a>
        </div>
        <div class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</nav>

<style>
.navbar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo h2 {
    color: white;
    margin: 0;
}

.nav-menu {
    display: flex;
    gap: 2rem;
}

.nav-link {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
}

.nav-link:hover {
    color: #f0f0f0;
    transform: translateY(-2px);
}

.nav-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
}

.nav-toggle span {
    width: 25px;
    height: 3px;
    background: white;
    margin: 3px 0;
    transition: 0.3s;
}

@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background: rgba(102, 126, 234, 0.95);
        width: 100%;
        text-align: center;
        transition: 0.3s;
        padding: 2rem 0;
    }

    .nav-menu.active {
        left: 0;
    }

    .nav-toggle {
        display: flex;
    }
}
</style>`;
        } else if (message.toLowerCase().includes('form')) {
            code = `<!-- Contact Form with Validation -->
<div class="form-container">
    <h2>Contact Us</h2>
    <form id="contactForm" class="contact-form">
        <div class="form-group">
            <label for="name">Name *</label>
            <input type="text" id="name" name="name" required>
            <span class="error" id="nameError"></span>
        </div>
        
        <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" name="email" required>
            <span class="error" id="emailError"></span>
        </div>
        
        <div class="form-group">
            <label for="message">Message *</label>
            <textarea id="message" name="message" rows="5" required></textarea>
            <span class="error" id="messageError"></span>
        </div>
        
        <button type="submit" class="submit-btn">Send Message</button>
    </form>
</div>

<style>
.form-container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
}

.form-group input,
.form-group textarea {
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #667eea;
}

.error {
    color: #e74c3c;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.submit-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.submit-btn:hover {
    transform: translateY(-2px);
}
</style>

<script>
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
        isValid = false;
    } else {
        document.getElementById('nameError').textContent = '';
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }
    
    if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        isValid = false;
    } else {
        document.getElementById('messageError').textContent = '';
    }
    
    if (isValid) {
        alert('Form submitted successfully!');
        this.reset();
    }
});
</script>`;
        } else if (message.toLowerCase().includes('animation')) {
            code = `<!-- Loading Animation -->
<div class="loading-container">
    <div class="spinner"></div>
    <p class="loading-text">Loading...</p>
</div>

<style>
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    gap: 1rem;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading-text {
    color: #667eea;
    font-size: 1.2rem;
    font-weight: 600;
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

/* Alternative: Dots Loading */
.dots-loading {
    display: flex;
    gap: 0.5rem;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #667eea;
    animation: bounce 1.4s ease-in-out infinite both;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
}
</style>`;
        } else {
            code = `<!-- Welcome to DayDream AI -->
<div class="welcome-container">
    <h1>Hello, World!</h1>
    <p>Start coding with AI assistance</p>
    <button onclick="showMessage()">Click Me</button>
</div>

<style>
.welcome-container {
    text-align: center;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 10px;
    margin: 2rem;
}

.welcome-container h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    animation: fadeInUp 0.8s ease;
}

.welcome-container p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    animation: fadeInUp 0.8s ease 0.2s both;
}

.welcome-container button {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    padding: 1rem 2rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
    animation: fadeInUp 0.8s ease 0.4s both;
}

.welcome-container button:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>

<script>
function showMessage() {
    alert('Welcome to DayDream AI! Start building amazing things!');
}
</script>`;
        }

        document.getElementById('codeEditor').value = code;
        document.getElementById('languageSelect').value = language;
        this.currentLanguage = language;
        this.updateLineNumbers();
        this.runCode();
        this.generateAnnotations();
    }

    filterPrompts(searchTerm = '', category = '') {
        const search = searchTerm.toLowerCase();
        const categoryFilter = category;
        
        const filteredPrompts = this.savedPrompts.filter(prompt => {
            const matchesSearch = prompt.name.toLowerCase().includes(search) || 
                                prompt.description.toLowerCase().includes(search);
            const matchesCategory = !categoryFilter || prompt.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
        
        this.renderPrompts(filteredPrompts);
    }

    renderPrompts(prompts = this.savedPrompts) {
        const promptList = document.getElementById('promptList');
        promptList.innerHTML = '';
        
        prompts.forEach(prompt => {
            const promptDiv = document.createElement('div');
            promptDiv.className = 'prompt-item';
            promptDiv.innerHTML = `
                <h4>${prompt.name}</h4>
                <p>${prompt.description}</p>
                <span class="category-tag">${prompt.category}</span>
            `;
            
            promptDiv.addEventListener('click', () => {
                document.getElementById('chatInput').value = prompt.template;
                this.switchTab('chat');
            });
            
            promptList.appendChild(promptDiv);
        });
    }

    updateLineNumbers() {
        const editor = document.getElementById('codeEditor');
        const lineNumbers = document.getElementById('lineNumbers');
        const lines = editor.value.split('\n').length;
        
        lineNumbers.innerHTML = '';
        for (let i = 1; i <= lines; i++) {
            const span = document.createElement('span');
            span.textContent = i;
            lineNumbers.appendChild(span);
        }
    }

    syncScrolling() {
        const editor = document.getElementById('codeEditor');
        const lineNumbers = document.getElementById('lineNumbers');
        lineNumbers.scrollTop = editor.scrollTop;
    }

    changeLanguage(language) {
        this.currentLanguage = language;
        this.generateAnnotations();
    }

    toggleAnnotations() {
        this.annotationsVisible = !this.annotationsVisible;
        const annotationsLayer = document.getElementById('annotationsLayer');
        annotationsLayer.style.display = this.annotationsVisible ? 'block' : 'none';
        
        if (this.annotationsVisible) {
            this.generateAnnotations();
        }
    }

    generateAnnotations() {
        if (!this.annotationsVisible) return;
        
        const code = document.getElementById('codeEditor').value;
        const annotationsLayer = document.getElementById('annotationsLayer');
        annotationsLayer.innerHTML = '';
        
        const lines = code.split('\n');
        const annotations = [];
        
        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            
            if (trimmedLine.includes('function') || trimmedLine.includes('=>')) {
                annotations.push({
                    line: index + 1,
                    type: 'function',
                    text: 'Function definition - defines reusable code block'
                });
            } else if (trimmedLine.includes('const') || trimmedLine.includes('let') || trimmedLine.includes('var')) {
                annotations.push({
                    line: index + 1,
                    type: 'variable',
                    text: 'Variable declaration - stores data'
                });
            } else if (trimmedLine.includes('if') || trimmedLine.includes('for') || trimmedLine.includes('while')) {
                annotations.push({
                    line: index + 1,
                    type: 'logic',
                    text: 'Control flow - manages program execution'
                });
            } else if (trimmedLine.includes('document.') || trimmedLine.includes('getElementById') || trimmedLine.includes('addEventListener')) {
                annotations.push({
                    line: index + 1,
                    type: 'dom',
                    text: 'DOM manipulation - interacts with web page elements'
                });
            }
        });
        
        annotations.forEach(annotation => {
            const annotationDiv = document.createElement('div');
            annotationDiv.className = `annotation ${annotation.type}`;
            annotationDiv.textContent = annotation.text;
            annotationDiv.style.top = `${(annotation.line - 1) * 21 + 16}px`;
            annotationDiv.style.left = '300px';
            annotationsLayer.appendChild(annotationDiv);
        });
    }

    runCode() {
        const code = document.getElementById('codeEditor').value;
        const previewFrame = document.getElementById('previewFrame');
        
        if (!code.trim()) {
            previewFrame.srcdoc = '<p style="padding: 20px; color: #666;">Write some code to see the preview</p>';
            return;
        }
        
        try {
            const sanitizedCode = DOMPurify.sanitize(code);
            const fullHTML = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                    </style>
                </head>
                <body>
                    ${sanitizedCode}
                </body>
                </html>
            `;
            
            previewFrame.srcdoc = fullHTML;
            this.logToConsole('Code executed successfully', 'success');
        } catch (error) {
            this.logToConsole(`Error: ${error.message}`, 'error');
        }
    }

    refreshPreview() {
        this.runCode();
        this.logToConsole('Preview refreshed', 'info');
    }

    logToConsole(message, type = 'info') {
        const consoleMessages = document.getElementById('consoleMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `console-message ${type}`;
        messageDiv.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        consoleMessages.appendChild(messageDiv);
        consoleMessages.scrollTop = consoleMessages.scrollHeight;
    }

    clearConsole() {
        const consoleMessages = document.getElementById('consoleMessages');
        consoleMessages.innerHTML = '<div class="console-message info">Console cleared...</div>';
    }

    openModal() {
        document.getElementById('saveModal').classList.add('active');
    }

    closeModal() {
        document.getElementById('saveModal').classList.remove('active');
    }

    savePrompt() {
        const name = document.getElementById('promptName').value.trim();
        const category = document.getElementById('promptCategory').value;
        const description = document.getElementById('promptDescription').value.trim();
        
        if (!name || !description) {
            alert('Please fill in all fields');
            return;
        }
        
        const newPrompt = {
            id: Date.now(),
            name,
            category,
            description,
            template: document.getElementById('chatInput').value
        };
        
        this.savedPrompts.push(newPrompt);
        this.renderPrompts();
        this.closeModal();
        
        // Clear modal fields
        document.getElementById('promptName').value = '';
        document.getElementById('promptDescription').value = '';
        document.getElementById('chatInput').value = '';
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new DayDreamAI();
    
    // Add some welcome messages
    setTimeout(() => {
        app.logToConsole('DayDream AI initialized successfully', 'success');
        app.logToConsole('Ready to create amazing code!', 'info');
    }, 1000);
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'Enter':
                e.preventDefault();
                document.getElementById('runCode').click();
                break;
            case 's':
                e.preventDefault();
                // Could implement save functionality here
                break;
        }
    }
});

// Add some sample interactions for demonstration
window.addEventListener('load', () => {
    // Simulate some initial particles and effects
    const header = document.querySelector('.divine-header');
    
    // Add extra sparkle effects on hover
    header.addEventListener('mouseenter', () => {
        const sparkles = document.querySelectorAll('.particle');
        sparkles.forEach(sparkle => {
            sparkle.style.animationDuration = '0.5s';
        });
    });
    
    header.addEventListener('mouseleave', () => {
        const sparkles = document.querySelectorAll('.particle');
        sparkles.forEach(sparkle => {
            sparkle.style.animationDuration = '3s';
        });
    });
});