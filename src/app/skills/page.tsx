'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface SkillNodeProps {
  skill: string;
  index: number;
  total: number;
  color: string;
  isActive: boolean;
  onHover: (skill: string | null) => void;
}

function SkillNode({ skill, index, total, color, isActive, onHover }: SkillNodeProps) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const radius = 140;
  const centerX = 180;
  const centerY = 180;
  
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);

  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={() => onHover(null)}
    >
      <motion.div
        className={cn(
          'px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-300',
          'border'
        )}
        style={{
          borderColor: isActive ? color : `${color}50`,
          backgroundColor: isActive ? `${color}20` : 'transparent',
          color: isActive ? color : 'muted-foreground'
        }}
        whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${color}40` }}
      >
        {skill}
      </motion.div>
    </motion.div>
  );
}

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const categorySkills = activeCategory
    ? skillCategories.find(c => c.id === activeCategory)?.skills || []
    : skillCategories.flatMap(c => c.skills);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-20 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Technical Skills
            <span className="text-primary">.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expertise spanning machine learning, infrastructure, and data systems
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {skillCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    'border'
                  )}
                  style={{
                    borderColor: activeCategory === category.id || activeCategory === null ? category.color : `${category.color}30`,
                    backgroundColor: activeCategory === category.id ? `${category.color}20` : 'transparent',
                    color: activeCategory === category.id || activeCategory === null ? category.color : 'muted-foreground'
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="relative w-[400px] h-[400px] mx-auto">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 360">
                <defs>
                  <filter id="skillGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <circle
                  cx="180"
                  cy="180"
                  r="100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary/10"
                />
                <circle
                  cx="180"
                  cy="180"
                  r="140"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="text-primary/20"
                />
                {(activeCategory ? [skillCategories.find(c => c.id === activeCategory)] : skillCategories).map((cat, i) => (
                  <circle
                    key={cat?.id}
                    cx="180"
                    cy="180"
                    r="180"
                    fill="none"
                    stroke={cat?.color}
                    strokeWidth="2"
                    strokeDasharray="8 20"
                    strokeLinecap="round"
                    className="opacity-50"
                    style={{
                      transformOrigin: '180px 180px',
                      animation: `spin ${10 + i * 2}s linear infinite`
                    }}
                  />
                ))}
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">
                    {activeCategory
                      ? skillCategories.find(c => c.id === activeCategory)?.skills.length
                      : skillCategories.reduce((acc, c) => acc + c.skills.length, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Skills</p>
                </div>
              </div>

              {categorySkills.map((skill, i) => (
                <SkillNode
                  key={skill}
                  skill={skill}
                  index={i}
                  total={categorySkills.length}
                  color={
                    activeCategory
                      ? skillCategories.find(c => c.id === activeCategory)?.color || '#00d4ff'
                      : skillCategories.find(c => c.skills.includes(skill))?.color || '#00d4ff'
                  }
                  isActive={activeSkill === skill}
                  onHover={setActiveSkill}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg bg-card/50 border border-primary/20"
              >
                <h3
                  className="text-lg font-semibold mb-3 flex items-center gap-2"
                  style={{ color: category.color }}
                >
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={cn(
                        'px-3 py-1 rounded-md text-sm transition-all duration-300',
                        activeSkill === skill
                          ? 'bg-primary/20 text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}