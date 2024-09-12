import {
  Alert,
  Card,
  Col,
  Divider,
  Image,
  Rate,
  Row,
  Skeleton,
  Tag,
  Typography,
} from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Component/Shared/Navbar";
import { useGetProductByIdQuery } from "../redux/features/product/productApi";
import "../Styles/ProductDetails.css";
import { TProduct } from "../types/Product.type";

const { Title, Text, Paragraph } = Typography;

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery(id!);

  if (isLoading) {
    return <Skeleton active />;
  }

  if (error || !data) {
    return <Alert message="Error loading product details" type="error" />;
  }

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    brand,
    sku,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews,
    returnPolicy,
    images,
    thumbnail,
  }: TProduct = data;

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <div className="product-detail-container">
        <Row gutter={[16, 16]}>
          {/* Product Image Section */}
          <Col xs={24} md={10}>
            <Image
              src={thumbnail}
              alt={title}
              width="100%"
              className="product-main-image"
            />
            <Row gutter={[8, 8]} className="product-thumbnail-gallery">
              {images?.slice(0, 4).map((img, i) => (
                <Col key={i} xs={6}>
                  <Image
                    src={img}
                    alt={`img-${i}`}
                    className="product-thumbnail"
                  />
                </Col>
              ))}
            </Row>
          </Col>

          {/* Product Information Section */}
          <Col xs={24} md={14}>
            <Card bordered={false} className="product-info-card">
              <Title level={2} className="product-title">
                {title}
              </Title>
              <Text className="product-sku-brand">
                <b>SKU:</b> {sku} | <b>Brand:</b> {brand}
              </Text>
              <Divider />
              <Paragraph className="product-description">
                {description}
              </Paragraph>
              <Text className="product-price">Price: ${price}</Text>
              <Text className="product-discount">
                <b>Discount:</b> {discountPercentage}%
              </Text>
              <Divider />
              <Row gutter={[16, 16]} className="product-stats">
                <Col xs={12}>
                  <Text>
                    <b>Rating:</b>{" "}
                  </Text>
                  <Rate allowHalf defaultValue={rating} disabled />
                  <Text> ({rating}/5)</Text>
                </Col>
                <Col xs={12}>
                  <Text>
                    <b>Stock Status:</b>{" "}
                  </Text>
                  <Text
                    className={`product-stock ${
                      stock > 0 ? "in-stock" : "out-of-stock"
                    }`}
                  >
                    {stock > 0 ? `${stock} in stock` : "Out of stock"}
                  </Text>
                </Col>
              </Row>
              <Divider />
              <Row gutter={[16, 16]} className="product-dimensions">
                <Col xs={12}>
                  <Text>
                    <b>Weight:</b> {weight} kg
                  </Text>
                </Col>
                <Col xs={12}>
                  <Text>
                    <b>Dimensions:</b> {dimensions.width} x {dimensions.height}{" "}
                    x {dimensions.depth} cm
                  </Text>
                </Col>
              </Row>
              <Divider />
              <Row gutter={[16, 16]} className="product-extra-info">
                <Col xs={24}>
                  <Text>
                    <b>Warranty Information:</b> {warrantyInformation}
                  </Text>
                </Col>
                <Col xs={24}>
                  <Text>
                    <b>Shipping Information:</b> {shippingInformation}
                  </Text>
                </Col>
              </Row>
              <Divider />
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Text>
                    <b>Availability:</b> {availabilityStatus}
                  </Text>
                </Col>
                <Col xs={24}>
                  <Text>
                    <b>Return Policy:</b> {returnPolicy}
                  </Text>
                </Col>
              </Row>
              <Divider />
              <Row gutter={[16, 16]} className="product-tags">
                <Col xs={24}>
                  <Text>Tags:</Text>
                  {tags.map((tag, idx) => (
                    <Tag key={idx} className="product-tag">
                      {tag}
                    </Tag>
                  ))}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Reviews Section */}
        <Divider />
        <Row>
          <Col xs={24}>
            <Title level={3} className="reviews-title">
              Customer Reviews
            </Title>
            {reviews && reviews.length > 0 ? (
              reviews.map((review, index) => (
                <Card key={index} className="review-card">
                  <Text strong>{review.reviewerName}</Text> <br />
                  <Text type="secondary">
                    {new Date(review.date).toLocaleDateString()}
                  </Text>
                  <Paragraph>{review.comment}</Paragraph>
                  <Rate allowHalf defaultValue={review.rating} disabled />
                </Card>
              ))
            ) : (
              <Alert message="No reviews available." type="info" />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductDetail;
