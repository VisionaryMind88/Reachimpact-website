import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-br from-primary to-accent overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2760%27%20height%3D%2760%27%20viewBox%3D%270%200%2060%2060%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20fill%3D%27white%27%20fill-opacity%3D%271%27%20fill-rule%3D%27evenodd%27%3E%3Cpath%20d%3D%27M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 font-accent">
                {t('hero.title') || 'Revolutionize Your'} <span className="text-secondary-300">{t('hero.titleHighlight') || 'Outreach'}</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0">
                {t('hero.description') || 'ReachImpact uses advanced AI technology to automate your sales and marketing calls, helping you generate more leads, schedule meetings, and improve sales effectiveness—all without lifting a finger.'}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/request-demo">
                  <Button size="lg" variant="default" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                    {t('hero.requestDemo') || 'Request Demo'}
                  </Button>
                </Link>
                <Link href="/buy-minutes">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    {t('hero.buyMinutes') || 'Buy Call Minutes'}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Hero Video Placeholder */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450" 
                alt="ReachImpact AI-Powered Calling Platform Dashboard" 
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition duration-300">
                  <i className="fas fa-play text-primary text-2xl"></i>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
