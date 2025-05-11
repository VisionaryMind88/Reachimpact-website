import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FAQSection from '@/components/features/FAQSection';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder');

const BuyMinutes = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("professional");

  // Plans data
  const plans = {
    starter: {
      name: t('pricing.starter.name'),
      price: 120,
      minutes: 1000,
      pricePerMinute: 0.12
    },
    professional: {
      name: t('pricing.professional.name'),
      price: 450,
      minutes: 5000,
      pricePerMinute: 0.09
    },
    enterprise: {
      name: t('pricing.enterprise.name'),
      price: 1050,
      minutes: 15000,
      pricePerMinute: 0.07
    }
  };

  // Set page title and meta description for SEO
  useEffect(() => {
    document.title = 'Buy Call Minutes | ReachImpact';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Purchase AI calling minutes for your outbound campaigns. Choose from flexible pricing plans with no long-term commitments required.');
    }
  }, []);

  const formSchema = z.object({
    firstName: z.string().min(1, t('buyMinutes.validation.firstName')),
    lastName: z.string().min(1, t('buyMinutes.validation.lastName')),
    email: z.string().email(t('buyMinutes.validation.email')),
    company: z.string().min(1, t('buyMinutes.validation.company')),
    plan: z.string().min(1, t('buyMinutes.validation.plan'))
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      plan: 'professional'
    }
  });

  // When the plan changes in the form
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.plan) {
        setSelectedPlan(value.plan);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      const plan = plans[selectedPlan as keyof typeof plans];
      
      // Create payment intent with Stripe
      const response = await apiRequest('POST', '/api/create-payment-intent', {
        ...data,
        amount: plan.price,
        minutes: plan.minutes
      });
      
      const responseData = await response.json();
      
      if (!responseData.clientSecret) {
        throw new Error('No client secret received');
      }
      
      // Store checkout data in localStorage to be used in checkout page
      localStorage.setItem('stripe_checkout_data', JSON.stringify({
        clientSecret: responseData.clientSecret,
        orderSummary: {
          planName: plan.name,
          minutes: plan.minutes,
          pricePerMinute: plan.pricePerMinute,
          totalPrice: plan.price
        }
      }));
      
      // Redirect to checkout page
      window.location.href = '/checkout';
      
    } catch (error: any) {
      toast({
        title: t('buyMinutes.error.title'),
        description: error.message || t('buyMinutes.error.message'),
        variant: 'destructive'
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-primary-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('buyMinutes.title')}</h1>
            <p className="text-lg text-neutral-600 mb-8">{t('buyMinutes.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="payg" className="mb-12">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="payg">{t('pricing.payg')}</TabsTrigger>
                <TabsTrigger value="subscription">{t('pricing.subscription')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="payg">
                <div className="grid md:grid-cols-2 gap-12">
                  {/* Plan Selection */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold mb-6">{t('buyMinutes.selectPlan')}</h2>
                    
                    {/* Plan Cards */}
                    <div className="space-y-4">
                      {Object.entries(plans).map(([key, plan]) => (
                        <div 
                          key={key}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedPlan === key 
                              ? 'border-primary bg-primary-50' 
                              : 'border-neutral-200 hover:border-primary/50'
                          }`}
                          onClick={() => {
                            form.setValue('plan', key);
                            setSelectedPlan(key);
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">{plan.name}</h3>
                              <p className="text-sm text-neutral-600">{plan.minutes} {t('buyMinutes.callMinutes')}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">${plan.price}</p>
                              <p className="text-xs text-neutral-500">${plan.pricePerMinute} {t('pricing.perMinute')}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-neutral-50 p-6 rounded-lg">
                      <h3 className="font-medium mb-2">{t('buyMinutes.planIncludes')}</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="flex-shrink-0 text-primary mr-2">
                            <i className="fas fa-check"></i>
                          </div>
                          <span className="text-neutral-700">{t('buyMinutes.feature1')}</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 text-primary mr-2">
                            <i className="fas fa-check"></i>
                          </div>
                          <span className="text-neutral-700">{t('buyMinutes.feature2')}</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 text-primary mr-2">
                            <i className="fas fa-check"></i>
                          </div>
                          <span className="text-neutral-700">{t('buyMinutes.feature3')}</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 text-primary mr-2">
                            <i className="fas fa-check"></i>
                          </div>
                          <span className="text-neutral-700">{t('buyMinutes.feature4')}</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                  
                  {/* Checkout Form */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-neutral-100"
                  >
                    <h2 className="text-2xl font-bold mb-6">{t('buyMinutes.checkoutTitle')}</h2>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('buyMinutes.form.firstName')}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t('buyMinutes.form.firstNamePlaceholder')} {...field} />
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
                                <FormLabel>{t('buyMinutes.form.lastName')}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t('buyMinutes.form.lastNamePlaceholder')} {...field} />
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
                              <FormLabel>{t('buyMinutes.form.email')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('buyMinutes.form.emailPlaceholder')} {...field} />
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
                              <FormLabel>{t('buyMinutes.form.company')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('buyMinutes.form.companyPlaceholder')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="plan"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('buyMinutes.form.plan')}</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={t('buyMinutes.form.selectPlan')} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="starter">{plans.starter.name} - ${plans.starter.price}</SelectItem>
                                  <SelectItem value="professional">{plans.professional.name} - ${plans.professional.price}</SelectItem>
                                  <SelectItem value="enterprise">{plans.enterprise.name} - ${plans.enterprise.price}</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Payment info placeholder - in a real implementation this would connect to Stripe */}
                        <div className="space-y-4">
                          <h3 className="font-medium">{t('buyMinutes.paymentInfo')}</h3>
                          <div className="p-4 bg-neutral-50 rounded border border-neutral-200">
                            <div className="text-center py-4">
                              <i className="far fa-credit-card text-2xl text-neutral-400 mb-2"></i>
                              <p className="text-neutral-600">{t('buyMinutes.cardDetailsPlaceholder')}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-neutral-600">{t('buyMinutes.subtotal')}</span>
                            <span>${plans[selectedPlan as keyof typeof plans].price}</span>
                          </div>
                          <div className="flex justify-between items-center font-bold text-lg mb-6">
                            <span>{t('buyMinutes.total')}</span>
                            <span>${plans[selectedPlan as keyof typeof plans].price}</span>
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-primary hover:bg-primary/90"
                            disabled={isLoading}
                          >
                            {isLoading ? t('buyMinutes.processing') : t('buyMinutes.completeOrder')}
                          </Button>
                          
                          <p className="text-xs text-neutral-500 text-center mt-4">
                            {t('buyMinutes.secureCheckout')}
                          </p>
                        </div>
                      </form>
                    </Form>
                  </motion.div>
                </div>
              </TabsContent>
              
              <TabsContent value="subscription">
                <div className="text-center p-10 bg-neutral-50 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">{t('buyMinutes.subscriptionComingSoon.title')}</h3>
                  <p className="text-neutral-600 mb-6">{t('buyMinutes.subscriptionComingSoon.message')}</p>
                  <Button variant="outline" onClick={() => document.querySelector('[data-value="payg"]')?.click()}>
                    {t('buyMinutes.subscriptionComingSoon.cta')}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Additional Information */}
            <div className="mt-20 grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-neutral-100 mx-auto flex items-center justify-center mb-4 text-2xl text-neutral-700">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('buyMinutes.securityTitle')}</h3>
                <p className="text-neutral-600">{t('buyMinutes.securityText')}</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-neutral-100 mx-auto flex items-center justify-center mb-4 text-2xl text-neutral-700">
                  <i className="fas fa-sync-alt"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('buyMinutes.refundTitle')}</h3>
                <p className="text-neutral-600">{t('buyMinutes.refundText')}</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-neutral-100 mx-auto flex items-center justify-center mb-4 text-2xl text-neutral-700">
                  <i className="fas fa-headset"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('buyMinutes.supportTitle')}</h3>
                <p className="text-neutral-600">{t('buyMinutes.supportText')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  );
};

export default BuyMinutes;
