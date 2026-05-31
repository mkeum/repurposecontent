import { resend } from "@/lib/resend";
import { welcomeEmail, invoiceEmail, subscriptionStatusEmail, supportReplyEmail } from "./emails/templates";
import { onboardingEmail } from "./emails/onboarding";

const FROM_EMAIL = "RepurposeContent <hello@repurposecontent.com>";

export const emailService = {
  sendWelcome: async (email: string, name: string) => {
    // ...
  },
  sendOnboarding: async (email: string, name: string, step: number) => {
    const template = onboardingEmail(name, step);
    return await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: template.subject,
      html: template.html,
    });
  },
  // ... other methods
    const template = supportReplyEmail(name, reply);
    return await resend.emails.send({
      from: "Support <support@repurposecontent.com>",
      to: email,
      subject: template.subject,
      html: template.html,
    });
  },
  sendWelcome: async (email: string, name: string) => {
    const template = welcomeEmail(name);
    return await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: template.subject,
      html: template.html,
    });
  },

  sendInvoice: async (email: string, amount: number, date: Date) => {
    const template = invoiceEmail(`$${(amount / 100).toFixed(2)}`, date.toLocaleDateString());
    return await resend.emails.send({
      from: "Billing <billing@repurposecontent.com>",
      to: email,
      subject: template.subject,
      html: template.html,
    });
  },

  sendSubscriptionUpdate: async (email: string, status: string) => {
    const template = subscriptionStatusEmail(status);
    return await resend.emails.send({
      from: "Billing <billing@repurposecontent.com>",
      to: email,
      subject: template.subject,
      html: template.html,
    });
  },

  sendSupportTicketNotification: async (email: string, subject: string, message: string) => {
     return await resend.emails.send({
      from: "Support <support@repurposecontent.com>",
      to: email,
      subject: `Confirmation: ${subject}`,
      html: `
        <h2>We've received your ticket</h2>
        <p>Thank you for reaching out. We'll get back to you shortly.</p>
        <hr/>
        <p><strong>Your Message:</strong></p>
        <p>${message}</p>
      `,
    });
  }
};
