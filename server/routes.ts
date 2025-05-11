import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY not found. Using test mode.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, company, phone, subject, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !company || !subject || !message) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      // In a real implementation, you would save this to a database
      // and potentially send an email notification
      console.log("Contact form submission:", {
        name,
        email,
        company,
        phone,
        subject,
        message,
        timestamp: new Date().toISOString()
      });
      
      return res.status(200).json({ message: "Contact form submitted successfully" });
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      return res.status(500).json({ message: `Error submitting form: ${error.message}` });
    }
  });

  // API route for demo requests
  app.post("/api/request-demo", async (req, res) => {
    try {
      const { firstName, lastName, email, company, phone, interest } = req.body;
      
      // Validate required fields
      if (!firstName || !lastName || !email || !company || !interest) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      // In a real implementation, you would save this to a database
      // and potentially integrate with a calendar system
      console.log("Demo request:", {
        firstName,
        lastName,
        email,
        company,
        phone,
        interest,
        timestamp: new Date().toISOString()
      });
      
      return res.status(200).json({ message: "Demo request submitted successfully" });
    } catch (error: any) {
      console.error("Error submitting demo request:", error);
      return res.status(500).json({ message: `Error submitting request: ${error.message}` });
    }
  });

  // API route for newsletter subscriptions
  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      
      // Validate email
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
      // In a real implementation, you would save this to a database
      // and potentially integrate with an email marketing service
      console.log("Newsletter subscription:", {
        email,
        timestamp: new Date().toISOString()
      });
      
      return res.status(200).json({ message: "Subscription successful" });
    } catch (error: any) {
      console.error("Error subscribing to newsletter:", error);
      return res.status(500).json({ message: `Error subscribing: ${error.message}` });
    }
  });

  // Stripe payment route for purchasing call minutes
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, firstName, lastName, email, company, plan, minutes } = req.body;
      
      // Validate required fields
      if (!amount || !email) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      // Create a real payment intent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          firstName,
          lastName,
          email,
          company,
          plan,
          minutes: String(minutes),
          type: 'one-time'
        }
      });
      
      return res.status(200).json({ 
        clientSecret: paymentIntent.client_secret,
        message: "Payment intent created successfully" 
      });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      return res.status(500).json({ message: `Error creating payment: ${error.message}` });
    }
  });
  
  // Stripe subscription route for recurring call minute plans
  app.post("/api/get-or-create-subscription", async (req, res) => {
    try {
      const { email, firstName, lastName, company, planId, customerId } = req.body;
      
      // Validate required fields
      if (!email || !planId) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      let customer;
      
      // If customer already exists, retrieve it
      if (customerId) {
        try {
          customer = await stripe.customers.retrieve(customerId);
          if ((customer as any).deleted) {
            // If customer was deleted, create a new one
            customer = null;
          }
        } catch (error) {
          console.log('Customer not found or error retrieving customer:', error);
          customer = null;
        }
      }
      
      // If customer doesn't exist, create one
      if (!customer) {
        customer = await stripe.customers.create({
          email,
          name: `${firstName || ''} ${lastName || ''}`.trim(),
          metadata: {
            company
          }
        });
      }
      
      // Create a new subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{
          price: planId, // price ID from Stripe dashboard
        }],
        payment_behavior: 'default_incomplete',
        payment_settings: { 
          save_default_payment_method: 'on_subscription' 
        },
        expand: ['latest_invoice.payment_intent'],
      });
      
      // Return client secret for the payment intent
      return res.status(200).json({
        subscriptionId: subscription.id,
        clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
        customerId: customer.id
      });
    } catch (error: any) {
      console.error("Error creating subscription:", error);
      return res.status(500).json({ message: `Error creating subscription: ${error.message}` });
    }
  });
  
  // Webhook handler for Stripe events (subscription status updates, etc)
  app.post('/api/webhook', async (req, res) => {
    const signature = req.headers['stripe-signature'] as string;
    
    if (!signature) {
      return res.status(400).json({ message: 'Missing signature header' });
    }
    
    let event;
    
    try {
      const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
      
      if (endpointSecret) {
        // Verify the event with the webhook secret
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
      } else {
        // If no webhook secret is configured, just parse the event
        event = JSON.parse(req.body);
      }
      
      // Handle the event
      switch (event.type) {
        case 'invoice.payment_succeeded':
          const invoice = event.data.object;
          // Handle successful subscription payment
          console.log('Payment succeeded for invoice:', invoice.id);
          break;
          
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = event.data.object;
          console.log(`Subscription ${event.type}:`, subscription.id);
          // Update subscription status in your database
          break;
          
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
      
      res.status(200).json({ received: true });
    } catch (error: any) {
      console.error('Webhook error:', error.message);
      return res.status(400).json({ message: `Webhook error: ${error.message}` });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
