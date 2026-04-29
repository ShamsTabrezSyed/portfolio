'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArchitectureGraph } from '@/components/graphs/ArchitectureGraph';
import { projects, miniProjects, Project } from '@/lib/constants';
import { ArrowRight, TrendingUp, Zap, Database, Cpu, Sparkles, Home } from 'lucide-react';
import Link from 'next/link';

interface ProjectCaseStudyProps {
  project: Project;
}

function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                  {project.category}
                </span>
              </div>
              <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
              <CardDescription className="text-sm mt-1">{project.description}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm font-semibold text-primary mb-1 flex items-center gap-2">
                <Zap className="h-3 w-3" /> Problem
              </h4>
              <p className="text-muted-foreground text-sm">{project.problem}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-primary mb-1 flex items-center gap-2">
                <Cpu className="h-3 w-3" /> Approach
              </h4>
              <p className="text-muted-foreground text-sm">{project.approach}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {project.metrics.map((metric, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-background/50 border border-border"
              >
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className="text-base font-bold text-primary">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
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
            <div className="flex items-center gap-1.5 text-primary text-sm">
              <TrendingUp className="h-3 w-3" />
              <span className="font-medium">{project.impact.metric}:</span>
              <span>{project.impact.value}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface MiniProjectCardProps {
  project: typeof miniProjects[0];
}

function MiniProjectCard({ project }: MiniProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card
        className="cursor-pointer bg-card/30 border-primary/10 hover:border-primary/40 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium flex items-center justify-between">
            {project.title}
            <ArrowRight className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </CardTitle>
        </CardHeader>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <CardContent className="pt-0 pb-3">
                <p className="text-xs text-muted-foreground mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-secondary/30 text-secondary-foreground text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

export default function SystemsPage() {
  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="container py-12 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Link href="/portfolio/">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Home className="mr-1 h-4 w-4" />
                Home
              </Button>
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-primary">Systems</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Built Systems
            <span className="text-primary">.</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Production-grade AI systems solving real-world problems at scale
          </p>
        </motion.div>

        <div className="space-y-16" id="systems">
          <section>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Core Projects
            </h2>
            <div className="grid gap-6">
              {projects.map((project) => (
                <ProjectCaseStudy key={project.id} project={project} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Additional Systems
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {miniProjects.map((project) => (
                <MiniProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
          id="architecture"
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary" />
            Interactive Architecture
          </h2>
          <Card className="bg-card/30 border-primary/20 p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Click on nodes to explore a typical RAG pipeline architecture. Data flows from user input through retrieval, reranking, and LLM generation.
            </p>
            <ArchitectureGraph className="h-[300px]" />
          </Card>
        </motion.section>
      </div>
    </div>
  );
}