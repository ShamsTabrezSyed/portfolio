'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Network, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/lib/constants';
import { ParticleBackground } from '@/components/three/ParticleBackground';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center overflow-hidden">
                  <img 
                    src="public/profile.png" 
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {personalInfo.title}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          >
            {personalInfo.name}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-2xl md:text-3xl font-semibold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-purple-500">
              {personalInfo.tagline}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            {personalInfo.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-base px-8">
              <a href="/systems" className="flex items-center">
                <Cpu className="mr-2 h-5 w-5" />
                View Systems
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 text-base px-8">
              <a href="/systems#architecture" className="flex items-center">
                <Network className="mr-2 h-5 w-5" />
                Architecture
              </a>
            </Button>
            <Button size="lg" variant="ghost" className="text-muted-foreground hover:text-primary text-base px-8">
              <a href="/contact" className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Contact
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}