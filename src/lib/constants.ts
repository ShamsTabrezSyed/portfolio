export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  approach: string;
  impact: ProjectImpact;
  metrics: ProjectMetric[];
  tags: string[];
}

export interface ProjectImpact {
  metric: string;
  value: string;
  improvement: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
  color: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

export const personalInfo = {
  name: 'Shams Tabrez Syed',
  title: 'Lead AI/ML Engineer',
  tagline: 'Building Intelligent Systems at Scale',
  subtitle: 'Specializing in GenAI, MLOps, and real-world AI systems in fintech & healthcare',
  email: 'sshams.2851@gmail.com',
  phone: '4694496024',
  linkedin: 'https://www.linkedin.com/in/shams-syed',
  github: 'https://github.com',
  location: 'Dallas, TX'
};

export const experience: Experience[] = [
  {
    company: 'NanoCure AI',
    role: 'Lead Machine Learning Engineer',
    period: 'Feb 2026 - Present',
    location: 'Texas, US',
    highlights: [
      'Design clinical NLP platform processing thousands of physician notes daily',
      'Train BioBERT on MIMIC-III dataset for medical NER',
      'Create RLHF loop for physician feedback integration',
      'Lead tech decisions for model selection & infrastructure'
    ]
  },
  {
    company: 'Genworth Financial',
    role: 'Machine Learning Engineer',
    period: 'Jun 2023 - Present',
    location: 'Texas, US',
    highlights: [
      'Built Q&A chatbot with FAISS & GPT-3.5 - 92% latency reduction',
      'Developed domain-customized NLP pipeline - 15K docs/day throughput',
      'Implemented GPT-3 & LLaMA text generation pipelines',
      'Created CI/CD pipelines for AWS/GCP model deployment'
    ]
  },
  {
    company: 'Infinite Infolab',
    role: 'Machine Learning Engineer',
    period: 'Jan 2019 - Jun 2022',
    location: 'India',
    highlights: [
      'Fine-tuned transformer-based LLM models for enterprise clients',
      'Built NLP information extraction for legal contracts',
      'Developed customer churn predictor with LSTM & GAN augmentation',
      'Created data pipelines with Hadoop, Spark, and Kafka'
    ]
  }
];

export const coreCompetencies = [
  {
    category: 'GenAI & NLP',
    skills: ['GPT-3/3.5/4', 'LLaMA', 'BERT', 'BioBERT', 'RAG', 'RLHF', 'LangChain', 'Prompt Engineering'],
    color: '#00d4ff'
  },
  {
    category: 'Deep Learning & CV',
    skills: ['PyTorch', 'TensorFlow', 'CNNs', 'LSTMs', 'GANs', 'Diffusion Models', 'Real-Time Inference'],
    color: '#a855f7'
  },
  {
    category: 'MLOps & Cloud',
    skills: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'MLflow', 'FastAPI'],
    color: '#22d3ee'
  },
  {
    category: 'Data Engineering',
    skills: ['Apache Spark', 'Kafka', 'Hadoop', 'SQL', 'FAISS', 'Pandas', 'NumPy', 'MongoDB'],
    color: '#f472b6'
  }
];

export const projects: Project[] = [
  {
    id: 'enterprise-rag-chatbot',
    title: 'Enterprise Q&A Chatbot (RAG)',
    category: 'GenAI',
    description: 'Intelligent enterprise knowledge retrieval system with advanced chunking and streaming',
    problem: 'Enterprise employees spent hours searching through 500K+ documents to find relevant information. Traditional keyword search failed to capture semantic meaning.',
    approach: 'Built a RAG pipeline using FAISS for vector similarity search, Azure Functions for serverless compute, and custom metadata chunking for domain-specific retrieval. Implemented real-time streaming responses.',
    impact: {
      metric: 'Latency Reduction',
      value: '92%',
      improvement: 'From 3s average to 240ms'
    },
    metrics: [
      { label: 'Documents Indexed', value: '500K+' },
      { label: 'Chunking Strategy', value: 'Metadata-aware' },
      { label: 'Vector DB', value: 'FAISS' },
      { label: 'Compute', value: 'Azure Functions' }
    ],
    tags: ['RAG', 'LLM', 'Azure', 'FAISS', 'Streaming']
  },
  {
    id: 'financial-nlp-pipeline',
    title: 'Financial NLP Pipeline',
    category: 'Fintech AI',
    description: 'BERT-based named entity recognition for financial documents with automated retraining',
    problem: 'Manual extraction of financial entities from 15K+ daily documents was slow, error-prone, and unable to scale with document volume.',
    approach: 'Built a BERT-based NER model with 2,400 domain-specific tokens. Deployed as FastAPI microservice with AWS Lambda for inference and CloudWatch-triggered daily retraining.',
    impact: {
      metric: 'Processing Volume',
      value: '15K docs/day',
      improvement: '10x throughput increase'
    },
    metrics: [
      { label: 'Model', value: 'BERT-based NER' },
      { label: 'Domain Tokens', value: '2,400' },
      { label: 'API', value: 'FastAPI' },
      { label: 'Retraining', value: 'CloudWatch Scheduled' }
    ],
    tags: ['BERT', 'NER', 'FastAPI', 'AWS', 'MLOps']
  },
  {
    id: 'clinical-nlp-platform',
    title: 'Clinical NLP Platform',
    category: 'Healthcare AI',
    description: 'BioBERT-powered clinical entity extraction with RLHF and Kubernetes deployment',
    problem: 'Healthcare providers needed to extract structured clinical entities from unstructured clinical notes for decision support and billing.',
    approach: 'Fine-tuned BioBERT on clinical data with Reinforcement Learning from Human Feedback (RLHF). Deployed on GCP with full ML lifecycle management.',
    impact: {
      metric: 'Accuracy',
      value: '94.2% F1',
      improvement: '+12% over baseline'
    },
    metrics: [
      { label: 'Model', value: 'BioBERT Fine-tuned' },
      { label: 'Deployment', value: 'GCP Kubernetes' },
      { label: 'Pipeline', value: 'RLHF Loop' },
      { label: 'Monitoring', value: 'Full Lifecycle' }
    ],
    tags: ['BioBERT', 'Healthcare', 'GCP', 'RLHF', 'Kubernetes']
  }
];

export const miniProjects = [
  {
    id: 'algorithmic-trading',
    title: 'Algorithmic Trading System',
    description: 'ML-driven quantitative trading with real-time signal generation',
    tags: ['Python', 'XGBoost', 'Kafka']
  },
  {
    id: 'credit-scoring',
    title: 'Explainable Credit Scoring',
    description: 'SHAP-based credit decisioning with interpretable AI',
    tags: ['XGBoost', 'SHAP', 'FastAPI']
  },
  {
    id: 'blood-cell',
    title: 'Blood Cell Classification',
    description: 'Real-time CNN inference for medical imaging',
    tags: ['PyTorch', 'OpenCV', 'TensorRT']
  }
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'ml-ai',
    name: 'ML/AI',
    color: '#00d4ff',
    skills: ['LLMs', 'RAG', 'NLP', 'BERT', 'BioBERT', 'GPT', 'Neural Networks', 'Computer Vision']
  },
  {
    id: 'infra',
    name: 'Infrastructure',
    color: '#a855f7',
    skills: ['Kubernetes', 'Docker', 'AWS', 'GCP', 'Azure', 'Terraform', 'MLOps']
  },
  {
    id: 'backend',
    name: 'Backend',
    color: '#22d3ee',
    skills: ['FastAPI', 'Node.js', 'Python', 'GraphQL', 'REST APIs', 'Microservices']
  },
  {
    id: 'data',
    name: 'Data Systems',
    color: '#f472b6',
    skills: ['Spark', 'Kafka', 'PostgreSQL', 'Vector Databases', 'FAISS', 'Data Pipelines']
  }
];