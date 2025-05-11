import { Link } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo & About */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="text-primary/80 text-3xl">
                <i className="fas fa-robot"></i>
              </div>
              <span className="font-accent font-bold text-xl text-white">
                Reach<span className="text-primary/80">Impact</span>
              </span>
            </div>
            <p className="text-neutral-400 mb-6">
              {t('footer.about')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150" aria-label="LinkedIn">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150" aria-label="Twitter">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150" aria-label="Facebook">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150" aria-label="Instagram">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.products.title') || 'Products'}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.products.item1') || 'AI Calling Platform'}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.products.item2') || 'Appointment Setting'}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.products.item3') || 'Lead Generation'}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.products.item4') || 'Analytics Dashboard'}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.products.item5') || 'API & Integrations'}</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.resources.title') || 'Resources'}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.resources.item1') || 'Case Studies'}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.resources.item2') || 'Blog'}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.resources.item3') || 'eBooks & Guides'}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.resources.item4') || 'Webinars'}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.resources.item5') || 'FAQ'}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.company.title') || 'Company'}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.company.item1') || 'About Us'}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.company.item2') || 'Careers'}</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.company.item3') || 'Partners'}</a></li>
              <li><Link href="/contact"><div className="text-neutral-400 hover:text-white transition-colors duration-150 cursor-pointer">{t('footer.company.item4') || 'Contact Us'}</div></Link></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-150">{t('footer.company.item5') || 'Privacy Policy'}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-neutral-500">© {currentYear} ReachImpact. {t('footer.copyright') || 'All rights reserved.'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-neutral-500 hover:text-white transition-colors duration-150">{t('footer.privacy') || 'Privacy Policy'}</a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors duration-150">{t('footer.terms') || 'Terms of Service'}</a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors duration-150">{t('footer.cookies') || 'Cookie Policy'}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
