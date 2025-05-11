import { Link } from 'wouter';
import { motion } from 'framer-motion';

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-neutral-100"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="text-primary mb-4 text-3xl">
        <i className={icon}></i>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-neutral-600 mb-4">{description}</p>
      <div className="flex items-center mt-auto">
        <Link href="/features">
          <div className="text-primary hover:text-primary/80 font-medium flex items-center cursor-pointer">
            Learn more <i className="fas fa-arrow-right ml-2 text-sm"></i>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
