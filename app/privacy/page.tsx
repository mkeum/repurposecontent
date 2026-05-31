import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-blue max-w-none space-y-6 text-gray-700">
        <p className="text-lg">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us when you create an account, such as your name and email address. We also collect the content you upload for processing.
          </p>
          <p>
            Payment information is collected and processed securely by Stripe; we do not store your credit card details on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services. This includes using AI to process your content and communicating with you about your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Sharing and Processing</h2>
          <p>
            We use third-party services to provide our functionality:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>OpenAI:</strong> To process and repurpose your content.</li>
            <li><strong>Stripe:</strong> To handle subscription payments.</li>
            <li><strong>Resend:</strong> To send transactional emails.</li>
            <li><strong>Turso/PostgreSQL:</strong> To store your account and content data.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
          <p>
            We take reasonable measures to protect your personal information from loss, theft, misuse, and unauthorized access. However, no internet transmission is ever completely secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights (GDPR)</h2>
          <p>
            If you are located in the European Economic Area, you have certain rights under the General Data Protection Regulation (GDPR), including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The right to access your personal data.</li>
            <li>The right to rectify inaccurate data.</li>
            <li>The right to request erasure of your data.</li>
            <li>The right to restrict processing.</li>
            <li>The right to data portability.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies</h2>
          <p>
            We use cookies to maintain your session and improve your experience. You can control cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to this Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@repurposecontent.com.
          </p>
        </section>
      </div>
    </div>
  );
}
