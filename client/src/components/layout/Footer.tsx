import { Link } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-white p-2 rounded mr-2">
                <img 
                  src="https://placehold.co/30x30/3B82F6/FFFFFF/svg?text=RI" 
                  alt="ReachImpact Logo" 
                  className="h-6 w-6"
                />
              </div>
              <span className="text-xl font-bold">ReachImpact</span>
            </div>
            <p className="text-neutral-400 mb-6">
              {t('footer.about')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150" aria-label="LinkedIn">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150" aria-label="Twitter">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150" aria-label="Facebook">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150" aria-label="Instagram">
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">{t('footer.productTitle')}</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('nav.features')}</Link></li>
              <li><Link href="/solutions" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('nav.solutions')}</Link></li>
              <li><Link href="/pricing" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('nav.pricing')}</Link></li>
              <li><Link href="/testimonials" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('nav.testimonials')}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">{t('footer.resourcesTitle')}</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('nav.blog')}</Link></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.documentation')}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.guides')}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.support')}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">{t('footer.companyTitle')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.about')}</a></li>
              <li><Link href="/contact" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('nav.contact')}</Link></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.careers')}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.partners')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ReachImpact. {t('footer.allRightsReserved')}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors duration-150">{t('footer.terms')}</a>
              <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors duration-150">{t('footer.privacy')}</a>
              <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors duration-150">{t('footer.cookies')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;