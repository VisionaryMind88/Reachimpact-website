import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { FaRobot } from 'react-icons/fa';

const Navbar = () => {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/features', label: t('nav.features') || 'Features' },
    { href: '/pricing', label: t('nav.pricing') || 'Pricing' },
    { href: '/solutions', label: t('nav.solutions') || 'Solutions' },
    { href: '/testimonials', label: t('nav.testimonials') || 'Testimonials' },
    { href: '/blog', label: t('nav.blog') || 'Blog' }
  ];

  const closeSheet = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="text-primary text-3xl">
                <FaRobot />
              </div>
              <span className="font-accent font-bold text-xl md:text-2xl text-neutral-800">
                Reach<span className="text-primary">Impact</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div 
                key={link.href} 
                className="text-neutral-600 hover:text-primary font-medium transition duration-150 cursor-pointer"
                onClick={() => setLocation(link.href)}
              >
                {link.label || (link.href === '/features' ? 'Features' : 
                  link.href === '/pricing' ? 'Pricing' : 
                  link.href === '/solutions' ? 'Solutions' : 
                  link.href === '/testimonials' ? 'Testimonials' : 
                  link.href === '/blog' ? 'Blog' : 'Link')}
              </div>
            ))}
          </div>

          {/* Right side: CTA & Language Selector */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSelector />
            
            <div 
              className="inline-flex items-center px-4 py-2 border border-primary text-primary font-medium rounded-md hover:bg-primary-50 transition duration-150 cursor-pointer"
              onClick={() => setLocation('/request-demo')}
            >
              {t('nav.requestDemo') || 'Request Demo'}
            </div>
            
            <div 
              className="inline-flex items-center px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition duration-150 cursor-pointer"
              onClick={() => setLocation('/buy-minutes')}
            >
              {t('nav.buyMinutes') || 'Buy Call Minutes'}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 pt-4">
                {navLinks.map((link) => (
                  <div 
                    key={link.href}
                    className="block px-3 py-2 text-neutral-600 hover:bg-primary-50 hover:text-primary rounded-md cursor-pointer"
                    onClick={() => {
                      closeSheet();
                      setLocation(link.href);
                    }}
                  >
                    {link.label || (link.href === '/features' ? 'Features' : 
                      link.href === '/pricing' ? 'Pricing' : 
                      link.href === '/solutions' ? 'Solutions' : 
                      link.href === '/testimonials' ? 'Testimonials' : 
                      link.href === '/blog' ? 'Blog' : 'Link')}
                  </div>
                ))}
                <div className="pt-4 flex flex-col space-y-3">
                  <div className="px-3">
                    <label htmlFor="language-select" className="block text-sm font-medium text-neutral-700 mb-1">
                      {t('nav.language') || 'Language'}
                    </label>
                    <LanguageSelector mobile />
                  </div>
                  <div 
                    className="mx-3 px-4 py-2 border border-primary text-primary font-medium rounded-md hover:bg-primary-50 text-center cursor-pointer"
                    onClick={() => {
                      closeSheet();
                      setLocation('/request-demo');
                    }}
                  >
                    {t('nav.requestDemo') || 'Request Demo'}
                  </div>
                  <div 
                    className="mx-3 px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 text-center cursor-pointer"
                    onClick={() => {
                      closeSheet();
                      setLocation('/buy-minutes');
                    }}
                  >
                    {t('nav.buyMinutes') || 'Buy Call Minutes'}
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
