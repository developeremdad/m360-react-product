import {
  Breadcrumb,
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Component/Shared/Navbar";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import { TProduct } from "../types/Product.type";

type TProductData = {
  limit: number;
  skip: number;
  total: number;
  products: TProduct[];
};

type TTableData = Pick<
  TProduct,
  "title" | "category" | "price" | "brand" | "stock" | "thumbnail"
>;

const ProductList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isFetching } = useGetProductsQuery({
    limit: limit,
    skip: (page - 1) * limit,
  });

  const productData: TProductData = data;

  const products: TProduct[] = productData?.products || [];

  const tableData = products?.map(
    ({ id, title, category, price, brand, stock, thumbnail }) => ({
      key: id,
      id: id,
      title,
      category,
      price,
      brand,
      stock,
      thumbnail,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    { title: "ID", dataIndex: "id", key: "id", responsive: ["md"], width: 30 },
    {
      title: "Image",
      key: "thumbnail",

      fixed: "left",
      width: 100,
      render: (item: TProduct) => (
        <div>
          <img src={item.thumbnail} height={40} alt="Image" />
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      fixed: "left",
      width: 200,
    },
    {
      title: "Category",
      key: "category",
      render: (item: TProduct) => (
        <span style={{ textTransform: "capitalize" }}>{item.category}</span>
      ),
    },
    {
      title: "Price",
      key: "price",
      render: (item: TProduct) => <span>{item.price} Tk</span>,
    },
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
      width: 150,
      render: (item: TProduct) => (
        <Space>
          <Link to={`/product/${item.id}`}>
            <Button type="primary">View</Button>
          </Link>
          <Link to={`/product/edit/${item.id}`}>
            <Button type="default">Edit</Button>
          </Link>
        </Space>
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
      <Navbar />
      <div>
        <Breadcrumb
          style={{
            marginBottom: "2rem",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          <Breadcrumb.Item>
            <Link to="/">Product List</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Table
        style={{
          width: "100%",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
        columns={columns}
        dataSource={tableData}
        loading={isFetching}
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
          defaultPageSize={10}
          defaultCurrent={1}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default ProductList;
