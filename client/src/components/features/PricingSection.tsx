import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'wouter';
import PricingCard from '@/components/ui/PricingCard';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const PricingSection = () => {
  const { t } = useLanguage();
  const [pricingType, setPricingType] = useState<'payg' | 'subscription'>('payg');

  const pricingPlans = [
    {
      name: t('pricing.starter.name'),
      description: t('pricing.starter.description'),
      price: 0.12,
      unit: t('pricing.perMinute'),
      totalPrice: '$120',
      totalUnits: '1,000',
      features: [
        { name: t('pricing.starter.feature1'), included: true },
        { name: t('pricing.starter.feature2'), included: true },
        { name: t('pricing.starter.feature3'), included: true },
        { name: t('pricing.starter.feature4'), included: false },
      ],
      cta: t('pricing.buyMinutes'),
      popular: false
    },
    {
      name: t('pricing.professional.name'),
      description: t('pricing.professional.description'),
      price: 0.09,
      unit: t('pricing.perMinute'),
      totalPrice: '$450',
      totalUnits: '5,000',
      features: [
        { name: t('pricing.professional.feature1'), included: true },
        { name: t('pricing.professional.feature2'), included: true },
        { name: t('pricing.professional.feature3'), included: true },
        { name: t('pricing.professional.feature4'), included: true },
      ],
      cta: t('pricing.buyMinutes'),
      popular: true
    },
    {
      name: t('pricing.enterprise.name'),
      description: t('pricing.enterprise.description'),
      price: 0.07,
      unit: t('pricing.perMinute'),
      totalPrice: '$1,050',
      totalUnits: '15,000',
      features: [
        { name: t('pricing.enterprise.feature1'), included: true },
        { name: t('pricing.enterprise.feature2'), included: true },
        { name: t('pricing.enterprise.feature3'), included: true },
        { name: t('pricing.enterprise.feature4'), included: true },
      ],
      cta: t('pricing.buyMinutes'),
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-accent">{t('pricing.title')}</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">{t('pricing.subtitle')}</p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center p-1 bg-white rounded-lg shadow-sm">
            <button
              className={`px-6 py-2 ${
                pricingType === 'payg'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-neutral-600 hover:text-neutral-800'
              } font-medium rounded-md transition-colors`}
              onClick={() => setPricingType('payg')}
            >
              {t('pricing.payg')}
            </button>
            <button
              className={`px-6 py-2 ${
                pricingType === 'subscription'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-neutral-600 hover:text-neutral-800'
              } font-medium rounded-md transition-colors`}
              onClick={() => setPricingType('subscription')}
            >
              {t('pricing.subscription')}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              name={plan.name}
              description={plan.description}
              price={plan.price}
              unit={plan.unit}
              totalPrice={plan.totalPrice}
              totalUnits={plan.totalUnits}
              features={plan.features}
              cta={plan.cta}
              popular={plan.popular}
            />
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-neutral-600 mb-4">{t('pricing.custom')}</p>
          <Link href="/contact">
            <Button variant="link" className="text-primary hover:text-primary/80">
              {t('pricing.contactSales')} <i className="fas fa-arrow-right ml-2 text-sm"></i>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
