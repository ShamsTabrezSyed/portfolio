'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GraphNode {
  id: string;
  label: string;
  description: string;
  type: 'source' | 'process' | 'storage' | 'model' | 'api' | 'cloud';
}

interface ArchitectureGraphProps {
  nodes?: GraphNode[];
  className?: string;
}

const nodeColors: Record<string, string> = {
  source: '#22d3ee',
  process: '#a855f7',
  storage: '#f472b6',
  model: '#00d4ff',
  api: '#22c55e',
  cloud: '#f59e0b'
};

const defaultNodes: GraphNode[] = [
  { id: 'user', label: 'User Query', description: 'User input via chat interface', type: 'source' },
  { id: 'embed', label: 'Text Embedding', description: 'Convert text to vector embeddings', type: 'process' },
  { id: 'vector', label: 'FAISS Index', description: 'Semantic similarity search', type: 'storage' },
  { id: 'rerank', label: 'Re-ranking', description: 'Cross-encoder reranking', type: 'model' },
  { id: 'llm', label: 'LLM Engine', description: 'Context-aware response generation', type: 'model' },
  { id: 'output', label: 'Response', description: 'Streaming answer to user', type: 'api' }
];

export function ArchitectureGraph({ nodes = defaultNodes, className }: ArchitectureGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<string>('user');

  return (
    <div className={`relative w-full min-h-[400px] ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-full h-full max-w-4xl" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#00d4ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glowx">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {nodes.slice(0, -1).map((_, i) => {
            const x1 = 100 + i * 130;
            const x2 = 230 + i * 130;
            return (
              <motion.line
                key={i}
                x1={x1}
                y1={200}
                x2={x2}
                y2={200}
                stroke="url(#lineGrad)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.15 }}
              />
            );
          })}
        </svg>
      </div>

      <div className="relative flex items-center justify-center gap-4 flex-wrap max-w-4xl mx-auto pt-8">
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => setActiveNode(node.id)}
          >
            <motion.div
              className={`w-24 h-24 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                activeNode === node.id 
                  ? 'scale-110 shadow-[0_0_30px_rgba(0,212,255,0.6)]' 
                  : 'hover:scale-105'
              }`}
              style={{
                borderColor: nodeColors[node.type],
                backgroundColor: activeNode === node.id ? `${nodeColors[node.type]}30` : `${nodeColors[node.type]}15`,
                borderWidth: '2px',
                borderStyle: 'solid'
              }}
            >
              <div 
                className="w-3 h-3 rounded-full mb-2" 
                style={{ backgroundColor: nodeColors[node.type] }}
              />
              <span className="text-xs font-medium text-center px-1">{node.label}</span>
            </motion.div>

            <AnimatePresence>
              {hoveredNode === node.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-40 p-3 rounded-lg bg-card border border-primary/30 z-50"
                >
                  <p className="font-semibold text-sm" style={{ color: nodeColors[node.type] }}>
                    {node.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{node.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-lg bg-card/50 border border-primary/20 max-w-md mx-auto"
          >
            <p className="text-sm" style={{ color: nodeColors[nodes.find(n => n.id === activeNode)?.type || 'api'] }}>
              {nodes.find(n => n.id === activeNode)?.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}