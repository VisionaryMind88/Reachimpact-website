import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import TestimonialsSection from '@/components/features/TestimonialsSection';
import RequestDemoSection from '@/components/features/RequestDemoSection';

const Testimonials = () => {
  const { t } = useLanguage();

  // Set page title and meta description for SEO
  useEffect(() => {
    document.title = 'Customer Testimonials | ReachImpact';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read success stories from ReachImpact customers who have transformed their outreach strategies and achieved impressive ROI with our AI calling platform.');
    }
  }, []);

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-primary-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('testimonialsPage.title')}</h1>
            <p className="text-lg text-neutral-600 mb-8">{t('testimonialsPage.subtitle')}</p>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      
      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-accent">{t('testimonialsPage.storiesTitle')}</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">{t('testimonialsPage.storiesSubtitle')}</p>
          </div>
          
          {/* Success stories grid would go here */}
        </div>
      </section>
      
      <RequestDemoSection />
    </>
  );
};

export default Testimonials;
