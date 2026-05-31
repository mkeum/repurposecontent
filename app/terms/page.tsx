import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-blue max-w-none space-y-6 text-gray-700">
        <p className="text-lg">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using RepurposeContent ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
          <p>
            RepurposeContent provides AI-powered content transformation services, allowing users to convert their original content into various marketing formats.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
          <p>
            You are responsible for maintaining the security of your account and password. The Service cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Content Ownership and Rights</h2>
          <p>
            You retain all rights to the original content you upload to the Service. By using the Service, you grant us a license to process your content for the purpose of providing the service to you.
          </p>
          <p>
            You represent and warrant that you have the right to upload and process the content you provide.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Payment and Subscriptions</h2>
          <p>
            The Service offers various subscription tiers. Payments are processed through Stripe. Subscriptions automatically renew unless canceled.
          </p>
          <p>
            Refunds are provided at our sole discretion unless required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Acceptable Use</h2>
          <p>
            You agree not to use the Service for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account at any time, with or without notice, for conduct that we believe violates these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
          <p>
            The Service is provided "as is". We shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
          <p>
            We reserve the right to update and change the Terms of Service from time to time without notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@repurposecontent.com.
          </p>
        </section>
      </div>
    </div>
  );
}
