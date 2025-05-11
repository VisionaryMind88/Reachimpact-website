import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import RequestDemoSection from '@/components/features/RequestDemoSection';
import FAQSection from '@/components/features/FAQSection';
import TestimonialsSection from '@/components/features/TestimonialsSection';

const RequestDemo = () => {
  const { t } = useLanguage();

  // Set page title and meta description for SEO
  useEffect(() => {
    document.title = 'Request a Demo | ReachImpact';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Schedule a personalized demo of ReachImpact\'s AI-powered calling platform and see how it can transform your outreach strategy and boost your sales effectiveness.');
    }
  }, []);

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-primary-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('requestDemoPage.title')}</h1>
            <p className="text-lg text-neutral-600 mb-8">{t('requestDemoPage.subtitle')}</p>
          </div>
        </div>
      </section>
      
      <RequestDemoSection />
      
      {/* Demo Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-accent">{t('requestDemoPage.benefitsTitle')}</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">{t('requestDemoPage.benefitsSubtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Benefit 1 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary-100 text-primary mx-auto flex items-center justify-center mb-4 text-2xl">
                <i className="fas fa-desktop"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{t('requestDemoPage.benefit1.title')}</h3>
              <p className="text-neutral-600">{t('requestDemoPage.benefit1.description')}</p>
            </div>
            
            {/* Benefit 2 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary-100 text-primary mx-auto flex items-center justify-center mb-4 text-2xl">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{t('requestDemoPage.benefit2.title')}</h3>
              <p className="text-neutral-600">{t('requestDemoPage.benefit2.description')}</p>
            </div>
            
            {/* Benefit 3 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary-100 text-primary mx-auto flex items-center justify-center mb-4 text-2xl">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{t('requestDemoPage.benefit3.title')}</h3>
              <p className="text-neutral-600">{t('requestDemoPage.benefit3.description')}</p>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      <FAQSection />
    </>
  );
};

export default RequestDemo;
