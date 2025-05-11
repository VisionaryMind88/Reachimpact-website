import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Link } from 'wouter';
import { ArrowUpRight, Calendar, CreditCard, Download, History, Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { formattedPlans, getPlanById } from '@/lib/subscription-plans';

// Define the shape of a subscription
interface Subscription {
  id: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing';
  plan: {
    id: string;
    name: string;
    amount: number;
    interval: 'month' | 'year';
  };
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  minutesTotal: number;
  minutesUsed: number;
}

// Define the shape of an invoice
interface Invoice {
  id: string;
  number: string;
  amount: number;
  status: 'paid' | 'open' | 'void' | 'uncollectible';
  date: string;
  pdfUrl: string;
}

export default function SubscriptionManagement() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [changePlanDialogOpen, setChangePlanDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [processingAction, setProcessingAction] = useState(false);

  // Set page title and meta description
  useEffect(() => {
    document.title = 'Manage Subscription | ReachImpact';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Manage your ReachImpact subscription. View usage, update plan, download invoices, and update payment information.');
    }
    
    fetchSubscriptionData();
  }, []);

  // Fetch subscription data
  const fetchSubscriptionData = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would fetch the subscription from the server
      // For now, creating dummy data for demonstration
      
      // Mock subscription data
      setTimeout(() => {
        const mockSubscription: Subscription = {
          id: 'sub_12345',
          status: 'active',
          plan: {
            id: 'professional-monthly',
            name: 'Professional',
            amount: 299,
            interval: 'month'
          },
          currentPeriodEnd: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
          cancelAtPeriodEnd: false,
          minutesTotal: 3000,
          minutesUsed: 1262
        };
        
        // Mock invoice data
        const mockInvoices: Invoice[] = [
          {
            id: 'in_12345',
            number: 'REACH-001',
            amount: 299,
            status: 'paid',
            date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
            pdfUrl: '#'
          },
          {
            id: 'in_12344',
            number: 'REACH-002',
            amount: 299,
            status: 'paid',
            date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
            pdfUrl: '#'
          }
        ];
        
        setSubscription(mockSubscription);
        setInvoices(mockInvoices);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error fetching subscription:', error);
      toast({
        title: t('subscription.error.title') || "Error",
        description: t('subscription.error.fetchFailed') || "Failed to load subscription data",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  // Handle changing the subscription plan
  const handleChangePlan = async () => {
    if (!selectedPlan) return;
    
    setProcessingAction(true);
    
    try {
      // In a real implementation, this would call an API to update the subscription
      // const response = await apiRequest('POST', '/api/update-subscription', {
      //   subscriptionId: subscription?.id,
      //   newPlanId: selectedPlan
      // });
      
      // For demonstration, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the local subscription data
      if (subscription) {
        const newPlan = getPlanById(selectedPlan);
        if (newPlan) {
          setSubscription({
            ...subscription,
            plan: {
              id: newPlan.id,
              name: newPlan.name,
              amount: newPlan.price,
              interval: 'month'
            },
            minutesTotal: newPlan.minutesPerMonth
          });
        }
      }
      
      toast({
        title: t('subscription.planChanged.title') || "Plan Changed",
        description: t('subscription.planChanged.message') || "Your subscription plan has been updated successfully",
      });
      
      setChangePlanDialogOpen(false);
    } catch (error) {
      console.error('Error changing plan:', error);
      toast({
        title: t('subscription.error.title') || "Error",
        description: t('subscription.error.changePlanFailed') || "Failed to change subscription plan",
        variant: "destructive",
      });
    } finally {
      setProcessingAction(false);
    }
  };

  // Handle canceling the subscription
  const handleCancelSubscription = async () => {
    setProcessingAction(true);
    
    try {
      // In a real implementation, this would call an API to cancel the subscription
      // const response = await apiRequest('POST', '/api/cancel-subscription', {
      //   subscriptionId: subscription?.id
      // });
      
      // For demonstration, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the local subscription data
      if (subscription) {
        setSubscription({
          ...subscription,
          cancelAtPeriodEnd: true
        });
      }
      
      toast({
        title: t('subscription.canceled.title') || "Subscription Canceled",
        description: t('subscription.canceled.message') || "Your subscription will be canceled at the end of the current billing period",
      });
      
      setCancelDialogOpen(false);
    } catch (error) {
      console.error('Error canceling subscription:', error);
      toast({
        title: t('subscription.error.title') || "Error",
        description: t('subscription.error.cancelFailed') || "Failed to cancel subscription",
        variant: "destructive",
      });
    } finally {
      setProcessingAction(false);
    }
  };

  // Handle resuming a canceled subscription
  const handleResumeSubscription = async () => {
    setProcessingAction(true);
    
    try {
      // In a real implementation, this would call an API to resume the subscription
      // const response = await apiRequest('POST', '/api/resume-subscription', {
      //   subscriptionId: subscription?.id
      // });
      
      // For demonstration, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the local subscription data
      if (subscription) {
        setSubscription({
          ...subscription,
          cancelAtPeriodEnd: false
        });
      }
      
      toast({
        title: t('subscription.resumed.title') || "Subscription Resumed",
        description: t('subscription.resumed.message') || "Your subscription has been resumed successfully",
      });
    } catch (error) {
      console.error('Error resuming subscription:', error);
      toast({
        title: t('subscription.error.title') || "Error",
        description: t('subscription.error.resumeFailed') || "Failed to resume subscription",
        variant: "destructive",
      });
    } finally {
      setProcessingAction(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-5xl mx-auto py-16 px-4">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-16 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('subscriptionManagement.title') || "Subscription Management"}</h1>
          <p className="text-neutral-600">{t('subscriptionManagement.subtitle') || "Manage your subscription, billing history, and payment method"}</p>
        </div>
      </div>
      
      {subscription ? (
        <>
          {/* Subscription Status Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t('subscriptionManagement.currentPlan') || "Current Plan"}</CardTitle>
              <CardDescription>
                {subscription.cancelAtPeriodEnd 
                  ? t('subscriptionManagement.canceledNotice', { date: new Date(subscription.currentPeriodEnd).toLocaleDateString() }) || `Your subscription will be canceled on ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}`
                  : t('subscriptionManagement.activeNotice') || "Your subscription is currently active"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <span className="text-sm text-neutral-500">{t('subscriptionManagement.plan') || "Plan"}</span>
                  <div className="flex items-center mt-1">
                    <span className="text-2xl font-semibold mr-2">{subscription.plan.name}</span>
                    <span className="text-sm text-neutral-500">${subscription.plan.amount}/{subscription.plan.interval}</span>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-neutral-500">{t('subscriptionManagement.renewalDate') || "Next Renewal"}</span>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-5 w-5 text-neutral-500 mr-2" />
                    <span className="text-lg font-medium">{new Date(subscription.currentPeriodEnd).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-neutral-500">{t('subscriptionManagement.status') || "Status"}</span>
                  <div className="flex items-center mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      subscription.cancelAtPeriodEnd
                        ? 'bg-yellow-100 text-yellow-800'
                        : subscription.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {subscription.cancelAtPeriodEnd
                        ? t('subscriptionManagement.statusEnding') || "Ending Soon"
                        : subscription.status === 'active'
                        ? t('subscriptionManagement.statusActive') || "Active"
                        : t('subscriptionManagement.statusPastDue') || "Past Due"}
                    </span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    {t('subscriptionManagement.usageTitle') || "Minutes Used This Cycle"}
                  </span>
                  <span className="text-sm text-neutral-500">
                    {subscription.minutesUsed.toLocaleString()} / {subscription.minutesTotal.toLocaleString()}
                  </span>
                </div>
                <Progress 
                  value={(subscription.minutesUsed / subscription.minutesTotal) * 100} 
                  className="h-2" 
                />
                <p className="text-xs text-neutral-500 mt-2">
                  {t('subscriptionManagement.usageRemaining', { 
                    count: (subscription.minutesTotal - subscription.minutesUsed).toLocaleString() 
                  }) || `${(subscription.minutesTotal - subscription.minutesUsed).toLocaleString()} minutes remaining`}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="space-x-2">
                {subscription.cancelAtPeriodEnd ? (
                  <Button
                    variant="outline"
                    onClick={handleResumeSubscription}
                    disabled={processingAction}
                  >
                    {processingAction 
                      ? t('subscriptionManagement.processing') || "Processing..." 
                      : t('subscriptionManagement.resumeSubscription') || "Resume Subscription"}
                  </Button>
                ) : (
                  <>
                    <Dialog open={changePlanDialogOpen} onOpenChange={setChangePlanDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          {t('subscriptionManagement.changePlan') || "Change Plan"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{t('subscriptionManagement.changePlanTitle') || "Change Subscription Plan"}</DialogTitle>
                          <DialogDescription>
                            {t('subscriptionManagement.changePlanDescription') || "Select a new plan. Your new plan will take effect immediately."}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <Select onValueChange={setSelectedPlan}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('subscriptionManagement.selectPlan') || "Select a plan"} />
                          </SelectTrigger>
                          <SelectContent>
                            {formattedPlans.map((plan) => (
                              <SelectItem 
                                key={plan.id} 
                                value={plan.id}
                                disabled={plan.id === subscription.plan.id}
                              >
                                {plan.name} - {plan.priceDisplay} ({plan.minutesDisplay} minutes)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setChangePlanDialogOpen(false)}
                            disabled={processingAction}
                          >
                            {t('subscriptionManagement.cancel') || "Cancel"}
                          </Button>
                          <Button 
                            onClick={handleChangePlan}
                            disabled={!selectedPlan || processingAction}
                          >
                            {processingAction 
                              ? t('subscriptionManagement.processing') || "Processing..." 
                              : t('subscriptionManagement.confirmChange') || "Confirm Change"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          {t('subscriptionManagement.cancelSubscription') || "Cancel Subscription"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{t('subscriptionManagement.cancelTitle') || "Cancel Subscription"}</DialogTitle>
                          <DialogDescription>
                            {t('subscriptionManagement.cancelDescription') || "Are you sure you want to cancel your subscription? You'll continue to have access until the end of your current billing period."}
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setCancelDialogOpen(false)}
                            disabled={processingAction}
                          >
                            {t('subscriptionManagement.keepSubscription') || "Keep Subscription"}
                          </Button>
                          <Button 
                            variant="destructive"
                            onClick={handleCancelSubscription}
                            disabled={processingAction}
                          >
                            {processingAction 
                              ? t('subscriptionManagement.processing') || "Processing..." 
                              : t('subscriptionManagement.confirmCancel') || "Cancel Subscription"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </div>
              
              <Button variant="outline" className="flex items-center gap-2" asChild>
                <Link href="/account/payment-method">
                  <CreditCard className="h-4 w-4" />
                  {t('subscriptionManagement.updatePayment') || "Update Payment Method"}
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Billing History Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t('subscriptionManagement.billingHistory') || "Billing History"}</CardTitle>
              <CardDescription>
                {t('subscriptionManagement.billingDescription') || "View and download your past invoices"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {invoices.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 text-sm font-medium text-neutral-500">
                          {t('subscriptionManagement.date') || "Date"}
                        </th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-neutral-500">
                          {t('subscriptionManagement.amount') || "Amount"}
                        </th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-neutral-500">
                          {t('subscriptionManagement.invoiceNumber') || "Invoice"}
                        </th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-neutral-500">
                          {t('subscriptionManagement.status') || "Status"}
                        </th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-neutral-500">
                          {t('subscriptionManagement.download') || "Download"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b hover:bg-neutral-50">
                          <td className="py-3 px-2 text-sm">
                            {new Date(invoice.date).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-2 text-sm font-medium">
                            ${invoice.amount}
                          </td>
                          <td className="py-3 px-2 text-sm">
                            {invoice.number}
                          </td>
                          <td className="py-3 px-2 text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              invoice.status === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : invoice.status === 'open'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-neutral-100 text-neutral-800'
                            }`}>
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                              <a href={invoice.pdfUrl} target="_blank" rel="noopener noreferrer" aria-label="Download invoice">
                                <Download className="h-4 w-4" />
                              </a>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-neutral-500">
                  {t('subscriptionManagement.noInvoices') || "No invoices found"}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <div className="mx-auto mb-4">
              <Settings className="h-12 w-12 text-neutral-300 mx-auto" />
            </div>
            <h2 className="text-xl font-bold mb-2">
              {t('subscriptionManagement.noSubscription') || "No Active Subscription"}
            </h2>
            <p className="text-neutral-600 mb-6 max-w-md mx-auto">
              {t('subscriptionManagement.noSubscriptionDesc') || "You don't have an active subscription. Subscribe now to start using our services."}
            </p>
            <Button asChild>
              <Link href="/subscribe">
                {t('subscriptionManagement.subscribe') || "Subscribe Now"}
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}