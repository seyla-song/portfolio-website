import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Terminal, Folder, FileText, Code, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';
import { createRoot } from 'react-dom/client';

// Terminal Typewriter Component
const Typewriter = ({ text, speed = 50, onComplete, startDelay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  ``
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timer);
      } else if (onComplete) {
        onComplete();
      }
    }, startDelay);
    
    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, onComplete, startDelay]);
  
  return <span>{displayText}<span className="cursor-blink">█</span></span>;
};

// ASCII Art Banner
const ASCIIBanner = () => (
  <pre className="ascii-art">
{`
███████╗███╗   ██╗ ██████╗ ██╗███╗   ██╗███████╗███████╗██████╗ 
██╔════╝████╗  ██║██╔════╝ ██║████╗  ██║██╔════╝██╔════╝██╔══██╗
█████╗  ██╔██╗ ██║██║  ███╗██║██╔██╗ ██║█████╗  █████╗  ██████╔╝
██╔══╝  ██║╚██╗██║██║   ██║██║██║╚██╗██║██╔══╝  ██╔══╝  ██╔══██╗
███████╗██║ ╚████║╚██████╔╝██║██║ ╚████║███████╗███████╗██║  ██║
╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝  ╚═╝
`}
  </pre>
);

// Main App Component
const App = () => {
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  
  // Sample data
  const projects = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'Full-stack web application with React and Node.js',
      tech: ['React', 'Node.js', 'MongoDB'],
      link: 'https://github.com',
      status: 'COMPLETED'
    },
    {
      id: 2,
      name: 'Task Management System',
      description: 'Real-time collaborative task manager',
      tech: ['Vue.js', 'Firebase', 'Tailwind'],
      link: 'https://github.com',
      status: 'IN_PROGRESS'
    },
    {
      id: 3,
      name: 'Weather Dashboard',
      description: 'Beautiful weather app with data visualization',
      tech: ['React', 'D3.js', 'OpenWeather API'],
      link: 'https://github.com',
      status: 'COMPLETED'
    }
  ];
  
  const blogPosts = [
    {
      id: 1,
      title: 'Understanding React Hooks',
      date: '2024-01-15',
      excerpt: 'Deep dive into useState, useEffect, and custom hooks...',
      readTime: '5 min'
    },
    {
      id: 2,
      title: 'Building Scalable APIs',
      date: '2024-01-10',
      excerpt: 'Best practices for designing RESTful APIs that scale...',
      readTime: '8 min'
    },
    {
      id: 3,
      title: 'Terminal Aesthetics in Web Design',
      date: '2024-01-05',
      excerpt: 'How to create nostalgic terminal interfaces for modern web...',
      readTime: '6 min'
    }
  ];
  
  useEffect(() => {
    setTimeout(() => {
      setShowWelcome(true);
      setTerminalHistory([
        { 
          type: 'output', 
          content: (
            <>
              <ASCIIBanner />
              <div className="welcome-text">
                <div>System initialized...</div>
                <div>Welcome to my digital workspace.</div>
                <div>I'm a software engineer passionate about creating unique digital experiences.</div>
                <br />
                <div className="hint">[TIP] Type 'help' for available commands</div>
              </div>
            </>
          )
        }
      ]);
    }, 500);
  }, []);
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);
  
  const handleCommand = (e) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      const cmd = currentCommand.toLowerCase().trim();
      const newHistory = [...terminalHistory, { type: 'command', content: currentCommand }];
      
      switch(cmd) {
        case 'help':
          newHistory.push({
            type: 'output',
            content: (
              <div className="help-output">
                <div>Available commands:</div>
                <div className="command-list">
                  <div><span className="command-name">about</span> - Display information about me</div>
                  <div><span className="command-name">projects</span> - List all projects</div>
                  <div><span className="command-name">blog</span> - Show recent blog posts</div>
                  <div><span className="command-name">contact</span> - Display contact information</div>
                  <div><span className="command-name">skills</span> - Show technical skills</div>
                  <div><span className="command-name">clear</span> - Clear terminal</div>
                  <div><span className="command-name">help</span> - Show this help message</div>
                </div>
              </div>
            )
          });
          break;
          
        case 'about':
          newHistory.push({
            type: 'output',
            content: (
              <div className="about-output">
                <div className="section-title">~/about</div>
                <pre className="system-info">
{`Name:        John Doe
Role:        Software Engineer
Location:    San Francisco, CA
Experience:  5+ years in tech

Bio:
I'm a passionate software engineer with expertise in full-stack development.
I love building scalable applications and exploring new technologies.
When I'm not coding, you'll find me contributing to open source projects
or writing technical blogs about web development.`}
                </pre>
              </div>
            )
          });
          break;
          
        case 'projects':
          newHistory.push({
            type: 'output',
            content: (
              <div className="projects-output">
                <div className="section-title">~/projects</div>
                {projects.map(project => (
                  <div key={project.id} className="project-item">
                    <div className="project-header">
                      <span className="project-name">{project.name}</span>
                      <span className="project-status">[{project.status}]</span>
                    </div>
                    <div className="project-details">
                      <div>├─ {project.description}</div>
                      <div>├─ Tech: {project.tech.join(', ')}</div>
                      <div>└─ <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">View on GitHub →</a></div>
                    </div>
                  </div>
                ))}
              </div>
            )
          });
          break;
          
        case 'blog':
          newHistory.push({
            type: 'output',
            content: (
              <div className="blog-output">
                <div className="section-title">~/blog</div>
                {blogPosts.map(post => (
                  <div key={post.id} className="blog-item">
                    <div className="blog-header">
                      <span className="blog-title">{post.title}</span>
                      <span className="blog-meta">{post.date} • {post.readTime}</span>
                    </div>
                    <div className="blog-excerpt">└─ {post.excerpt}</div>
                  </div>
                ))}
              </div>
            )
          });
          break;
          
        case 'contact':
          newHistory.push({
            type: 'output',
            content: (
              <div className="contact-output">
                <div className="section-title">~/contact</div>
                <div className="contact-list">
                  <div>Email:    <a href="mailto:contact@example.com" className="contact-link">contact@example.com</a></div>
                  <div>GitHub:   <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">github.com/username</a></div>
                  <div>LinkedIn: <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">linkedin.com/in/username</a></div>
                  <div>Twitter:  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="contact-link">@username</a></div>
                </div>
              </div>
            )
          });
          break;
          
        case 'skills':
          newHistory.push({
            type: 'output',
            content: (
              <div className="skills-output">
                <div className="section-title">~/skills</div>
                <pre className="skills-tree">
{`technical_skills/
├── languages/
│   ├── JavaScript [████████████████████] 95%
│   ├── Python      [██████████████████  ] 90%
│   ├── TypeScript  [████████████████    ] 85%
│   └── Go          [████████████        ] 70%
├── frontend/
│   ├── React       [████████████████████] 95%
│   ├── Vue.js      [██████████████      ] 75%
│   ├── Next.js     [██████████████████  ] 90%
│   └── Tailwind    [████████████████    ] 85%
├── backend/
│   ├── Node.js     [██████████████████  ] 90%
│   ├── Express     [████████████████    ] 85%
│   ├── Django      [████████████        ] 70%
│   └── PostgreSQL  [████████████████    ] 80%
└── tools/
    ├── Git         [████████████████████] 95%
    ├── Docker      [████████████████    ] 85%
    ├── AWS         [██████████████      ] 75%
    └── CI/CD       [████████████████    ] 80%`}
                </pre>
              </div>
            )
          });
          break;
          
        case 'clear':
          setTerminalHistory([]);
          setCurrentCommand('');
          return;
          
        default:
          newHistory.push({
            type: 'error',
            content: `Command not found: ${cmd}. Type 'help' for available commands.`
          });
      }
      
      setTerminalHistory(newHistory);
      setCurrentCommand('');
    }
  };
  
  // Click anywhere to focus input
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };
  
  return (
    <div className="terminal-full" onClick={handleTerminalClick}>
      <div className="scanlines"></div>
      <div className="terminal-content">
        <div className="terminal-header">
          <span className="terminal-title">
            <Terminal size={14} />
            portfolio@engineer:~$
          </span>
          <nav className="terminal-nav">
            <button 
              className="nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentCommand('about');
                handleCommand({ key: 'Enter' });
              }}
            >
              ~/about
            </button>
            <button 
              className="nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentCommand('projects');
                handleCommand({ key: 'Enter' });
              }}
            >
              ~/projects
            </button>
            <button 
              className="nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentCommand('blog');
                handleCommand({ key: 'Enter' });
              }}
            >
              ~/blog
            </button>
            <button 
              className="nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentCommand('skills');
                handleCommand({ key: 'Enter' });
              }}
            >
              ~/skills
            </button>
            <button 
              className="nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentCommand('contact');
                handleCommand({ key: 'Enter' });
              }}
            >
              ~/contact
            </button>
            <button 
              className="nav-btn clear-btn"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentCommand('clear');
                handleCommand({ key: 'Enter' });
              }}
            >
              [clear]
            </button>
          </nav>
          <span className="terminal-time">{new Date().toLocaleTimeString()}</span>
        </div>
        
        <div className="terminal-body">
          {terminalHistory.map((item, index) => (
            <div key={index} className="terminal-line">
              {item.type === 'command' && (
                <div className="command-line">
                  <span className="prompt">visitor@portfolio:~$ </span>
                  <span className="command-text">{item.content}</span>
                </div>
              )}
              {item.type === 'output' && (
                <div className="output-line">{item.content}</div>
              )}
              {item.type === 'error' && (
                <div className="error-line">{item.content}</div>
              )}
            </div>
          ))}
          
          <div className="terminal-input-line">
            <span className="prompt">visitor@portfolio:~$ </span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyPress={handleCommand}
              autoFocus
              spellCheck={false}
            />
            <span className="cursor-blink">█</span>
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
      
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        
        .terminal-full {
          width: 100vw;
          height: 100vh;
          background: #0a0a0a;
          color: #00ff00;
          font-family: 'Courier New', 'Courier', monospace;
          position: relative;
          overflow: hidden;
          cursor: text;
        }
        
        .terminal-full::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 255, 0, 0.025) 50%
          );
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 1;
        }
        
        .scanlines {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            transparent 50%,
            rgba(0, 255, 0, 0.03) 50%
          );
          background-size: 100% 4px;
          animation: scanlines 8s linear infinite;
          pointer-events: none;
          z-index: 2;
        }
        
        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 10px; }
        }
        
        .terminal-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 3;
        }
        
        .terminal-header {
          background: rgba(0, 255, 0, 0.1);
          border-bottom: 1px solid #00ff00;
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
        }
        
        .terminal-title {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #00ff00;
          text-shadow: 0 0 5px #00ff00;
        }
        
        .terminal-nav {
          display: flex;
          gap: 15px;
        }
        
        .nav-btn {
          background: transparent;
          color: #00ff00;
          border: 1px solid transparent;
          padding: 5px 12px;
          cursor: pointer;
          font-family: inherit;
          font-size: 14px;
          transition: all 0.3s;
          border-radius: 3px;
        }
        
        .nav-btn:hover {
          background: rgba(0, 255, 0, 0.1);
          border-color: #00ff00;
          text-shadow: 0 0 5px #00ff00;
        }
        
        .nav-btn.clear-btn {
          opacity: 0.7;
          border: 1px solid rgba(0, 255, 0, 0.3);
        }
        
        .nav-btn.clear-btn:hover {
          opacity: 1;
          background: rgba(255, 0, 0, 0.1);
          border-color: #ff0000;
          color: #ff0000;
          text-shadow: 0 0 5px #ff0000;
        }
        
        .terminal-time {
          color: #00ff00;
          opacity: 0.7;
          font-size: 12px;
        }
        
        .terminal-body {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          overflow-x: hidden;
          font-size: 14px;
          line-height: 1.6;
        }
        
        .terminal-body::-webkit-scrollbar {
          width: 10px;
        }
        
        .terminal-body::-webkit-scrollbar-track {
          background: #001100;
        }
        
        .terminal-body::-webkit-scrollbar-thumb {
          background: #00ff00;
          border-radius: 5px;
        }
        
        .terminal-body::-webkit-scrollbar-thumb:hover {
          background: #00ff00cc;
          box-shadow: 0 0 5px #00ff00;
        }
        
        .terminal-line {
          margin-bottom: 10px;
        }
        
        .command-line {
          display: flex;
          align-items: center;
          color: #00ff00;
          font-weight: bold;
        }
        
        .prompt {
          color: #00ff00;
          margin-right: 8px;
          text-shadow: 0 0 3px #00ff00;
        }
        
        .command-text {
          color: #00ff00;
        }
        
        .output-line {
          color: #00ff00;
          margin-left: 0;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        
        .error-line {
          color: #ff0000;
          margin-left: 0;
          text-shadow: 0 0 3px #ff0000;
        }
        
        .terminal-input-line {
          display: flex;
          align-items: center;
          margin-top: 10px;
        }
        
        .terminal-input {
          background: transparent;
          border: none;
          color: #00ff00;
          font-family: inherit;
          font-size: 14px;
          font-weight: bold;
          outline: none;
          flex: 1;
        }
        
        .cursor-blink {
          animation: blink 1s infinite;
          color: #00ff00;
          font-weight: normal;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .ascii-art {
          color: #00ff00;
          font-size: 10px;
          line-height: 1.2;
          margin-bottom: 20px;
          text-shadow: 0 0 10px #00ff00;
          animation: glow 2s ease-in-out infinite alternate;
          white-space: pre;
          overflow-x: auto;
        }
        
        @keyframes glow {
          from { text-shadow: 0 0 10px #00ff00; }
          to { text-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00; }
        }
        
        .welcome-text {
          color: #00ff00;
          margin-top: 10px;
        }
        
        .hint {
          color: #00ff00;
          opacity: 0.8;
          font-style: italic;
          margin-top: 20px;
        }
        
        .section-title {
          color: #00ff00;
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 15px;
          text-shadow: 0 0 5px #00ff00;
        }
        
        .help-output {
          margin-top: 10px;
        }
        
        .command-list {
          margin-top: 10px;
          margin-left: 20px;
        }
        
        .command-list div {
          margin-bottom: 5px;
        }
        
        .command-name {
          color: #00ff00;
          font-weight: bold;
          padding: 2px 6px;
          background: rgba(0, 255, 0, 0.1);
          border-radius: 3px;
        }
        
        .system-info {
          color: #00ff00;
          line-height: 1.8;
          white-space: pre-wrap;
        }
        
        .project-item {
          margin-bottom: 20px;
          padding: 15px;
          background: rgba(0, 255, 0, 0.05);
          border: 1px solid rgba(0, 255, 0, 0.3);
          border-radius: 3px;
        }
        
        .project-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        
        .project-name {
          color: #00ff00;
          font-weight: bold;
          font-size: 16px;
        }
        
        .project-status {
          color: #00ff00;
          opacity: 0.7;
          font-size: 12px;
        }
        
        .project-details {
          margin-left: 10px;
          line-height: 1.8;
        }
        
        .project-link {
          color: #00ff00;
          text-decoration: none;
          border-bottom: 1px dotted #00ff00;
          transition: all 0.3s;
        }
        
        .project-link:hover {
          text-shadow: 0 0 5px #00ff00;
          border-bottom-style: solid;
        }
        
        .blog-item {
          margin-bottom: 15px;
          padding: 12px;
          background: rgba(0, 255, 0, 0.05);
          border-left: 3px solid #00ff00;
        }
        
        .blog-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        
        .blog-title {
          color: #00ff00;
          font-weight: bold;
        }
        
        .blog-meta {
          color: #00ff00;
          opacity: 0.6;
          font-size: 12px;
        }
        
        .blog-excerpt {
          margin-left: 10px;
          opacity: 0.8;
        }
        
        .contact-list {
          line-height: 2;
          margin-left: 20px;
        }
        
        .contact-link {
          color: #00ff00;
          text-decoration: none;
          border-bottom: 1px dotted #00ff00;
          transition: all 0.3s;
        }
        
        .contact-link:hover {
          text-shadow: 0 0 5px #00ff00;
          border-bottom-style: solid;
        }
        
        .skills-tree {
          color: #00ff00;
          line-height: 1.6;
          white-space: pre;
          font-size: 13px;
        }
        
        @media (max-width: 768px) {
          .terminal-body {
            padding: 15px;
            font-size: 12px;
          }
          
          .ascii-art {
            font-size: 6px;
          }
          
          .project-header {
            flex-direction: column;
            gap: 5px;
          }
          
          .blog-header {
            flex-direction: column;
            gap: 5px;
          }
        }
      `}</style>
    </div>
  );
};

// Mount the App component to the DOM
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
