import { motion } from 'framer-motion';

type TestimonialCardProps = {
  quote: string;
  name: string;
  title: string;
  image: string;
}

const TestimonialCard = ({ quote, name, title, image }: TestimonialCardProps) => {
  return (
    <motion.div 
      className="bg-neutral-50 rounded-xl p-8 shadow-sm"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
    >
      <div className="flex items-center mb-4">
        <div className="text-primary">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
      </div>
      <blockquote className="mb-6">
        <p className="text-neutral-700 italic">{quote}</p>
      </blockquote>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-neutral-200 mr-4 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-neutral-500">{title}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
