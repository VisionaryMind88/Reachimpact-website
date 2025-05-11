import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { motion } from 'framer-motion';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import NewsletterSection from '@/components/features/NewsletterSection';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  // Set page title and meta description for SEO
  useEffect(() => {
    document.title = 'Contact Us | ReachImpact';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get in touch with the ReachImpact team for questions about our AI-powered calling platform, pricing, or to schedule a personalized demo.');
    }
  }, []);

  const formSchema = z.object({
    name: z.string().min(1, t('contact.validation.name')),
    email: z.string().email(t('contact.validation.email')),
    company: z.string().min(1, t('contact.validation.company')),
    phone: z.string().optional(),
    subject: z.string().min(1, t('contact.validation.subject')),
    message: z.string().min(10, t('contact.validation.message'))
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await apiRequest('POST', '/api/contact', data);
      toast({
        title: t('contact.success.title'),
        description: t('contact.success.message')
      });
      form.reset();
    } catch (error) {
      toast({
        title: t('contact.error.title'),
        description: t('contact.error.message'),
        variant: 'destructive'
      });
    }
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-primary-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('contact.title')}</h1>
            <p className="text-lg text-neutral-600 mb-8">{t('contact.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">{t('contact.infoTitle')}</h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 text-primary flex items-center justify-center mr-4">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{t('contact.addressTitle')}</h3>
                    <p className="text-neutral-600">
                      123 AI Boulevard<br />
                      Tech District<br />
                      Amsterdam, 1017 AC<br />
                      Netherlands
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 text-primary flex items-center justify-center mr-4">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{t('contact.emailTitle')}</h3>
                    <p className="text-neutral-600">
                      info@reachimpact.com<br />
                      support@reachimpact.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 text-primary flex items-center justify-center mr-4">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{t('contact.phoneTitle')}</h3>
                    <p className="text-neutral-600">
                      +31 20 123 4567<br />
                      +1 650 543 2109
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 text-primary flex items-center justify-center mr-4">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{t('contact.hoursTitle')}</h3>
                    <p className="text-neutral-600">
                      {t('contact.weekdayHours')}<br />
                      {t('contact.weekendClosed')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-neutral-100"
            >
              <h2 className="text-2xl font-bold mb-6">{t('contact.formTitle')}</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.name')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.namePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.email')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('contact.form.emailPlaceholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.phone')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('contact.form.phonePlaceholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.company')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.companyPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.subject')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.subjectPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.message')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t('contact.form.messagePlaceholder')} 
                            rows={4}
                            className="resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    {t('contact.form.submit')}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>

          {/* Map */}
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-lg h-96 bg-neutral-200">
              {/* This would be a real map integration in production */}
              <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                <div className="text-center">
                  <i className="fas fa-map-marker-alt text-4xl text-primary mb-4"></i>
                  <p className="text-neutral-600">{t('contact.mapPlaceholder')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
};

export default Contact;
