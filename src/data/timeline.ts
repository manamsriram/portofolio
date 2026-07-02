export type TimelineStatus =
  | 'active'
  | 'completed'
  | 'contributed'
  | 'in-progress'
  | 'graduated'
  | 'started'

export type TimelineItem = {
  id: string
  years: number[]
  track: 'education' | 'experience' | 'project'
  title: string
  description: string
  tags?: string[]
  status?: TimelineStatus
  dateRange?: string
  link?: string
  visible: boolean
}

export const timelineItems: TimelineItem[] = [
  { id: 'btech-start', years: [2020], track: 'education', title: 'B.Tech IT · Started', description: 'Prasad V. Potluri Siddhartha Institute of Technology · Vijayawada, India.', status: 'started', dateRange: '2020 – May 2024', visible: true },
  { id: 'btech-grad', years: [2024], track: 'education', title: 'B.Tech IT · Graduated', description: 'Prasad V. Potluri Siddhartha Institute of Technology · Vijayawada, India. Information Technology.', status: 'graduated', dateRange: 'May 2024', visible: true },
  { id: 'ms-start', years: [2024], track: 'education', title: 'MS Software Engineering · Started', description: 'San Jose State University · San Jose, CA. Coursework: Enterprise Distributed Technologies, Engineering Software Systems, SDN, Virtualization, ML, Mobile Development.', status: 'started', dateRange: 'Aug 2024 – present', visible: true },
  { id: 'ms-grad', years: [2026], track: 'education', title: 'MS Software Engineering · Graduated', description: 'San Jose State University · San Jose, CA.', status: 'graduated', dateRange: '2026', visible: true },
  { id: 'mentor-start', years: [2023], track: 'experience', title: 'Student Mentor · SmartInterviews', description: 'Ran 50+ code reviews and sprint-style practice cycles with 100+ students on data structures, algorithms, and backend topics.', status: 'started', dateRange: 'May 2023 – Mar 2024', visible: true },
  { id: 'mentor-end', years: [2024], track: 'experience', title: 'Student Mentor · Ended', description: 'SmartInterviews · Wrote and presented curriculum on backend development, RESTful APIs, and scalable system design.', status: 'completed', dateRange: 'Mar 2024', visible: true },
  { id: 'edgerunner', years: [2024, 2026], track: 'project', title: 'EdgeRunner', description: 'Autonomous trading platform — FastAPI backend, React 19 dashboard, backtested quant strategies, 8-check risk gate, 241 offline pytest tests.', tags: ['Python', 'FastAPI', 'React 19', 'TypeScript', 'PostgreSQL'], status: 'active', dateRange: 'Nov 2024 – present', link: 'https://github.com/manamsriram/EdgeRunner', visible: true },
  { id: 'docsense', years: [2024, 2026], track: 'project', title: 'DocSense AI', description: 'Agentic RAG document platform — multi-stage retrieval with dense vectors, BM25, RRF fusion, cross-encoder reranking. Three-tier Redis cache, Corrective RAG loop.', tags: ['Python', 'Flask', 'Qdrant', 'Redis', 'Docker'], status: 'active', dateRange: 'Nov 2024 – present', link: 'https://github.com/manamsriram/DocSense-AI', visible: true },
  { id: 'lessgo', years: [2025, 2026], track: 'project', title: 'LessGo – Campus Ridesharing', description: 'Full-stack ridesharing — 8 Node.js/TS microservices, SwiftUI iOS, live driver tracking, in-app chat, Stripe payments, 3-stage Python matching pipeline using graph embeddings and PostGIS.', tags: ['TypeScript', 'Swift/SwiftUI', 'Node.js', 'PostgreSQL'], status: 'completed', dateRange: '2025 – 2026', link: 'https://github.com/manamsriram/SJSU_Ridesharing', visible: true },
  { id: 'pic-standard', years: [2026], track: 'project', title: 'PIC Standard', description: 'Open-source contributor — Dockerized HTTP bridge for agentic provenance services, audit-logging middleware, X-Request-ID tracing, version endpoints in PIC SDK.', tags: ['TypeScript', 'Python', 'Docker', 'Observability'], status: 'contributed', dateRange: 'Feb 2026 – present', link: 'https://github.com/manamsriram/pic-standard', visible: true },
  { id: 'restaurant-finder', years: [2024], track: 'project', title: 'Restaurant Finder', description: 'Full-stack restaurant discovery — React 18 SPA + FastAPI/SQLAlchemy REST API, ZIP-code search, owner dashboards, JWT roles, GitHub Actions CI, AWS EC2/RDS.', tags: ['React 18', 'Python', 'FastAPI', 'MySQL', 'AWS'], status: 'completed', dateRange: '2024', link: 'https://github.com/manamsriram/Restaurant-Finder-Application', visible: true },
  { id: 'distributed-doc', years: [2025], track: 'project', title: 'Distributed Document Editing', description: 'Real-time collaborative document editing system using distributed systems principles. SJSU CMPE 275 coursework.', tags: ['Java'], status: 'completed', dateRange: 'Sep – Oct 2025', link: 'https://github.com/manamsriram/Distributed_Document_Editing', visible: true },
  { id: 'baby-hypervisor', years: [2025], track: 'project', title: 'baby_hypervisor', description: 'Hypervisor with basic operational capabilities built in C++ from scratch.', tags: ['C++', 'Systems'], status: 'in-progress', dateRange: 'Oct – Nov 2025', link: 'https://github.com/manamsriram/baby_hypervisor', visible: true },
  { id: 'sdn-load-balancer', years: [2025], track: 'project', title: 'SDN Load Balancer', description: 'Load balancer using Software Defined Networks and Network Functions Virtualization. SJSU CMPE 275 coursework.', tags: ['Python', 'SDN', 'NFV'], status: 'completed', dateRange: 'Nov – Dec 2025', link: 'https://github.com/manamsriram/load_balancer', visible: true },
  { id: 'smart-grocery', years: [2025], track: 'project', title: 'Smart Grocery Assistant', description: 'Cross-platform mobile app — React Native + Expo, Firebase Firestore real-time sync, pantry expiry tracking, recipe discovery from available ingredients.', tags: ['React Native', 'TypeScript', 'Expo', 'Firebase'], status: 'completed', dateRange: 'Oct 2025 – Feb 2026', link: 'https://github.com/manamsriram/Smart-Grocery-Assistant', visible: true },
  { id: 'solo-leveling', years: [2026], track: 'project', title: 'SoloLeveling', description: 'Personal task tracking application.', tags: ['TypeScript'], status: 'in-progress', dateRange: 'Jun 2026', link: 'https://github.com/manamsriram/SoloLeveling', visible: true },
]
