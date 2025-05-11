import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

const HowItWorksSection = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: 'fas fa-upload',
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description')
    },
    {
      icon: 'fas fa-sliders-h',
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description')
    },
    {
      icon: 'fas fa-rocket',
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description')
    }
  ];

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-accent">{t('howItWorks.title')}</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">{t('howItWorks.subtitle')}</p>
        </div>

        <div className="relative">
          {/* Progress Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-24 left-0 w-full h-1 bg-primary-100">
            <div className="absolute left-[16.67%] -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-md"></div>
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-md"></div>
            <div className="absolute left-[83.33%] -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-md"></div>
          </div>

          <motion.div 
            className="grid lg:grid-cols-3 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center text-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-100 text-primary flex items-center justify-center mb-6 text-2xl">
                  <i className={step.icon}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/request-demo">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              {t('howItWorks.cta')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
