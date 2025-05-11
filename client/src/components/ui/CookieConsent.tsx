import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const CookieConsent = () => {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookiesAccepted');
    if (!hasAccepted) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShow(false);
  };

  const customizeCookies = () => {
    // In a real implementation, this would open a modal with cookie settings
    alert('This would open cookie customization settings in the actual implementation.');
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className="fixed bottom-0 inset-x-0 bg-white shadow-lg z-50 border-t border-neutral-200"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0 md:mr-8">
                <p className="text-neutral-600">
                  {t('cookies.message')} 
                  <a href="#" className="text-primary hover:underline">{t('cookies.privacy')}</a>.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <Button 
                  variant="outline" 
                  onClick={customizeCookies}
                >
                  {t('cookies.customize')}
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white" 
                  onClick={acceptCookies}
                >
                  {t('cookies.accept')}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
