'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GraphNode {
  id: string;
  label: string;
  description: string;
  tech: string;
  type: 'input' | 'process' | 'storage' | 'model' | 'output';
  details?: string[];
}

interface ArchitectureGraphProps {
  className?: string;
}

const nodeColors: Record<string, string> = {
  input: '#22d3ee',
  process: '#a855f7',
  storage: '#f472b6',
  model: '#00d4ff',
  output: '#22c55e'
};

const ragNodes: GraphNode[] = [
  { 
    id: 'user', 
    label: 'User Input', 
    description: 'End user submits query through chat interface', 
    tech: 'React/Next.js', 
    type: 'input',
    details: ['Chat UI', 'WebSocket', 'Session']
  },
  { 
    id: 'gateway', 
    label: 'API Gateway', 
    description: 'Request routing, auth validation, rate limiting', 
    tech: 'Azure API Mgmt', 
    type: 'input',
    details: ['Auth JWT', 'Rate Limit', 'Logging']
  },
  { 
    id: 'preprocess', 
    label: 'Text Preprocessing', 
    description: 'Clean, normalize, split query into tokens', 
    tech: 'Python/NLTK', 
    type: 'process',
    details: ['Lowercase', 'Punctuation', 'Stopwords']
  },
  { 
    id: 'embed', 
    label: 'Embedding Model', 
    description: 'Convert text to 1536-dim vector representation', 
    tech: 'text-embedding-3-small', 
    type: 'model',
    details: ['1536 dims', 'Semantic', 'Cosine sim']
  },
  { 
    id: 'faiss', 
    label: 'Vector Index', 
    description: 'Approximate nearest neighbor search', 
    tech: 'FAISS/IVF', 
    type: 'storage',
    details: ['IVF-PQ', 'Top-K=10', 'M=64']
  },
  { 
    id: 'hybrid', 
    label: 'Hybrid Search', 
    description: 'Combine dense + sparse retrieval', 
    tech: 'BM25 + Dense', 
    type: 'process',
    details: ['BM25', 'RRF fusion', 'Weights']
  },
  { 
    id: 'rerank', 
    label: 'Cross-Encoder', 
    description: 'Re-score top chunks for relevance', 
    tech: 'cross-encoder-ms', 
    type: 'model',
    details: ['Re-ranking', 'Top-K=5', 'Score threshold']
  },
  { 
    id: 'context', 
    label: 'Context Builder', 
    description: 'Format retrieved docs into prompt', 
    tech: 'LangChain', 
    type: 'process',
    details: ['Chunking', 'Citations', 'Prompt']
  },
  { 
    id: 'llm', 
    label: 'LLM Generation', 
    description: 'Generate contextual response with citations', 
    tech: 'GPT-4 Turbo', 
    type: 'model',
    details: ['128K ctx', 'Function calls', 'JSON mode']
  },
  { 
    id: 'validate', 
    label: 'Output Validator', 
    description: 'Check response quality and safety', 
    tech: 'Guardrails AI', 
    type: 'process',
    details: ['PII detection', 'Toxicity', 'Format']
  },
  { 
    id: 'stream', 
    label: 'Streaming', 
    description: 'Stream response tokens to client', 
    tech: 'Server-Sent Events', 
    type: 'output',
    details: ['Real-time', 'Tokens', 'Progress']
  }
];

export function ArchitectureGraph({ className }: ArchitectureGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<string>('user');

  return (
    <div className={`relative w-full min-h-[650px] ${className}`}>
      <div className="relative flex flex-col items-center gap-2">
        <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
          {ragNodes.map((node, i) => (
            <motion.div
              key={node.id}
              className="relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <motion.div
                className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${
                  activeNode === node.id ? 'scale-108' : 'hover:scale-103'
                }`}
                onClick={() => setActiveNode(node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div
                  className={`w-28 h-20 rounded-lg flex flex-col items-center justify-center border-2 transition-all duration-300 ${
                    activeNode === node.id
                      ? 'shadow-[0_0_30px_rgba(0,212,255,0.6)]'
                      : ''
                  }`}
                  style={{
                    borderColor: nodeColors[node.type],
                    backgroundColor: activeNode === node.id ? `${nodeColors[node.type]}30` : `${nodeColors[node.type]}18`,
                  }}
                >
                  <div 
                    className="w-2 h-2 rounded-full mb-1" 
                    style={{ backgroundColor: nodeColors[node.type] }}
                  />
                  <span className="text-[11px] font-semibold text-center px-1 leading-tight">{node.label}</span>
                </div>

                <span 
                  className="text-[9px] mt-1 px-1.5 py-0.5 rounded"
                  style={{ 
                    color: nodeColors[node.type],
                    backgroundColor: `${nodeColors[node.type]}18`
                  }}
                >
                  {node.tech}
                </span>

                <AnimatePresence>
                  {hoveredNode === node.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-52 p-3 rounded-lg bg-card border z-50 shadow-xl"
                    >
                      <p className="text-xs font-bold" style={{ color: nodeColors[node.type] }}>
                        {node.label}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1">{node.description}</p>
                      {node.details && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {node.details.map((d, i) => (
                            <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-muted/50">
                              {d}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {i < ragNodes.length - 1 && (
                <div className="absolute top-16 -right-3 w-6 h-0.5 overflow-hidden">
                  <motion.div 
                    className="absolute top-0 w-full h-full"
                    style={{
                      background: `linear-gradient(90deg, ${nodeColors[node.type]} 0%, transparent 100%)`
                    }}
                  >
                    <motion.div 
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-1.5 rounded-full"
                      style={{ backgroundColor: nodeColors[node.type] }}
                      animate={{ x: [0, 20], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 p-4 rounded-lg bg-card/60 border border-primary/25 max-w-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold" style={{ color: nodeColors[ragNodes.find(n => n.id === activeNode)?.type || 'model'] }}>
                  {ragNodes.find(n => n.id === activeNode)?.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {ragNodes.find(n => n.id === activeNode)?.description}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium" style={{ color: nodeColors[ragNodes.find(n => n.id === activeNode)?.type || 'model'] }}>
                  {ragNodes.find(n => n.id === activeNode)?.tech}
                </p>
                <p className="text-[10px] text-muted-foreground capitalize">
                  {ragNodes.find(n => n.id === activeNode)?.type} Stage
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-3 text-[9px]">
        {[
          { label: 'Input', color: '#22d3ee' },
          { label: 'Processing', color: '#a855f7' },
          { label: 'Storage', color: '#f472b6' },
          { label: 'AI/ML', color: '#00d4ff' },
          { label: 'Output', color: '#22c55e' }
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span style={{ color: item.color }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}