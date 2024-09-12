import { Button, Form, Input, Select } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../redux/features/product/productApi";

const EditProduct: React.FC = () => {
  const { id } = useParams();
  const { data: productData, isLoading } = useGetProductByIdQuery(id!);
  const { data: categories } = useGetCategoriesQuery(null);
  const [updateProduct] = useUpdateProductMutation();

  const onFinish = (values: any) => {
    updateProduct({ id: id!, ...values });
    console.log(values);
  };

  return (
    <Form
      initialValues={productData}
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 600, margin: "0 auto" }}
    >
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="price" label="Price" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="category" label="Category" rules={[{ required: true }]}>
        <Select>
          {categories?.map((category: string) => (
            <Select.Option key={category} value={category}>
              {category}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Reviews */}
      <Form.List name="reviews">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey }) => (
              <Form.Item key={key} label="Review" name={[name, "review"]}>
                <Input />
                <Button onClick={() => remove(name)}>Remove Review</Button>
              </Form.Item>
            ))}
            <Button onClick={() => add()}>Add Review</Button>
          </>
        )}
      </Form.List>

      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form>
  );
};

export default EditProduct;
