import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import FeaturesSection from '@/components/features/FeaturesSection';
import HowItWorksSection from '@/components/features/HowItWorksSection';
import NewsletterSection from '@/components/features/NewsletterSection';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const Features = () => {
  const { t } = useLanguage();

  // Set page title and meta description for SEO
  useEffect(() => {
    document.title = 'Features | ReachImpact';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover the powerful features of ReachImpact, including AI voice assistant, automated scheduling, and analytics that drive results for your business.');
    }
  }, []);

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-primary-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('featuresPage.title')}</h1>
            <p className="text-lg text-neutral-600 mb-8">{t('featuresPage.subtitle')}</p>
            <Link href="/request-demo">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                {t('featuresPage.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <FeaturesSection />
      <HowItWorksSection />
      
      {/* Additional Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-accent">{t('featuresPage.additionalTitle')}</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">{t('featuresPage.additionalSubtitle')}</p>
          </div>
          
          {/* Additional features grid would go here */}
        </div>
      </section>
      
      <NewsletterSection />
    </>
  );
};

export default Features;
