'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { personalInfo, experience, coreCompetencies } from '@/lib/constants';
import { Mail, Phone, MapPin, Sparkles, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="container py-12 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <Link href="/portfolio/">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Home className="mr-1 h-4 w-4" />
                Home
              </Button>
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-primary">About</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center">
            About<span className="text-primary">.</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-10 mb-14">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-5"
              >
                <p className="text-base text-muted-foreground">
                  {personalInfo.name} is a Lead AI/ML Engineer with 7+ years of experience building production-grade AI systems. 
                  Specialized in GenAI, RAG architectures, and end-to-end ML infrastructure.
                </p>
                <p className="text-base text-muted-foreground">
                  I&apos;ve shipped AI systems across fintech and healthcare that process millions of documents daily, 
                  serving both enterprise customers and healthcare providers.
                </p>
                <p className="text-base text-muted-foreground">
                  My focus: building systems that work, scale, and deliver real business value—not just impressive benchmarks.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-6 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href={`mailto:${personalInfo.email}`} className="hover:text-primary">{personalInfo.email}</a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href={`tel:${personalInfo.phone}`} className="hover:text-primary">{personalInfo.phone}</a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{personalInfo.location}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6"
              >
                <Link href="/portfolio/contact">
                  <Button className="bg-primary hover:bg-primary/90">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Get in touch
                  </Button>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-card/50 border-primary/20">
                <CardContent className="pt-5">
                  <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Work Experience
                  </h3>
                  <div className="space-y-4">
                    {experience.map((exp, i) => (
                      <div key={i} className="relative">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <p className="font-medium text-sm">{exp.role}</p>
                        </div>
                        <div className="ml-3.5 pl-1 border-l border-primary/30">
                          <p className="text-xs text-primary">{exp.company} · {exp.period}</p>
                          <ul className="mt-1 space-y-0.5">
                            {exp.highlights.slice(0, 2).map((h, j) => (
                              <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                <span className="text-primary/60">•</span>
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-14"
          >
            <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Core Competencies
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {coreCompetencies.map((comp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.1 }}
                >
                  <Card className="bg-card/30 border-primary/10 hover:border-primary/30 transition-colors">
                    <CardContent className="pt-4">
                      <h3 className="font-semibold mb-2.5 flex items-center gap-2" style={{ color: comp.color }}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: comp.color }} />
                        {comp.category}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {comp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded-md bg-background/50 text-xs text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-5">Key Achievements</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                '92% latency reduction in RAG',
                '15K+ docs/day processing',
                '94.2% F1 on clinical NER',
                '10K+ daily queries served',
                '80% faster deployment',
                'Real-time fraud detection'
              ].map((achievement, i) => (
                <Card key={i} className="bg-card/30 border-primary/10">
                  <CardContent className="py-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <p className="text-xs">{achievement}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}