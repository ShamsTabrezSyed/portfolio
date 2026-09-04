'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SystemArchitecture, ArchNode, ArchLayer, layerMeta } from '@/lib/architecture';

interface ArchitectureStageProps {
  architecture: SystemArchitecture;
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
}

const layerOrder: ArchLayer[] = ['ingress', 'core', 'storage', 'ml', 'output'];

function SignalConnector({ color }: { color: string }) {
  return (
    <div className="relative flex h-7 items-center justify-center">
      <span
        className="block h-7 w-px"
        style={{ background: `linear-gradient(to bottom, ${color}58, ${color}1e)` }}
      />
      <span
        className="absolute h-1.5 w-px rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
      />
    </div>
  );
}

function NodeChip({
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
      className={`relative rounded-lg border px-4 py-3 text-left transition-all duration-300 ${
        active
          ? 'border-[var(--accent)] bg-card/70'
          : 'border-border bg-background/40 opacity-65 hover:opacity-100'
      }`}
      style={
        active
          ? ({ '--accent': color, boxShadow: `0 0 20px ${color}2a` } as React.CSSProperties)
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

export function ArchitectureStage({
  architecture,
  selectedNodeId,
  onSelectNode,
}: ArchitectureStageProps) {
  const activeNode =
    architecture.nodes.find((n) => n.id === selectedNodeId) ?? architecture.nodes[0];
  const accent = architecture.accentColor;

  const layers = layerOrder.filter((l) => architecture.nodes.some((n) => n.layer === l));
  const byLayer = (layer: ArchLayer) => architecture.nodes.filter((n) => n.layer === layer);

  return (
    <motion.div
      key={architecture.systemId}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl border border-border bg-background"
    >
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${accent}14, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative px-6 py-6 md:px-8 md:py-7">
        {/* Top info strip */}
        <div className="mb-6 flex items-start justify-between gap-4 border-b border-border/60 pb-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: accent, backgroundColor: `${accent}1a` }}
              >
                {architecture.badge}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
                {layers.length} layers
              </span>
            </div>
            <h2 className="mt-2 text-xl font-bold md:text-2xl">{architecture.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{architecture.summary}</p>
          </div>
          <div className="hidden shrink-0 gap-2 sm:flex">
            {architecture.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-border bg-background/50 px-3 py-2 text-right"
              >
                <p className="text-[10px] text-muted-foreground">{m.label}</p>
                <p className="text-sm font-bold" style={{ color: accent }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Flow zones */}
        <div className="min-h-[420px]">
          {layers.map((layer, li) => {
            const nodes = byLayer(layer);
            const fromColor = layerMeta[layers[li - 1]]?.color;
            return (
              <div key={layer}>
                {li > 0 && <div className="flex justify-center"><SignalConnector color={fromColor} /></div>}
                <div className="rounded-xl border border-border/50 bg-background/30 p-4">
                  <div className="flex items-center gap-2 pb-3">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: layerMeta[layer].color,
                        boxShadow: `0 0 6px ${layerMeta[layer].color}`,
                      }}
                    />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {layerMeta[layer].label}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-start gap-3">
                    {nodes.map((node) => (
                      <NodeChip
                        key={node.id}
                        node={node}
                        active={activeNode?.id === node.id}
                        onSelect={() => onSelectNode(node.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating glass detail card */}
      <AnimatePresence mode="wait">
        {activeNode && (
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute bottom-4 right-4 w-[240px] rounded-xl border border-white/10 bg-background/70 p-4 shadow-2xl backdrop-blur-md"
          >
            <span
              className="inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{
                color: layerMeta[activeNode.layer].color,
                backgroundColor: `${layerMeta[activeNode.layer].color}1a`,
              }}
            >
              {layerMeta[activeNode.layer].label}
            </span>
            <h4 className="mt-2 text-sm font-bold">{activeNode.label}</h4>
            <p className="mt-1 text-xs text-muted-foreground">{activeNode.description}</p>
            <p className="mt-2 text-[11px]" style={{ color: layerMeta[activeNode.layer].color }}>
              {activeNode.tech}
            </p>
            {activeNode.details && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {activeNode.details.map((d, i) => (
                  <span
                    key={i}
                    className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                  >
                    {d}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
