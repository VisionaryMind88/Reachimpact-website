import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { subscriptionPlans, getPlanById, SubscriptionPlan } from '@/lib/subscription-plans';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Form schema for subscription checkout
const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(1, 'Company is required')
});

type FormValues = z.infer<typeof formSchema>;

const SubscribeForm = ({ subscription }: { subscription: { clientSecret: string, customerId: string, subscriptionId: string} }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/subscription-success',
        },
      });

      if (error) {
        toast({
          title: t('subscription.error.title') || "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
        setIsProcessing(false);
      }
      // If successful, the return_url will handle the redirect
    } catch (err: any) {
      toast({
        title: t('subscription.error.title') || "Payment Error",
        description: err.message || t('subscription.error.generic') || "An error occurred during payment processing",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="border rounded-lg p-4 bg-white">
        <PaymentElement />
      </div>
      
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setLocation('/pricing')}
        >
          {t('subscription.backToPricing') || "Back to Plans"}
        </Button>
        <Button 
          type="submit" 
          disabled={!stripe || isProcessing}
          className="bg-primary hover:bg-primary/90"
        >
          {isProcessing 
            ? (t('subscription.processing') || "Processing...") 
            : (t('subscription.subscribe') || "Subscribe")}
        </Button>
      </div>
      
      <div className="text-xs text-neutral-500 text-center">
        <p>{t('subscription.securePayment') || "Your payment is processed securely with Stripe"} 🔒</p>
      </div>
    </form>
  );
};

const PlanDetails = ({ plan }: { plan: SubscriptionPlan }) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-neutral-50 rounded-lg p-6 max-w-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold">{plan.name}</h3>
          <p className="text-neutral-600">{plan.description}</p>
        </div>
        {plan.popular && (
          <Badge variant="default" className="bg-primary text-white">
            {t('subscription.popular') || "Popular"}
          </Badge>
        )}
      </div>
      
      <div className="text-3xl font-bold mb-2">${plan.price}<span className="text-lg font-normal text-neutral-600">/month</span></div>
      <p className="text-neutral-600 mb-4">{plan.minutesPerMonth.toLocaleString()} minutes per month</p>
      
      <ul className="space-y-2 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="pt-4 border-t border-neutral-200">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-neutral-600">{t('subscription.pricePerMinute') || "Price per minute"}</span>
          <span className="font-medium">${plan.pricePerMinute.toFixed(3)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">{t('subscription.billing') || "Billing"}</span>
          <span className="font-medium">{t('subscription.monthly') || "Monthly"}</span>
        </div>
      </div>
    </div>
  );
};

export default function Subscribe() {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [step, setStep] = useState<'select' | 'details' | 'payment'>('select');
  const { t } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: ''
    }
  });

  // Set page title and meta description for SEO
  useEffect(() => {
    document.title = 'Subscribe | ReachImpact';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Subscribe to ReachImpact\'s AI-powered calling service. Choose a plan that suits your business needs and start making automated calls today.');
    }
    
    // Check if there's a plan ID in the query params
    const params = new URLSearchParams(window.location.search);
    const planId = params.get('plan');
    
    if (planId) {
      const plan = getPlanById(planId);
      if (plan) {
        setSelectedPlan(plan);
        setStep('details');
      }
    }
  }, []);

  async function onSubmit(data: FormValues) {
    if (!selectedPlan) {
      toast({
        title: "Error",
        description: "Please select a plan first",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const response = await apiRequest('POST', '/api/get-or-create-subscription', {
        ...data,
        planId: selectedPlan.stripePriceId
      });
      
      const responseData = await response.json();
      
      if (!responseData.clientSecret) {
        throw new Error('No client secret received');
      }
      
      setSubscription({
        clientSecret: responseData.clientSecret,
        customerId: responseData.customerId,
        subscriptionId: responseData.subscriptionId
      });
      
      setClientSecret(responseData.clientSecret);
      setStep('payment');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create subscription",
        variant: "destructive",
      });
    }
  }

  const renderStep = () => {
    switch (step) {
      case 'select':
        return (
          <div className="grid md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.id} className={`border-2 ${selectedPlan?.id === plan.id ? 'border-primary' : 'border-transparent'} transition-all duration-200 hover:shadow-md cursor-pointer`} onClick={() => {
                setSelectedPlan(plan);
                setStep('details');
              }}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.popular && <Badge className="bg-primary">Popular</Badge>}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">${plan.price}<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                  <p className="text-sm text-muted-foreground">{plan.minutesPerMonth.toLocaleString()} minutes per month</p>
                  <ul className="mt-4 space-y-2">
                    {plan.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 4 && (
                      <li className="text-sm text-muted-foreground">+ {plan.features.length - 4} more features</li>
                    )}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Select Plan</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        );
        
      case 'details':
        return (
          <div className="grid md:grid-cols-2 gap-12">
            {selectedPlan && <PlanDetails plan={selectedPlan} />}
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{t('subscription.accountDetails') || "Account Details"}</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('subscription.firstName') || "First Name"}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('subscription.firstNamePlaceholder') || "Enter your first name"} {...field} />
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
                          <FormLabel>{t('subscription.lastName') || "Last Name"}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('subscription.lastNamePlaceholder') || "Enter your last name"} {...field} />
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
                        <FormLabel>{t('subscription.email') || "Email"}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('subscription.emailPlaceholder') || "Enter your email"} {...field} />
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
                        <FormLabel>{t('subscription.company') || "Company"}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('subscription.companyPlaceholder') || "Enter your company name"} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setStep('select')}
                    >
                      {t('subscription.back') || "Back"}
                    </Button>
                    <Button type="submit">
                      {t('subscription.continue') || "Continue to Payment"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        );
        
      case 'payment':
        return clientSecret && subscription ? (
          <div className="grid md:grid-cols-2 gap-12">
            {selectedPlan && <PlanDetails plan={selectedPlan} />}
            
            <div>
              <h2 className="text-2xl font-bold mb-6">{t('subscription.paymentDetails') || "Payment Details"}</h2>
              <Elements stripe={stripePromise} options={{ 
                clientSecret,
                appearance: { 
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#6366f1',
                  }
                }
              }}>
                <SubscribeForm subscription={subscription} />
              </Elements>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>{t('subscription.loading') || "Loading payment form..."}</p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">{t('subscription.title') || "Subscribe to ReachImpact"}</h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              {t('subscription.subtitle') || "Choose a plan that works for your business and start making AI-powered calls today."}
            </p>
          </motion.div>
        </div>
        
        <div className="mb-10">
          <div className="flex items-center justify-center space-x-2">
            <div className={`h-2 w-2 rounded-full ${step === 'select' ? 'bg-primary' : 'bg-neutral-300'}`}></div>
            <div className={`h-[2px] w-12 ${step === 'select' ? 'bg-neutral-300' : 'bg-primary'}`}></div>
            <div className={`h-2 w-2 rounded-full ${step === 'details' ? 'bg-primary' : 'bg-neutral-300'}`}></div>
            <div className={`h-[2px] w-12 ${step === 'payment' ? 'bg-primary' : 'bg-neutral-300'}`}></div>
            <div className={`h-2 w-2 rounded-full ${step === 'payment' ? 'bg-primary' : 'bg-neutral-300'}`}></div>
          </div>
          <div className="flex justify-between max-w-sm mx-auto text-sm mt-2">
            <span className={step === 'select' ? 'text-primary font-medium' : ''}>
              {t('subscription.step1') || "Select Plan"}
            </span>
            <span className={step === 'details' ? 'text-primary font-medium' : ''}>
              {t('subscription.step2') || "Your Details"}
            </span>
            <span className={step === 'payment' ? 'text-primary font-medium' : ''}>
              {t('subscription.step3') || "Payment"}
            </span>
          </div>
        </div>
        
        {renderStep()}
        
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold mb-4">{t('subscription.questions') || "Have Questions?"}</h3>
          <p className="text-neutral-600 mb-6">
            {t('subscription.questionText') || "Our team is here to help you choose the right plan for your business needs."}
          </p>
          <Button variant="outline" asChild>
            <Link href="/contact">{t('subscription.contactUs') || "Contact Us"}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}