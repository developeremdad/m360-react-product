import { Button, Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../redux/features/product/productApi";

const ProductList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetProductsQuery({
    limit: 10,
    skip: (page - 1) * 10,
  });

  console.log(data);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: any) => (
        <Link to={`/product/${record.id}`}>
          <Button type="primary">View Details</Button>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data?.products || []}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: 10,
          total: data?.total,
          onChange: (page) => setPage(page),
        }}
      />
    </div>
  );
};

export default ProductList;
