'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, Link2, Mail, Terminal, Send, ExternalLink, Phone, MapPin, Home, ArrowLeft } from 'lucide-react';
import { personalInfo } from '@/lib/constants';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="container py-12 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Home className="mr-1 h-4 w-4" />
                Home
              </Button>
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-primary">Contact</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">
            Get in touch<span className="text-primary">.</span>
          </h1>
          <p className="text-base text-muted-foreground mb-10 text-center">
            Interested in collaborating on AI systems? Let&apos;s talk.
          </p>

          <Card className="bg-card/50 border-primary/20 mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">Email</h2>
                <p className="text-sm text-muted-foreground text-center">
                  For project inquiries, speaking opportunities, or just to say hello
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 w-full max-w-[250px]">
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center justify-center w-full">
                    <Send className="mr-2 h-4 w-4" />
                    {personalInfo.email}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card className="bg-card/30 border-primary/10 hover:border-primary/40 transition-colors">
              <CardContent className="pt-4">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Link2 className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">LinkedIn</p>
                    <p className="text-xs text-muted-foreground">Connect</p>
                  </div>
                  <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
                </a>
              </CardContent>
            </Card>

            <Card className="bg-card/30 border-primary/10 hover:border-primary/40 transition-colors">
              <CardContent className="pt-4">
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-2"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Phone</p>
                    <p className="text-xs text-muted-foreground">{personalInfo.phone}</p>
                  </div>
                </a>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/30 border-primary/10">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="text-base font-semibold">Location</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                {personalInfo.location}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}