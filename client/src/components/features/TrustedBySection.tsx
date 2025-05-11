import { useLanguage } from '@/context/LanguageContext';

const TrustedBySection = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-lg font-medium text-neutral-600">{t('trustedBy.title') || 'Trusted by forward-thinking companies'}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              key={index} 
              className="w-32 h-12 bg-neutral-200/50 rounded flex items-center justify-center text-neutral-400"
            >
              <span className="font-medium">COMPANY</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
