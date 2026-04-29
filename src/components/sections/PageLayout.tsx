'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, Cpu, Network, User, Mail, Home } from 'lucide-react';
import { personalInfo } from '@/lib/constants';

const navItems = [
  { href: '/systems', label: 'Systems', icon: Network },
  { href: '/about', label: 'About', icon: User },
  { href: '/contact', label: 'Contact', icon: Mail },
];

function PageLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-background/50 backdrop-blur-sm border-b border-border'
        )}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-14">
            <Link href="/" className="text-lg font-bold flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              <span className="text-primary">{personalInfo.name.split(' ')[0]}</span>
              <span className="text-muted-foreground text-sm hidden sm:inline">{personalInfo.name.split(' ').slice(1).join(' ')}</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        'relative',
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      )}
                    >
                      {item.label}
                      {isActive && (
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
                <Button variant="ghost" size="lg">
                  <Home className="mr-2 h-5 w-5" />
                  Home
                </Button>
              </Link>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" size="lg">
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-14">
        {children}
      </main>

      <footer className="py-6 border-t border-border mt-auto">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {personalInfo.name}. Building Intelligent Systems at Scale.</p>
        </div>
      </footer>
    </>
  );
}

export default PageLayout;