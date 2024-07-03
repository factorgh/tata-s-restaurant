import React from "react";
import { Button, Modal } from "antd";
import AddItemForm from "./AddItemForm";
const AddItemModal = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showLoading}>
        Add New Item
      </Button>
      <Modal
        title={<p>Item Form</p>}
        footer={
          <Button type="primary" onClick={handleClose}>
            Cancel
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <AddItemForm handleClose={handleClose} />
      </Modal>
    </>
  );
};
export default AddItemModal;
