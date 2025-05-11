import HeroSection from '@/components/features/HeroSection';
import TrustedBySection from '@/components/features/TrustedBySection';
import FeaturesSection from '@/components/features/FeaturesSection';
import HowItWorksSection from '@/components/features/HowItWorksSection';
import SolutionsSection from '@/components/features/SolutionsSection';
import PricingSection from '@/components/features/PricingSection';
import TestimonialsSection from '@/components/features/TestimonialsSection';
import RequestDemoSection from '@/components/features/RequestDemoSection';
import FAQSection from '@/components/features/FAQSection';
import NewsletterSection from '@/components/features/NewsletterSection';
import { useEffect } from 'react';

const Home = () => {
  // Set page title and meta description for SEO
  useEffect(() => {
    document.title = 'ReachImpact | AI-Powered Marketing & Sales Calling Automation';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'ReachImpact is an AI-powered marketing and sales calling automation platform that helps businesses generate leads, schedule meetings, and improve sales effectiveness.');
    }
  }, []);

  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <HowItWorksSection />
      <SolutionsSection />
      <PricingSection />
      <TestimonialsSection />
      <RequestDemoSection />
      <FAQSection />
      <NewsletterSection />
    </>
  );
};

export default Home;
