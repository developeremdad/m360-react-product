import { Button, Grid, Pagination, Table, TableColumnsType } from "antd";
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
  const [limit, setLimit] = useState(10);
  const { data, isLoading } = useGetProductsQuery({
    limit: limit,
    skip: (page - 1) * limit,
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

  const columns: TableColumnsType<TTableData> = [
    { title: "ID", dataIndex: "id", key: "id", responsive: ["md"] },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      fixed: "left",
      width: 200,
    },
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
      fixed: "right",
      width: 100,
      render: (record: TProduct) => (
        <Link to={`/product/${record.id}`}>
          <Button type="primary">View Details</Button>
        </Link>
      ),
    },
  ];

  const handlePaginationChange = (pageNumber: number, pageSize: number) => {
    setPage(pageNumber);
    setLimit(pageSize);
  };

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
          marginBottom: "20px",
        }}
        columns={columns}
        dataSource={tableData}
        loading={isLoading}
        pagination={false}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          paddingBottom: "15px",
        }}
      >
        <Pagination
          size="default"
          total={data?.total}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
          defaultPageSize={20}
          defaultCurrent={1}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default ProductList;
