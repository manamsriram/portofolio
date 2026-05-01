import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-slate-900 dark:text-white">
              Sri Ram Mannam
            </div>
            <div className="flex space-x-8">
              <Link href="#about" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                About
              </Link>
              <Link href="#projects" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Projects
              </Link>
              <Link href="#contact" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Hi, I'm <span className="text-blue-600 dark:text-blue-400">Sri Ram Mannam</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Graduate Software Engineer specializing in Distributed Systems, Backend/Cloud, SDN/Virtualization
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="#projects"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              View My Work
            </Link>
            <Link
              href="#contact"
              className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                I'm a Graduate Software Engineer with an MS in Software Engineering from San Jose State University.
                My expertise lies in distributed systems, backend/cloud technologies, software-defined networking,
                and virtualization. I'm passionate about building scalable, efficient systems that solve complex problems.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                I have experience working with Java, Python, C++, and Node.js/TypeScript, and I love exploring new
                technologies and contributing to open-source projects. When I'm not coding, you can find me sharing
                knowledge with the developer community or working on innovative projects.
              </p>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Java', 'Python', 'C++', 'Node.js', 'TypeScript', 'Distributed Systems', 'Cloud Computing', 'SDN', 'Virtualization', 'React', 'Git', 'SQL'].map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">What I Do</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Design and implement distributed systems and microservices architectures</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Develop scalable backend systems and cloud-native applications</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Build software-defined networking (SDN) solutions and virtualization platforms</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Optimize system performance and implement efficient load balancing strategies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Baby Hypervisor",
                description: "A lightweight hypervisor development project demonstrating virtualization concepts and system-level programming.",
                tags: ["C++", "Virtualization", "Systems Programming"],
                link: "https://github.com/manamsriram/baby_hypervisor"
              },
              {
                title: "Distributed Document Editing",
                description: "A collaborative document editing system with real-time synchronization and conflict resolution.",
                tags: ["Java", "Distributed Systems", "Real-time"],
                link: "https://github.com/manamsriram/Distributed_Document_Editing"
              },
              {
                title: "SDN Load Balancer",
                description: "Software-defined networking based load balancing solution for optimizing network traffic distribution.",
                tags: ["Python", "SDN", "Networking"],
                link: "https://github.com/manamsriram/load_balancer"
              },
              {
                title: "Restaurant Finder Application",
                description: "A Yelp-like application for discovering and reviewing restaurants with location-based services.",
                tags: ["Python", "Web Development", "API Integration"],
                link: "https://github.com/manamsriram/Restaurant-Finder-Application"
              },
              {
                title: "Smart Grocery Assistant",
                description: "A React Native mobile application for smart grocery shopping with inventory management features.",
                tags: ["TypeScript", "React Native", "Mobile Development"],
                link: "https://github.com/manamsriram/Smart-Grocery-Assistant"
              },
              {
                title: "Cloud Infrastructure Projects",
                description: "Various cloud-native applications and infrastructure automation projects for scalable deployments.",
                tags: ["Cloud Computing", "DevOps", "Automation"],
                link: "https://github.com/manamsriram"
              }
            ].map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-slate-200 dark:border-slate-700"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium inline-flex items-center"
                >
                  View Project →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Get In Touch
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-12">
            I'm currently open to new opportunities and collaborations. Whether you have a question
            or just want to say hi, feel free to reach out!
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Email</h3>
              <p className="text-slate-600 dark:text-slate-300">manamsriram@gmail.com</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Location</h3>
              <p className="text-slate-600 dark:text-slate-300">Pacific Time Zone (UTC -07:00)</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Availability</h3>
              <p className="text-slate-600 dark:text-slate-300">Open to opportunities</p>
            </div>
          </div>
          <a
            href="mailto:manamsriram@gmail.com"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Send Me a Message
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://github.com/manamsriram" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/in/srirammannam" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="mailto:manamsriram@gmail.com" className="hover:text-blue-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
          <p className="text-slate-400">
            © 2024 Sri Ram Mannam. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}