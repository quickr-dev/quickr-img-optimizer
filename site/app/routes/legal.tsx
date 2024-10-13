import { Container, Text, Title } from "@mantine/core"
import { MetaFunction } from "@remix-run/cloudflare"
import Markdown from "react-markdown"
import { pageTitle } from "~/lib/pageTitle"

export const meta: MetaFunction = () => {
  return [pageTitle("Terms of Use and Privacy Policy")]
}

export default function Page() {
  return (
    <Container>
      <Title mb="xl" ta="center">
        Terms of Use and Privacy Policy for Quickr.dev
      </Title>

      <Text>Last updated: 2024-13-10</Text>

      <Markdown>{terms}</Markdown>
      <Markdown>{privacy}</Markdown>
    </Container>
  )
}

const terms = `
# Terms of Service


Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the https://quickr.dev website and the Quickr.dev image optimization service (together, the "Service") operated by Quickr.dev ("us", "we", or "our").

Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.

By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.

## 1. Accounts

You must be at least 18 years old to use this Service. By using the Service, you represent and warrant that you are at least 18 years of age.

To use our Service, you need to create an account. When you create an account with us, you must provide us with accurate, complete, and up-to-date information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.

You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.

You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.

## 2. Intellectual Property

You retain full ownership of all images you optimize through our Service. We do not claim any ownership rights to your content.

## 3. Use of Data

To use our Service, your images must be publicly accessible. Our Service will download your images via Cloudflare workers to optimize them. By using our Service, you acknowledge and agree to this process.

## 4. Service Availability

Our Service operates on the Cloudflare infrastructure. While we strive to provide uninterrupted service, we do not guarantee 100% uptime. The Service may be subject to limitations, delays, and other issues inherent in the use of internet and electronic communications.

## 5. Termination

We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.

Upon termination, your right to use the Service will immediately cease.

## 6. Limitation of Liability

In no event shall Quickr.dev, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.

## 7. Prohibited Uses

You may only use the Service for lawful purposes and in accordance with these Terms. You agree not to use the Service:

- In any way that violates any applicable national, federal, state, local or international law or regulation
- To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation
- To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity
- To optimize any content that is illegal, infringing, defamatory, obscene, invasive of privacy, or otherwise objectionable
- To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm the Company or users of the Service or expose them to liability

## 8. Changes to Terms

We reserve the right, at our sole discretion, to modify or replace these Terms at any time without notice. It is your responsibility to check the Terms periodically for changes. Your continued use of the Service following the posting of any changes to the Terms constitutes acceptance of those changes.

## 9. Governing Law

These Terms shall be governed and construed in accordance with the laws of Brazil, without regard to its conflict of law provisions.

## 10. Contact Us

If you have any questions about these Terms, please contact us at support@quickr.dev.

By using Quickr.dev, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
`

const privacy = `
# Privacy Policy

At Quickr.dev, we are committed to protecting your privacy. This Privacy Policy explains our practices regarding the collection, use, and disclosure of your information through our image optimization service at https://quickr.dev (the "Service").

## 1. Information We Collect

The only personal information we collect is your email address, which is necessary for account creation and authentication purposes. This is managed through our authentication provider, Clerk.

## 2. How We Use Your Information

Your email address is used solely for the purpose of account creation and authentication. We do not use this information for any other purpose, such as marketing or analytics.

## 3. Data Storage and Security

Your email address is stored securely by our authentication provider, Clerk. We do not have direct access to this information.

## 4. Information Sharing and Disclosure

We do not sell, trade, or otherwise transfer your personal information to outside parties. This does not include trusted third parties who assist us in operating our service, such as our authentication provider, as long as these parties agree to keep this information confidential.

## 5. Your Data Rights

You have the right to access, correct, or delete your personal information (in this case, your email address). If you wish to exercise these rights, please contact us using the information provided at the end of this policy.

## 6. Cookies and Tracking

Our service does not use cookies or any other form of tracking technology.

## 7. Changes to This Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.

## 8. Image Data

While our service optimizes images, we do not store or retain any of the image data processed through our service. Images must be publicly accessible for our service to optimize them, but we do not collect or store this data.

## 9. Children's Privacy

Our Service does not address anyone under the age of 18. We do not knowingly collect personal identifiable information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to take necessary actions.

## 10. Contact Us

If you have any questions about this Privacy Policy, please contact us at: support@quickr.dev.

By using Quickr.dev, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
`
