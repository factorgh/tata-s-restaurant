/* eslint-disable react/prop-types */
import { Button, Form, Input, InputNumber } from "antd";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
// import { db } from "../config/firebaseConfig";
import { useFirebase } from "../context/firebaseContext";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { addNewItem } from "../store/itemSlice";
import { Select } from "antd";

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

const AddItemForm = ({ handleClose }) => {
  const { db } = useFirebase();
  const dispatch = useDispatch();

  ///Submit form
  const onSubmit = async (values) => {
    const formattedDate = moment(new Date()).format("YYYY-MM-DD");
    console.log(values);

    const newItem = {
      name: values.Name.toLowerCase(),
      price: values.Price,
      quantity: values.Quantity,
      category: values.selectedField,
      createdAt: formattedDate,
    };

    const itemsCollectionRef = collection(db, "items");
    const q = query(itemsCollectionRef, where("name", "==", newItem.name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Item exists, update the quantity
      querySnapshot.forEach(async (document) => {
        const itemDocRef = doc(db, "items", document.id);
        const existingQuantity = document.data().quantity;
        await updateDoc(itemDocRef, {
          quantity: existingQuantity + newItem.quantity,
        });

        // Update Redux store
        dispatch(addNewItem(newItem));
      });
    } else {
      // Item does not exist, add new item
      const itemsRef = await addDoc(itemsCollectionRef, newItem);

      // Update Redux store
      dispatch(addNewItem(newItem));

      console.log(itemsRef);
    }

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
        label="Price"
        name="Price"
        rules={[
          {
            required: true,
            message: "Please input a price!",
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

      <Form.Item label="Category" name="selectedField">
        <Select>
          <Select.Option value="dish">Dishes</Select.Option>
          <Select.Option value="snack">Snacks</Select.Option>
        </Select>
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

export default AddItemForm;
