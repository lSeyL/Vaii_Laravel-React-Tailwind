//import style from './Info.module.css'

import Nav from "../components/Nav";

function Info() {
  const styleText = { backgroundColor: "tomato" };
  return (
    <div>
      <Nav />
      <div>
        <h1 style={styleText}>Terms of Service and Rules</h1>
        <p>
          1. Acceptance of Terms By accessing or using [Your E-Shop Name], you
          agree to comply with and be bound by the following terms and
          conditions. If you do not agree to these terms, please do not use the
          website. 2. Products and Services a. Product Descriptions: We strive
          to provide accurate and up-to-date product descriptions, but we do not
          warrant the accuracy, completeness, reliability, or currency of such
          descriptions. b. Availability: All products are subject to
          availability. We reserve the right to discontinue any product at any
          time. c. Pricing: Prices are subject to change without notice. All
          prices are listed in [currency]. 3. Orders and Payment a. Order
          Confirmation: Your order is an offer to purchase our products. We will
          send you an order confirmation email, but the order is only accepted
          once payment is received. b. Payment: We accept [list of accepted
          payment methods]. Payment must be made in full before the order is
          processed. c. Cancellation: Orders cannot be canceled once payment is
          processed. 4. Shipping and Delivery a. Shipping: We aim to ship orders
          promptly, but we do not guarantee delivery times. Shipping costs are
          detailed during the checkout process. b. International Orders: Customs
          and import duties may be applied to international orders. We are not
          responsible for these charges. 5. Returns and Refunds a. Return
          Policy: Please refer to our [Return Policy] for information on
          returning products. b. Refunds: Refunds will be issued in accordance
          with our [Refund Policy]. 6. User Accounts a. Account Creation: To
          make a purchase, you may be required to create an account. You are
          responsible for maintaining the confidentiality of your account
          information. b. Account Termination: We reserve the right to terminate
          accounts for any reason, including violation of these terms. 7.
          Intellectual Property a. Ownership: All content and materials on [Your
          E-Shop Name] are the property of [Your Company Name] and are protected
          by copyright, trademark, and other intellectual property laws. 8.
          Privacy a. Privacy Policy: Our [Privacy Policy] outlines how we
          collect, use, and protect your personal information. 9. Limitation of
          Liability a. [Your Company Name] is not liable for any direct,
          indirect, incidental, consequential, or punitive damages arising out
          of your access to or use of [Your E-Shop Name]. 10. Governing Law a.
          These terms are governed by and construed in accordance with the laws
          of [Your Jurisdiction]. 11. Changes to Terms a. We reserve the right
          to update and modify these terms at any time. Changes will be
          effective immediately upon posting. By using [Your E-Shop Name], you
          acknowledge and agree to these terms. If you have any questions,
          please contact us at [your contact information].
        </p>
      </div>
    </div>
  );
}

export default Info;
