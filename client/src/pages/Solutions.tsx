import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SolutionsSection from '@/components/features/SolutionsSection';
import TestimonialsSection from '@/components/features/TestimonialsSection';
import NewsletterSection from '@/components/features/NewsletterSection';

const Solutions = () => {
  const { t } = useLanguage();

  // Set page title and meta description for SEO
  useEffect(() => {
    document.title = 'Industry Solutions | ReachImpact';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover tailored ReachImpact solutions for sales teams, marketing agencies, and recruitment companies to automate calling, generate leads, and book more meetings.');
    }
  }, []);

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-primary-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('solutionsPage.title')}</h1>
            <p className="text-lg text-neutral-600 mb-8">{t('solutionsPage.subtitle')}</p>
          </div>
        </div>
      </section>
      
      <SolutionsSection />
      
      {/* Case Studies */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-accent">{t('solutionsPage.caseStudiesTitle')}</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">{t('solutionsPage.caseStudiesSubtitle')}</p>
          </div>
          
          {/* Case studies grid would go here */}
        </div>
      </section>
      
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
};

export default Solutions;
