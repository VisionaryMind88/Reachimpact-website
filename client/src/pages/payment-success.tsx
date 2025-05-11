import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function PaymentSuccess() {
  const { t } = useLanguage();

  // Set page title and meta description for SEO
  useEffect(() => {
    document.title = 'Payment Successful | ReachImpact';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Your payment for ReachImpact call minutes was successful. Get started with your AI-powered calling campaigns today.');
    }
    
    // Clear checkout data from localStorage
    localStorage.removeItem('stripe_checkout_data');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <Check className="h-12 w-12 text-green-600" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t('paymentSuccess.title') || "Payment Successful!"}
          </h1>
          
          <p className="text-xl text-neutral-600 mb-6">
            {t('paymentSuccess.message') || "Thank you for your purchase. Your call minutes have been added to your account."}
          </p>
          
          <div className="bg-neutral-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-medium mb-4">
              {t('paymentSuccess.whatNext') || "What's Next?"}
            </h2>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 text-primary">
                  <span>1</span>
                </span>
                <span>
                  {t('paymentSuccess.step1') || "Log in to your ReachImpact dashboard to access your minutes."}
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 text-primary">
                  <span>2</span>
                </span>
                <span>
                  {t('paymentSuccess.step2') || "Create your first AI-powered calling campaign."}
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 text-primary">
                  <span>3</span>
                </span>
                <span>
                  {t('paymentSuccess.step3') || "Monitor results in real-time and optimize your approach."}
                </span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/dashboard">
                {t('paymentSuccess.goToDashboard') || "Go to Dashboard"}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                {t('paymentSuccess.backToHome') || "Back to Home"}
              </Link>
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-neutral-500">
            {t('paymentSuccess.support') || "Need help getting started?"} <a href="/contact" className="text-primary hover:underline">{t('paymentSuccess.contactSupport') || "Contact our support team"}</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}