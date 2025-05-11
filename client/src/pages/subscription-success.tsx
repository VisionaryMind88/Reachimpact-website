import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Check, Calendar, Headphones, ArrowRight, BarChart3 } from 'lucide-react';

export default function SubscriptionSuccess() {
  const { t } = useLanguage();

  // Set page title and meta description for SEO
  useEffect(() => {
    document.title = 'Subscription Successful | ReachImpact';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Your subscription to ReachImpact has been successfully activated. Start making AI-powered calls with your new plan.');
    }
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
            {t('subscriptionSuccess.title') || "You're All Set!"}
          </h1>
          
          <p className="text-xl text-neutral-600 mb-6">
            {t('subscriptionSuccess.message') || "Your subscription has been successfully activated. Welcome to ReachImpact!"}
          </p>
          
          <div className="bg-neutral-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-medium mb-4">
              {t('subscriptionSuccess.getStarted') || "Get Started with These Steps"}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-neutral-200">
                <div className="flex items-center mb-3">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">{t('subscriptionSuccess.step1Title') || "Set Up Your Account"}</h3>
                </div>
                <p className="text-sm text-neutral-600">
                  {t('subscriptionSuccess.step1Description') || "Complete your profile and set your preferences in the dashboard."}
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-neutral-200">
                <div className="flex items-center mb-3">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Headphones className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">{t('subscriptionSuccess.step2Title') || "Create Your First Campaign"}</h3>
                </div>
                <p className="text-sm text-neutral-600">
                  {t('subscriptionSuccess.step2Description') || "Use our intuitive wizard to set up your first AI calling campaign."}
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-neutral-200">
                <div className="flex items-center mb-3">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">{t('subscriptionSuccess.step3Title') || "Launch Your Calls"}</h3>
                </div>
                <p className="text-sm text-neutral-600">
                  {t('subscriptionSuccess.step3Description') || "Start making calls with one click and monitor them in real-time."}
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-neutral-200">
                <div className="flex items-center mb-3">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">{t('subscriptionSuccess.step4Title') || "Analyze Results"}</h3>
                </div>
                <p className="text-sm text-neutral-600">
                  {t('subscriptionSuccess.step4Description') || "Review detailed analytics to optimize your outreach strategy."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/dashboard">
                {t('subscriptionSuccess.goToDashboard') || "Go to Dashboard"}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                {t('subscriptionSuccess.backToHome') || "Back to Home"}
              </Link>
            </Button>
          </div>
          
          <div className="mt-10 pt-6 border-t border-neutral-200">
            <h3 className="font-medium mb-3">{t('subscriptionSuccess.subscriptionDetails') || "Your Subscription Details"}</h3>
            <p className="text-sm text-neutral-600 mb-6">
              {t('subscriptionSuccess.emailConfirmation') || "A confirmation email has been sent to your email address with complete details about your subscription."}
            </p>
            
            <div className="flex justify-center space-x-4 text-sm">
              <Link href="/account/subscription" className="text-primary hover:underline">
                {t('subscriptionSuccess.manageSubscription') || "Manage Subscription"}
              </Link>
              <span className="text-neutral-300">|</span>
              <Link href="/help" className="text-primary hover:underline">
                {t('subscriptionSuccess.helpCenter') || "Help Center"}
              </Link>
              <span className="text-neutral-300">|</span>
              <Link href="/contact" className="text-primary hover:underline">
                {t('subscriptionSuccess.support') || "Contact Support"}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}