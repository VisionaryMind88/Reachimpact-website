import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import FeatureCard from '@/components/ui/FeatureCard';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: 'fas fa-robot',
      title: t('features.feature1.title'),
      description: t('features.feature1.description')
    },
    {
      icon: 'fas fa-calendar-check',
      title: t('features.feature2.title'),
      description: t('features.feature2.description')
    },
    {
      icon: 'fas fa-chart-line',
      title: t('features.feature3.title'),
      description: t('features.feature3.description')
    },
    {
      icon: 'fas fa-globe',
      title: t('features.feature4.title'),
      description: t('features.feature4.description')
    },
    {
      icon: 'fas fa-sync-alt',
      title: t('features.feature5.title'),
      description: t('features.feature5.description')
    },
    {
      icon: 'fas fa-shield-alt',
      title: t('features.feature6.title'),
      description: t('features.feature6.description')
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-accent">{t('features.title')}</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">{t('features.subtitle')}</p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>

        {/* Feature Highlight */}
        <div className="rounded-2xl bg-gradient-to-r from-primary-50 to-accent-50 overflow-hidden shadow-lg">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 p-8 lg:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 font-accent">
                {t('features.highlight.title')}
              </h3>
              <p className="text-neutral-600 mb-6">
                {t('features.highlight.description')}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center mr-3 mt-0.5">
                    <i className="fas fa-check text-sm"></i>
                  </div>
                  <span className="text-neutral-700">{t('features.highlight.benefit1')}</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center mr-3 mt-0.5">
                    <i className="fas fa-check text-sm"></i>
                  </div>
                  <span className="text-neutral-700">{t('features.highlight.benefit2')}</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center mr-3 mt-0.5">
                    <i className="fas fa-check text-sm"></i>
                  </div>
                  <span className="text-neutral-700">{t('features.highlight.benefit3')}</span>
                </li>
              </ul>
              <Link href="/request-demo">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  {t('features.highlight.cta')}
                </Button>
              </Link>
            </div>
            <div className="w-full lg:w-1/2 p-4 lg:p-12">
              {/* Feature Demo Video Placeholder */}
              <div className="relative rounded-xl overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450" 
                  alt="ReachImpact Feature Demonstration" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition duration-300">
                    <i className="fas fa-play text-primary text-xl"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
