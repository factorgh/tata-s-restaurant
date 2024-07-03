import React from "react";
import { Button, Modal } from "antd";
import RemoveInventoryForm from "./RemoveInventoryForm";

const RemoveInventoryModal = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const showLoading = () => {
    setOpen(true);
    setLoading(true);

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
        Use Inventory
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
        <RemoveInventoryForm handleClose={handleClose} />
      </Modal>
    </>
  );
};
export default RemoveInventoryModal;
