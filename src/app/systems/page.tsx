'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Sparkles, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SystemCard } from '@/components/systems/SystemCard';
import { SystemArchitectureView } from '@/components/graphs/SystemArchitectureView';
import { projects, miniProjects } from '@/lib/constants';
import { systemArchitectures } from '@/lib/architecture';
import Link from 'next/link';

export default function SystemsPage() {
  const [activeSystem, setActiveSystem] = useState<string | null>(null);

  const activity = activeSystem ? systemArchitectures[activeSystem] : null;

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container py-12 mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Home className="mr-1 h-4 w-4" />
              Home
            </Button>
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-primary">Systems</span>
        </div>

        <AnimatePresence mode="wait">
          {activity ? (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              <SystemArchitectureView
                architecture={activity}
                onBack={() => setActiveSystem(null)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-bold mb-3">
                  Built Systems
                  <span className="text-primary">.</span>
                </h1>
                <p className="text-base text-muted-foreground max-w-xl mx-auto">
                  Production-grade AI systems solving real-world problems at scale. Select a
                  system to explore its architecture.
                </p>
              </div>

              <section className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Core Projects
                </h2>
                {projects.map((project) => (
                  <SystemCard
                    key={project.id}
                    project={project}
                    onOpen={() => setActiveSystem(project.id)}
                  />
                ))}
              </section>

              <section className="mt-16">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Additional Systems
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {miniProjects.map((project) => (
                    <div
                      key={project.id}
                      className="rounded-xl border border-border bg-card/30 p-5"
                    >
                      <h3 className="text-sm font-medium">{project.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {project.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-secondary/50 text-secondary-foreground text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
