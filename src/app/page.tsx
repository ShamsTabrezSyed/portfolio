'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { HeroSection } from '@/components/sections/HeroSection';
import { GlitchLogo } from '@/components/ui/GlitchLogo';

const navItems = [
  { href: '/systems', label: 'Systems' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

function Navigation({ showLogo = true }: { showLogo?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    return pathname === href || pathname === href.replace('/portfolio', '');
  };

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled || !showLogo
            ? 'bg-background/80 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-14">
            {showLogo ? (
              <Link href="/">
                <GlitchLogo baseName="Shams" className="text-xl font-bold" />
              </Link>
            ) : (
              <Link href="/portfolio" className="text-lg font-bold">
                <span className="text-primary">Shams</span>
              </Link>
            )}

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        'relative text-base',
                        active ? 'text-primary' : 'text-muted-foreground'
                      )}
                    >
                      {item.label}
                      {active && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        />
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 pt-16">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" size="lg" className="text-lg">
                  Home
                </Button>
              </Link>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" size="lg" className="text-lg">
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-10 text-center">
              {[
                { value: '500K+', label: 'Documents Indexed' },
                { value: '92%', label: 'Latency Reduction' },
                { value: '94.2%', label: 'Model Accuracy' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</p>
                  <p className="text-base text-muted-foreground mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Shams Tabrez Syed. Building Intelligent Systems at Scale.</p>
        </div>
      </footer>
    </>
  );
}