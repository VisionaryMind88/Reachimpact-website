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
        {pricingType === 'payg' ? (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {pricingPlans.map((plan, index) => {
              const planId = index === 0 ? 'starter' : 
                            index === 1 ? 'professional' : 'enterprise';
              return (
                <PricingCard
                  key={index}
                  name={plan.name}
                  description={plan.description}
                  price={plan.price}
                  unit={plan.unit}
                  totalPrice={plan.totalPrice}
                  totalUnits={plan.totalUnits}
                  features={plan.features}
                  cta="Buy Minutes"
                  popular={plan.popular}
                  planId={planId}
                />
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {pricingPlans.map((plan, index) => {
              const planId = index === 0 ? 'starter-monthly' : 
                            index === 1 ? 'professional-monthly' : 'enterprise-monthly';
              return (
                <div key={index} className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
                  {plan.popular && (
                    <div className="bg-primary text-white text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-neutral-600 mb-4">{plan.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-3xl font-bold">${index === 0 ? '99' : index === 1 ? '299' : '799'}</span>
                      <span className="text-neutral-600">/month</span>
                    </div>
                    
                    <p className="text-sm text-neutral-600 mb-6">
                      {index === 0 ? '800' : index === 1 ? '3,000' : '10,000'} minutes per month
                      <span className="block mt-1">
                        (${index === 0 ? '0.124' : index === 1 ? '0.100' : '0.080'} per minute)
                      </span>
                    </p>
                    
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start">
                          <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                            feature.included ? 'text-green-500' : 'text-neutral-300'
                          }`}>
                            <i className={feature.included ? 'fas fa-check' : 'fas fa-times'}></i>
                          </span>
                          <span className={feature.included ? 'text-neutral-800' : 'text-neutral-400'}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-neutral-50 border-t border-neutral-200">
                    <Link href={`/subscribe?plan=${planId}`}>
                      <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                        Subscribe
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

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
