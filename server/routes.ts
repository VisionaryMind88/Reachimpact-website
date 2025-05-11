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
      const { amount, firstName, lastName, email, company, plan } = req.body;
      
      // Validate required fields
      if (!amount || !email) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      // In a real implementation with Stripe, you would create a payment intent
      // For demo purposes, we'll simulate this
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          firstName,
          lastName,
          email,
          company,
          plan
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

  const httpServer = createServer(app);

  return httpServer;
}
