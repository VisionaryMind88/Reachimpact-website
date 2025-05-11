import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // In a real implementation, this would send to your backend API
    console.log('Newsletter subscription:', email);
    
    toast({
      title: t('newsletter.success.title'),
      description: t('newsletter.success.message')
    });
    
    setEmail('');
  };

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('newsletter.title')}</h2>
          <p className="text-neutral-600 mb-8">{t('newsletter.description')}</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-lg mx-auto">
            <Input
              type="email"
              placeholder={t('newsletter.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow rounded-l-md sm:rounded-none border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mb-2 sm:mb-0"
            />
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-r-md sm:rounded-none"
            >
              {t('newsletter.subscribe')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
