import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

const SolutionsSection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("sales");

  const solutions = {
    sales: {
      title: t('solutions.sales.title'),
      description: t('solutions.sales.description'),
      benefits: [
        {
          title: t('solutions.sales.benefit1.title'),
          description: t('solutions.sales.benefit1.description')
        },
        {
          title: t('solutions.sales.benefit2.title'),
          description: t('solutions.sales.benefit2.description')
        },
        {
          title: t('solutions.sales.benefit3.title'),
          description: t('solutions.sales.benefit3.description')
        }
      ],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
    },
    marketing: {
      title: t('solutions.marketing.title'),
      description: t('solutions.marketing.description'),
      benefits: [
        {
          title: t('solutions.marketing.benefit1.title'),
          description: t('solutions.marketing.benefit1.description')
        },
        {
          title: t('solutions.marketing.benefit2.title'),
          description: t('solutions.marketing.benefit2.description')
        },
        {
          title: t('solutions.marketing.benefit3.title'),
          description: t('solutions.marketing.benefit3.description')
        }
      ],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
    },
    recruitment: {
      title: t('solutions.recruitment.title'),
      description: t('solutions.recruitment.description'),
      benefits: [
        {
          title: t('solutions.recruitment.benefit1.title'),
          description: t('solutions.recruitment.benefit1.description')
        },
        {
          title: t('solutions.recruitment.benefit2.title'),
          description: t('solutions.recruitment.benefit2.description')
        },
        {
          title: t('solutions.recruitment.benefit3.title'),
          description: t('solutions.recruitment.benefit3.description')
        }
      ],
      image: "https://images.unsplash.com/photo-1530099486328-e021101a494a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
    }
  };

  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-accent">{t('solutions.title')}</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">{t('solutions.subtitle')}</p>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="sales" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex justify-center mb-8 border-b">
              <TabsTrigger value="sales" className="px-6 py-3 font-medium">
                {t('solutions.tabs.sales')}
              </TabsTrigger>
              <TabsTrigger value="marketing" className="px-6 py-3 font-medium">
                {t('solutions.tabs.marketing')}
              </TabsTrigger>
              <TabsTrigger value="recruitment" className="px-6 py-3 font-medium">
                {t('solutions.tabs.recruitment')}
              </TabsTrigger>
            </TabsList>
            
            {Object.entries(solutions).map(([key, solution]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <motion.div 
                  className="flex flex-col lg:flex-row items-center gap-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full lg:w-1/2 order-2 lg:order-1">
                    <h3 className="text-2xl font-bold mb-4">{solution.title}</h3>
                    <p className="text-neutral-600 mb-6">{solution.description}</p>
                    
                    <div className="space-y-4 mb-8">
                      {solution.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary flex items-center justify-center mr-3 mt-0.5">
                            <i className="fas fa-check text-sm"></i>
                          </div>
                          <div>
                            <h4 className="font-medium text-neutral-800">{benefit.title}</h4>
                            <p className="text-neutral-600">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <a href="#" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                      {t('solutions.learnMore')} <i className="fas fa-arrow-right ml-2 text-sm"></i>
                    </a>
                  </div>
                  <div className="w-full lg:w-1/2 order-1 lg:order-2">
                    <img 
                      src={solution.image} 
                      alt={`${solution.title} - ReachImpact Solution`} 
                      className="w-full h-auto rounded-xl shadow-lg"
                    />
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
