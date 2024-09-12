import { Button, Grid, Table, TableColumnsType } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import { TProduct } from "../types/Product.type";

const { useBreakpoint } = Grid;

type TProductData = {
  limit: number;
  skip: number;
  total: number;
  products: TProduct[];
};

type TTableData = Pick<
  TProduct,
  "title" | "category" | "price" | "brand" | "stock"
>;

const ProductList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetProductsQuery({
    limit: 10,
    skip: (page - 1) * 10,
  });

  const screens = useBreakpoint();

  const productData: TProductData = data;

  const products: TProduct[] = productData?.products || [];

  const tableData = products?.map(
    ({ id, title, category, price, brand, stock }) => ({
      id: id,
      title,
      category,
      price,
      brand,
      stock,
    })
  );

  const columns1: TableColumnsType<TTableData> = [
    { title: "ID", dataIndex: "id", key: "id", responsive: ["md"] },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: TProduct) => (
        <Link to={`/product/${record.id}`}>
          <Button type="primary">View Details</Button>
        </Link>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <div>
        <Title
          level={screens.md ? 2 : 3}
          style={{ marginBottom: "2rem", fontWeight: "bold" }}
        >
          Product List
        </Title>
      </div>
      <Table
        style={{
          width: "100%",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
        columns={columns1}
        dataSource={tableData}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: 10,
          total: data?.total,
          onChange: (page) => setPage(page),
        }}
        rowKey="id"
      />
    </div>
  );
};

export default ProductList;
