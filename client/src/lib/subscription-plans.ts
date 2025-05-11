// Subscription plans configuration
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;  // monthly price in USD
  minutesPerMonth: number;
  pricePerMinute: number;
  features: string[];
  popular?: boolean;
  stripePriceId: string; // Price ID from Stripe dashboard
}

// The actual price IDs should be obtained from the Stripe dashboard
// These are placeholders that should be replaced with real Stripe price IDs
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'starter-monthly',
    name: 'Starter',
    description: 'Perfect for small businesses and startups',
    price: 99,
    minutesPerMonth: 800,
    pricePerMinute: 0.124,
    stripePriceId: 'price_starter_monthly', // Replace with actual Stripe price ID
    features: [
      'AI-powered calling',
      'Basic analytics',
      'Email support',
      'Standard voice quality'
    ]
  },
  {
    id: 'professional-monthly',
    name: 'Professional',
    description: 'For growing businesses with moderate call volume',
    price: 299,
    minutesPerMonth: 3000,
    pricePerMinute: 0.100,
    stripePriceId: 'price_professional_monthly', // Replace with actual Stripe price ID
    popular: true,
    features: [
      'AI-powered calling',
      'Advanced analytics & reporting',
      'Priority email support',
      'HD voice quality',
      'Custom script creation',
      'CRM integration'
    ]
  },
  {
    id: 'enterprise-monthly',
    name: 'Enterprise',
    description: 'For businesses with high call volume needs',
    price: 799,
    minutesPerMonth: 10000,
    pricePerMinute: 0.080,
    stripePriceId: 'price_enterprise_monthly', // Replace with actual Stripe price ID
    features: [
      'AI-powered calling',
      'Full analytics suite',
      '24/7 dedicated support',
      'Ultra HD voice quality',
      'Advanced script customization',
      'Enterprise CRM integration',
      'Custom AI voice training',
      'Multi-department access'
    ]
  }
];

// Helper function to find a plan by ID
export function getPlanById(planId: string): SubscriptionPlan | undefined {
  return subscriptionPlans.find(plan => plan.id === planId);
}

// Helper function to get monthly call minutes for plan display
export function formatPlanDetails(plan: SubscriptionPlan) {
  return {
    ...plan,
    minutesDisplay: plan.minutesPerMonth.toLocaleString(),
    priceDisplay: `$${plan.price}/month`,
    pricePerMinuteDisplay: `$${plan.pricePerMinute.toFixed(3)}`
  };
}

// Export all plan details in display format
export const formattedPlans = subscriptionPlans.map(formatPlanDetails);