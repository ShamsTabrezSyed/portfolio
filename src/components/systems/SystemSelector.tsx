'use client';

import { motion } from 'framer-motion';
import { Project } from '@/lib/constants';
import { systemArchitectures, layerMeta, ArchLayer } from '@/lib/architecture';

interface SystemSelectorProps {
  projects: Project[];
  activeId: string;
  onSelect: (id: string) => void;
}

const layerOrder: ArchLayer[] = ['ingress', 'core', 'storage', 'ml', 'output'];

export function SystemSelector({ projects, activeId, onSelect }: SystemSelectorProps) {
  return (
    <nav className="flex flex-col gap-3">
      {projects.map((project, i) => {
        const arch = systemArchitectures[project.id];
        const active = activeId === project.id;
        const accent = arch?.accentColor ?? '#00d4ff';

        const layers = arch
          ? layerOrder.filter((l) => arch.nodes.some((n) => n.layer === l))
          : [];

        return (
          <motion.button
            key={project.id}
            type="button"
            onClick={() => onSelect(project.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className={`group relative w-full rounded-xl border p-4 text-left transition-all duration-300 ${
              active
                ? 'border-[var(--accent)] bg-card/60'
                : 'border-border bg-card/30 hover:border-border hover:bg-card/50'
            }`}
            style={{ ['--accent' as string]: active ? accent : undefined, boxShadow: active ? `0 0 20px ${accent}1c` : undefined }}
          >
            <span
              className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                active ? '' : 'text-muted-foreground'
              }`}
              style={
                active
                  ? { color: accent, backgroundColor: `${accent}1a` }
                  : undefined
              }
            >
              {project.category}
            </span>
            <h3
              className={`mt-2 text-sm font-bold transition-colors ${
                active ? '' : 'text-foreground'
              }`}
              style={active ? { color: accent } : undefined}
            >
              {project.title}
            </h3>

            {layers.length > 0 && (
              <div className="mt-3 flex items-center gap-1">
                {layers.map((layer) => (
                  <span
                    key={layer}
                    title={layerMeta[layer].label}
                    className="h-1 flex-1 rounded-full"
                    style={{
                      backgroundColor: layerMeta[layer].color,
                      opacity: active ? 0.9 : 0.4,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}
