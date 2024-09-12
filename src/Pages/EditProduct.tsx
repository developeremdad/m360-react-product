import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Rate,
  Select,
  Space,
  Spin,
} from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Component/Shared/Navbar";
import {
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useUpdateProductByIdMutation,
} from "../redux/features/product/productApi";
import { TProduct } from "../types/Product.type";

const { Option } = Select;

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();

  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
  } = useGetProductByIdQuery(id!);
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();

  // Update product
  const [updateProduct, { isLoading: isUpdating }] =
    useUpdateProductByIdMutation();

  // Handle form submit
  const handleSubmit = async (values: Partial<TProduct>) => {
    console.log({ values });
    await updateProduct({ id: id!, data: values }).unwrap();

    message.success("Product updated successfully!");
  };

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  if (isProductLoading || isCategoriesLoading) {
    return <Spin tip="Loading product details..." />;
  }

  if (productError) {
    return <p>Error loading product details.</p>;
  }

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <Title
        style={{ marginBottom: "2rem", fontWeight: "bold", fontSize: "30px" }}
      >
        Edit Product
      </Title>
      <Form
        style={{
          padding: "1rem",
          borderRadius: "5px",
          backgroundColor: "#fafafa",
          border: "1px solid #ddd",
        }}
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={product}
      >
        {/* Title */}
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>

        {/* Description */}
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        {/* Price */}
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        {/* Category Select */}
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select placeholder="Select category">
            {categories?.map((category) => (
              <Option key={category.slug} value={category.slug}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Brand */}
        <Form.Item
          name="brand"
          label="Brand"
          rules={[{ required: true, message: "Please input the brand!" }]}
        >
          <Input />
        </Form.Item>

        {/* Rating */}
        <Form.Item
          name="rating"
          label="Rating"
          rules={[{ required: true, message: "Please input the rating!" }]}
        >
          <Rate />
        </Form.Item>

        {/* Stock */}
        <Form.Item
          name="stock"
          label="Stock"
          rules={[{ required: true, message: "Please input the stock!" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        {/* Reviews */}
        <Form.List name="reviews">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, "reviewerName"]}
                    fieldKey={["reviewerName"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input reviewer name!",
                      },
                    ]}
                  >
                    <Input placeholder="Reviewer Name" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "comment"]}
                    fieldKey={["comment"]}
                    rules={[
                      { required: true, message: "Please input comment!" },
                    ]}
                  >
                    <Input placeholder="Comment" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "rating"]}
                    fieldKey={["rating"]}
                    rules={[
                      { required: true, message: "Please input rating!" },
                    ]}
                  >
                    <Rate />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Review
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Submit Button */}
        <Form.Item style={{ textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={isUpdating}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProduct;
