import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { FaRobot, FaCalendarCheck, FaChartLine, FaGlobe, FaSyncAlt, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import { ReactNode } from 'react';

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
}

// Map icon strings to React Icon components
const getIconComponent = (iconName: string): ReactNode => {
  switch(iconName) {
    case 'fas fa-robot': return <FaRobot />;
    case 'fas fa-calendar-check': return <FaCalendarCheck />;
    case 'fas fa-chart-line': return <FaChartLine />;
    case 'fas fa-globe': return <FaGlobe />;
    case 'fas fa-sync-alt': return <FaSyncAlt />;
    case 'fas fa-shield-alt': return <FaShieldAlt />;
    default: return <FaRobot />;
  }
};

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
        {getIconComponent(icon)}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-neutral-600 mb-4">{description}</p>
      <div className="flex items-center mt-auto">
        <Link href="/features">
          <div className="text-primary hover:text-primary/80 font-medium flex items-center cursor-pointer">
            Learn more <FaArrowRight className="ml-2 text-sm" />
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
