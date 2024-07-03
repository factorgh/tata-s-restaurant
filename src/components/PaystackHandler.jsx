import { useState } from "react";
import { Button, Modal } from "antd";
import Paystack from "./Paystack";
const PaystackHandler = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Continue with E-payment
      </Button>
      <Modal
        title="Paystack Checkout"
        centered
        open={open}
        width={250}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <Paystack handleClose={setOpen} />
      </Modal>
    </>
  );
};
export default PaystackHandler;
