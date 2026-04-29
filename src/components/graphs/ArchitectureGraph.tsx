'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GraphNode {
  id: string;
  label: string;
  description: string;
  tech: string;
  type: 'input' | 'process' | 'storage' | 'model' | 'output';
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
  { id: 'user', label: 'User Query', description: 'User input via chat interface', tech: 'React/Next.js', type: 'input' },
  { id: 'preprocess', label: 'Input Preprocess', description: 'Clean, normalize & tokenize query text', tech: 'Python/Regex', type: 'process' },
  { id: 'embed', label: 'Text Embedding', description: 'Convert text to vector embeddings', tech: 'text-embedding-3', type: 'model' },
  { id: 'faiss', label: 'FAISS Index', description: 'Semantic similarity search', tech: 'FAISS/Pinecone', type: 'storage' },
  { id: 'rerank', label: 'Cross-Encoder', description: 'Re-rank retrieved chunks by relevance', tech: 'cross-encoder-ms', type: 'model' },
  { id: 'context', label: 'Context Builder', description: 'Combine chunks into prompt context', tech: 'LangChain', type: 'process' },
  { id: 'llm', label: 'LLM Engine', description: 'Generate contextual response', tech: 'GPT-4/LLaMA', type: 'model' },
  { id: 'output', label: 'Response', description: 'Stream final answer to user', tech: 'Streaming API', type: 'output' }
];

export function ArchitectureGraph({ className }: ArchitectureGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<string>('user');

  return (
    <div className={`relative w-full min-h-[500px] ${className}`}>
      <div className="relative flex flex-col items-center gap-3">
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mb-6">
          {ragNodes.map((node, i) => (
            <motion.div
              key={node.id}
              className="relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <motion.div
                className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${
                  activeNode === node.id ? 'scale-105' : 'hover:scale-102'
                }`}
                onClick={() => setActiveNode(node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div
                  className={`w-24 h-24 rounded-xl flex flex-col items-center justify-center border-2 transition-all duration-300 ${
                    activeNode === node.id
                      ? 'shadow-[0_0_25px_rgba(0,212,255,0.5)]'
                      : ''
                  }`}
                  style={{
                    borderColor: nodeColors[node.type],
                    backgroundColor: activeNode === node.id ? `${nodeColors[node.type]}25` : `${nodeColors[node.type]}15`,
                  }}
                >
                  <div 
                    className="w-2.5 h-2.5 rounded-full mb-1.5" 
                    style={{ backgroundColor: nodeColors[node.type] }}
                  />
                  <span className="text-xs font-semibold text-center px-1">{node.label}</span>
                </div>

                <span 
                  className="text-[10px] mt-1 px-1.5 py-0.5 rounded"
                  style={{ 
                    color: nodeColors[node.type],
                    backgroundColor: `${nodeColors[node.type]}15`
                  }}
                >
                  {node.tech}
                </span>

                <AnimatePresence>
                  {hoveredNode === node.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-44 p-2.5 rounded-lg bg-card border z-50 shadow-lg"
                    >
                      <p className="text-xs font-medium" style={{ color: nodeColors[node.type] }}>
                        {node.label}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1">{node.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {i < ragNodes.length - 1 && (
                <motion.div 
                  className="absolute top-12 -right-2 w-8 h-0.5"
                  style={{
                    background: `linear-gradient(90deg, ${nodeColors[node.type]} 0%, ${nodeColors[node.type]}50% 50%, transparent 100%)`
                  }}
                >
                  <motion.div 
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                    style={{ backgroundColor: nodeColors[node.type] }}
                    animate={{ x: [0, 4], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {ragNodes.slice(0, 1).map((node) => (
          <div key="doc-store" className="mt-8 relative">
            <div 
              className="w-44 p-3 rounded-xl border-2 border-dashed"
              style={{
                borderColor: '#f472b6',
                backgroundColor: '#f472b610'
              }}
            >
              <p className="text-xs font-semibold text-center" style={{ color: '#f472b6' }}>
                Document Store
              </p>
              <p className="text-[10px] text-muted-foreground text-center">Azure Blob / S3</p>
            </div>
            <motion.div 
              className="absolute -top-8 left-1/2 w-0.5 h-8"
              style={{ backgroundColor: '#f472b640' }}
            />
          </div>
        ))}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 p-3 rounded-lg bg-card/50 border border-primary/20 max-w-md"
          >
            <p className="text-sm text-center" style={{ color: nodeColors[ragNodes.find(n => n.id === activeNode)?.type || 'model'] }}>
              {ragNodes.find(n => n.id === activeNode)?.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4 text-[10px]">
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