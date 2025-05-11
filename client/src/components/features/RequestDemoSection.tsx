import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const RequestDemoSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const formSchema = z.object({
    firstName: z.string().min(1, t('requestDemo.validation.firstName')),
    lastName: z.string().min(1, t('requestDemo.validation.lastName')),
    email: z.string().email(t('requestDemo.validation.email')),
    company: z.string().min(1, t('requestDemo.validation.company')),
    phone: z.string().min(5, t('requestDemo.validation.phone')),
    interest: z.string().min(1, t('requestDemo.validation.interest'))
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      phone: '',
      interest: ''
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // In a real implementation, this would submit to your backend API
    console.log('Form submitted:', data);
    
    toast({
      title: t('requestDemo.success.title'),
      description: t('requestDemo.success.message')
    });
  };

  return (
    <section id="request-demo" className="py-20 bg-gradient-to-br from-primary to-accent text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-accent">{t('requestDemo.title')}</h2>
            <p className="text-lg opacity-90 mb-8">{t('requestDemo.description')}</p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center mr-4">
                  <i className="fas fa-check"></i>
                </div>
                <div>
                  <h4 className="text-xl font-medium">{t('requestDemo.benefit1.title')}</h4>
                  <p className="opacity-80">{t('requestDemo.benefit1.description')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center mr-4">
                  <i className="fas fa-check"></i>
                </div>
                <div>
                  <h4 className="text-xl font-medium">{t('requestDemo.benefit2.title')}</h4>
                  <p className="opacity-80">{t('requestDemo.benefit2.description')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center mr-4">
                  <i className="fas fa-check"></i>
                </div>
                <div>
                  <h4 className="text-xl font-medium">{t('requestDemo.benefit3.title')}</h4>
                  <p className="opacity-80">{t('requestDemo.benefit3.description')}</p>
                </div>
              </div>
            </div>

            {/* E-book Download */}
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                  <div className="w-20 h-24 bg-white/20 rounded-md flex items-center justify-center">
                    <i className="fas fa-file-pdf text-white text-3xl"></i>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">{t('requestDemo.ebook.title')}</h4>
                  <p className="opacity-80 mb-4">{t('requestDemo.ebook.description')}</p>
                  <Button variant="default" className="bg-white text-primary hover:bg-white/90">
                    <i className="fas fa-download mr-2"></i> {t('requestDemo.ebook.cta')}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Demo Request Form */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden text-neutral-800">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6">{t('requestDemo.form.title')}</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('requestDemo.form.firstName')}</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('requestDemo.form.lastName')}</FormLabel>
                            <FormControl>
                              <Input placeholder="Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('requestDemo.form.email')}</FormLabel>
                          <FormControl>
                            <Input placeholder="you@company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('requestDemo.form.company')}</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Inc." {...field} />
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
                          <FormLabel>{t('requestDemo.form.phone')}</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="interest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('requestDemo.form.interest')}</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('requestDemo.form.interestPlaceholder')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sales">{t('requestDemo.form.interestOptions.sales')}</SelectItem>
                              <SelectItem value="marketing">{t('requestDemo.form.interestOptions.marketing')}</SelectItem>
                              <SelectItem value="appointments">{t('requestDemo.form.interestOptions.appointments')}</SelectItem>
                              <SelectItem value="other">{t('requestDemo.form.interestOptions.other')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div>
                      <h4 className="text-sm font-medium text-neutral-700 mb-3">
                        {t('requestDemo.form.calendarTitle')}
                      </h4>
                      {/* Calendar Integration Placeholder */}
                      <div className="border border-neutral-200 rounded-md p-4 bg-neutral-50">
                        <div className="text-center py-8">
                          <i className="far fa-calendar-alt text-3xl text-neutral-400 mb-2"></i>
                          <p className="text-neutral-500">{t('requestDemo.form.calendarLoading')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      {t('requestDemo.form.submit')}
                    </Button>
                    
                    <p className="text-xs text-neutral-500 text-center">
                      {t('requestDemo.form.disclaimer')} 
                      <a href="#" className="text-primary hover:underline">{t('requestDemo.form.privacy')}</a> {t('requestDemo.form.and')} 
                      <a href="#" className="text-primary hover:underline">{t('requestDemo.form.terms')}</a>.
                    </p>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RequestDemoSection;
