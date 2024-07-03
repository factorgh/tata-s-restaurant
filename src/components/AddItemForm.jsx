/* eslint-disable react/prop-types */
import { Button, Form, Input, InputNumber } from "antd";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
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
  const dispatch = useDispatch();

  ///Submit form
  const onSubmit = async (values) => {
    const formattedDate = moment(new Date()).format("YYYY-MM-DD");
    console.log(values);

    const newItem = {
      name: values.Name,
      price: values.Price,
      quantity: values.Quantity,
      category: values.selectedField,
      createdAt: formattedDate,
    };
    const itemsRef = await addDoc(collection(db, "items"), newItem);

    dispatch(addNewItem(newItem));

    console.log(itemsRef);

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
          <Select.Option value="dishes">Dishes</Select.Option>
          <Select.Option value="snacks">Snacks</Select.Option>
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
