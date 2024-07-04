/* eslint-disable react/prop-types */
import { Button, Form, Input, InputNumber } from "antd";
import {
  collection,
  deleteDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
// import { db } from "../config/firebaseConfig";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { removeInventory } from "../store/InventorySlice";
import { useFirebase } from "../context/firebaseContext";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const RemoveInventoryForm = ({ handleClose }) => {
  const { db } = useFirebase();
  const dispatch = useDispatch();

  ///Submit form
  const onSubmit = async (values) => {
    const formattedDate = moment(new Date()).format("YYYY-MM-DD");
    console.log(values);

    const newItem = {
      name: values.Name,
      quantity: values.Quantity,
      createdAt: formattedDate,
    };
    // Query to check if the item already exists based on its name

    const q = query(
      collection(db, "inventories"),
      where("name", "==", newItem.name)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // If item exists, update its quantity or remove it if quantity goes to zero or less
      querySnapshot.forEach(async (document) => {
        const existingItem = document.data();
        const currentQuantity = existingItem.quantity;

        if (currentQuantity >= newItem.quantity) {
          const newQuantity = currentQuantity - newItem.quantity;

          if (newQuantity > 0) {
            // Update the quantity
            await updateDoc(doc(db, "inventories", document.id), {
              quantity: newQuantity,
            });
          } else {
            // Remove the item
            await deleteDoc(doc(db, "inventories", document.id));
          }
        } else {
          console.log("Not enough quantity to remove.");
        }
      });
    } else {
      console.log("Item does not exist in the inventory.");
    }

    dispatch(removeInventory(newItem));

    ///Update redux store

    handleClose();
  };

  return (
    <Form
      onFinish={onSubmit}
      {...formItemLayout}
      variant="filled"
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="Name"
        name="Name"
        rules={[
          {
            required: true,
            message: "Please input a name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="Quantity"
        rules={[
          {
            required: true,
            message: "Please enter a quantity!",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RemoveInventoryForm;
