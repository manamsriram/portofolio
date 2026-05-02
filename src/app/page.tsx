'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Home() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Los_Angeles',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    return now.toLocaleTimeString('en-US', options) + ' PT';
  });
  const [activeSection, setActiveSection] = useState('hero');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroRef = useRef<HTMLElement>(null);
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen]);

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
        response = 'Featured projects: Baby Hypervisor, Distributed Document Editing, SDN Load Balancer, Restaurant Finder, Smart Grocery Assistant, Cloud Infrastructure';
        break;
      case 'contact':
        response = 'Email: manamsriram@gmail.com | Location: Pacific Time Zone | GitHub: github.com/manamsriram';
        break;
      case 'skills':
        response = 'DevOps: Docker, Kubernetes, CI/CD, Terraform | Backend: Java, Python, Node.js, Go | Cloud: AWS, GCP, Azure';
        break;
      case 'clear':
        setTerminalOutput([]);
        setTerminalInput('');
        return;
      case 'email':
        window.location.href = 'mailto:manamsriram@gmail.com';
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
      title: 'Baby Hypervisor',
      description: 'A lightweight hypervisor development project demonstrating virtualization concepts and system-level programming.',
      tags: ['C++', 'Virtualization', 'Systems Programming'],
      category: 'backend',
      color: 'green',
      link: 'https://github.com/manamsriram/baby_hypervisor',
      details: 'Developed a Type-1 hypervisor from scratch with memory management, CPU virtualization, and I/O device emulation. Implemented direct hardware access and guest OS support with minimal overhead.',
      skills: ['Virtualization', 'Systems Programming', 'C++']
    },
    {
      id: 2,
      title: 'Distributed Document Editing',
      description: 'A collaborative document editing system with real-time synchronization and conflict resolution.',
      tags: ['Java', 'Distributed Systems', 'Real-time'],
      category: 'distributed',
      color: 'cyan',
      link: 'https://github.com/manamsriram/Distributed_Document_Editing',
      details: 'Built a real-time collaborative editing system using operational transformation (OT) for conflict resolution. Implemented WebSocket-based communication, automatic conflict detection, and merge algorithms for concurrent edits.',
      skills: ['Distributed Systems', 'Java', 'Real-time', 'WebSocket']
    },
    {
      id: 3,
      title: 'SDN Load Balancer',
      description: 'Software-defined networking based load balancing solution for optimizing network traffic distribution.',
      tags: ['Python', 'SDN', 'Networking'],
      category: 'networking',
      color: 'amber',
      link: 'https://github.com/manamsriram/load_balancer',
      details: 'Designed and implemented an SDN-based load balancer using OpenFlow protocol. Created dynamic traffic distribution algorithms, real-time monitoring dashboards, and adaptive routing strategies for optimal network performance.',
      skills: ['SDN', 'Networking', 'Python', 'Load Balancing']
    },
    {
      id: 4,
      title: 'Restaurant Finder Application',
      description: 'A Yelp-like application for discovering and reviewing restaurants with location-based services.',
      tags: ['Python', 'Web Development', 'API Integration'],
      category: 'backend',
      color: 'purple',
      link: 'https://github.com/manamsriram/Restaurant-Finder-Application',
      details: 'Developed a full-stack restaurant discovery platform with geolocation services, user reviews, ratings, and advanced search filters. Integrated multiple APIs for real-time data and implemented caching strategies for performance.',
      skills: ['Python', 'Web Development', 'API Integration', 'Backend']
    },
    {
      id: 5,
      title: 'Smart Grocery Assistant',
      description: 'A React Native mobile application for smart grocery shopping with inventory management features.',
      tags: ['TypeScript', 'React Native', 'Mobile Development'],
      category: 'mobile',
      color: 'blue',
      link: 'https://github.com/manamsriram/Smart-Grocery-Assistant',
      details: 'Built a cross-platform mobile app for grocery management with barcode scanning, recipe suggestions, and smart shopping lists. Implemented offline-first architecture, push notifications, and seamless cloud synchronization.',
      skills: ['TypeScript', 'React Native', 'Mobile Development', 'TypeScript']
    },
    {
      id: 6,
      title: 'Cloud Infrastructure Projects',
      description: 'Various cloud-native applications and infrastructure automation projects for scalable deployments.',
      tags: ['Cloud Computing', 'DevOps', 'Automation'],
      category: 'cloud',
      color: 'green',
      link: 'https://github.com/manamsriram',
      details: 'Developed multiple cloud-native solutions including serverless architectures, container orchestration, CI/CD pipelines, and infrastructure as code implementations using Terraform and AWS CloudFormation.',
      skills: ['Cloud Computing', 'DevOps', 'AWS', 'Terraform', 'CI/CD', 'Docker', 'Kubernetes']
    }
  ], []);

  const skills = useMemo(() => ({
    devops: { name: 'DevOps', color: 'green', items: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform'], level: 85 },
    backend: { name: 'Backend', color: 'cyan', items: ['Java', 'Python', 'Node.js', 'Go'], level: 90 },
    distributed: { name: 'Distributed Systems', color: 'amber', items: ['Microservices', 'Message Queues', 'Load Balancing'], level: 80 },
    cloud: { name: 'Cloud', color: 'purple', items: ['AWS', 'GCP', 'Azure', 'Serverless'], level: 75 },
    networking: { name: 'Networking', color: 'blue', items: ['SDN', 'Virtualization', 'Network Security'], level: 85 }
  }), []);

  const timeline = [
    { year: '2024', title: 'Graduate Software Engineer', description: 'MS in Software Engineering, San Jose State University', category: 'education' },
    { year: '2023', title: 'Software Engineering Intern', description: 'Distributed systems and cloud infrastructure development', category: 'experience' },
    { year: '2022', title: 'Research Assistant', description: 'SDN and network virtualization research', category: 'experience' },
    { year: '2021', title: 'BS Computer Science', description: 'Graduated with honors, focus on systems programming', category: 'education' }
  ];

  const filteredProjects = useMemo(() => {
    let result = filterCategory === 'all'
      ? projects
      : projects.filter(project => project.category === filterCategory);

    if (selectedSkill) {
      const skillItems = skills[selectedSkill as keyof typeof skills].items;
      result = result.filter(project =>
        project.skills?.some(skill => skillItems.includes(skill))
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
  };

  const [particles] = useState(() => [...Array(20)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    x: Math.random() * 10 - 5,
    duration: 3 + Math.random() * 2,
    delay: Math.random() * 2
  })));

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
            <div className="hidden md:flex space-x-8">
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
            </div>
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-surface-light rounded-lg border border-surface-lighter hover:border-electric-cyan transition-colors"
            >
              <span className="text-xs text-text-secondary">⌘K</span>
              <span className="text-sm text-text-secondary">Command Palette</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Command Palette */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setCommandPaletteOpen(false)} />
          <div className="relative w-full max-w-2xl bg-surface border border-surface-lighter rounded-xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-surface-lighter">
              <input
                type="text"
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-text-primary font-mono-display text-lg outline-none"
                autoFocus
              />
            </div>
            <div className="max-h-96 overflow-y-auto">
              {['hero', 'about', 'projects', 'contact'].map((section) => (
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

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, particle.x, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>

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
            <span className="text-text-primary">Sri Ram </span>
            <span className="text-electric-cyan">Mannam</span>
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
              <p className="text-lg text-text-secondary font-serif-body leading-relaxed">
                I&#39;m a Graduate Software Engineer with an MS in Software Engineering from San Jose State University.
                My expertise lies in distributed systems, backend/cloud technologies, software-defined networking,
                and virtualization.
              </p>
              <p className="text-lg text-text-secondary font-serif-body leading-relaxed">
                I&#39;m passionate about building scalable, efficient systems that solve complex problems.
                I have experience working with Java, Python, C++, and Node.js/TypeScript, and I love exploring new
                technologies and contributing to open-source projects.
              </p>
              <div className="bg-surface border border-surface-lighter rounded-lg p-6 tech-border-amber">
                <h3 className="text-xl font-semibold text-warning-amber mb-4 font-mono-display">
                  What I Do
                </h3>
                <ul className="space-y-3 text-text-secondary">
                  {[
                    'Design and implement distributed systems and microservices architectures',
                    'Develop scalable backend systems and cloud-native applications',
                    'Build software-defined networking (SDN) solutions and virtualization platforms',
                    'Optimize system performance and implement efficient load balancing strategies'
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
            <div className="relative border-l-2 border-surface-lighter ml-4 space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  className="timeline-item pl-8"
                >
                  <div className="bg-surface border border-surface-lighter rounded-lg p-6 hover:border-electric-cyan transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono-display text-sm text-electric-cyan">{item.year}</span>
                      <span className="text-xs px-2 py-1 bg-surface-light rounded text-text-secondary">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-text-primary mb-2">{item.title}</h4>
                    <p className="text-text-secondary">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
            {['all', 'backend', 'distributed', 'networking', 'mobile', 'cloud'].map((category) => (
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

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="bg-surface border border-surface-lighter rounded-lg overflow-hidden hover-lift hover-glow-purple group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-purple transition-colors">
                      {project.title}
                    </h3>
                    <div className={`w-3 h-3 rounded-full bg-${project.color === 'green' ? 'terminal-green' : project.color === 'cyan' ? 'electric-cyan' : project.color === 'amber' ? 'warning-amber' : project.color === 'purple' ? 'accent-purple' : 'electric-blue'}`} />
                  </div>
                  <p className="text-text-secondary mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-surface-light rounded text-text-secondary font-mono-display"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.skills && project.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2 py-1 bg-electric-cyan/10 border border-electric-cyan/30 rounded text-electric-cyan font-mono-display"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                      className="text-sm text-accent-purple hover:text-accent-purple-dim font-mono-display transition-colors"
                    >
                      {expandedProject === project.id ? 'Show Less' : 'Learn More'}
                    </button>
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
                {expandedProject === project.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-6 pb-6 border-t border-surface-lighter pt-4"
                  >
                    <p className="text-text-secondary text-sm">{project.details}</p>
                  </motion.div>
                )}
              </motion.div>
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
            className="grid md:grid-cols-3 gap-6"
          >
            <a
              href="mailto:manamsriram@gmail.com"
              className="bg-surface border border-surface-lighter rounded-lg p-6 hover:border-electric-cyan transition-colors group"
            >
              <div className="w-12 h-12 bg-electric-cyan/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-electric-cyan/20 transition-colors">
                <svg className="w-6 h-6 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary mb-2 font-mono-display">Email</h3>
              <p className="text-text-secondary text-sm">manamsriram@gmail.com</p>
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

            <div className="bg-surface border border-surface-lighter rounded-lg p-6 hover:border-terminal-green transition-colors group">
              <div className="w-12 h-12 bg-terminal-green/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-terminal-green/20 transition-colors">
                <svg className="w-6 h-6 text-terminal-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary mb-2 font-mono-display">Availability</h3>
              <p className="text-text-secondary text-sm">Open to opportunities</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-surface-lighter py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/manamsriram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-electric-cyan transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/srirammannam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-electric-cyan transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:manamsriram@gmail.com"
                className="text-text-secondary hover:text-electric-cyan transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
            <p className="text-text-secondary text-sm font-mono-display">
              © 2024 Sri Ram Mannam. Built with precision.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}