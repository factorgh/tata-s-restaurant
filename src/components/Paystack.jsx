/* eslint-disable react/prop-types */
import { PaystackButton } from "react-paystack";

const Paystack = ({ handleClose }) => {
  const publicKey = "pk_test_c5711d1df101744e50b93ea1ddf65e529020c60a";
  const amount = 1000000; // Amount in kobo (e.g., 1000 NGN = 100000 kobo)
  const email = "customer@example.com";
  const currency = "GHS"; // Ensure this matches the supported currency on your Paystack account

  const componentProps = {
    email,
    amount,
    currency,
    publicKey,
    text: "Pay Now",
    onSuccess: (reference) => {
      console.log("Payment successful", reference);
    },
    onClose: () => {
      handleClose(false);
      console.log("Payment closed");
    },
  };

  return (
    <div>
      <PaystackButton {...componentProps} />
    </div>
  );
};

export default Paystack;
