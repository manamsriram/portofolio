export type TimelineStatus =
  | 'active'
  | 'completed'
  | 'contributed'
  | 'in-progress'
  | 'graduated'
  | 'started'

export type TimelineItem = {
  id: string
  /** groups commits into one continuous branch (e.g. a degree's start+grad share a branch) */
  branch: string
  /** branch this one forks off of; defaults to 'main' (the trunk) */
  parentBranch?: string
  /** "YYYY-MM" */
  start: string
  /** "YYYY-MM"; omit for a single-point commit or a still-open branch (status is open-ended) */
  end?: string
  track: 'education' | 'experience' | 'project'
  title: string
  description: string
  tags?: string[]
  status?: TimelineStatus
  link?: string
  visible: boolean
}

export const timelineItems: TimelineItem[] = [
  { id: 'btech-start', branch: 'btech', start: '2020-08', end: '2024-05', track: 'education', title: 'B.Tech IT · Started', description: 'Prasad V. Potluri Siddhartha Institute of Technology · Vijayawada, India.', status: 'started', visible: true },
  { id: 'btech-grad', branch: 'btech', start: '2024-05', track: 'education', title: 'B.Tech IT · Graduated', description: 'Prasad V. Potluri Siddhartha Institute of Technology · Vijayawada, India. Information Technology.', status: 'graduated', visible: true },

  { id: 'ms-start', branch: 'ms', start: '2024-08', end: '2026-05', track: 'education', title: 'MS Software Engineering · Started', description: 'San Jose State University · San Jose, CA. Coursework: Enterprise Distributed Technologies, Engineering Software Systems, SDN, Virtualization, ML, Mobile Development.', status: 'started', visible: true },
  { id: 'ms-grad', branch: 'ms', start: '2026-05', track: 'education', title: 'MS Software Engineering · Graduated', description: 'San Jose State University · San Jose, CA.', status: 'graduated', visible: true },

  { id: 'mentor-start', branch: 'mentor', parentBranch: 'btech', start: '2023-05', end: '2024-03', track: 'experience', title: 'Student Mentor · SmartInterviews', description: 'Ran 50+ code reviews and sprint-style practice cycles with 100+ students on data structures, algorithms, and backend topics.', status: 'started', visible: true },
  { id: 'mentor-end', branch: 'mentor', parentBranch: 'btech', start: '2024-03', track: 'experience', title: 'Student Mentor · Ended', description: 'SmartInterviews · Wrote and presented curriculum on backend development, RESTful APIs, and scalable system design.', status: 'completed', visible: true },

  { id: 'hotel-management', branch: 'hotel-management', parentBranch: 'btech', start: '2023-03', track: 'project', title: 'Hotel Management System', description: 'Full hotel management website — JSP, HTML, CSS, JavaScript, SQL.', tags: ['Java', 'JSP', 'SQL'], status: 'completed', link: 'https://github.com/manamsriram/Hotel-management-system', visible: true },
  { id: 'liver-disease-predictor', branch: 'liver-disease-predictor', parentBranch: 'btech', start: '2023-11', track: 'project', title: 'Liver Disease Predictor', description: 'Supervised ML model predicting likelihood of liver disease diagnosis from chemical composition features.', tags: ['Python', 'Jupyter', 'scikit-learn'], status: 'completed', link: 'https://github.com/manamsriram/Liver-Disease-Predictor', visible: true },

  { id: 'stock-analyzer-bot', branch: 'stock-analyzer-bot', parentBranch: 'ms', start: '2024-11', track: 'project', title: 'Stock Analyzer Bot', description: 'Early prototype, later revived as EdgeRunner — simple market risk analyzer pulling data from yfinance, Google News, and web scraping to surface investment warnings.', tags: ['Python'], status: 'completed', visible: true },
  { id: 'ai-pdf-reader', branch: 'ai-pdf-reader', parentBranch: 'ms', start: '2024-11', track: 'project', title: 'AI PDF Reader', description: 'Early prototype, later revived as DocSense AI — simple PDF extractor answering questions across three PDFs via a single AI API call fed with vector embeddings and a prompt.', tags: ['Python'], status: 'completed', visible: true },

  { id: 'edgerunner', branch: 'edgerunner', start: '2026-05', track: 'project', title: 'EdgeRunner', description: 'Autonomous trading platform — picked back up from the 2024 Stock Analyzer Bot prototype and rebuilt into a FastAPI backend, React 19 dashboard, backtested quant strategies, 8-check risk gate, 241 offline pytest tests.', tags: ['Python', 'FastAPI', 'React 19', 'TypeScript', 'PostgreSQL'], status: 'active', link: 'https://github.com/manamsriram/EdgeRunner', visible: true },
  { id: 'docsense', branch: 'docsense', start: '2026-05', track: 'project', title: 'DocSense AI', description: 'Agentic RAG document platform — picked back up from the 2024 AI PDF Reader prototype and rebuilt into multi-stage retrieval with dense vectors, BM25, RRF fusion, cross-encoder reranking. Three-tier Redis cache, Corrective RAG loop.', tags: ['Python', 'Flask', 'Qdrant', 'Redis', 'Docker'], status: 'active', link: 'https://github.com/manamsriram/DocSense-AI', visible: true },
  { id: 'image-style-transfer', branch: 'image-style-transfer', parentBranch: 'btech', start: '2024-01', end: '2024-04', track: 'project', title: 'Image Style Transfer', description: 'Neural style transfer experiments — exploring and extending existing image style transfer techniques.', tags: ['Python', 'Jupyter', 'PyTorch'], status: 'completed', link: 'https://github.com/manamsriram/Image_Style_Transfer', visible: true },

  { id: 'restaurant-finder-build', branch: 'restaurant-finder', parentBranch: 'ms', start: '2024-09', end: '2024-12', track: 'project', title: 'Restaurant Finder', description: 'Full-stack restaurant discovery — React 18 SPA + FastAPI/SQLAlchemy REST API, ZIP-code search, owner dashboards, JWT roles, GitHub Actions CI, AWS EC2/RDS.', tags: ['React 18', 'Python', 'FastAPI', 'MySQL', 'AWS'], status: 'completed', link: 'https://github.com/manamsriram/Restaurant-Finder-Application', visible: true },
  { id: 'restaurant-finder-revamp', branch: 'restaurant-finder-revamp', parentBranch: 'ms', start: '2026-05', track: 'project', title: 'Restaurant Finder · UI & DB Revamp', description: 'Revisited the app for a full UI and database overhaul.', tags: ['React 18', 'Python', 'FastAPI', 'MySQL', 'AWS'], status: 'completed', link: 'https://github.com/manamsriram/Restaurant-Finder-Application', visible: true },
  { id: 'baby-hypervisor', branch: 'baby-hypervisor', parentBranch: 'ms', start: '2025-10', track: 'project', title: 'baby_hypervisor', description: 'Hypervisor with basic operational capabilities built in C++ from scratch.', tags: ['C++', 'Systems'], status: 'completed', link: 'https://github.com/manamsriram/baby_hypervisor', visible: true },
  { id: 'smart-grocery', branch: 'smart-grocery', parentBranch: 'ms', start: '2025-09', end: '2025-12', track: 'project', title: 'Smart Grocery Assistant', description: 'Cross-platform mobile app — React Native + Expo, Firebase Firestore real-time sync, pantry expiry tracking, recipe discovery from available ingredients.', tags: ['React Native', 'TypeScript', 'Expo', 'Firebase'], status: 'completed', link: 'https://github.com/manamsriram/Smart-Grocery-Assistant', visible: true },
  { id: 'sdn-load-balancer', branch: 'sdn-load-balancer', parentBranch: 'ms', start: '2025-10', end: '2025-12', track: 'project', title: 'SDN Load Balancer', description: 'Load balancer using Software Defined Networks and Network Functions Virtualization. SJSU CMPE 275 coursework.', tags: ['Python', 'SDN', 'NFV'], status: 'completed', link: 'https://github.com/manamsriram/load_balancer', visible: true },

  { id: 'pic-standard', branch: 'pic-standard', parentBranch: 'ms', start: '2026-02', end: '2026-03', track: 'project', title: 'PIC Standard', description: 'Open-source contributor — Dockerized HTTP bridge for agentic provenance services, audit-logging middleware, X-Request-ID tracing, version endpoints in PIC SDK.', tags: ['TypeScript', 'Python', 'Docker', 'Observability'], status: 'contributed', link: 'https://github.com/manamsriram/pic-standard', visible: true },

  { id: 'lessgo', branch: 'lessgo', start: '2025-08', end: '2026-06', track: 'project', title: 'LessGo – Campus Ridesharing', description: 'Full-stack ridesharing, masters project — 8 Node.js/TS microservices, SwiftUI iOS, live driver tracking, in-app chat, Stripe payments, 3-stage Python matching pipeline using graph embeddings and PostGIS.', tags: ['TypeScript', 'Swift/SwiftUI', 'Node.js', 'PostgreSQL'], status: 'completed', link: 'https://github.com/manamsriram/SJSU_Ridesharing', visible: true },
  { id: 'solo-leveling', branch: 'solo-leveling', start: '2026-06', track: 'project', title: 'SoloLeveling', description: 'Personal task tracking application.', tags: ['TypeScript'], status: 'in-progress', link: 'https://github.com/manamsriram/SoloLeveling', visible: true },
]
