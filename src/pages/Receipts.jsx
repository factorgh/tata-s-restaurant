import { PaystackConsumer } from "react-paystack";

const config = {
  reference: new Date().getTime().toString(),
  email: "user@example.com",
  amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  publicKey: "pk_test_c5711d1df101744e50b93ea1ddf65e529020c60a",
  currency: "GHS",
};

// you can call this function anything
const handleSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// you can call this function anything
const handleClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log("closed");
};

function App() {
  const componentProps = {
    ...config,
    text: "Paystack Button Implementation",
    onSuccess: (reference) => handleSuccess(reference),
    onClose: handleClose,
  };

  return (
    <div>
      <PaystackConsumer {...componentProps}>
        {({ initializePayment }) => (
          <button onClick={() => initializePayment(handleSuccess, handleClose)}>
            Paystack Consumer Implementation
          </button>
        )}
      </PaystackConsumer>
    </div>
  );
}

export default App;
