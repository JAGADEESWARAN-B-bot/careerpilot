package com.example.data

import com.example.model.*

object SampleData {

    val careerPaths = listOf(
        CareerPathDetail(
            id = "ai_engineer",
            title = "AI Engineer",
            category = "Artificial Intelligence",
            shortDescription = "Design, integrate, and deploy production AI solutions using LLMs, deep learning models, and modern inference pipelines.",
            averageSalary = "$115,000 - $165,000 / ₹14 - 28 LPA",
            growthRate = "+34% (Extremely High)",
            typicalResponsibilities = listOf(
                "Fine-tune and deploy open-source and proprietary foundation models (Gemini, Llama).",
                "Construct Retrieval-Augmented Generation (RAG) pipelines with vector databases.",
                "Optimize model latency, GPU memory footprint, and API costs.",
                "Implement guardrails, evaluations, and safety checks for LLM outputs."
            ),
            essentialSkills = listOf("Python", "LangChain", "Vector DBs (Chroma/Pinecone)", "PyTorch", "FastAPI", "Prompt Engineering", "Docker"),
            portfolioProjects = listOf(
                "Production RAG system over proprietary enterprise PDFs with citation tracking",
                "Fine-tuned LoRA adapter for domain-specific code summarization",
                "Autonomous multi-agent research assistant using LangGraph"
            ),
            recommendedCertifications = listOf("DeepLearning.AI Generative AI Specialization", "Google Cloud Professional ML Engineer")
        ),
        CareerPathDetail(
            id = "data_scientist",
            title = "Data Scientist",
            category = "Data & Analytics",
            shortDescription = "Extract actionable intelligence, build predictive models, and conduct statistical experiments to drive product strategy.",
            averageSalary = "$110,000 - $155,000 / ₹12 - 24 LPA",
            growthRate = "+28% (Very High)",
            typicalResponsibilities = listOf(
                "Perform exploratory data analysis and feature engineering on massive tabular datasets.",
                "Train supervised and unsupervised machine learning algorithms (XGBoost, Random Forests).",
                "Formulate and evaluate A/B experiments to measure feature impact.",
                "Communicate statistical findings to product stakeholders via clear dashboards."
            ),
            essentialSkills = listOf("Python", "SQL", "Pandas", "Scikit-Learn", "Statistics & Probability", "Tableau/PowerBI", "A/B Testing"),
            portfolioProjects = listOf(
                "Customer Churn Prediction with SHAP explainability dashboard",
                "E-Commerce Recommender System using collaborative filtering",
                "Time-Series Sales Forecasting pipeline with Prophet & XGBoost"
            ),
            recommendedCertifications = listOf("IBM Data Science Professional Certificate", "AWS Certified Machine Learning")
        ),
        CareerPathDetail(
            id = "ml_engineer",
            title = "Machine Learning Engineer",
            category = "Machine Learning & MLOps",
            shortDescription = "Bridge data science and software engineering by building robust training pipelines and scalable ML infrastructure.",
            averageSalary = "$120,000 - $170,000 / ₹15 - 30 LPA",
            growthRate = "+32% (Extremely High)",
            typicalResponsibilities = listOf(
                "Build end-to-end MLOps pipelines using MLflow, Kubeflow, or Vertex AI.",
                "Serve low-latency model inference endpoints with Triton or TorchServe.",
                "Implement continuous retraining and data drift detection mechanisms.",
                "Ensure reproducible training runs and dataset version control."
            ),
            essentialSkills = listOf("Python", "PyTorch/TensorFlow", "MLflow", "Docker", "Kubernetes", "Linux", "CI/CD", "ONNX"),
            portfolioProjects = listOf(
                "End-to-end MLOps pipeline with model registry and automated Canary deployment",
                "Real-time Computer Vision defect detection system on edge device",
                "Feature Store implementation with Feast and Redis"
            ),
            recommendedCertifications = listOf("TensorFlow Developer Certificate", "Google Cloud ML Engineer")
        ),
        CareerPathDetail(
            id = "fullstack_dev",
            title = "Full-Stack Developer",
            category = "Software Engineering",
            shortDescription = "Architect and deliver complete web platforms from polished user interfaces to high-throughput backend services and databases.",
            averageSalary = "$100,000 - $145,000 / ₹10 - 22 LPA",
            growthRate = "+22% (High)",
            typicalResponsibilities = listOf(
                "Build reactive, accessible front-ends with React, TypeScript, and modern styling.",
                "Design RESTful and GraphQL APIs with Node.js, Go, or Python.",
                "Model relational and document databases with indexing and migrations.",
                "Deploy applications onto cloud providers with automated CI/CD pipelines."
            ),
            essentialSkills = listOf("TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS", "Docker", "Git", "REST APIs"),
            portfolioProjects = listOf(
                "SaaS Multi-tenant Dashboard with Stripe billing and Supabase Auth",
                "Real-time Collaborative Whiteboard with WebSockets and Canvas",
                "E-commerce API with Redis caching and JWT authentication"
            ),
            recommendedCertifications = listOf("Meta Front-End & Back-End Professional Certificates", "AWS Certified Developer Associate")
        ),
        CareerPathDetail(
            id = "frontend_dev",
            title = "Frontend Developer",
            category = "Software Engineering",
            shortDescription = "Craft high-performance, accessible, and intuitive user interfaces for modern web and mobile applications.",
            averageSalary = "$95,000 - $135,000 / ₹9 - 18 LPA",
            growthRate = "+18% (Steady)",
            typicalResponsibilities = listOf(
                "Translate Figma wireframes into pixel-perfect responsive components.",
                "Manage complex client-side state, caching, and optimistic updates.",
                "Optimize Core Web Vitals, asset loading, and runtime rendering performance.",
                "Ensure compliance with WCAG 2.1 accessibility standards."
            ),
            essentialSkills = listOf("JavaScript/TypeScript", "React", "Next.js", "CSS/Tailwind", "HTML5", "Jest/Cypress", "Web Vitals"),
            portfolioProjects = listOf(
                "High-performance E-commerce storefront with dynamic filtering and micro-animations",
                "Interactive Data Visualization Dashboard using D3.js and Recharts",
                "Custom Headless CMS Component Library published to NPM"
            ),
            recommendedCertifications = listOf("Meta Front-End Developer Certificate")
        ),
        CareerPathDetail(
            id = "backend_dev",
            title = "Backend Developer",
            category = "Software Engineering",
            shortDescription = "Develop the engine powering modern systems: server architecture, database schemas, queues, security, and external integrations.",
            averageSalary = "$105,000 - $150,000 / ₹11 - 22 LPA",
            growthRate = "+20% (High)",
            typicalResponsibilities = listOf(
                "Engineer distributed services with clear separation of concerns.",
                "Optimize database queries, execution plans, and caching strategies.",
                "Enforce authentication, authorization (RBAC), and data encryption standards.",
                "Handle asynchronous task processing with RabbitMQ, Kafka, or Celery."
            ),
            essentialSkills = listOf("Python/Go/Java", "PostgreSQL", "Redis", "Docker", "REST/gRPC", "System Design", "Kafka"),
            portfolioProjects = listOf(
                "High-concurrency URL shortener with rate limiting and analytics queue",
                "FinTech transaction ledger with ACID compliance and idempotency keys",
                "Distributed task scheduler with dead-letter queue handling"
            ),
            recommendedCertifications = listOf("AWS Certified Developer Associate")
        ),
        CareerPathDetail(
            id = "python_dev",
            title = "Python Developer",
            category = "Software & Automation",
            shortDescription = "Leverage Python for web backends, automation scripts, data extraction, microservices, and AI integrations.",
            averageSalary = "$95,000 - $140,000 / ₹9 - 20 LPA",
            growthRate = "+24% (Very High)",
            typicalResponsibilities = listOf(
                "Develop microservices with FastAPI, Django, or Flask.",
                "Write asynchronous data crawlers and ETL processing pipelines.",
                "Create CLI developer tools and automated unit test suites.",
                "Integrate third-party SaaS APIs and cloud storage solutions."
            ),
            essentialSkills = listOf("Python", "FastAPI", "Django", "SQLAlchemy", "Asyncio", "Pytest", "PostgreSQL", "Docker"),
            portfolioProjects = listOf(
                "Asynchronous Web Scraper & Alerting engine for real estate trends",
                "RESTful API boilerplate with JWT, Pydantic V2 validation, and OpenAPI documentation",
                "Automated Cloud Infrastructure Cost Auditing tool"
            ),
            recommendedCertifications = listOf("PCEP / PCAP Certified Associate Python Programmer")
        ),
        CareerPathDetail(
            id = "cloud_engineer",
            title = "Cloud & DevOps Engineer",
            category = "Infrastructure & DevOps",
            shortDescription = "Automate cloud infrastructure, deployment pipelines, container orchestration, and system reliability.",
            averageSalary = "$115,000 - $160,000 / ₹14 - 26 LPA",
            growthRate = "+26% (Very High)",
            typicalResponsibilities = listOf(
                "Author Infrastructure as Code using Terraform or CloudFormation.",
                "Manage Kubernetes clusters, helm charts, and service meshes.",
                "Build continuous integration and delivery pipelines with GitHub Actions.",
                "Implement monitoring, logging, and alerting using Prometheus and Grafana."
            ),
            essentialSkills = listOf("AWS/GCP/Azure", "Terraform", "Docker", "Kubernetes", "Linux", "GitHub Actions", "Prometheus"),
            portfolioProjects = listOf(
                "GitOps workflow using ArgoCD and Kubernetes on EKS",
                "Multi-region highly available web architecture automated via Terraform",
                "Zero-downtime Blue/Green deployment pipeline"
            ),
            recommendedCertifications = listOf("AWS Certified Solutions Architect", "Certified Kubernetes Administrator (CKA)")
        ),
        CareerPathDetail(
            id = "data_analyst",
            title = "Data Analyst",
            category = "Data & Analytics",
            shortDescription = "Turn raw commercial data into clear business narratives, KPI dashboards, and data-backed operational decisions.",
            averageSalary = "$80,000 - $115,000 / ₹7 - 15 LPA",
            growthRate = "+18% (Steady)",
            typicalResponsibilities = listOf(
                "Query complex relational databases with advanced SQL (window functions, CTEs).",
                "Construct automated executive dashboards in Power BI or Tableau.",
                "Cleanse messy raw data and document key organizational data definitions.",
                "Present quarterly business reviews with cohort and retention metrics."
            ),
            essentialSkills = listOf("SQL", "Power BI / Tableau", "Excel (Advanced)", "Python", "Data Storytelling", "Statistics"),
            portfolioProjects = listOf(
                "Executive SaaS Metrics Dashboard (MRR, CAC, LTV, Net Retention)",
                "Supply Chain Inventory Optimization and waste reduction report",
                "User Cohort Retention & Funnel Drop-off Analysis"
            ),
            recommendedCertifications = listOf("Google Data Analytics Professional Certificate", "Microsoft Power BI Data Analyst")
        )
    )

    val sampleJobs = listOf(
        Job(
            id = "job_01",
            title = "Associate AI / ML Engineer",
            company = "NeuroPath Systems",
            location = "Bangalore, India (Hybrid)",
            workType = "Hybrid",
            experienceLevel = "Entry-Level",
            salaryRange = "₹12 - 16 LPA",
            department = "AI Labs",
            description = "Seeking a driven AI engineer to help build our next-generation LLM document intelligence and automated workflow platform. Ideal for fresh graduates and final-year CS (AI & DS) students with strong Python and PyTorch foundations.",
            requiredSkills = listOf("Python", "PyTorch", "LangChain", "SQL", "FastAPI"),
            preferredSkills = listOf("Docker", "ChromaDB", "Git", "Hugging Face"),
            responsibilities = listOf(
                "Develop and test RAG pipeline components for enterprise knowledge retrieval.",
                "Evaluate model generation quality using benchmark datasets.",
                "Collaborate with backend engineers to integrate AI endpoints with web frontends."
            ),
            postedDaysAgo = 2
        ),
        Job(
            id = "job_02",
            title = "Junior Data Scientist",
            company = "Quantis Analytics",
            location = "Remote",
            workType = "Remote",
            experienceLevel = "Entry-Level",
            salaryRange = "$85,000 - $105,000 / ₹10 - 15 LPA",
            department = "Data Science",
            description = "Join our international analytics team to develop predictive forecasting models and actionable cohort analysis for consumer internet applications. Strong proficiency in SQL and Python required.",
            requiredSkills = listOf("Python", "SQL", "Pandas", "Scikit-Learn", "Statistics & Probability"),
            preferredSkills = listOf("Tableau/PowerBI", "Docker", "Git"),
            responsibilities = listOf(
                "Cleanse, transform, and validate transactional telemetry data.",
                "Develop baseline classification and regression models.",
                "Design reporting dashboards highlighting KPI anomalies."
            ),
            postedDaysAgo = 3
        ),
        Job(
            id = "job_03",
            title = "Full-Stack Software Engineer (React + Node/Python)",
            company = "AetherCloud Solutions",
            location = "Hyderabad, India (Hybrid)",
            workType = "Hybrid",
            experienceLevel = "Entry-Level / Fresher",
            salaryRange = "₹9 - 14 LPA",
            department = "Platform Engineering",
            description = "Looking for a well-rounded software engineer comfortable spanning frontend UI (React, TypeScript) and backend microservices (FastAPI / Node.js). Final year students with substantial portfolio projects encouraged to apply.",
            requiredSkills = listOf("TypeScript", "React", "Python", "SQL", "Git"),
            preferredSkills = listOf("Docker", "Tailwind CSS", "FastAPI", "PostgreSQL"),
            responsibilities = listOf(
                "Implement interactive web components for user workflows.",
                "Design RESTful APIs and database schemas.",
                "Write automated unit tests and participate in code reviews."
            ),
            postedDaysAgo = 1
        ),
        Job(
            id = "job_04",
            title = "AI Research & Development Intern",
            company = "Horizon AI Research",
            location = "Pune, India (On-site)",
            workType = "On-site",
            experienceLevel = "Internship",
            salaryRange = "₹40,000 - 60,000 / month",
            department = "Core Research",
            description = "A 6-month pre-placement internship opportunity for final-year students specializing in AI & Data Science. Work directly with senior scientists on multi-agent collaboration and vision-language architectures.",
            requiredSkills = listOf("Python", "PyTorch", "TensorFlow", "Math & Linear Algebra"),
            preferredSkills = listOf("FastAPI", "Linux", "Git", "OpenCV"),
            responsibilities = listOf(
                "Reproduce modern deep learning paper architectures.",
                "Run hyperparameter sweeps across GPU clusters.",
                "Document technical findings for internal lab notes."
            ),
            postedDaysAgo = 4
        ),
        Job(
            id = "job_05",
            title = "Python Backend & AI Integration Engineer",
            company = "Veloce Mobility",
            location = "Remote",
            workType = "Remote",
            experienceLevel = "Junior (1-2 yrs)",
            salaryRange = "₹14 - 18 LPA",
            department = "Smart Telematics",
            description = "Build high-throughput backend services that digest real-time vehicle sensor feeds and run machine learning inference algorithms for predictive maintenance alerts.",
            requiredSkills = listOf("Python", "FastAPI", "SQL", "Docker", "Git"),
            preferredSkills = listOf("Redis", "PyTorch", "PostgreSQL", "Kafka"),
            responsibilities = listOf(
                "Maintain high-availability FastAPI endpoints handling thousands of requests/sec.",
                "Package ML models with ONNX runtime for containerized deployments.",
                "Ensure database query optimizations and caching."
            ),
            postedDaysAgo = 5
        ),
        Job(
            id = "job_06",
            title = "Cloud & MLOps Specialist",
            company = "StrataScale Cloud",
            location = "Chennai, India (Hybrid)",
            workType = "Hybrid",
            experienceLevel = "Entry-Level",
            salaryRange = "₹11 - 15 LPA",
            department = "DevOps & Infrastructure",
            description = "Help automate deployment, containerization, and monitoring of machine learning services in multi-cloud environments.",
            requiredSkills = listOf("Docker", "Linux", "Python", "Git"),
            preferredSkills = listOf("Kubernetes", "AWS/GCP/Azure", "CI/CD", "FastAPI"),
            responsibilities = listOf(
                "Write Dockerfiles and Docker-compose orchestration for developer sandboxes.",
                "Configure GitHub Actions CI/CD workflows for automated builds.",
                "Monitor container health and resource utilization."
            ),
            postedDaysAgo = 6
        )
    )

    val benchmarkSkillsByRole = mapOf(
        "AI Engineer" to listOf(
            "Python", "PyTorch", "LangChain", "FastAPI", "Docker",
            "SQL", "Vector DBs (Chroma/Pinecone)", "Git", "Prompt Engineering"
        ),
        "Data Scientist" to listOf(
            "Python", "SQL", "Pandas", "Scikit-Learn", "Statistics & Probability",
            "Tableau/PowerBI", "Git", "Machine Learning Algorithms"
        ),
        "Machine Learning Engineer" to listOf(
            "Python", "PyTorch", "Docker", "MLflow", "Linux",
            "SQL", "Git", "FastAPI", "ONNX"
        ),
        "Full-Stack Developer" to listOf(
            "TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS",
            "Docker", "Git", "REST APIs"
        ),
        "Frontend Developer" to listOf(
            "JavaScript/TypeScript", "React", "CSS/Tailwind", "HTML5",
            "Git", "Jest/Cypress", "Next.js"
        ),
        "Backend Developer" to listOf(
            "Python", "PostgreSQL", "Docker", "FastAPI", "Redis",
            "Git", "REST/gRPC", "Linux"
        ),
        "Python Developer" to listOf(
            "Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Git",
            "Docker", "Pytest"
        ),
        "Cloud & DevOps Engineer" to listOf(
            "Linux", "Docker", "Kubernetes", "AWS/GCP/Azure", "Git",
            "Python", "CI/CD", "Terraform"
        ),
        "Data Analyst" to listOf(
            "SQL", "Power BI / Tableau", "Excel (Advanced)", "Python",
            "Pandas", "Statistics"
        )
    )

    val defaultRoadmapAI = LearningRoadmap(
        id = "roadmap_ai_ds_1",
        role = "AI & Data Science Engineer",
        description = "Curated curriculum tailored for B.Sc Computer Science (AI & DS) graduates aiming for high-impact AI/ML engineering roles.",
        stages = listOf(
            RoadmapStage(
                stageNumber = 1,
                stageTitle = "Stage 1: Core Mathematical & Python Foundations",
                stageSubtitle = "Master production Python, linear algebra, vector calculus, and efficient data processing.",
                modules = listOf(
                    RoadmapModule(
                        id = "m1_1",
                        title = "Python 3.12+ Deep Dive (Async, Generators, Typing)",
                        duration = "1-2 Weeks",
                        topics = listOf("Type hinting with Pydantic", "Asyncio concurrency", "Context managers & generators", "Memory optimization"),
                        practicalExercise = "Build a multi-threaded web scraper caching results with async queues.",
                        resourceName = "Real Python Guides",
                        resourceUrl = "https://realpython.com",
                        isCompleted = true
                    ),
                    RoadmapModule(
                        id = "m1_2",
                        title = "Advanced NumPy, Pandas & Vectorized Math",
                        duration = "1-2 Weeks",
                        topics = listOf("Broadcasting rules", "Memory views vs copies", "Vectorized matrix transformations", "Data cleansing pipelines"),
                        practicalExercise = "Implement PCA (Principal Component Analysis) purely using NumPy matrix math.",
                        resourceName = "NumPy Official Docs",
                        resourceUrl = "https://numpy.org/doc",
                        isCompleted = true
                    ),
                    RoadmapModule(
                        id = "m1_3",
                        title = "Relational Modeling & Advanced SQL",
                        duration = "1 Week",
                        topics = listOf("Window functions", "Common Table Expressions (CTEs)", "B-tree vs GIN indexing", "EXPLAIN ANALYZE"),
                        practicalExercise = "Write complex cohort retention queries on a mock 1-million row transaction table.",
                        resourceName = "PostgreSQL Tutorial",
                        resourceUrl = "https://www.postgresqltutorial.com",
                        isCompleted = true
                    )
                )
            ),
            RoadmapStage(
                stageNumber = 2,
                stageTitle = "Stage 2: Machine Learning & Deep Learning Core",
                stageSubtitle = "Train, evaluate, and tune classical ML algorithms and deep neural networks using PyTorch.",
                modules = listOf(
                    RoadmapModule(
                        id = "m2_1",
                        title = "Statistical Machine Learning & Feature Engineering",
                        duration = "2-3 Weeks",
                        topics = listOf("Cross-validation strategies", "Handling class imbalance (SMOTE)", "Gradient Boosting (XGBoost/LightGBM)", "SHAP/LIME explainability"),
                        practicalExercise = "Build a loan default risk model and export SHAP feature-importance waterfalls.",
                        resourceName = "Scikit-Learn Guide",
                        resourceUrl = "https://scikit-learn.org",
                        isCompleted = true
                    ),
                    RoadmapModule(
                        id = "m2_2",
                        title = "PyTorch: Neural Network Architectures from Scratch",
                        duration = "3 Weeks",
                        topics = listOf("Autograd engine mechanics", "Custom Dataset & DataLoader", "Convolutional & Recurrent blocks", "Training loop optimization"),
                        practicalExercise = "Implement a custom Transformer self-attention block and train on character-level text generation.",
                        resourceName = "PyTorch Deep Learning",
                        resourceUrl = "https://pytorch.org/tutorials",
                        isCompleted = false
                    ),
                    RoadmapModule(
                        id = "m2_3",
                        title = "Model Serving & REST APIs with FastAPI",
                        duration = "1 Week",
                        topics = listOf("FastAPI dependency injection", "Pydantic V2 validation", "Asynchronous endpoints", "Dockerizing ML containers"),
                        practicalExercise = "Containerize a PyTorch model behind a low-latency FastAPI microservice.",
                        resourceName = "FastAPI Documentation",
                        resourceUrl = "https://fastapi.tiangolo.com",
                        isCompleted = false
                    )
                )
            ),
            RoadmapStage(
                stageNumber = 3,
                stageTitle = "Stage 3: Generative AI, LLMs & Production MLOps",
                stageSubtitle = "Master Foundation Models, RAG architectures, Vector DBs, and modern deployment pipelines.",
                modules = listOf(
                    RoadmapModule(
                        id = "m3_1",
                        title = "Retrieval-Augmented Generation (RAG) Architecture",
                        duration = "2 Weeks",
                        topics = listOf("Document chunking strategies", "Embedding generation (Gemini/OpenAI)", "Vector search (Chroma/Pinecone)", "Hybrid search with BM25"),
                        practicalExercise = "Construct a multi-document research assistant answering queries with verifiable source citations.",
                        resourceName = "LangChain Tutorials",
                        resourceUrl = "https://python.langchain.com",
                        isCompleted = false
                    ),
                    RoadmapModule(
                        id = "m3_2",
                        title = "Fine-Tuning & Quantization (PEFT / LoRA / QLoRA)",
                        duration = "2 Weeks",
                        topics = listOf("Instruction tuning datasets", "LoRA adapters", "4-bit/8-bit quantization (bitsandbytes)", "Model evaluation frameworks"),
                        practicalExercise = "Fine-tune a lightweight model on custom technical documentation using Google Colab GPUs.",
                        resourceName = "Hugging Face PEFT",
                        resourceUrl = "https://huggingface.co/docs/peft",
                        isCompleted = false
                    ),
                    RoadmapModule(
                        id = "m3_3",
                        title = "Production Monitoring, Guardrails & Evaluation",
                        duration = "1 Week",
                        topics = listOf("Hallucination detection", "Prompt injection mitigation", "Latency & token spend tracking", "CI/CD for AI pipelines"),
                        practicalExercise = "Implement an automated evaluation pipeline running unit tests on LLM responses before user delivery.",
                        resourceName = "Google AI Studio Docs",
                        resourceUrl = "https://ai.google.dev",
                        isCompleted = false
                    )
                )
            )
        )
    )

    val sampleInterviewQuestions = mapOf(
        "AI Engineer" to listOf(
            InterviewQuestion(
                id = "ai_q1",
                question = "How does a Retrieval-Augmented Generation (RAG) pipeline work, and how would you resolve common failure modes like hallucinations or stale embeddings?",
                category = "Generative AI & LLMs",
                difficulty = "Entry-Level / Fresher",
                sampleAnswerHints = listOf(
                    "Explain chunking and embedding documents into a vector database.",
                    "Describe top-k similarity search combined with prompt construction.",
                    "Discuss reranking (Cross-Encoders), hybrid search (dense + sparse), and metadata filtering."
                )
            ),
            InterviewQuestion(
                id = "ai_q2",
                question = "What is the difference between Fine-Tuning (e.g., LoRA) and In-Context Learning (Prompt Engineering)? When would you choose one over the other?",
                category = "Model Adaptation",
                difficulty = "Entry-Level / Fresher",
                sampleAnswerHints = listOf(
                    "LoRA updates a small fraction of low-rank matrices in attention layers.",
                    "Prompt engineering is zero/few-shot without updating weights.",
                    "Choose fine-tuning for style, tone, structured output consistency, or specialized terminology."
                )
            ),
            InterviewQuestion(
                id = "ai_q3",
                question = "Explain the vanishing and exploding gradient problem in deep neural networks. How do residual connections and batch normalization alleviate this?",
                category = "Deep Learning Foundations",
                difficulty = "Entry-Level / Fresher",
                sampleAnswerHints = listOf(
                    "Chain rule multiplication through many layers causing gradients to tend to zero or infinity.",
                    "ResNet skip connections allow gradients to flow directly back without decay.",
                    "Batch norm stabilizes internal covariate shift."
                )
            )
        ),
        "Data Scientist" to listOf(
            InterviewQuestion(
                id = "ds_q1",
                question = "How do you detect and handle multicollinearity in regression models, and what impact does it have on model interpretability?",
                category = "Statistical Modeling",
                difficulty = "Entry-Level",
                sampleAnswerHints = listOf(
                    "VIF (Variance Inflation Factor) > 5 or 10.",
                    "Causes erratic coefficient estimates and high p-values.",
                    "Fix with PCA, L2 (Ridge) regularization, or dropping redundant correlated features."
                )
            ),
            InterviewQuestion(
                id = "ds_q2",
                question = "Walk me through how you would design an A/B test for a new recommendation algorithm on an e-commerce platform.",
                category = "Experimentation",
                difficulty = "Entry-Level",
                sampleAnswerHints = listOf(
                    "Define primary metric (conversion rate) and guardrail metric (page latency).",
                    "Determine sample size using statistical power analysis (alpha=0.05, power=0.8).",
                    "Randomize at user level, check for sample ratio mismatch (SRM)."
                )
            )
        ),
        "Full-Stack Developer" to listOf(
            InterviewQuestion(
                id = "fs_q1",
                question = "Explain how React's Virtual DOM reconciliation algorithm works and how proper key assignment optimizes list re-rendering.",
                category = "Frontend Architecture",
                difficulty = "Entry-Level",
                sampleAnswerHints = listOf(
                    "Fiber tree diffing in O(n) heuristic complexity.",
                    "Stable keys identify moved/added/removed items without recreating DOM nodes.",
                    "Never use array indices when items can reorder or filter."
                )
            ),
            InterviewQuestion(
                id = "fs_q2",
                question = "How would you design a secure user authentication system using JWTs and Refresh Tokens? Where should each be stored?",
                category = "Web Security & APIs",
                difficulty = "Entry-Level",
                sampleAnswerHints = listOf(
                    "Short-lived access token (e.g. 15 min) kept in memory.",
                    "Long-lived refresh token stored in an httpOnly, Secure, SameSite cookie.",
                    "Rotate refresh tokens upon every exchange to detect reuse attacks."
                )
            )
        )
    )

    val preloadedSampleResumes = listOf(
        Pair(
            "B.Sc Computer Science (AI & DS) Graduate",
            """
            ALEX CHEN
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
            - 1st Place Winner - Inter-College Hackathon 2025 (AI Healthcare Track)
            """.trimIndent()
        ),
        Pair(
            "Junior Full-Stack Developer",
            """
            PRIYA SHARMA
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
               - Built WebSocket microservice in Node.js supporting 1,000 concurrent socket connections.
            """.trimIndent()
        )
    )

    fun calculateJobMatch(user: UserProfile, job: Job): JobMatchScore {
        val userTech = user.technicalSkills.map { it.lowercase().trim() }
        val reqSkills = job.requiredSkills.map { it.lowercase().trim() }

        val matched = mutableListOf<String>()
        val missing = mutableListOf<String>()

        for (skill in job.requiredSkills) {
            val sLower = skill.lowercase().trim()
            val hasDirect = userTech.any { it.contains(sLower) || sLower.contains(it) }
            if (hasDirect) {
                matched.add(skill)
            } else {
                missing.add(skill)
            }
        }

        // Skills match score (60% weight)
        val skillRatio = if (job.requiredSkills.isNotEmpty()) {
            matched.size.toFloat() / job.requiredSkills.size.toFloat()
        } else 1.0f
        val skillsScore = (skillRatio * 100).toInt().coerceIn(0, 100)

        // Experience match score (20% weight)
        val expScore = when {
            job.experienceLevel.contains("Entry", ignoreCase = true) || job.experienceLevel.contains("Intern", ignoreCase = true) -> 95
            job.experienceLevel.contains("Junior", ignoreCase = true) -> 80
            else -> 60
        }

        // Education match score (20% weight)
        val eduScore = if (user.educationLevel.contains("Computer Science", ignoreCase = true) ||
            user.department.contains("Intelligence", ignoreCase = true) ||
            user.department.contains("Data", ignoreCase = true)
        ) 95 else 75

        val totalPercentage = ((skillsScore * 0.60) + (expScore * 0.20) + (eduScore * 0.20)).toInt().coerceIn(10, 99)

        val explanation = when {
            totalPercentage >= 80 -> "Outstanding match! Your ${matched.size} matching skills (${matched.take(3).joinToString(", ")}) and CS background strongly align with this opening."
            totalPercentage >= 65 -> "Solid fit! You meet core requirements (${matched.joinToString(", ")}). Strengthening ${missing.take(2).joinToString(", ")} will make your application stand out."
            else -> "Growth opportunity. You have foundation in ${matched.ifEmpty { listOf("general computing") }.joinToString(", ")}, but need to acquire ${missing.take(3).joinToString(", ")}."
        }

        return JobMatchScore(
            jobId = job.id,
            percentage = totalPercentage,
            matchedSkills = matched,
            missingSkills = missing,
            skillsScore = skillsScore,
            experienceScore = expScore,
            educationScore = eduScore,
            explanation = explanation
        )
    }

    fun calculateSkillGap(userSkills: List<String>, targetRole: String): SkillGapAnalysis {
        val benchmark = benchmarkSkillsByRole[targetRole] ?: listOf(
            "Python", "SQL", "Git", "Docker", "Problem Solving", "Linux"
        )
        val userLower = userSkills.map { it.lowercase().trim() }

        val matched = mutableListOf<String>()
        val missing = mutableListOf<String>()

        for (skill in benchmark) {
            val sLower = skill.lowercase().trim()
            if (userLower.any { it.contains(sLower) || sLower.contains(it) }) {
                matched.add(skill)
            } else {
                missing.add(skill)
            }
        }

        val needsImprovement = matched.takeLast((matched.size / 3).coerceAtLeast(1))
        val trueMatched = matched.filterNot { needsImprovement.contains(it) }

        val matchScore = if (benchmark.isNotEmpty()) {
            ((matched.size.toFloat() / benchmark.size.toFloat()) * 100).toInt().coerceIn(15, 95)
        } else 70

        val priorityActions = missing.mapIndexed { idx, skill ->
            val prio = if (idx == 0) "High" else if (idx == 1) "Medium" else "Low"
            val time = if (idx == 0) "1-2 Weeks" else if (idx == 1) "2-3 Weeks" else "3-4 Weeks"
            PriorityAction(
                skill = skill,
                priority = prio,
                reason = "Key operational competency expected by technical interviewers for $targetRole.",
                estimatedTimeToLearn = time
            )
        }

        val resources = listOf(
            LearningResource(
                title = "Official $targetRole Documentation & Best Practices",
                provider = "Free Developer Portal",
                type = "Documentation",
                url = "https://developer.mozilla.org",
                isFree = true
            ),
            LearningResource(
                title = "Interactive Code Labs & Micro-Projects",
                provider = "Hands-on Community",
                type = "Interactive Tutorial",
                url = "https://github.com",
                isFree = true
            )
        )

        val projects = listOf(
            ProjectIdea(
                title = "End-to-End $targetRole Production Showcase",
                description = "Build and deploy a scalable showcase project featuring automated testing and CI/CD.",
                keySkills = (missing.take(2) + matched.take(2)).distinct(),
                complexity = "Intermediate"
            )
        )

        return SkillGapAnalysis(
            targetRole = targetRole,
            userSkills = userSkills,
            requiredSkills = benchmark,
            matchedSkills = trueMatched,
            needsImprovementSkills = needsImprovement,
            missingSkills = missing,
            matchScore = matchScore,
            priorityActions = priorityActions,
            recommendedResources = resources,
            recommendedProjects = projects
        )
    }
}
