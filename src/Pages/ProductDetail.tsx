import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/features/product/productApi";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery(id!);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details.</p>;

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
      <p>Price: {data?.price}</p>
      {/* Customize styling and layout */}
    </div>
  );
};

export default ProductDetail;
