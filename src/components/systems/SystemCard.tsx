'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Project } from '@/lib/constants';
import { systemArchitectures, layerMeta, ArchLayer } from '@/lib/architecture';

interface SystemCardProps {
  project: Project;
  onOpen: () => void;
}

const layerOrder: ArchLayer[] = ['ingress', 'core', 'storage', 'ml', 'output'];

export function SystemCard({ project, onOpen }: SystemCardProps) {
  const arch = systemArchitectures[project.id];

  const layers = arch
    ? layerOrder.filter((l) => arch.nodes.some((n) => n.layer === l))
    : [];

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group w-full text-left"
    >
      <div className="relative rounded-xl border border-border bg-card/40 backdrop-blur-sm p-6 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_28px_rgba(0,212,255,0.14)]">
        <div className="flex items-start justify-between">
          <div>
            <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
              {project.category}
            </span>
            <h3 className="mt-3 text-xl font-bold">{project.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
          </div>
          <span className="ml-4 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>

        {layers.length > 0 && (
          <div className="mt-5 flex items-center gap-1.5">
            {layers.map((layer) => (
              <span
                key={layer}
                title={layerMeta[layer].label}
                className="h-1.5 flex-1 rounded-full opacity-80"
                style={{ backgroundColor: layerMeta[layer].color }}
              />
            ))}
            <span className="ml-2 text-[11px] text-muted-foreground">
              {layers.length} layers
            </span>
          </div>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {project.metrics.map((metric, i) => (
            <div key={i} className="rounded-lg border border-border bg-background/50 px-3 py-2">
              <p className="text-[11px] text-muted-foreground">{metric.label}</p>
              <p className="text-sm font-bold text-primary">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-secondary/50 text-secondary-foreground text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-primary">
            <span className="text-xs">Explore architecture</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
