'use client';

import { useState } from 'react';
import { Database, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SystemSelector } from '@/components/systems/SystemSelector';
import { ArchitectureStage } from '@/components/graphs/ArchitectureStage';
import { projects, miniProjects } from '@/lib/constants';
import { systemArchitectures } from '@/lib/architecture';
import Link from 'next/link';

export default function SystemsPage() {
  const [activeSystemId, setActiveSystemId] = useState<string>(projects[0].id);
  const [activeNodeId, setActiveNodeId] = useState<string>('');

  const architecture = systemArchitectures[activeSystemId];

  const handleSelectSystem = (id: string) => {
    setActiveSystemId(id);
    setActiveNodeId(systemArchitectures[id]?.nodes[0]?.id ?? '');
  };

  const handleSelectNode = (id: string) => setActiveNodeId(id);

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container py-12 mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Home className="mr-1 h-4 w-4" />
              Home
            </Button>
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-primary">Systems</span>
        </div>

        <div className="mx-auto max-w-7xl">
          <h1 className="text-center text-3xl font-bold md:text-5xl">
            Built Systems<span className="text-primary">.</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-base text-muted-foreground">
            Select a system to explore its architecture in detail.
          </p>

          <div className="mt-10 flex flex-col gap-6 lg:flex-row">
            <aside className="shrink-0 lg:w-72">
              <SystemSelector
                projects={projects}
                activeId={activeSystemId}
                onSelect={handleSelectSystem}
              />
            </aside>

            <div className="min-w-0 flex-1">
              {architecture && (
                <ArchitectureStage
                  key={architecture.systemId}
                  architecture={architecture}
                  selectedNodeId={activeNodeId}
                  onSelectNode={handleSelectNode}
                />
              )}
            </div>
          </div>

          <section className="mt-16">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
              <Database className="h-5 w-5 text-primary" />
              Additional Systems
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {miniProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl border border-border bg-card/30 p-5"
                >
                  <h3 className="text-sm font-medium">{project.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-secondary/50 px-2 py-0.5 text-xs text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
