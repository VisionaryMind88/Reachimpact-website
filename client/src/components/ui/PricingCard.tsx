import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PricingFeature = {
  name: string;
  included: boolean;
}

type PricingCardProps = {
  name: string;
  description: string;
  price: number;
  unit: string;
  totalPrice: string;
  totalUnits: string;
  features: PricingFeature[];
  cta: string;
  popular?: boolean;
  planId?: string;
}

const PricingCard = ({
  name,
  description,
  price,
  unit,
  totalPrice,
  totalUnits,
  features,
  cta,
  popular = false,
  planId
}: PricingCardProps) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1",
        popular && "shadow-xl transform scale-105 relative z-10 border-2 border-primary"
      )}
    >
      {popular && (
        <div className="bg-primary text-white py-2 px-4 text-sm font-medium text-center">
          MOST POPULAR
        </div>
      )}
      
      <div className="p-8">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-neutral-600 mb-6">{description}</p>
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold">${price.toFixed(2)}</span>
            <span className="text-neutral-600 ml-2">{unit}</span>
          </div>
          <p className="text-sm text-neutral-500 mt-1">{totalPrice} for {totalUnits} minutes</p>
        </div>

        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className={`flex-shrink-0 mr-2 ${feature.included ? 'text-primary' : 'text-neutral-400'}`}>
                <i className={`fas ${feature.included ? 'fa-check' : 'fa-times'}`}></i>
              </div>
              <span className={feature.included ? 'text-neutral-700' : 'text-neutral-500'}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-8 pb-8">
        <Link href={cta === "Subscribe" ? `/subscribe?plan=${planId}` : "/buy-minutes"}>
          <Button 
            className={cn(
              "w-full",
              popular 
                ? "bg-primary hover:bg-primary/90 text-white" 
                : "bg-white border border-primary text-primary hover:bg-primary-50"
            )}
          >
            {cta}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PricingCard;
