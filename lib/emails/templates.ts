export const welcomeEmail = (name: string) => ({
  subject: "Welcome to RepurposeContent! 🚀",
  html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Welcome, ${name}!</h2>
      <p>Thanks for joining RepurposeContent. We're excited to help you get 10x more mileage from your content.</p>
      <p>Ready to start? Upload your first piece of content to our dashboard and see the magic happen.</p>
      <div style="margin-top: 30px;">
        <a href="${process.env.AUTH_URL}/dashboard" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; rounded: 8px; font-weight: bold;">Go to Dashboard</a>
      </div>
      <p style="margin-top: 40px; color: #666; font-size: 14px;">If you have any questions, just reply to this email.</p>
    </div>
  `,
});

export const invoiceEmail = (amount: string, date: string) => ({
  subject: "Your RepurposeContent Receipt",
  html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Payment Received</h2>
      <p>Thank you for your payment of <strong>${amount}</strong> on ${date}.</p>
      <p>Your subscription is active and your content piece quota has been reset.</p>
      <p>You can manage your billing and download full invoices from your <a href="${process.env.AUTH_URL}/dashboard/billing">billing portal</a>.</p>
    </div>
  `,
});

export const subscriptionStatusEmail = (status: string) => ({
  subject: `Subscription Update: ${status.toUpperCase()}`,
  html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Subscription Update</h2>
      <p>Your subscription status has changed to: <strong>${status}</strong>.</p>
      ${status === 'canceled' ? '<p>We\'re sorry to see you go! Your access will remain active until the end of your current billing period.</p>' : ''}
      ${status === 'past_due' ? '<p>Please update your payment method in the <a href="${process.env.AUTH_URL}/dashboard/billing">billing portal</a> to maintain access.</p>' : ''}
    </div>
  `,
});

export const supportReplyEmail = (name: string, reply: string) => ({
  subject: "Re: Your Support Ticket",
  html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Support Reply</h2>
      <p>Hi ${name},</p>
      <p>Our team has responded to your ticket:</p>
      <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
        ${reply}
      </div>
      <p>If you have more questions, feel free to reply to this email.</p>
    </div>
  `,
});
