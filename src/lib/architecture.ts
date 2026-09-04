export type ArchLayer =
  | 'ingress'
  | 'core'
  | 'storage'
  | 'ml'
  | 'output';

export interface ArchNode {
  id: string;
  label: string;
  description: string;
  tech: string;
  layer: ArchLayer;
  details?: string[];
}

export interface SystemArchitecture {
  systemId: string;
  title: string;
  accentColor: string;
  badge: string;
  summary: string;
  metrics: { label: string; value: string }[];
  nodes: ArchNode[];
  edges: [string, string][];
}

export const layerMeta: Record<ArchLayer, { label: string; color: string }> = {
  ingress: { label: 'Ingress', color: '#22d3ee' },
  core: { label: 'Core', color: '#a855f7' },
  storage: { label: 'Storage', color: '#f472b6' },
  ml: { label: 'AI / ML', color: '#00d4ff' },
  output: { label: 'Output', color: '#22c55e' },
};

export const systemArchitectures: Record<string, SystemArchitecture> = {
  'enterprise-rag-chatbot': {
    systemId: 'enterprise-rag-chatbot',
    title: 'Enterprise Q&A Chatbot (RAG)',
    accentColor: '#00d4ff',
    badge: 'GenAI',
    summary: 'Semantic retrieval over 500K documents with real-time streaming answers.',
    metrics: [
      { label: 'Latency', value: '240ms' },
      { label: 'Indexed', value: '500K+' },
      { label: 'Vector DB', value: 'FAISS' },
    ],
    nodes: [
      {
        id: 'chat-ui',
        label: 'Chat UI',
        description: 'Streaming chat interface served to employees.',
        tech: 'React / Next.js',
        layer: 'ingress',
        details: ['WebSocket', 'Session'],
      },
      {
        id: 'gateway',
        label: 'API Gateway',
        description: 'Auth, rate limiting and routing for queries.',
        tech: 'Azure API Mgmt',
        layer: 'ingress',
        details: ['Auth', 'Rate Limit'],
      },
      {
        id: 'orchestrator',
        label: 'Orchestrator',
        description: 'Coordinates retrieval and generation steps.',
        tech: 'LangChain',
        layer: 'core',
        details: ['Prompt', 'Citations'],
      },
      {
        id: 'cache',
        label: 'Cache Layer',
        description: 'Reuses answers for repeated queries.',
        tech: 'Redis',
        layer: 'core',
        details: ['TTL', 'Hot queries'],
      },
      {
        id: 'faiss',
        label: 'Vector Index',
        description: 'Approximate nearest neighbor over 500K docs.',
        tech: 'FAISS / IVF',
        layer: 'storage',
        details: ['Top-K', 'Metadata'],
      },
      {
        id: 'llm',
        label: 'LLM Generation',
        description: 'Grounds response in retrieved context.',
        tech: 'GPT-3.5 / 4',
        layer: 'ml',
        details: ['Context', 'JSON'],
      },
      {
        id: 'stream',
        label: 'Streaming',
        description: 'Tokens streamed back to the client.',
        tech: 'Server-Sent Events',
        layer: 'output',
        details: ['Token', 'Progress'],
      },
      {
        id: 'monitoring',
        label: 'Observability',
        description: 'Tracks latency, quality and usage.',
        tech: 'Azure Monitor',
        layer: 'output',
        details: ['Dashboards', 'Alerts'],
      },
    ],
    edges: [
      ['chat-ui', 'gateway'],
      ['gateway', 'orchestrator'],
      ['gateway', 'cache'],
      ['orchestrator', 'faiss'],
      ['faiss', 'orchestrator'],
      ['cache', 'orchestrator'],
      ['orchestrator', 'llm'],
      ['llm', 'stream'],
      ['stream', 'monitoring'],
    ],
  },
  'financial-nlp-pipeline': {
    systemId: 'financial-nlp-pipeline',
    title: 'Financial NLP Pipeline',
    accentColor: '#a855f7',
    badge: 'Fintech AI',
    summary: 'BERT-based entity extraction across 15K financial documents daily with automated retraining.',
    metrics: [
      { label: 'Throughput', value: '15K/day' },
      { label: 'Model', value: 'BERT-NER' },
      { label: 'API', value: 'FastAPI' },
    ],
    nodes: [
      {
        id: 'ingest',
        label: 'Ingest',
        description: 'Consumes financial documents at scale.',
        tech: 'Kafka',
        layer: 'ingress',
        details: ['Queue', '15K docs/day'],
      },
      {
        id: 'preprocess',
        label: 'Preprocess',
        description: 'Clean and normalize document text.',
        tech: 'Python / NLTK',
        layer: 'core',
        details: ['Tokenize', 'Normalize'],
      },
      {
        id: 'retrain',
        label: 'Retraining',
        description: 'Periodically fine-tunes on new labels.',
        tech: 'CloudWatch',
        layer: 'core',
        details: ['Scheduler', 'Validation'],
      },
      {
        id: 'ner',
        label: 'NER Model',
        description: 'Extracts domain-specific financial entities.',
        tech: 'BERT-based NER',
        layer: 'ml',
        details: ['2,400 tokens', 'Domain'],
      },
      {
        id: 'index',
        label: 'Result Index',
        description: 'Stores structured extractions.',
        tech: 'PostgreSQL',
        layer: 'storage',
        details: ['Entities', 'Relations'],
      },
      {
        id: 'api',
        label: 'Service API',
        description: 'Serves extraction results downstream.',
        tech: 'FastAPI',
        layer: 'output',
        details: ['Lambda', 'REST'],
      },
    ],
    edges: [
      ['ingest', 'preprocess'],
      ['preprocess', 'ner'],
      ['ner', 'index'],
      ['index', 'api'],
      ['ner', 'retrain'],
    ],
  },
  'clinical-nlp-platform': {
    systemId: 'clinical-nlp-platform',
    title: 'Clinical NLP Platform',
    accentColor: '#22c55e',
    badge: 'Healthcare AI',
    summary: 'BioBERT clinical entity extraction with RLHF and full audit compliance.',
    metrics: [
      { label: 'Accuracy', value: '94.2% F1' },
      { label: 'Model', value: 'BioBERT' },
      { label: 'Compliance', value: 'HIPAA' },
    ],
    nodes: [
      {
        id: 'notes-api',
        label: 'Notes API',
        description: 'Ingests unstructured clinical notes.',
        tech: 'FHIR Gateway',
        layer: 'ingress',
        details: ['HL7', 'PHI'],
      },
      {
        id: 'deidentify',
        label: 'De-identify',
        description: 'Strips protected health information.',
        tech: 'Guardrails',
        layer: 'core',
        details: ['PII', 'Redact'],
      },
      {
        id: 'biocbert',
        label: 'Clinical NER',
        description: 'Extracts structured clinical entities.',
        tech: 'BioBERT',
        layer: 'ml',
        details: ['94.2% F1', 'RLHF'],
      },
      {
        id: 'emr',
        label: 'Clinical Store',
        description: 'Persists entities for decision support.',
        tech: 'EMR / Vector',
        layer: 'storage',
        details: ['Audit', 'Billing'],
      },
      {
        id: 'audit',
        label: 'Audit Trail',
        description: 'Logs every access for compliance.',
        tech: 'Immutable Log',
        layer: 'storage',
        details: ['HIPAA', 'Traceability'],
      },
      {
        id: 'support',
        label: 'Decision Support',
        description: 'Surfaces entities for clinicians.',
        tech: 'GCP Kubernetes',
        layer: 'output',
        details: ['Dashboard', 'Alerts'],
      },
    ],
    edges: [
      ['notes-api', 'deidentify'],
      ['deidentify', 'biocbert'],
      ['biocbert', 'emr'],
      ['biocbert', 'audit'],
      ['emr', 'support'],
      ['audit', 'support'],
    ],
  },
};
