import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { Separator } from '@/components/ui/separator';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [, setLocation] = useLocation();

  // Set page title and meta description for SEO
  useEffect(() => {
    document.title = 'Checkout | ReachImpact';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Secure checkout for ReachImpact call minutes. Complete your purchase safely with our encrypted payment processing.');
    }
  }, []);

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
          return_url: window.location.origin + '/payment-success',
        },
      });

      if (error) {
        toast({
          title: t('checkout.error.title') || "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
        setIsProcessing(false);
      } else {
        // The payment has been processed!
        toast({
          title: t('checkout.success.title') || "Payment Successful",
          description: t('checkout.success.description') || "Thank you for your purchase!",
        });
        // The PaymentIntent was confirmed and payment was successful.
        // Normally this would redirect to success page via return_url
      }
    } catch (err: any) {
      toast({
        title: t('checkout.error.title') || "Payment Error",
        description: err.message || t('checkout.error.generic') || "An error occurred during payment processing",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto">
      <div className="border rounded-lg p-4 bg-white">
        <PaymentElement />
      </div>
      
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setLocation('/buy-minutes')}
        >
          {t('checkout.backToCart') || "Back"}
        </Button>
        <Button 
          type="submit" 
          disabled={!stripe || isProcessing}
          className="bg-primary hover:bg-primary/90"
        >
          {isProcessing 
            ? (t('checkout.processing') || "Processing...") 
            : (t('checkout.payNow') || "Pay Now")}
        </Button>
      </div>
      
      <div className="text-xs text-neutral-500 text-center">
        <p>{t('checkout.securePayment') || "Your payment is processed securely with Stripe"} 🔒</p>
      </div>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [orderSummary, setOrderSummary] = useState<any>(null);
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  
  // Get URL params for amount and plan
  const params = new URLSearchParams(window.location.search);
  const paymentIntentId = params.get('payment_intent');

  useEffect(() => {
    // Retrieve client secret from localStorage (set in BuyMinutes.tsx)
    const storedData = localStorage.getItem('stripe_checkout_data');
    
    if (storedData) {
      const data = JSON.parse(storedData);
      setClientSecret(data.clientSecret);
      setOrderSummary(data.orderSummary);
    } else if (!paymentIntentId) {
      // No data found, redirect back to buy minutes page
      setLocation('/buy-minutes');
    }
  }, [setLocation, paymentIntentId]);

  if (!clientSecret && !paymentIntentId) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('checkout.title') || "Complete Your Purchase"}</h1>
          <p className="text-neutral-600">{t('checkout.subtitle') || "Just one more step to unlock your AI calling minutes"}</p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-8">
          {/* Order Summary Section */}
          <div className="md:col-span-2 bg-neutral-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">{t('checkout.orderSummary') || "Order Summary"}</h2>
            
            {orderSummary && (
              <>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">{t('checkout.plan') || "Plan"}</span>
                    <span className="font-medium">{orderSummary.planName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">{t('checkout.minutes') || "Minutes"}</span>
                    <span className="font-medium">{orderSummary.minutes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">{t('checkout.pricePerMinute') || "Price per Minute"}</span>
                    <span className="font-medium">${orderSummary.pricePerMinute}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>{t('checkout.total') || "Total"}</span>
                  <span>${orderSummary.totalPrice}</span>
                </div>
              </>
            )}
            
            {!orderSummary && (
              <div className="text-center py-4 text-neutral-500">
                {t('checkout.resumingPayment') || "Resuming your previous payment"}
              </div>
            )}
            
            <div className="mt-6 pt-4 border-t border-neutral-200">
              <h3 className="font-medium mb-2">{t('checkout.whatsIncluded') || "What's included:"}</h3>
              <ul className="space-y-2">
                <li className="flex items-start text-sm">
                  <span className="text-primary mr-2">✓</span>
                  <span>{t('checkout.benefit1') || "Instant access to AI calling platform"}</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-primary mr-2">✓</span>
                  <span>{t('checkout.benefit2') || "Advanced voice recognition technology"}</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-primary mr-2">✓</span>
                  <span>{t('checkout.benefit3') || "Real-time reporting and analytics"}</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-primary mr-2">✓</span>
                  <span>{t('checkout.benefit4') || "Premium customer support"}</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Payment Form Section */}
          <div className="md:col-span-3">
            <Elements stripe={stripePromise} options={{ 
              clientSecret,
              appearance: { 
                theme: 'stripe',
                variables: {
                  colorPrimary: '#6366f1',
                }
              }
            }}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};