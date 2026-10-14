import { CareerPathDetail, Job, JobMatchScore, LearningRoadmap, SkillGapAnalysis, UserProfile, InterviewQuestion } from '../types';

export const defaultUserProfile: UserProfile = {
  id: 'user_alex_chen',
  fullName: 'Alex Chen',
  email: 'alex.chen@university.edu',
  degree: 'Bachelor of Science',
  department: 'Artificial Intelligence & Data Science',
  graduationYear: 2026,
  experienceLevel: 'Final-Year Student / Entry-Level',
  profileCompletion: 92,
  preferredRoles: ['AI Engineer', 'Data Scientist', 'Machine Learning Engineer'],
  preferredLocations: ['Remote', 'Bangalore', 'Hyderabad', 'Hybrid'],
  technicalSkills: [
    'Python', 'PyTorch', 'TensorFlow', 'SQL', 'Pandas',
    'Scikit-Learn', 'FastAPI', 'Docker', 'Git', 'LangChain'
  ],
  softSkills: [
    'Problem Solving', 'Critical Thinking', 'Technical Writing', 'Team Collaboration'
  ],
  bio: 'Final-year B.Sc Computer Science (AI & DS) student passionate about modern foundation models, scalable data intelligence, and autonomous AI agents.',
  projects: [
    {
      id: 'p1',
      title: 'Multimodal Sentiment Analysis Engine',
      description: 'Trained a dual-stream BERT text and ResNet vision model with 91.4% classification accuracy.',
      techStack: ['Python', 'PyTorch', 'Hugging Face', 'FastAPI'],
      link: 'github.com/alexchen/multimodal-sentiment'
    },
    {
      id: 'p2',
      title: 'Document Q&A RAG Knowledge Pipeline',
      description: 'Built a Retrieval-Augmented Generation pipeline using LangChain, ChromaDB, and Gemini API.',
      techStack: ['LangChain', 'Gemini API', 'ChromaDB', 'Python'],
      link: 'github.com/alexchen/rag-doc-pilot'
    }
  ],
  internships: [
    {
      id: 'e1',
      role: 'AI/ML Engineering Intern',
      organization: 'CognitiveTech Labs',
      duration: 'May 2025 - Aug 2025 (4 mos)',
      highlights: 'Optimized model inference latency by 35% through ONNX runtime quantization and TensorRT conversion.'
    }
  ]
};

export const careerPaths: CareerPathDetail[] = [
  {
    id: 'ai_engineer',
    title: 'AI Engineer',
    category: 'Artificial Intelligence',
    shortDescription: 'Design, integrate, and deploy production AI solutions using LLMs, deep learning models, and modern inference pipelines.',
    averageSalary: '$115,000 - $165,000 / ₹14 - 28 LPA',
    growthRate: '+34% (Extremely High)',
    typicalResponsibilities: [
      'Fine-tune and deploy foundation models (Gemini, Llama) with LoRA/QLoRA.',
      'Construct Retrieval-Augmented Generation (RAG) pipelines with vector databases.',
      'Optimize model latency, GPU memory footprint, and API token spend.',
      'Implement safety guardrails, prompt evaluation, and CI/CD for AI services.'
    ],
    essentialSkills: ['Python', 'LangChain', 'Vector DBs (Chroma/Pinecone)', 'PyTorch', 'FastAPI', 'Prompt Engineering', 'Docker'],
    portfolioProjects: [
      'Production RAG system over technical documentation with citation validation',
      'Autonomous multi-agent research workflow using LangGraph',
      'Fine-tuned domain model for automated code summarization'
    ],
    recommendedCertifications: ['DeepLearning.AI Generative AI Specialization', 'Google Cloud Professional ML Engineer']
  },
  {
    id: 'data_scientist',
    title: 'Data Scientist',
    category: 'Data & Analytics',
    shortDescription: 'Extract actionable business intelligence, build predictive models, and conduct statistical experiments to drive product decisions.',
    averageSalary: '$110,000 - $155,000 / ₹12 - 24 LPA',
    growthRate: '+28% (Very High)',
    typicalResponsibilities: [
      'Perform exploratory data analysis and feature engineering on massive tabular datasets.',
      'Train supervised and unsupervised machine learning algorithms (XGBoost, Random Forests).',
      'Formulate and evaluate A/B experiments to measure feature adoption.',
      'Present statistical findings to product stakeholders via clear dashboards.'
    ],
    essentialSkills: ['Python', 'SQL', 'Pandas', 'Scikit-Learn', 'Statistics & Probability', 'Tableau/PowerBI', 'A/B Testing'],
    portfolioProjects: [
      'Customer Churn Prediction with SHAP explainability dashboard',
      'E-Commerce Recommender System using collaborative filtering',
      'Time-Series Sales Forecasting pipeline with Prophet & XGBoost'
    ],
    recommendedCertifications: ['IBM Data Science Professional Certificate', 'AWS Certified Machine Learning']
  },
  {
    id: 'ml_engineer',
    title: 'Machine Learning Engineer',
    category: 'Machine Learning & MLOps',
    shortDescription: 'Bridge data science and software engineering by building robust training pipelines and scalable ML infrastructure.',
    averageSalary: '$120,000 - $170,000 / ₹15 - 30 LPA',
    growthRate: '+32% (Extremely High)',
    typicalResponsibilities: [
      'Build end-to-end MLOps pipelines using MLflow, Kubeflow, or Vertex AI.',
      'Serve low-latency model inference endpoints with Triton or TorchServe.',
      'Implement continuous retraining and data drift detection mechanisms.',
      'Ensure reproducible training runs and dataset version control.'
    ],
    essentialSkills: ['Python', 'PyTorch/TensorFlow', 'MLflow', 'Docker', 'Kubernetes', 'Linux', 'CI/CD', 'ONNX'],
    portfolioProjects: [
      'End-to-end MLOps pipeline with model registry and automated Canary deployment',
      'Real-time Computer Vision defect detection system on edge device',
      'Feature Store implementation with Feast and Redis'
    ],
    recommendedCertifications: ['TensorFlow Developer Certificate', 'Google Cloud ML Engineer']
  },
  {
    id: 'fullstack_dev',
    title: 'Full-Stack Developer',
    category: 'Software Engineering',
    shortDescription: 'Architect and deliver complete web platforms from polished user interfaces to high-throughput backend services and databases.',
    averageSalary: '$100,000 - $145,000 / ₹10 - 22 LPA',
    growthRate: '+22% (High)',
    typicalResponsibilities: [
      'Build reactive, accessible front-ends with React, TypeScript, and Tailwind CSS.',
      'Design RESTful and GraphQL APIs with Node.js, Go, or Python.',
      'Model relational databases (PostgreSQL) with indexing and migrations.',
      'Deploy applications onto cloud providers with automated CI/CD pipelines.'
    ],
    essentialSkills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Git', 'REST APIs'],
    portfolioProjects: [
      'SaaS Multi-tenant Dashboard with Stripe billing and Supabase Auth',
      'Real-time Collaborative Whiteboard with WebSockets and Canvas',
      'E-commerce API with Redis caching and JWT authentication'
    ],
    recommendedCertifications: ['Meta Front-End & Back-End Professional Certificates', 'AWS Certified Developer Associate']
  },
  {
    id: 'frontend_dev',
    title: 'Frontend Developer',
    category: 'Software Engineering',
    shortDescription: 'Craft high-performance, accessible, and intuitive user interfaces for modern web and mobile applications.',
    averageSalary: '$95,000 - $135,000 / ₹9 - 18 LPA',
    growthRate: '+18% (Steady)',
    typicalResponsibilities: [
      'Translate Figma wireframes into pixel-perfect responsive components.',
      'Manage complex client-side state, caching, and optimistic updates.',
      'Optimize Core Web Vitals, asset loading, and runtime rendering performance.',
      'Ensure compliance with WCAG 2.1 accessibility standards.'
    ],
    essentialSkills: ['JavaScript/TypeScript', 'React', 'Next.js', 'CSS/Tailwind', 'HTML5', 'Jest/Cypress', 'Web Vitals'],
    portfolioProjects: [
      'High-performance E-commerce storefront with dynamic filtering and micro-animations',
      'Interactive Data Visualization Dashboard using D3.js and Recharts',
      'Custom Headless CMS Component Library published to NPM'
    ],
    recommendedCertifications: ['Meta Front-End Developer Certificate']
  },
  {
    id: 'backend_dev',
    title: 'Backend Developer',
    category: 'Software Engineering',
    shortDescription: 'Develop the engine powering modern systems: server architecture, database schemas, queues, security, and external integrations.',
    averageSalary: '$105,000 - $150,000 / ₹11 - 22 LPA',
    growthRate: '+20% (High)',
    typicalResponsibilities: [
      'Engineer distributed services with clear separation of concerns.',
      'Optimize database queries, execution plans, and caching strategies.',
      'Enforce authentication, authorization (RBAC), and data encryption standards.',
      'Handle asynchronous task processing with RabbitMQ, Kafka, or Celery.'
    ],
    essentialSkills: ['Python/Go/Java', 'PostgreSQL', 'Redis', 'Docker', 'REST/gRPC', 'System Design', 'Kafka'],
    portfolioProjects: [
      'High-concurrency URL shortener with rate limiting and analytics queue',
      'FinTech transaction ledger with ACID compliance and idempotency keys',
      'Distributed task scheduler with dead-letter queue handling'
    ],
    recommendedCertifications: ['AWS Certified Developer Associate']
  },
  {
    id: 'python_dev',
    title: 'Python Developer',
    category: 'Software & Automation',
    shortDescription: 'Leverage Python for web backends, automation scripts, data extraction, microservices, and AI integrations.',
    averageSalary: '$95,000 - $140,000 / ₹9 - 20 LPA',
    growthRate: '+24% (Very High)',
    typicalResponsibilities: [
      'Develop microservices with FastAPI, Django, or Flask.',
      'Write asynchronous data crawlers and ETL processing pipelines.',
      'Create CLI developer tools and automated unit test suites.',
      'Integrate third-party SaaS APIs and cloud storage solutions.'
    ],
    essentialSkills: ['Python', 'FastAPI', 'Django', 'SQLAlchemy', 'Asyncio', 'Pytest', 'PostgreSQL', 'Docker'],
    portfolioProjects: [
      'Asynchronous Web Scraper & Alerting engine for real estate trends',
      'RESTful API boilerplate with JWT, Pydantic V2 validation, and OpenAPI documentation',
      'Automated Cloud Infrastructure Cost Auditing tool'
    ],
    recommendedCertifications: ['PCEP / PCAP Certified Associate Python Programmer']
  },
  {
    id: 'cloud_engineer',
    title: 'Cloud & DevOps Engineer',
    category: 'Infrastructure & DevOps',
    shortDescription: 'Automate cloud infrastructure, deployment pipelines, container orchestration, and system reliability.',
    averageSalary: '$115,000 - $160,000 / ₹14 - 26 LPA',
    growthRate: '+26% (Very High)',
    typicalResponsibilities: [
      'Author Infrastructure as Code using Terraform or CloudFormation.',
      'Manage Kubernetes clusters, helm charts, and service meshes.',
      'Build continuous integration and delivery pipelines with GitHub Actions.',
      'Implement monitoring, logging, and alerting using Prometheus and Grafana.'
    ],
    essentialSkills: ['AWS/GCP/Azure', 'Terraform', 'Docker', 'Kubernetes', 'Linux', 'GitHub Actions', 'Prometheus'],
    portfolioProjects: [
      'GitOps workflow using ArgoCD and Kubernetes on EKS',
      'Multi-region highly available web architecture automated via Terraform',
      'Zero-downtime Blue/Green deployment pipeline'
    ],
    recommendedCertifications: ['AWS Certified Solutions Architect', 'Certified Kubernetes Administrator (CKA)']
  },
  {
    id: 'data_analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    shortDescription: 'Turn raw commercial data into clear business narratives, KPI dashboards, and data-backed operational decisions.',
    averageSalary: '$80,000 - $115,000 / ₹7 - 15 LPA',
    growthRate: '+18% (Steady)',
    typicalResponsibilities: [
      'Query complex relational databases with advanced SQL (window functions, CTEs).',
      'Construct automated executive dashboards in Power BI or Tableau.',
      'Cleanse messy raw data and document key organizational data definitions.',
      'Present quarterly business reviews with cohort and retention metrics.'
    ],
    essentialSkills: ['SQL', 'Power BI / Tableau', 'Excel (Advanced)', 'Python', 'Data Storytelling', 'Statistics'],
    portfolioProjects: [
      'Executive SaaS Metrics Dashboard (MRR, CAC, LTV, Net Retention)',
      'Supply Chain Inventory Optimization and waste reduction report',
      'User Cohort Retention & Funnel Drop-off Analysis'
    ],
    recommendedCertifications: ['Google Data Analytics Professional Certificate', 'Microsoft Power BI Data Analyst']
  }
];

export const sampleJobs: Job[] = [
  {
    id: 'job_01',
    title: 'Associate AI / ML Engineer',
    company: 'NeuroPath Systems',
    location: 'Bangalore, India (Hybrid)',
    workType: 'Hybrid',
    experienceLevel: 'Entry-Level / Fresher',
    salaryRange: '₹12 - 16 LPA',
    department: 'AI Labs',
    description: 'Seeking a driven AI engineer to help build our next-generation LLM document intelligence and automated workflow platform. Ideal for fresh graduates and final-year CS (AI & DS) students with strong Python and PyTorch foundations.',
    requiredSkills: ['Python', 'PyTorch', 'LangChain', 'SQL', 'FastAPI'],
    preferredSkills: ['Docker', 'ChromaDB', 'Git', 'Hugging Face'],
    responsibilities: [
      'Develop and test RAG pipeline components for enterprise knowledge retrieval.',
      'Evaluate model generation quality using benchmark datasets.',
      'Collaborate with backend engineers to integrate AI endpoints with web frontends.'
    ],
    postedDaysAgo: 2,
    isSaved: false
  },
  {
    id: 'job_02',
    title: 'Junior Data Scientist',
    company: 'Quantis Analytics',
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Entry-Level',
    salaryRange: '$85,000 - $105,000 / ₹10 - 15 LPA',
    department: 'Data Science',
    description: 'Join our international analytics team to develop predictive forecasting models and actionable cohort analysis for consumer internet applications. Strong proficiency in SQL and Python required.',
    requiredSkills: ['Python', 'SQL', 'Pandas', 'Scikit-Learn', 'Statistics & Probability'],
    preferredSkills: ['Tableau/PowerBI', 'Docker', 'Git'],
    responsibilities: [
      'Cleanse, transform, and validate transactional telemetry data.',
      'Develop baseline classification and regression models.',
      'Design reporting dashboards highlighting KPI anomalies.'
    ],
    postedDaysAgo: 3,
    isSaved: true
  },
  {
    id: 'job_03',
    title: 'Full-Stack Software Engineer (React + Python/Node)',
    company: 'AetherCloud Solutions',
    location: 'Hyderabad, India (Hybrid)',
    workType: 'Hybrid',
    experienceLevel: 'Entry-Level / Fresher',
    salaryRange: '₹9 - 14 LPA',
    department: 'Platform Engineering',
    description: 'Looking for a well-rounded software engineer comfortable spanning frontend UI (React, TypeScript) and backend microservices (FastAPI / Node.js). Final year students with substantial portfolio projects encouraged to apply.',
    requiredSkills: ['TypeScript', 'React', 'Python', 'SQL', 'Git'],
    preferredSkills: ['Docker', 'Tailwind CSS', 'FastAPI', 'PostgreSQL'],
    responsibilities: [
      'Implement interactive web components for user workflows.',
      'Design RESTful APIs and database schemas.',
      'Write automated unit tests and participate in code reviews.'
    ],
    postedDaysAgo: 1,
    isSaved: false
  },
  {
    id: 'job_04',
    title: 'AI Research & Development Intern',
    company: 'Horizon AI Research',
    location: 'Pune, India (On-site)',
    workType: 'On-site',
    experienceLevel: 'Internship',
    salaryRange: '₹40,000 - 60,000 / month',
    department: 'Core Research',
    description: 'A 6-month pre-placement internship opportunity for final-year students specializing in AI & Data Science. Work directly with senior scientists on multi-agent collaboration and vision-language architectures.',
    requiredSkills: ['Python', 'PyTorch', 'TensorFlow', 'Math & Linear Algebra'],
    preferredSkills: ['FastAPI', 'Linux', 'Git', 'OpenCV'],
    responsibilities: [
      'Reproduce modern deep learning paper architectures.',
      'Run hyperparameter sweeps across GPU clusters.',
      'Document technical findings for internal lab notes.'
    ],
    postedDaysAgo: 4,
    isSaved: false
  },
  {
    id: 'job_05',
    title: 'Python Backend & AI Integration Engineer',
    company: 'Veloce Mobility',
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Junior (1-2 yrs)',
    salaryRange: '₹14 - 18 LPA',
    department: 'Smart Telematics',
    description: 'Build high-throughput backend services that digest real-time vehicle sensor feeds and run machine learning inference algorithms for predictive maintenance alerts.',
    requiredSkills: ['Python', 'FastAPI', 'SQL', 'Docker', 'Git'],
    preferredSkills: ['Redis', 'PyTorch', 'PostgreSQL', 'Kafka'],
    responsibilities: [
      'Maintain high-availability FastAPI endpoints handling thousands of requests/sec.',
      'Package ML models with ONNX runtime for containerized deployments.',
      'Ensure database query optimizations and caching.'
    ],
    postedDaysAgo: 5,
    isSaved: false
  },
  {
    id: 'job_06',
    title: 'Cloud & MLOps Specialist',
    company: 'StrataScale Cloud',
    location: 'Chennai, India (Hybrid)',
    workType: 'Hybrid',
    experienceLevel: 'Entry-Level',
    salaryRange: '₹11 - 15 LPA',
    department: 'DevOps & Infrastructure',
    description: 'Help automate deployment, containerization, and monitoring of machine learning services in multi-cloud environments.',
    requiredSkills: ['Docker', 'Linux', 'Python', 'Git'],
    preferredSkills: ['Kubernetes', 'AWS/GCP/Azure', 'CI/CD', 'FastAPI'],
    responsibilities: [
      'Write Dockerfiles and Docker-compose orchestration for developer sandboxes.',
      'Configure GitHub Actions CI/CD workflows for automated builds.',
      'Monitor container health and resource utilization.'
    ],
    postedDaysAgo: 6,
    isSaved: false
  }
];

export const benchmarkSkillsByRole: Record<string, string[]> = {
  'AI Engineer': ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'Docker', 'SQL', 'Vector DBs (Chroma/Pinecone)', 'Git', 'Prompt Engineering'],
  'Data Scientist': ['Python', 'SQL', 'Pandas', 'Scikit-Learn', 'Statistics & Probability', 'Tableau/PowerBI', 'Git', 'Machine Learning Algorithms'],
  'Machine Learning Engineer': ['Python', 'PyTorch', 'Docker', 'MLflow', 'Linux', 'SQL', 'Git', 'FastAPI', 'ONNX'],
  'Full-Stack Developer': ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Git', 'REST APIs'],
  'Frontend Developer': ['JavaScript/TypeScript', 'React', 'CSS/Tailwind', 'HTML5', 'Git', 'Jest/Cypress', 'Next.js'],
  'Backend Developer': ['Python', 'PostgreSQL', 'Docker', 'FastAPI', 'Redis', 'Git', 'REST/gRPC', 'Linux'],
  'Python Developer': ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Git', 'Docker', 'Pytest'],
  'Cloud & DevOps Engineer': ['Linux', 'Docker', 'Kubernetes', 'AWS/GCP/Azure', 'Git', 'Python', 'CI/CD', 'Terraform'],
  'Data Analyst': ['SQL', 'Power BI / Tableau', 'Excel (Advanced)', 'Python', 'Pandas', 'Statistics']
};

export const defaultRoadmapAI: LearningRoadmap = {
  id: 'roadmap_ai_ds_1',
  role: 'AI & Data Science Engineer',
  description: 'Structured curriculum tailored for B.Sc Computer Science (AI & DS) graduates aiming for high-impact AI/ML engineering roles.',
  createdAt: Date.now(),
  stages: [
    {
      stageNumber: 1,
      stageTitle: 'Stage 1: Core Mathematical & Python Foundations',
      stageSubtitle: 'Master production Python, linear algebra, vector calculus, and efficient data processing.',
      modules: [
        {
          id: 'm1_1',
          title: 'Python 3.12+ Deep Dive (Async, Generators, Typing)',
          duration: '1-2 Weeks',
          topics: ['Type hinting with Pydantic', 'Asyncio concurrency', 'Context managers & generators', 'Memory optimization'],
          practicalExercise: 'Build a multi-threaded web scraper caching results with async queues.',
          resourceName: 'Real Python Guides',
          resourceUrl: 'https://realpython.com',
          isCompleted: true
        },
        {
          id: 'm1_2',
          title: 'Advanced NumPy, Pandas & Vectorized Math',
          duration: '1-2 Weeks',
          topics: ['Broadcasting rules', 'Memory views vs copies', 'Vectorized matrix transformations', 'Data cleansing pipelines'],
          practicalExercise: 'Implement PCA (Principal Component Analysis) purely using NumPy matrix math.',
          resourceName: 'NumPy Official Docs',
          resourceUrl: 'https://numpy.org/doc',
          isCompleted: true
        },
        {
          id: 'm1_3',
          title: 'Relational Modeling & Advanced SQL',
          duration: '1 Week',
          topics: ['Window functions', 'Common Table Expressions (CTEs)', 'B-tree vs GIN indexing', 'EXPLAIN ANALYZE'],
          practicalExercise: 'Write complex cohort retention queries on a mock 1-million row transaction table.',
          resourceName: 'PostgreSQL Tutorial',
          resourceUrl: 'https://www.postgresqltutorial.com',
          isCompleted: true
        }
      ]
    },
    {
      stageNumber: 2,
      stageTitle: 'Stage 2: Machine Learning & Deep Learning Core',
      stageSubtitle: 'Train, evaluate, and tune classical ML algorithms and deep neural networks using PyTorch.',
      modules: [
        {
          id: 'm2_1',
          title: 'Statistical Machine Learning & Feature Engineering',
          duration: '2-3 Weeks',
          topics: ['Cross-validation strategies', 'Handling class imbalance (SMOTE)', 'Gradient Boosting (XGBoost/LightGBM)', 'SHAP/LIME explainability'],
          practicalExercise: 'Build a loan default risk model and export SHAP feature-importance waterfalls.',
          resourceName: 'Scikit-Learn Guide',
          resourceUrl: 'https://scikit-learn.org',
          isCompleted: true
        },
        {
          id: 'm2_2',
          title: 'PyTorch: Neural Network Architectures from Scratch',
          duration: '3 Weeks',
          topics: ['Autograd engine mechanics', 'Custom Dataset & DataLoader', 'Convolutional & Recurrent blocks', 'Training loop optimization'],
          practicalExercise: 'Implement a custom Transformer self-attention block and train on character-level text generation.',
          resourceName: 'PyTorch Deep Learning',
          resourceUrl: 'https://pytorch.org/tutorials',
          isCompleted: false
        },
        {
          id: 'm2_3',
          title: 'Model Serving & REST APIs with FastAPI',
          duration: '1 Week',
          topics: ['FastAPI dependency injection', 'Pydantic V2 validation', 'Asynchronous endpoints', 'Dockerizing ML containers'],
          practicalExercise: 'Containerize a PyTorch model behind a low-latency FastAPI microservice.',
          resourceName: 'FastAPI Documentation',
          resourceUrl: 'https://fastapi.tiangolo.com',
          isCompleted: false
        }
      ]
    },
    {
      stageNumber: 3,
      stageTitle: 'Stage 3: Generative AI, LLMs & Production MLOps',
      stageSubtitle: 'Master Foundation Models, RAG architectures, Vector DBs, and modern deployment pipelines.',
      modules: [
        {
          id: 'm3_1',
          title: 'Retrieval-Augmented Generation (RAG) Architecture',
          duration: '2 Weeks',
          topics: ['Document chunking strategies', 'Embedding generation (Gemini/OpenAI)', 'Vector search (Chroma/Pinecone)', 'Hybrid search with BM25'],
          practicalExercise: 'Construct a multi-document research assistant answering queries with verifiable source citations.',
          resourceName: 'LangChain Tutorials',
          resourceUrl: 'https://python.langchain.com',
          isCompleted: false
        },
        {
          id: 'm3_2',
          title: 'Fine-Tuning & Quantization (PEFT / LoRA / QLoRA)',
          duration: '2 Weeks',
          topics: ['Instruction tuning datasets', 'LoRA adapters', '4-bit/8-bit quantization (bitsandbytes)', 'Model evaluation frameworks'],
          practicalExercise: 'Fine-tune a lightweight model on custom technical documentation using Google Colab GPUs.',
          resourceName: 'Hugging Face PEFT',
          resourceUrl: 'https://huggingface.co/docs/peft',
          isCompleted: false
        },
        {
          id: 'm3_3',
          title: 'Production Monitoring, Guardrails & Evaluation',
          duration: '1 Week',
          topics: ['Hallucination detection', 'Prompt injection mitigation', 'Latency & token spend tracking', 'CI/CD for AI pipelines'],
          practicalExercise: 'Implement an automated evaluation pipeline running unit tests on LLM responses before delivery.',
          resourceName: 'Google AI Studio Docs',
          resourceUrl: 'https://ai.google.dev',
          isCompleted: false
        }
      ]
    }
  ]
};

export const sampleInterviewQuestions: Record<string, InterviewQuestion[]> = {
  'AI Engineer': [
    {
      id: 'ai_q1',
      question: 'How does a Retrieval-Augmented Generation (RAG) pipeline work, and how would you resolve common failure modes like hallucinations or stale embeddings?',
      category: 'Generative AI & LLMs',
      difficulty: 'Entry-Level / Fresher',
      sampleAnswerHints: [
        'Explain chunking and embedding documents into a vector database.',
        'Describe top-k similarity search combined with prompt construction.',
        'Discuss reranking (Cross-Encoders), hybrid search (dense + sparse), and metadata filtering.'
      ]
    },
    {
      id: 'ai_q2',
      question: 'What is the difference between Fine-Tuning (e.g., LoRA) and In-Context Learning (Prompt Engineering)? When would you choose one over the other?',
      category: 'Model Adaptation',
      difficulty: 'Entry-Level / Fresher',
      sampleAnswerHints: [
        'LoRA updates a small fraction of low-rank matrices in attention layers.',
        'Prompt engineering is zero/few-shot without updating weights.',
        'Choose fine-tuning for style, tone, structured output consistency, or specialized terminology.'
      ]
    },
    {
      id: 'ai_q3',
      question: 'Explain the vanishing and exploding gradient problem in deep neural networks. How do residual connections and batch normalization alleviate this?',
      category: 'Deep Learning Foundations',
      difficulty: 'Entry-Level / Fresher',
      sampleAnswerHints: [
        'Chain rule multiplication through many layers causing gradients to tend to zero or infinity.',
        'ResNet skip connections allow gradients to flow directly back without decay.',
        'Batch norm stabilizes internal covariate shift.'
      ]
    }
  ],
  'Data Scientist': [
    {
      id: 'ds_q1',
      question: 'How do you detect and handle multicollinearity in regression models, and what impact does it have on model interpretability?',
      category: 'Statistical Modeling',
      difficulty: 'Entry-Level',
      sampleAnswerHints: [
        'VIF (Variance Inflation Factor) > 5 or 10.',
        'Causes erratic coefficient estimates and high p-values.',
        'Fix with PCA, L2 (Ridge) regularization, or dropping redundant correlated features.'
      ]
    },
    {
      id: 'ds_q2',
      question: 'Walk me through how you would design an A/B test for a new recommendation algorithm on an e-commerce platform.',
      category: 'Experimentation',
      difficulty: 'Entry-Level',
      sampleAnswerHints: [
        'Define primary metric (conversion rate) and guardrail metric (page latency).',
        'Determine sample size using statistical power analysis (alpha=0.05, power=0.8).',
        'Randomize at user level, check for sample ratio mismatch (SRM).'
      ]
    }
  ],
  'Full-Stack Developer': [
    {
      id: 'fs_q1',
      question: "Explain how React's Virtual DOM reconciliation algorithm works and how proper key assignment optimizes list re-rendering.",
      category: 'Frontend Architecture',
      difficulty: 'Entry-Level',
      sampleAnswerHints: [
        'Fiber tree diffing in O(n) heuristic complexity.',
        'Stable keys identify moved/added/removed items without recreating DOM nodes.',
        'Never use array indices when items can reorder or filter.'
      ]
    },
    {
      id: 'fs_q2',
      question: 'How would you design a secure user authentication system using JWTs and Refresh Tokens? Where should each be stored?',
      category: 'Web Security & APIs',
      difficulty: 'Entry-Level',
      sampleAnswerHints: [
        'Short-lived access token (e.g. 15 min) kept in memory.',
        'Long-lived refresh token stored in an httpOnly, Secure, SameSite cookie.',
        'Rotate refresh tokens upon every exchange to detect reuse attacks.'
      ]
    }
  ]
};

export const sampleResumes = [
  {
    label: 'B.Sc Computer Science (AI & DS) Graduate',
    text: `ALEX CHEN
Email: alex.chen@university.edu | Phone: +91 98765 43210
Portfolio: https://github.com/alexchen | LinkedIn: linkedin.com/in/alexchen-ai

EDUCATION:
B.Sc in Computer Science (Artificial Intelligence & Data Science)
National Institute of Technology | CGPA: 8.9/10.0 | Expected Graduation: May 2026

TECHNICAL SKILLS:
- Programming: Python (Proficient), SQL (Advanced), C++, JavaScript
- AI/ML & Frameworks: PyTorch, TensorFlow, Scikit-Learn, Pandas, NumPy, LangChain
- Data & Storage: PostgreSQL, ChromaDB, SQLite, Redis
- Tools & DevOps: Docker, Git/GitHub, FastAPI, Linux, Postman

FEATURED PROJECTS:
1. Multimodal Sentiment Analysis Engine (PyTorch, Hugging Face, FastAPI)
   - Engineered a dual-stream multimodal neural network fusing BERT text embeddings and ResNet image features.
   - Achieved 91.4% classification accuracy on a 25,000 multimodal review dataset.
   - Packaged model inference inside a containerized FastAPI endpoint with under 80ms latency.

2. Document Q&A RAG Knowledge Pipeline (LangChain, ChromaDB, Gemini API)
   - Implemented semantic document chunking and vector search across 500+ technical PDF manuals.
   - Reduced hallucination rates by 40% through strict citation retrieval and prompt guardrails.
   - Built clean frontend UI for interactive user queries with source highlights.

INTERNSHIPS & EXPERIENCE:
AI/ML Engineering Intern | CognitiveTech Labs (May 2025 - Aug 2025)
- Profiled inference bottlenecks and converted deep learning models to ONNX format, reducing latency by 35%.
- Designed automated validation suites testing data drift across production inference logs.

CERTIFICATIONS & ACHIEVEMENTS:
- DeepLearning.AI Specialization in Machine Learning (Coursera)
- 1st Place Winner - Inter-College Hackathon 2025 (AI Healthcare Track)`
  },
  {
    label: 'Junior Full-Stack Developer',
    text: `PRIYA SHARMA
Email: priya.sharma@techmail.com | GitHub: github.com/priyasharma-dev

EDUCATION:
B.Tech in Computer Science and Engineering | Graduating 2025
State University of Technology | CGPA: 8.4/10.0

SKILLS:
- Frontend: React, TypeScript, Tailwind CSS, HTML5, Next.js, Redux Toolkit
- Backend: Node.js, Express, Python, REST APIs, GraphQL
- Databases: PostgreSQL, MongoDB, Supabase, Redis
- Tools: Git, Docker, Postman, Jest, Vercel

PROJECTS:
1. Cloud Task & Collaboration SaaS
   - Developed multi-tenant task board with drag-and-drop React interface and Supabase backend.
   - Implemented row-level security (RLS) policies ensuring strict workspace data isolation.
2. Real-Time Chat & Notification Service
   - Built WebSocket microservice in Node.js supporting 1,000 concurrent socket connections.`
  }
];

export function calculateJobMatch(user: UserProfile, job: Job): JobMatchScore {
  const userTech = user.technicalSkills.map((s) => s.toLowerCase().trim());
  const matched: string[] = [];
  const missing: string[] = [];

  for (const skill of job.requiredSkills) {
    const sLower = skill.toLowerCase().trim();
    const hasDirect = userTech.some((u) => u.includes(sLower) || sLower.includes(u));
    if (hasDirect) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  }

  const skillRatio = job.requiredSkills.length > 0 ? matched.length / job.requiredSkills.length : 1.0;
  const skillsScore = Math.min(100, Math.max(0, Math.round(skillRatio * 100)));

  const expScore = job.experienceLevel.toLowerCase().includes('entry') || job.experienceLevel.toLowerCase().includes('intern') ? 95 : 70;
  const eduScore = user.department.toLowerCase().includes('intelligence') || user.degree.toLowerCase().includes('science') ? 95 : 75;

  const totalPercentage = Math.min(99, Math.max(15, Math.round(skillsScore * 0.6 + expScore * 0.2 + eduScore * 0.2)));

  let explanation = '';
  if (totalPercentage >= 80) {
    explanation = `Outstanding match! Your ${matched.length} matching skills (${matched.slice(0, 3).join(', ')}) and degree background strongly align with this opening.`;
  } else if (totalPercentage >= 65) {
    explanation = `Solid fit! You meet core requirements (${matched.join(', ')}). Strengthening ${missing.slice(0, 2).join(', ')} will elevate your candidacy.`;
  } else {
    explanation = `Growth opportunity. You have foundation in ${matched.length > 0 ? matched.join(', ') : 'general computing'}, but need to acquire ${missing.slice(0, 3).join(', ')}.`;
  }

  return {
    jobId: job.id,
    percentage: totalPercentage,
    matchedSkills: matched,
    missingSkills: missing,
    skillsScore,
    experienceScore: expScore,
    educationScore: eduScore,
    explanation
  };
}

export function calculateSkillGap(userSkills: string[], targetRole: string): SkillGapAnalysis {
  const benchmark = benchmarkSkillsByRole[targetRole] || ['Python', 'SQL', 'Git', 'Docker', 'Linux'];
  const userLower = userSkills.map((s) => s.toLowerCase().trim());

  const matched: string[] = [];
  const missing: string[] = [];

  for (const skill of benchmark) {
    const sLower = skill.toLowerCase().trim();
    if (userLower.some((u) => u.includes(sLower) || sLower.includes(u))) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  }

  const needsImprovementCount = Math.max(1, Math.floor(matched.length / 3));
  const needsImprovement = matched.slice(-needsImprovementCount);
  const trueMatched = matched.filter((m) => !needsImprovement.includes(m));

  const matchScore = benchmark.length > 0 ? Math.min(95, Math.max(15, Math.round((matched.length / benchmark.length) * 100))) : 70;

  const priorityActions = missing.map((skill, idx) => ({
    skill,
    priority: (idx === 0 ? 'High' : idx === 1 ? 'Medium' : 'Low') as 'High' | 'Medium' | 'Low',
    reason: `Core operational competency expected by technical interviewers for ${targetRole}.`,
    estimatedTimeToLearn: idx === 0 ? '1-2 Weeks' : idx === 1 ? '2-3 Weeks' : '3-4 Weeks'
  }));

  return {
    targetRole,
    userSkills,
    requiredSkills: benchmark,
    matchedSkills: trueMatched,
    needsImprovementSkills: needsImprovement,
    missingSkills: missing,
    matchScore,
    priorityActions,
    recommendedResources: [
      {
        title: `Official ${targetRole} Documentation & Reference`,
        provider: 'Developer Community',
        type: 'Documentation',
        url: 'https://developer.mozilla.org',
        isFree: true
      },
      {
        title: 'Interactive Hands-On Architecture Labs',
        provider: 'Open Source Tutorials',
        type: 'Interactive Tutorial',
        url: 'https://github.com',
        isFree: true
      }
    ],
    recommendedProjects: [
      {
        title: `End-to-End ${targetRole} Production Showcase`,
        description: 'Build and deploy a scalable microservice featuring automated testing, Docker containers, and CI/CD.',
        keySkills: Array.from(new Set([...missing.slice(0, 2), ...matched.slice(0, 2)])),
        complexity: 'Intermediate'
      }
    ]
  };
}
