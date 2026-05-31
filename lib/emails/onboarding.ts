export const onboardingEmail = (name: string, step: number) => {
  const steps = [
    {
      subject: "Day 1: How to repurpose your first blog post 📝",
      content: `Hi ${name}, welcome back! Today, try uploading a blog post to see how we turn it into 6 different social formats instantly.`
    },
    {
      subject: "Day 2: Save time with Twitter threads 🧵",
      content: `Hi ${name}, did you know our AI can turn a 20-minute podcast transcript into a high-engagement Twitter thread in seconds?`
    },
    {
      subject: "Day 3: Optimize your SEO 🔍",
      content: `Hi ${name}, final tip: use the SEO Summary output to quickly generate meta tags and keywords for your site.`
    }
  ];

  const current = steps[step - 1] || steps[0];

  return {
    subject: current.subject,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>RepurposeContent Tips</h2>
        <p>${current.content}</p>
        <div style="margin-top: 30px;">
          <a href="${process.env.AUTH_URL}/dashboard/new" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Try it now</a>
        </div>
      </div>
    `,
  };
};
