import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import PricingSection from '@/components/features/PricingSection';
import FAQSection from '@/components/features/FAQSection';
import NewsletterSection from '@/components/features/NewsletterSection';

const Pricing = () => {
  const { t } = useLanguage();

  // Set page title and meta description for SEO
  useEffect(() => {
    document.title = 'Pricing | ReachImpact';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore ReachImpact\'s transparent pricing plans for AI-powered calling automation. Choose between pay-as-you-go or subscription options to fit your business needs.');
    }
  }, []);

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-primary-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('pricingPage.title')}</h1>
            <p className="text-lg text-neutral-600 mb-8">{t('pricingPage.subtitle')}</p>
          </div>
        </div>
      </section>
      
      <PricingSection />
      
      {/* Pricing Comparison */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-accent">{t('pricingPage.comparisonTitle')}</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">{t('pricingPage.comparisonSubtitle')}</p>
          </div>
          
          {/* Pricing comparison table would go here */}
        </div>
      </section>
      
      <FAQSection />
      <NewsletterSection />
    </>
  );
};

export default Pricing;
