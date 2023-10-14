"use client";

import {
  Button,
  Input,
  Pagination,
  Checkbox,
  Space,
  Modal,
  message,
  Dropdown,
  Menu,
  Form,
  Select, Table
} from "antd";
import Image from "next/image";
import Head from "next/head";
import { SearchOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { useState } from "react";
import { FilterOutlined, EditOutlined } from "@ant-design/icons";
const { Search } = Input;

const Index = () => {
  const earnings = [
    {
      id: 1,
      image: "/images/products1.svg",
      seller: "James William",
      product: "AFO Standard",
      amount: 146.0,
      buyer: "James Williams",
      commission: 14.0,
    },
    {
      id: 2,
      image: "/images/product2.svg",
      seller: "James William",
      product: "AFO Standard",
      amount: 146.0,
      buyer: "James Williams",
      commission: 14.0,
    },
    {
      id: 3,
      image: "/images/product3.svg",
      seller: "James William",
      product: "AFO Standard",
      amount: 146.0,
      buyer: "James Williams",
      commission: 14.0,
    },
    {
      id: 4,
      image: "/images/products1.svg",
      seller: "James William",
      product: "AFO Standard",
      amount: 146.0,
      buyer: "James Williams",
      commission: 14.0,
    },
    {
      id: 5,
      image: "/images/product2.svg",
      seller: "James William",
      product: "AFO Standard",
      amount: 146.0,
      buyer: "James Williams",
      commission: 14.0,
    },
    {
      id: 6,
      image: "/images/product3.svg",
      seller: "James William",
      product: "AFO Standard",
      amount: 146.0,
      buyer: "James Williams",
      commission: 14.0,
    },
    {
      id: 7,
      image: "/images/products1.svg",
      seller: "James William",
      product: "AFO Standard",
      amount: 146.0,
      buyer: "James Williams",
      commission: 14.0,
    },
    {
      id: 8,
      image: "/images/product2.svg",
      seller: "James William",
      product: "AFO Standard",
      amount: 146.0,
      buyer: "James Williams",
      commission: 14.0,
    },
    {
      id: 9,
      image: "/images/product3.svg",
      seller: "James William",
      product: "AFO Standard",
      amount: 146.0,
      buyer: "James Williams",
      commission: 14.0,
    },
  ];
  const columns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-base font-lato font-medium">SELLER</span>
        </div>
      ),
      dataIndex: "no",
      sorter: (a, b) => a.age - b.age,
      render: (_, record) => (
        <div className="w-full flex items-center justify-start">
          <span className="text-base font-lato font-normal text-[#777777]">
            {record.seller}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-base font-lato font-medium">BUYER</span>
        </div>
      ),
      dataIndex: "name",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <span className="text-base font-lato font-normal text-[#777777]">
            {record.buyer}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-base font-lato font-medium">PRODUCT</span>
        </div>
      ),
      dataIndex: "quantity",
      sorter: (a, b) => a.age - b.age,
      render: (_, record) => (
        <div className="w-full flex items-center justify-start">
          <span className="text-base font-lato font-normal text-[#777777]">
            {record.product}
          </span>
        </div>
      ),
    }
    ,
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-base font-lato font-medium">AMOUNT</span>
        </div>
      ),
      dataIndex: "quantity",
      sorter: (a, b) => a.age - b.age,
      render: (_, record) => (
        <div className="w-full flex items-center justify-start">
          <span className="text-base font-lato font-normal text-[#777777]">
            {record.amount}
          </span>
        </div>
      ),
    }
    ,
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-base font-lato font-medium">Actions</span>
        </div>
      ),
      key: "actions",
      render: (_, record) => {
        return (
          <div className="flex items-center justify-center">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item
                    onClick={() => handleEditModalOpen(record)}
                  >
                    <EditOutlined /> Edit
                  </Menu.Item>
                  <Menu.Item
                    // onClick={handleDeleteEach}
                    className="delete-option">
                    <DeleteOutlined /> Delete
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
              placement="bottomRight"
            // visible={selectedProductId === product.id}
            // onVisibleChange={(visible) => {
            //   if (!visible) {
            //     setSelectedProductId(null);
            //   }
            // }}
            >
              <Button
                icon={<MoreOutlined />}
                className="more-button"
              // onClick={() => handleActionsToggle(product.id)}
              />
            </Dropdown>
          </div>
        );
      },
    },
  ];


  const ITEMS_PER_PAGE = 5;

  const [pageContent, setPageContent] = useState(earnings.slice(0, ITEMS_PER_PAGE));
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const onPageChange = (page) => {
    setCurrentPage(page);
    setPageContent(earnings.slice(startIndex, endIndex));
  };

  const handleCheckboxChange = (productId) => {
    setPageContent((prevContent) => {
      const updatedContent = prevContent.map((content) =>
        content.id === productId
          ? { ...content, selected: !content.selected }
          : content,
      );

      const updatedSelectedIds = updatedContent
        .filter((content) => content.selected)
        .map((content) => content.id);

      setSelectedProductIds(updatedSelectedIds);

      return updatedContent;
    });
  };
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setPageContent((prevContent) =>
      prevContent.map((content) => ({
        ...content,
        selected: !selectAll,
      }))
    );

    setSelectedProductIds(
      !selectAll ? pageContent.map((content) => content.id) : []
    );
  };

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmationModal(true);
  };

  const handleDeleteConfirmed = () => {
    console.log("Delete");
  }


  return (
    <div className="w-full h-full bg-[F9F9F9] px-4 ">
      <Head>
        <title>Earning</title>
      </Head>
      <div className="h-full w-full my-4 py-3  bg-[#FFFFFF] rounded-md">
        <div>
          {/* Table */}
          <Table
            // loading={isLoading}
            columns={columns}
            dataSource={earnings}
            pagination={{ defaultPageSize: 4 }}
            // className="table"
            scroll={{ x: 1000 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
