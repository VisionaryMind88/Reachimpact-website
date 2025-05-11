import { useLanguage } from '@/context/LanguageContext';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: t('testimonials.testimonial1.quote'),
      name: t('testimonials.testimonial1.name'),
      title: t('testimonials.testimonial1.title'),
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    },
    {
      quote: t('testimonials.testimonial2.quote'),
      name: t('testimonials.testimonial2.name'),
      title: t('testimonials.testimonial2.title'),
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    },
    {
      quote: t('testimonials.testimonial3.quote'),
      name: t('testimonials.testimonial3.name'),
      title: t('testimonials.testimonial3.title'),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-accent">{t('testimonials.title')}</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">{t('testimonials.subtitle')}</p>
        </div>

        {/* Testimonial Cards */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              image={testimonial.image}
            />
          ))}
        </motion.div>

        {/* Video Testimonial */}
        <motion.div 
          className="mt-16 bg-neutral-800 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="text-white text-5xl mb-6">
                <i className="fas fa-quote-left opacity-20"></i>
              </div>
              <blockquote className="mb-8">
                <p className="text-white text-xl font-light italic leading-relaxed">
                  {t('testimonials.featured.quote')}
                </p>
              </blockquote>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-neutral-700 mr-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1563237023-b1e970526dcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                    alt={t('testimonials.featured.name')} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-white">{t('testimonials.featured.name')}</h4>
                  <p className="text-neutral-300">{t('testimonials.featured.title')}</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 bg-neutral-900">
              {/* Video Testimonial Placeholder */}
              <div className="relative h-full">
                <img 
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="ReachImpact Video Testimonial" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition duration-300">
                    <i className="fas fa-play text-white text-2xl"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
