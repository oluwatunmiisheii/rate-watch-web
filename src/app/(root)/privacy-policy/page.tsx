import { Container } from '@/components/ui/container/container'
import React from 'react'

export default function PrivacyPolicy() {
  return (
    <Container className="sm:my-5">
      <div className="flex items-center justify-between mb-4 md:mb-0">
        <h1 className="leading-none text-2xl text-gray-900">
          <a href="#" className="no-underline text-gray-900">
            Privacy Policy
          </a>
        </h1>
      </div>

      <section className="">
        <div>
          <p className="text-base text-gray-700 mb-6">Last updated: 19/06/2023</p>

          <h2 className="text-lg font-bold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Rate Watch (“we”, “our”, “us”). We value your privacy and are committed to
            protecting your personal data. This privacy policy explains how we collect, use, and
            share information about you when you use our application and services.
          </p>

          <h2 className="text-lg font-bold mb-4">2. Information We Collect</h2>
          <p className="mb-4">
            - <strong>Personal Information:</strong> If you choose to sign up, we collect your name
            and email address. If you decide not to sign up, you can still use the app&apos;s search
            functionality, but you will not be able to set up rate watch.
          </p>

          <h2 className="text-lg font-bold mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use your information for the following purposes:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>To provide and maintain our service.</li>
            <li>To notify you about changes to our service.</li>
            <li>To allow you to set up rate watch notifications (for signed-up users).</li>
          </ul>

          <h2 className="text-lg font-bold mb-4">4. Exchange Rate Disclaimer</h2>
          <p className="mb-4">
            The exchange rates provided by our application are obtained from third-party providers.
            While we strive to provide accurate and up-to-date information, we do not guarantee that
            the rates displayed in the app will be available or applicable when you use the
            providers services.
          </p>

          <h2 className="text-lg font-bold mb-4">5. Your Rights</h2>
          <p className="mb-4">
            You have the right to access, update, or delete your personal information. If you wish
            to exercise these rights, please contact us at [Your Contact Information].
          </p>

          <h2 className="text-lg font-bold mb-4">6. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this privacy policy from time to time. We will notify you of any changes
            by posting the new privacy policy on this page.
          </p>

          <h2 className="text-lg font-bold mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact us at
            ratewatchxyz.gmail.com
          </p>
        </div>
      </section>
    </Container>
  )
}
