'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';
import GitTimeline from './components/GitTimeline';
import RunningName from './components/RunningName';
import GitHubStats from './components/GitHubStats';

export default function Home() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [activeSection, setActiveSection] = useState('hero');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'Type a command to get started:',
    '  help    → see all commands',
    '  email   → open mail client',
    '  about   → who is Sri Ram',
  ]);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [colCount, setColCount] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);
  const [heroResumeOpen, setHeroResumeOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const technicalPhrases = useMemo(() => [
    'Building distributed systems...',
    'Optimizing backend performance...',
    'Designing scalable architectures...',
    'Engineering cloud solutions...',
    'Mastering software-defined networking...'
  ], []);

  const updateTime = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Los_Angeles',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    setCurrentTime(now.toLocaleTimeString('en-US', options) + ' PT');
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setTypedText(prev => {
        const currentFullText = technicalPhrases[currentPhrase];
        if (prev.length < currentFullText.length) {
          return currentFullText.slice(0, prev.length + 1);
        } else {
          setTimeout(() => {
            setCurrentPhrase(prev => (prev + 1) % technicalPhrases.length);
            setTypedText('');
          }, 2000);
          return prev;
        }
      });
    }, 80);

    return () => clearInterval(typingInterval);
  }, [currentPhrase, technicalPhrases]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (heroRef.current && scrollPosition < heroRef.current.offsetTop + heroRef.current.offsetHeight) {
        setActiveSection('hero');
      } else if (aboutRef.current && scrollPosition < aboutRef.current.offsetTop + aboutRef.current.offsetHeight) {
        setActiveSection('about');
      } else if (projectsRef.current && scrollPosition < projectsRef.current.offsetTop + projectsRef.current.offsetHeight) {
        setActiveSection('projects');
      } else if (contactRef.current) {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setCommandQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen]);

  useEffect(() => {
    const update = () => setColCount(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = terminalInput.toLowerCase().trim();

    let response = '';
    switch (command) {
      case 'help':
        response = 'Available commands: help, about, projects, contact, skills, clear, email';
        break;
      case 'about':
        response = 'Sri Ram Mannam - Graduate Software Engineer specializing in Distributed Systems, Backend/Cloud, SDN/Virtualization';
        break;
      case 'projects':
        response = 'Featured projects: LessGo, Restaurant Finder, DocSense AI, EdgeRunner, PIC Standard';
        break;
      case 'contact':
        response = 'Email: sriram.mannam10@gmail.com | Location: Pacific Time Zone | GitHub: github.com/manamsriram';
        break;
      case 'skills':
        response = 'DevOps: Docker, Kubernetes, CI/CD, Terraform | Backend: Java, Python, Node.js, Go | Cloud: AWS, GCP, Azure';
        break;
      case 'clear':
        setTerminalOutput([]);
        setTerminalInput('');
        return;
      case 'email':
        window.location.href = 'mailto:sriram.mannam10@gmail.com';
        response = 'Opening email client...';
        break;
      default:
        response = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    setTerminalOutput(prev => [...prev, `$ ${terminalInput}`, response]);
    setTerminalInput('');
  };

  const projects = useMemo(() => [
    {
      id: 1,
      title: 'LessGo – Campus Ridesharing',
      description: '8-service campus ridesharing platform — PostGIS geo-matching (5 km radius), SwiftUI live tracking, Stripe payments.',
      tags: ['TypeScript', 'Node.js', 'Python', 'SwiftUI', 'GCP', 'Docker', 'Stripe', 'Kubernetes', 'Distributed Systems', 'Backend'],
      category: ['distributed', 'cloud', 'devops', 'backend', 'mobile', 'fullstack', 'ai'],
      color: 'cyan',
      link: 'https://github.com/manamsriram/SJSU_Ridesharing',
      demoLink: 'https://www.youtube.com/watch?v=l79FVVxRbPU',
      demoLabel: 'Watch Demo',
      details: [
        '8 Node.js/Express microservices behind an API gateway — each independently deployable with JWT auth and per-route rate limiting',
        'Python matching pipeline: graph embeddings → PostGIS geo-filter (5 km / ±30 min) → cost function across detour, wait time, and ride history',
        'Live driver tracking and in-app chat on SwiftUI iOS client; Stripe handles the full payment flow',
      ],
    },
    {
      id: 2,
      title: 'Restaurant Finder',
      description: 'React 18 + FastAPI restaurant finder — ~50% faster search via index tuning, GitHub Actions → AWS EC2/RDS.',
      tags: ['React 18', 'Python', 'FastAPI', 'MySQL', 'AWS', 'CI/CD', 'Google Maps API', 'Backend'],
      category: ['fullstack', 'cloud', 'devops', 'backend'],
      color: 'purple',
      link: 'https://github.com/manamsriram/Restaurant-Finder-Application',
      demoLink: 'https://restaurant-finder-application.vercel.app/',
      demoLabel: 'Live Demo',
      details: [
        'Led front-back integration for a 4-person Agile team — defined API contracts, ran code reviews, kept both sides in sync',
        'ZIP-code search via Google Maps API; separate dashboards for restaurant owners and admins',
        'GitHub Actions runs pytest + integration tests on every push; green builds deploy straight to AWS EC2/RDS',
        'Reworked DB schemas and query indexes — cut search response time by ~50%',
      ],
    },
    {
      id: 3,
      title: 'DocSense AI',
      description: 'Agentic RAG chatbot — dense+BM25 fusion, corrective retrieval loop, Llama 3.3 70B with 3-tier Redis cache.',
      tags: ['Python', 'Flask', 'Qdrant', 'Redis', 'Docker', 'Supabase', 'LLM', 'RAG', 'AI/ML'],
      category: ['ai', 'cloud', 'devops'],
      color: 'green',
      link: 'https://github.com/manamsriram/DocSense-AI',
      demoLink: 'https://docsense-ai-7k4b.onrender.com',
      demoLabel: 'Live Demo',
      details: [
        'Multi-stage retrieval: dense vectors + BM25, fused with RRF, reranked with a cross-encoder — citations link back to the exact page',
        'Corrective RAG loop re-queries when confidence is low; handles multi-hop questions that single-pass systems miss',
        'Three-tier Redis cache, per-user Qdrant collection isolation via Supabase JWT, vision captions for image-heavy PDFs',
        'Fails over across Groq Llama 3.3 70B and a secondary model automatically',
      ],
    },
    {
      id: 4,
      title: 'EdgeRunner',
      description: 'Autonomous trading engine — 8-check risk gate, 15+ control endpoints, 241 offline pytest tests, zero-flake CI.',
      tags: ['Python', 'FastAPI', 'React 19', 'TypeScript', 'PostgreSQL', 'pytest', 'CI/CD', 'Backend'],
      category: ['backend', 'cloud', 'ai', 'devops'],
      color: 'amber',
      link: 'https://github.com/manamsriram/EdgeRunner',
      demoLink: 'https://edge-runner-xi.vercel.app/',
      demoLabel: 'Live Demo',
      details: [
        '15+ endpoints for positions, approvals, kill-switch controls, and live performance charts — humans stay in the loop',
        '8-check risk gate runs before every trade; idempotent execution logs track Sharpe ratio, max drawdown, and win rate',
        '241 pytest tests pass entirely offline — no API keys or network required, so CI never flakes on missing credentials',
      ],
    },
    {
      id: 5,
      title: 'PIC Standard',
      description: 'Open-source contributor — Docker HTTP bridge, audit-logging middleware, X-Request-ID tracing for agentic systems.',
      tags: ['TypeScript', 'Python', 'Docker', 'Observability', 'Security', 'Backend'],
      category: ['backend', 'devops'],
      color: 'blue',
      link: 'https://github.com/pic-standard/pic-standard',
      details: [
        'Dockerized HTTP bridge for agentic provenance services — slimmer image builds, Python health checks, local setup just works',
        'Audit-logging middleware and X-Request-ID tracing cleanup tightened the security surface',
        'Version endpoints in the PIC SDK let downstream services know exactly which build handled a request',
      ],
    },
    {
      id: 6,
      title: 'Smart Grocery Assistant',
      description: 'React Native pantry tracker — real-time Firestore sync, expiry alerts, recipe suggestions, theme-aware UI.',
      tags: ['React Native', 'TypeScript', 'Expo', 'Firebase', 'Mobile Development'],
      category: ['mobile', 'cloud'],
      color: 'green',
      link: 'https://github.com/manamsriram/Smart-Grocery-Assistant',
      demoLink: 'https://smart-grocery-assistant-chi.vercel.app/',
      demoLabel: 'Live Demo',
      details: [
        'Track pantry items with expiration dates; recipe suggestions based on what you actually have on hand',
        'Multiple shopping lists with real-time sync via Firebase Firestore; accounts through Firebase Auth',
        'Light, dark, and system theme support; Expo Router for navigation, React Context for global state',
      ],
    }
  ], []);

  const skills = useMemo(() => ({
    devops: { name: 'DevOps', color: 'green', items: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform'] },
    backend: { name: 'Backend', color: 'cyan', items: ['Java', 'Python', 'Node.js', 'Go'] },
    distributed: { name: 'Distributed Systems', color: 'amber', items: ['Microservices', 'Message Queues', 'Load Balancing'] },
    cloud: { name: 'Cloud', color: 'purple', items: ['AWS', 'GCP', 'Azure', 'Serverless'] },
    networking: { name: 'Networking', color: 'blue', items: ['SDN', 'Virtualization', 'Network Security'] }
  }), []);

  const certifications = [
    {
      title: 'Wells Fargo Software Engineering Virtual Experience',
      issuer: 'Wells Fargo / Forage',
      status: 'Completed',
      description: 'Built a system requirements document and object model diagram for a new portfolio management system, and set up a Kafka messaging system for data processing.',
      link: 'https://www.theforage.com/completion-certificates/nkmk7gJitYs4TBvoA/9Wvq4L2WCFQDyyPp3_nkmk7gJitYs4TBvoA_6994b6eaf08021556e51fd39_1771871939738_completion_certificate.pdf',
    },
    {
      title: 'SmartInterviews DSA & Problem Solving Certificate',
      issuer: 'SmartInterviews',
      status: 'Completed',
      description: 'Data structures and algorithms, competitive programming, and systematic problem-solving for technical interviews.',
      link: 'https://smartinterviews.in/certificate/84411827',
    },
    {
      title: 'IBM Backend Development Professional Certificate',
      issuer: 'IBM / Coursera',
      status: 'In Progress',
      description: 'Backend engineering fundamentals, REST APIs, microservices, containers, and cloud-native development with Python and Node.js.',
    },
    {
      title: 'Microsoft AI-200 Certification',
      issuer: 'Microsoft',
      status: 'In Progress',
      description: 'Azure AI solutions: designing and implementing AI workloads, computer vision, NLP, and conversational AI on Azure.',
    },
    {
      title: 'GitHub Copilot Certification',
      issuer: 'GitHub',
      status: 'In Progress',
      description: 'AI-assisted development workflows, prompt engineering for code generation, and responsible Copilot use in enterprise environments.',
    },
  ];


  const filteredProjects = useMemo(() => {
    let result = filterCategory === 'all'
      ? projects
      : projects.filter(project => project.category.includes(filterCategory));

    if (selectedSkill) {
      const skillItems = skills[selectedSkill as keyof typeof skills].items;
      result = result.filter(project =>
        project.tags.some(tag => skillItems.includes(tag))
      );
    }

    return result;
  }, [filterCategory, selectedSkill, projects, skills]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setCommandPaletteOpen(false);
    setCommandQuery('');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', () => { mouseRef.current = { x: -1000, y: -1000 }; });

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    };
    const handleTouchEnd = () => { mouseRef.current = { x: -1000, y: -1000 }; };
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    const COUNT = 400;
    const REPEL_RADIUS = 100;
    const REPEL_FORCE = 4;
    const FRICTION = 0.88;
    const COLORS = ['0,255,255', '0,255,0', '0,102,255', '255,255,255'];

    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      a: Math.random() * 0.45 + 0.1,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;

      for (const p of pts) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const f = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_FORCE;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c}, ${p.a})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="min-h-screen bg-deep-bg text-text-primary font-ui">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-terminal-green via-electric-cyan to-accent-purple origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-deep-bg/80 backdrop-blur-sm z-40 border-b border-surface-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-mono-display font-bold text-lg text-terminal-green">
              Sri Ram Mannam
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {['hero', 'about', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-mono-display transition-colors ${
                    activeSection === section
                      ? 'text-electric-cyan'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              {/* Resume dropdown */}
              <div className="relative">
                <button
                  onClick={() => setResumeDropdownOpen(!resumeDropdownOpen)}
                  onBlur={() => setTimeout(() => setResumeDropdownOpen(false), 150)}
                  className="text-sm font-mono-display text-terminal-green border border-terminal-green/50 px-3 py-1.5 rounded-lg hover:bg-terminal-green/10 transition-colors flex items-center gap-1"
                >
                  Resume ↓
                </button>
                {resumeDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-surface border border-surface-lighter rounded-lg overflow-hidden shadow-lg min-w-[160px]">
                    <a
                      href="/resume-fullstack.pdf"
                      download
                      className="block px-4 py-2 text-sm font-mono-display text-text-secondary hover:text-terminal-green hover:bg-surface-light transition-colors"
                    >
                      Full-Stack
                    </a>
                    <a
                      href="/resume-backend.pdf"
                      download
                      className="block px-4 py-2 text-sm font-mono-display text-text-secondary hover:text-terminal-green hover:bg-surface-light transition-colors border-t border-surface-lighter"
                    >
                      Backend
                    </a>
                  </div>
                )}
              </div>
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="flex items-center space-x-2 px-3 py-1.5 bg-surface-light rounded-lg border border-surface-lighter hover:border-electric-cyan transition-colors"
              >
                <span className="text-xs text-text-secondary">⌘K</span>
                <span className="text-sm text-text-secondary">Command Palette</span>
              </button>
            </div>
            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-surface-lighter bg-deep-bg/95">
            <div className="px-4 py-4 space-y-1">
              {['hero', 'about', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => { scrollToSection(section); setMobileMenuOpen(false); }}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-mono-display transition-colors ${
                    activeSection === section
                      ? 'text-electric-cyan bg-surface-light'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-light'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              <div className="border-t border-surface-lighter pt-3 mt-3 grid grid-cols-2 gap-2">
                <a
                  href="/resume-fullstack.pdf"
                  download
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center px-3 py-2 text-sm font-mono-display text-terminal-green border border-terminal-green/50 rounded-lg hover:bg-terminal-green/10 transition-colors"
                >
                  Resume (FS)
                </a>
                <a
                  href="/resume-backend.pdf"
                  download
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center px-3 py-2 text-sm font-mono-display text-terminal-green border border-terminal-green/50 rounded-lg hover:bg-terminal-green/10 transition-colors"
                >
                  Resume (BE)
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Command Palette */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { setCommandPaletteOpen(false); setCommandQuery(''); }} />
          <div className="relative w-full max-w-2xl bg-surface border border-surface-lighter rounded-xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-surface-lighter">
              <input
                type="text"
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-text-primary font-mono-display text-lg outline-none"
                autoFocus
                value={commandQuery}
                onChange={(e) => setCommandQuery(e.target.value)}
              />
            </div>
            <div className="max-h-96 overflow-y-auto">
              {['hero', 'about', 'projects', 'contact']
                .filter(s => !commandQuery || s.includes(commandQuery.toLowerCase()))
                .map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="w-full px-4 py-3 text-left hover:bg-surface-light transition-colors flex items-center justify-between group"
                  >
                    <span className="font-mono-display text-text-primary group-hover:text-electric-cyan">
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </span>
                    <span className="text-xs text-text-secondary">Jump to section</span>
                  </button>
                ))}
              {[
                { label: 'Resume – Full-Stack', href: '/resume-fullstack.pdf' },
                { label: 'Resume – Backend', href: '/resume-backend.pdf' },
              ]
                .filter(item => !commandQuery || item.label.toLowerCase().includes(commandQuery.toLowerCase()))
                .map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    download
                    onClick={() => { setCommandPaletteOpen(false); setCommandQuery(''); }}
                    className="w-full px-4 py-3 text-left hover:bg-surface-light transition-colors flex items-center justify-between group block"
                  >
                    <span className="font-mono-display text-text-primary group-hover:text-terminal-green">
                      {item.label}
                    </span>
                    <span className="text-xs text-text-secondary">Download PDF</span>
                  </a>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Side Navigation Dots */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col space-y-4">
        {['hero', 'about', 'projects', 'contact'].map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`w-3 h-3 rounded-full transition-all ${
              activeSection === section
                ? 'bg-electric-cyan scale-125'
                : 'bg-surface-lighter hover:bg-surface-light'
            }`}
            aria-label={`Scroll to ${section}`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-radial" />
        {/* Physics Particles */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-block px-4 py-2 bg-surface-light rounded-lg border border-surface-lighter mb-6">
              <span className="font-mono-display text-sm text-electric-cyan">
                {currentTime}
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 font-serif-body"
          >
            <RunningName />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto font-serif-body"
          >
            Graduate Software Engineer
          </motion.p>

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="bg-surface border border-surface-lighter rounded-lg overflow-hidden tech-border">
              <div className="bg-surface-light px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-xs text-text-secondary font-mono-display">terminal</span>
              </div>
              <div className="p-6 text-left">
                <div className="font-mono-display text-sm">
                  <span className="text-terminal-green">$</span>
                  <span className="ml-2 text-electric-cyan">{typedText}</span>
                  <span className="terminal-cursor">▋</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-electric-cyan text-deep-bg font-semibold rounded-lg hover:bg-electric-cyan-dim transition-colors font-mono-display"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border-2 border-electric-cyan text-electric-cyan font-semibold rounded-lg hover:bg-electric-cyan hover:text-deep-bg transition-colors font-mono-display"
            >
              Get In Touch
            </button>
            <div className="relative">
              <button
                onClick={() => setHeroResumeOpen(!heroResumeOpen)}
                onBlur={() => setTimeout(() => setHeroResumeOpen(false), 150)}
                className="px-8 py-3 border-2 border-terminal-green text-terminal-green font-semibold rounded-lg hover:bg-terminal-green hover:text-deep-bg transition-colors font-mono-display"
              >
                Resume ↓
              </button>
              {heroResumeOpen && (
                <div className="absolute top-full left-0 mt-1 bg-surface border border-surface-lighter rounded-lg overflow-hidden shadow-lg min-w-full z-10">
                  <a
                    href="/resume-fullstack.pdf"
                    download
                    className="block px-4 py-2 text-sm font-mono-display text-text-secondary hover:text-terminal-green hover:bg-surface-light transition-colors"
                  >
                    Full-Stack
                  </a>
                  <a
                    href="/resume-backend.pdf"
                    download
                    className="block px-4 py-2 text-sm font-mono-display text-text-secondary hover:text-terminal-green hover:bg-surface-light transition-colors border-t border-surface-lighter"
                  >
                    Backend
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-text-secondary"
            >
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-radial-amber opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold mb-12 text-center font-serif-body"
          >
            <span className="text-text-primary">About </span>
            <span className="text-warning-amber">Me</span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Personal Narrative */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-5 mb-2">
                <div className="relative w-20 h-20 shrink-0">
                  <Image
                    src="/profile.jpg"
                    alt="Sri Ram Mannam"
                    fill
                    priority
                    sizes="80px"
                    className="rounded-full object-cover border-2 border-warning-amber/50"
                  />
                </div>
                <div>
                  <p className="text-text-primary font-semibold font-mono-display">Sri Ram Mannam</p>
                  <p className="text-text-secondary text-sm font-mono-display">MS Software Engineering · SJSU &#39;26</p>
                </div>
              </div>
              <p className="text-lg text-text-secondary font-serif-body leading-relaxed">
                I came to distributed systems through a bug I couldn&#39;t explain. I was building LessGo — a campus rideshare app — and two microservices were returning different views of the same ride. No errors, no crashes. Just two services that disagreed on state. That gap between &ldquo;the code is correct&rdquo; and &ldquo;the system is correct&rdquo; is what I&#39;ve been chasing ever since.
              </p>
              <p className="text-lg text-text-secondary font-serif-body leading-relaxed">
                At SJSU I&#39;ve built systems that had to be correct under failure: a retrieval pipeline that re-queries when its own confidence is low, a trading engine that runs 8 checks before every position, agentic middleware where a missed audit log is a security hole. The pattern I keep finding is that correctness isn&#39;t a property of individual services — it&#39;s a property of how they fail together.
              </p>
              <p className="text-lg text-text-secondary font-serif-body leading-relaxed">
                I&#39;m finishing my MS in Software Engineering at SJSU in 2026. I&#39;m looking for a role where the failure modes are interesting and the systems actually have to work.
              </p>
              <div className="bg-surface border border-surface-lighter rounded-lg p-6 tech-border-amber">
                <h3 className="text-xl font-semibold text-warning-amber mb-4 font-mono-display">
                  What I Do
                </h3>
                <ul className="space-y-3 text-text-secondary">
                  {[
                    'Ship 8+ service distributed systems with independent deployability and JWT auth',
                    'Build multi-stage RAG pipelines with corrective loops and page-level citations',
                    'Wire CI/CD from GitHub Actions to AWS; write tests that never flake on missing credentials',
                    'Contribute to open-source agentic infrastructure (observability, audit logging, tracing)'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-warning-amber">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Skills Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold text-text-primary mb-6 font-mono-display">
                Technical Expertise
              </h3>
              <div className="bg-surface border border-surface-lighter rounded-lg overflow-hidden tech-border">
                <div className="bg-surface-light px-4 py-2 flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-xs text-text-secondary font-mono-display">skills-terminal</span>
                </div>
                <div className="p-4 space-y-3">
                  {Object.entries(skills).map(([key, skill], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="font-mono-display text-sm"
                    >
                      <div
                        onClick={() => setSelectedSkill(selectedSkill === key ? null : key)}
                        className={`cursor-pointer hover:bg-surface-light rounded p-2 transition-colors ${
                          selectedSkill === key ? 'bg-surface-light' : ''
                        }`}
                      >
                        <span className="text-terminal-green">$</span>
                        <span className="ml-2 text-electric-cyan">{skill.name.toLowerCase()}</span>
                        <span className="ml-2 text-text-secondary">--list</span>
                        {selectedSkill === key && (
                          <span className="ml-2 text-warning-amber">[active]</span>
                        )}
                      </div>
                      {selectedSkill === key && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="ml-4 mt-2 space-y-1"
                        >
                          {skill.items.map((item) => (
                            <div key={item} className="text-text-secondary">
                              <span className="text-electric-cyan">→</span>
                              <span className="ml-2">{item}</span>
                            </div>
                          ))}
                          <div className="mt-3 pt-3 border-t border-surface-lighter">
                            <span className="text-text-secondary text-xs">
                              Click to filter projects using these skills
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-semibold text-text-primary mb-8 font-mono-display">
              Career Timeline
            </h3>
            <GitTimeline />
          </motion.div>
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-semibold text-text-primary mb-8 font-mono-display">
              Certifications
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  className="bg-surface border border-dashed border-accent-purple/50 rounded-lg p-6 hover:border-accent-purple transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-2 py-1 rounded bg-accent-purple/10 text-accent-purple font-mono-display">
                      {cert.status}
                    </span>
                    <span className="text-xs text-text-secondary font-mono-display">{cert.issuer}</span>
                  </div>
                  <h4 className="text-base font-semibold text-text-primary mb-2">{cert.title}</h4>
                  <p className="text-sm text-text-secondary mb-3">{cert.description}</p>
                  {'link' in cert && cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-electric-cyan hover:text-electric-cyan/80 font-mono-display transition-colors"
                    >
                      View Certificate →
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* GitHub Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-semibold text-text-primary mb-8 font-mono-display">
              GitHub Activity
            </h3>
            <GitHubStats />
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-radial-purple opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold mb-8 text-center font-serif-body"
          >
            <span className="text-text-primary">Featured </span>
            <span className="text-accent-purple">Projects</span>
          </motion.h2>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-6"
          >
            {['all', 'backend', 'fullstack', 'distributed', 'ai', 'cloud', 'devops', 'mobile'].map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-4 py-2 rounded-lg font-mono-display text-sm transition-colors ${
                  filterCategory === category
                    ? 'bg-accent-purple text-white'
                    : 'bg-surface text-text-secondary hover:bg-surface-light'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Active Skill Filter Display */}
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center items-center gap-3 mb-6"
            >
              <div className="bg-electric-cyan/10 border border-electric-cyan/30 rounded-lg px-4 py-2 flex items-center gap-2">
                <span className="text-electric-cyan font-mono-display text-sm">
                  Filter: {skills[selectedSkill as keyof typeof skills].name}
                </span>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-electric-cyan hover:text-electric-cyan-dim transition-colors"
                >
                  ✕
                </button>
              </div>
              <span className="text-text-secondary text-sm">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
              </span>
            </motion.div>
          )}

          {/* Projects Grid — explicit flex-col columns so expand never causes cross-column reflow */}
          <div className="flex gap-6">
            {Array.from({ length: colCount }, (_, col) => (
              <div key={col} className="flex-1 flex flex-col gap-6">
                {filteredProjects.filter((_, i) => i % colCount === col).map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="bg-surface border border-surface-lighter rounded-lg overflow-hidden hover-lift hover-glow-purple group"
                  >
                    <div className="p-6 flex flex-col min-h-[280px]">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-purple transition-colors">
                          {project.title}
                        </h3>
                        <div className={`w-3 h-3 rounded-full bg-${project.color === 'green' ? 'terminal-green' : project.color === 'cyan' ? 'electric-cyan' : project.color === 'amber' ? 'warning-amber' : project.color === 'purple' ? 'accent-purple' : 'electric-blue'}`} />
                      </div>
                      <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs px-2 py-1 bg-electric-cyan/10 border border-electric-cyan/30 rounded text-electric-cyan font-mono-display"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-4">
                        <button
                          onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                          className="text-sm text-accent-purple hover:text-accent-purple-dim font-mono-display transition-colors"
                        >
                          {expandedProject === project.id ? 'Show Less' : 'Learn More'}
                        </button>
                        <div className="flex items-center gap-3">
                          {'demoLink' in project && project.demoLink && (
                            <a
                              href={project.demoLink as string}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-terminal-green hover:text-terminal-green/70 font-mono-display transition-colors"
                            >
                              {(project.demoLabel as string) ?? 'Live Demo'} →
                            </a>
                          )}
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-electric-cyan hover:text-electric-cyan-dim font-mono-display transition-colors"
                          >
                            View Code →
                          </a>
                        </div>
                      </div>
                    </div>
                    {expandedProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="px-6 pb-6 border-t border-surface-lighter pt-4"
                      >
                        <ul className="space-y-2">
                          {project.details.map((point, i) => (
                            <li key={i} className="flex gap-2 text-text-secondary text-sm">
                              <span className="text-electric-cyan mt-0.5 shrink-0">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-radial opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold mb-8 text-center font-serif-body"
          >
            <span className="text-text-primary">Get In </span>
            <span className="text-electric-cyan">Touch</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-text-secondary mb-12 text-center font-serif-body"
          >
            I&#39;m currently open to new opportunities and collaborations. Whether you have a question
            or just want to say hi, feel free to reach out!
          </motion.p>

          {/* Terminal Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-surface border border-surface-lighter rounded-lg overflow-hidden tech-border mb-12"
          >
            <div className="bg-surface-light px-4 py-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-text-secondary font-mono-display">contact-terminal</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-text-secondary font-mono-display">{currentTime}</span>
                <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                {terminalOutput.map((line, index) => (
                  <div key={index} className="font-mono-display text-sm">
                    {line.startsWith('$') ? (
                      <span className="text-terminal-green">{line}</span>
                    ) : (
                      <span className="text-text-secondary">{line}</span>
                    )}
                  </div>
                ))}
              </div>
              <form onSubmit={handleTerminalSubmit} className="flex items-center space-x-2">
                <span className="text-terminal-green font-mono-display">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type 'help' for commands..."
                  className="flex-1 bg-transparent text-text-primary font-mono-display text-sm outline-none"
                />
              </form>
            </div>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <a
              href="mailto:sriram.mannam10@gmail.com"
              className="bg-surface border border-surface-lighter rounded-lg p-6 hover:border-electric-cyan transition-colors group"
            >
              <div className="w-12 h-12 bg-electric-cyan/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-electric-cyan/20 transition-colors">
                <svg className="w-6 h-6 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary mb-2 font-mono-display">Email</h3>
              <p className="text-text-secondary text-sm truncate">sriram.mannam10@gmail.com</p>
            </a>

            <a
              href="https://linkedin.com/in/srirammannam"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface border border-surface-lighter rounded-lg p-6 hover:border-accent-purple transition-colors group"
            >
              <div className="w-12 h-12 bg-accent-purple/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent-purple/20 transition-colors">
                <svg className="w-6 h-6 text-accent-purple" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary mb-2 font-mono-display">LinkedIn</h3>
              <p className="text-text-secondary text-sm truncate">Sri Ram Mannam</p>
            </a>

            <a
              href="https://github.com/manamsriram"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface border border-surface-lighter rounded-lg p-6 hover:border-terminal-green transition-colors group"
            >
              <div className="w-12 h-12 bg-terminal-green/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-terminal-green/20 transition-colors">
                <svg className="w-6 h-6 text-terminal-green" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary mb-2 font-mono-display">GitHub</h3>
              <p className="text-text-secondary text-sm truncate">manamsriram</p>
            </a>

            <div className="bg-surface border border-surface-lighter rounded-lg p-6 hover:border-warning-amber transition-colors group">
              <div className="w-12 h-12 bg-warning-amber/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-warning-amber/20 transition-colors">
                <svg className="w-6 h-6 text-warning-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary mb-2 font-mono-display">Location</h3>
              <p className="text-text-secondary text-sm">Pacific Time Zone (UTC -07:00)</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-surface-lighter py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            <p className="text-text-secondary text-sm font-mono-display">
              © 2026 Sri Ram Mannam. Built with precision.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}