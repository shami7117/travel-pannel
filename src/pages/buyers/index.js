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
  Select,
} from "antd";

import { Table, Tag } from "antd";

import Image from "next/image";
import Head from "next/head";
import { SearchOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { EditOutlined } from "@ant-design/icons";
import BuyerModal from "../../components/Buyers/buyerModal";
import EditModal from "../../components/Buyers/EditModal";
import moment from 'moment';
const { Option } = Select;
const { Search } = Input;

const Index = () => {
  const ITEMS_PER_PAGE = 5;

  const buyers = [
    {
      id: 1,
      image: "/images/buyer1.svg",
      name: "James Wiliams",
      registered: "Aug 06,2023",
      country: "USA",
      group: "Default",
      spent: 14676.00,
    },
    {
      id: 2,
      image: "/images/buyer2.svg",
      name: "John Doe",
      registered: "Aug 06,2023",
      country: "USA",
      group: "Default",
      spent: 14676.00,
    },
    {
      id: 3,
      image: "/images/buyer3.svg",
      name: "Steve Smith",
      registered: "Aug 06,2023",
      country: "USA",
      group: "Default",
      spent: 14676.00,
    },
    {
      id: 4,
      image: "/images/buyer4.svg",
      name: "James Anderson",
      registered: "Aug 06,2023",
      country: "USA",
      group: "Default",
      spent: 14676.00,
    },
    {
      id: 5,
      image: "/images/buyer1.svg",
      name: "Steve Smith",
      registered: "Aug 06,2023",
      country: "USA",
      group: "Default",
      spent: 14676.00,
    },
    {
      id: 6,
      image: "/images/buyer2.svg",
      name: "John Doe",
      registered: "Aug 06,2023",
      country: "USA",
      group: "Default",
      spent: 14676.00,
    },
    {
      id: 7,
      image: "/images/buyer3.svg",
      name: "James Anderson",
      registered: "Aug 06,2023",
      country: "USA",
      group: "Default",
      spent: 14676.00,
    },
    {
      id: 8,
      image: "/images/buyer4.svg",
      name: "James Anderson",
      registered: "Aug 06,2023",
      country: "USA",
      group: "Default",
      spent: 14676.00,
    },
    {
      id: 9,
      image: "/images/buyer1.svg",
      name: "James Anderson",
      registered: "Aug 06,2023",
      country: "USA",
      group: "Default",
      spent: 14676.00,
    },
  ];


  const columns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-base font-lato font-medium">NAME</span>
        </div>
      ),
      dataIndex: "no",
      sorter: (a, b) => a.age - b.age,
      render: (_, record) => (
        <div className="w-full flex items-center justify-start">
          <span className="text-base font-lato font-normal text-[#777777]">
            {record.name}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-base font-lato font-medium">COUNTRY</span>
        </div>
      ),
      dataIndex: "name",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <span className="text-base font-lato font-normal text-[#777777]">
            {record.country}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-base font-lato font-medium">REGISTERED</span>
        </div>
      ),
      dataIndex: "quantity",
      sorter: (a, b) => a.age - b.age,
      render: (_, record) => (
        <div className="w-full flex items-center justify-start">
          <span className="text-base font-lato font-normal text-[#777777]">
            {record.registered}
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

  const [selectedBuyerId, setSelectedBuyerId] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [activeButton, setActiveButton] = useState("All");
  const [filteredBuyers, setFilteredBuyers] = useState(buyers);
  const [sortByDate, setSortByDate] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmationModal(true);
  };

  const handleDeleteConfirmed = () => {
    const updatedBuyers = buyers.filter(
      (buyer) => !selectedBuyerIds.includes(buyer.id),
    );
    setFilteredBuyers(updatedBuyers);
    setSelectedBuyerIds([]);
    setShowDeleteConfirmationModal(false);

    message.success("Selected buyer deleted successfully.");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBuyerIds, setSelectedBuyerIds] = useState([]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (productId) => {
    setFilteredBuyers((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === productId
          ? { ...product, selected: !product.selected }
          : product,
      );

      const updatedSelectedIds = updatedProducts
        .filter((product) => product.selected)
        .map((product) => product.id);

      setSelectedBuyerIds(updatedSelectedIds);

      return updatedProducts;
    });
  };

  const handleActionsToggle = (buyerId) => {
    setSelectedBuyerId(null);

    setSelectedBuyerId(buyerId);
    const buyer = buyers.find((b) => b.id === buyerId);
    setSelectedBuyer(buyer);
  };

  const handleEditSubmit = ({
    image: fileListImage,
    group,
    spent,
    ...values
  }) => {
    const numericSpent = parseFloat(spent);

    if (isNaN(numericSpent)) {
      message.error("Invalid spent value");
      return;
    }

    const updatedBuyers = filteredBuyers.map((buyer) =>
      buyer.id === selectedBuyer.id
        ? {
          ...buyer,
          ...values,
          image: fileListImage,
          group,
          spent: numericSpent,
        }
        : buyer
    );

    setFilteredBuyers(updatedBuyers);
    setEditModalVisible(false);

    message.success("Buyer updated successfully.");
  };

  const handleEditModalOpen = (buyer) => {
    setSelectedBuyer(buyer);
    // setShowActions(false);
    const registeredDate = moment(buyer.registered, 'MMM DD,YYYY');

    editForm.setFieldsValue({
      id: buyer.id,
      name: buyer.name,
      registered: registeredDate,
      country: buyer.country,
      group: buyer.group,
      spent: buyer.spent.toFixed(2),
    });

    setEditModalVisible(true);
  };


  const handleDeleteEach = () => {
    setSelectedBuyerId(selectedBuyer);
    handleDeleteConfirmation();
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const handleBuyerModal = () => {
    setShowCustomerModal(true)
    console.log(showCustomerModal)
  }


  const handleHeaderCheckboxChange = () => {
    const newSelectAll = !selectedBuyerIds.length || selectedBuyerIds.length !== filteredBuyers.length;
    const updatedBuyers = filteredBuyers.map((buyer) => ({
      ...buyer,
      selected: newSelectAll,
    }));
    setFilteredBuyers(updatedBuyers);
    setSelectedBuyerIds(newSelectAll ? buyers.map((buyer) => buyer.id) : []);
  };

  return (
    <div className="w-full h-full bg-[F9F9F9] px-4 ">
      <Head>
        <title>Buyers</title>
      </Head>
      <div className="h-full w-full my-4 py-3  bg-[#FFFFFF] rounded-md">
        <div className="w-full  px-3  py-1 border-b border-[#DFDFDF]">
          <div className="flex justify-between items-center w-full px-3 pb-4 flex-wrap-reverse">
            <div className="relative flex items-center w-full sm:w-auto">
              <Search
                placeholder="Search Orders"
                allowClear
                size="large"
                // onSearch={(value) => setSearchedText(value)}
                // onChange={(e) => setSearchedText(e.target.value)}
                className="searchBar w-52 lg:w-[18rem]"
              ></Search>
            </div>
            <div className="flex items-center w-full sm:w-auto">
              <Button
                type="primary"
                className="create-order-button w-full sm:w-auto mb-4 sm:mb-0"
                onClick={handleBuyerModal}
                style={{
                  backgroundColor: "#A51F6C",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                  height: "45px",
                }}>
                Add Buyer
              </Button>
            </div>
          </div>
        </div>
        <div>
          {/* Table */}
          <Table
            // loading={isLoading}
            columns={columns}
            dataSource={buyers}
            pagination={{ defaultPageSize: 4 }}
            // className="table"
            scroll={{ x: 1000 }}
          />
        </div>

        <BuyerModal
          visible={showCustomerModal}
          onCancel={() => setShowCustomerModal(false)}
          onSubmit={() => {
            setShowCustomerModal(false)
            message.success("Buyer Added!")
          }
          }
        />

        <EditModal
          visible={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          onOk={({ image: fileListImage, status, ...values }) =>
            handleEditSubmit({ image: fileListImage, status, ...values })
          }
          editForm={editForm}
          selectedBuyer={selectedBuyer}
        />




        <Modal
          title="Confirm Deletion"
          visible={showDeleteConfirmationModal}
          onCancel={() => setShowDeleteConfirmationModal(false)}
          onOk={handleDeleteConfirmed}
          okText="Yes"
          cancelText="No"
          okButtonProps={{
            style: { backgroundColor: "#D83535", color: "#FFFFFF" },
          }}>
          <p>Are you sure you want to delete the selected buyer?</p>
        </Modal>

      </div>
    </div>

  );
};

export default Index;
