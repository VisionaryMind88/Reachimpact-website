import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const FAQSection = () => {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t('faq.question1'),
      answer: t('faq.answer1')
    },
    {
      question: t('faq.question2'),
      answer: t('faq.answer2')
    },
    {
      question: t('faq.question3'),
      answer: t('faq.answer3')
    },
    {
      question: t('faq.question4'),
      answer: t('faq.answer4')
    },
    {
      question: t('faq.question5'),
      answer: t('faq.answer5')
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-accent">{t('faq.title')}</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">{t('faq.subtitle')}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-neutral-200 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-medium text-neutral-800 hover:bg-neutral-50">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-neutral-50 text-neutral-600">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-neutral-600 mb-4">{t('faq.moreQuestions')}</p>
            <Link href="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                {t('faq.contactSupport')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
