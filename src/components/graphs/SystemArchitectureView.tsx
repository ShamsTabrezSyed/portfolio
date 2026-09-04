'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import {
  SystemArchitecture,
  ArchNode,
  ArchLayer,
  layerMeta,
} from '@/lib/architecture';

interface SystemArchitectureViewProps {
  architecture: SystemArchitecture;
  onBack: () => void;
}

const layerOrder: ArchLayer[] = ['ingress', 'core', 'storage', 'ml', 'output'];

function Connection({ color }: { color: string }) {
  return (
    <div className="relative flex items-center justify-center">
      <span
        className="block h-8 w-px"
        style={{ background: `linear-gradient(to bottom, ${color}55, ${color}22)` }}
      />
      <span
        className="absolute top-1 h-1.5 w-px rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
      />
    </div>
  );
}

function NodeCard({
  node,
  active,
  onSelect,
}: {
  node: ArchNode;
  active: boolean;
  onSelect: () => void;
}) {
  const color = layerMeta[node.layer].color;
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative w-full max-w-xs rounded-lg border px-4 py-3 text-left transition-all duration-300 ${
        active
          ? 'border-[var(--accent)]'
          : 'border-border opacity-70 hover:opacity-100'
      }`}
      style={
        active
          ? ({ '--accent': color, boxShadow: `0 0 18px ${color}22` } as React.CSSProperties)
          : undefined
      }
    >
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
        />
        <span className="text-sm font-semibold">{node.label}</span>
      </div>
      <span className="mt-1 block text-[11px] text-muted-foreground">{node.tech}</span>
    </motion.button>
  );
}

export function SystemArchitectureView({
  architecture,
  onBack,
}: SystemArchitectureViewProps) {
  const [activeId, setActiveId] = useState<string>(architecture.nodes[0]?.id ?? '');
  const activeNode = architecture.nodes.find((n) => n.id === activeId) ?? architecture.nodes[0];

  const layers = layerOrder.filter((l) => architecture.nodes.some((n) => n.layer === l));
  const byLayer = (layer: ArchLayer) =>
    architecture.nodes.filter((n) => n.layer === layer);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="relative"
    >
      <button
        type="button"
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        All systems
      </button>

      <div className="mb-8">
        <h2 className="text-2xl font-bold md:text-3xl">{architecture.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Click a layer to inspect its role in the system.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-0">
          {layers.map((layer, li) => {
            const nodes = byLayer(layer);
            return (
              <div key={layer}>
                {li > 0 && (
                  <div className="flex justify-center py-1">
                    <Connection color={layerMeta[layers[li - 1]].color} />
                  </div>
                )}
                <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                  <div className="flex items-center gap-2 pb-3">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: layerMeta[layer].color,
                        boxShadow: `0 0 6px ${layerMeta[layer].color}`,
                      }}
                    />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {layerMeta[layer].label}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-start gap-3">
                    {nodes.map((node) => (
                      <NodeCard
                        key={node.id}
                        node={node}
                        active={activeId === node.id}
                        onSelect={() => setActiveId(node.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside>
          <AnimatePresence mode="wait">
            {activeNode && (
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="sticky top-24 rounded-xl border border-border bg-card/40 p-5 backdrop-blur-sm"
              >
                <span
                  className="inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    color: layerMeta[activeNode.layer].color,
                    backgroundColor: `${layerMeta[activeNode.layer].color}18`,
                  }}
                >
                  {layerMeta[activeNode.layer].label}
                </span>
                <h3 className="mt-3 text-lg font-bold">{activeNode.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{activeNode.description}</p>
                <p className="mt-3 text-xs text-primary">{activeNode.tech}</p>
                {activeNode.details && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {activeNode.details.map((d, i) => (
                      <span
                        key={i}
                        className="rounded bg-secondary/50 px-2 py-0.5 text-[11px] text-secondary-foreground"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </div>
    </motion.div>
  );
}
