"use client";
import {
  Button,
  Input,
  Pagination,
  Modal,
  message,
  Dropdown,
  Menu,
  Form,
} from "antd";
import { Space, Table, Tag, Popconfirm } from "antd";

import Head from "next/head";
import Image from "next/image";
import { SearchOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef, useMemo } from "react";
import { FilterOutlined } from "@ant-design/icons";
import OrderModal from "../components/orderModal";
import EditModal from "../components/Orders/EditModal";
import moment from 'moment';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker } from 'antd';
dayjs.extend(customParseFormat);
const { Search } = Input;


const Index = () => {
  const ITEMS_PER_PAGE = 5;
  const orders = [
    {
      id: 1,
      orderId: "PK756466",
      customer: "James Williams",
      amount: 124.00, // Changed to a number
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "Pending",
    },
    {
      id: 2,
      orderId: "PK756466",
      customer: "James Williams",
      amount: 124.00, // Changed to a number
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "Cancelled",
    },
    {
      id: 3,
      orderId: "PK756466",
      customer: "James Williams",
      amount: 124.00, // Changed to a number
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "Accept",
    },
    {
      id: 4,
      orderId: "PK756466",
      customer: "James Williams",
      amount: 124.00, // Changed to a number
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "Pending",
    },
    {
      id: 5,
      orderId: "PK756466",
      customer: "James Williams",
      amount: 124.00, // Changed to a number
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "Completed",
    },
    {
      id: 6,
      orderId: "PK756466",
      customer: "James Williams",
      amount: 124.00, // Changed to a number
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "Pending",
    },
    {
      id: 7,
      orderId: "PK756466",
      customer: "James Williams",
      amount: 124.00, // Changed to a number
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "Pending",
    },
    {
      id: 8,
      orderId: "PK756466",
      customer: "James Williams",
      amount: 124.00, // Changed to a number
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "Accept",
    },
    {
      id: 9,
      orderId: "PK756466",
      customer: "James Williams",
      amount: 124.00, // Changed to a number
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "Cancelled",
    },
  ];


  const actionsRef = useRef();
  const [showActions, setShowActions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [activeButton, setActiveButton] = useState("All");
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [delivered, setDelivered] = useState(0);
  const [pickup, setPickup] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [sortByDate, setSortByDate] = useState(false);
  const [editForm] = Form.useForm();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  const handleSortByDate = () => {
    setSortByDate(!sortByDate);
    if (sortByDate) {
      setFilteredOrders(
        [...filteredOrders].sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate),
        ),
      );
    } else {
      setFilteredOrders(
        [...filteredOrders].sort(
          (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
        ),
      );
    }
  };
  useEffect(() => {
    const deliveredOrders = orders.filter(
      (order) => order.status === "Completed",
    );
    setDelivered(deliveredOrders.length);
  }, [orders]);

  useEffect(() => {
    const pickupOrders = orders.filter(
      (order) => order.status === "In Progress",
    );
    setPickup(pickupOrders.length);
  }, [orders]);

  useEffect(() => {
    const cancelledOrders = orders.filter(
      (order) => order.status === "Cancelled",
    );
    setCancelled(cancelledOrders.length);
  }, [orders]);

  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-base font-lato font-medium">User Name</span>
        </div>
      ),
      dataIndex: "no",
      render: (_, record) => (
        <div className="w-full gap-x-2 flex items-center justify-start">
          <Image src={'/girl.svg'} width={51} height={51} />
          <div className="text-base flex flex-col items-center justify-start font-lato font-normal text-[#777777]">
            <span className="text-[#000000]">Leo Kenter</span>
            <span className="text-[#ED6C0E]">{record.orderId}</span>

          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-base font-lato font-medium">Booking Date</span>
        </div>
      ),
      dataIndex: "name",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <span className="text-base font-lato font-normal text-[#777777]">
            {/* {record.customer} */}<span className="text-[#000000]">Sep 25 , 2023</span><br />
            09:00 Am
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-base font-lato font-medium">Check in</span>
        </div>
      ),
      dataIndex: "quantity",
      render: (_, record) => (
        <div className="w-full flex items-center justify-start">
          <span className="text-base font-lato font-normal text-[#777777]">
            {/* {record.customer} */}<span className="text-[#000000]">Sep 25 , 2023</span><br />
            09:00 Am
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-base font-lato font-medium">Check Out</span>
        </div>
      ),
      dataIndex: "price",
      render: (_, record) => (
        <div className="w-full">
          <span className="text-base font-lato font-normal text-[#777777]">
            {/* {record.customer} */}<span className="text-[#000000]">Sep 25 , 2023</span><br />
            09:00 Am
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-base font-lato font-medium">Special Request</span>
        </div>
      ),
      dataIndex: "price",
      render: (_, record) => (
        <div className="w-full">
          <span className="text-base font-lato font-normal bg-[#E3E3E3] rounded-[6px] py-1 px-2 text-[#000000]">
            {/* {record.payment} */}View Notes
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-base font-lato font-medium">Room Type</span>
        </div>
      ),
      dataIndex: "price",
      render: (_, record) => (
        <div className="w-full">
          <span className="text-base font-lato font-normal text-[#ED6C0E]">
            {/* {record.payment} */}Delux A - 09
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-base font-lato font-medium">Status</span>
        </div>
      ),
      dataIndex: "desc",
      width: 100,
      render: (_, record) => (
        <div className="w-full" style={{ width: "100px" }}>
          <span
            style={getStatusStyle(record.status)}
            className="rounded-md px-2 py-1 text-[14px] font-[400] text-center"
          >
            {record.status}
          </span>
        </div>
      ),
    },
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

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const handlemodify = (orderId) => {
    setShowActions(false);
    setShowModifyModal(true);
  };

  const handleModifyToggle = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModify(!showModify);
    setShowModifyModal(true);
  };

  const handleDeleteConfirmed = () => {
    setShowDeleteModal(false);
    handleDeleteConfirmation()
  };

  const handleDeleteConfirmation = () => {
    const updatedOrders = orders.filter(
      (order) => order.id !== selectedOrderId,
    );
    const updated = orders.filter((order) => order.id !== selectedOrderId);

    setFilteredOrders(updatedOrders);
    setSelectedOrderId(null);
  };

  const handleOrderModal = () => {
    setShowOrderModal(true);
    console.log("modal open");
  };

  const handleDelete = (orderId) => {
    setSelectedOrderId(null);
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedOrderId(null);
  };

  const handleModifyCancel = () => {
    setShowModifyModal(false);
    setSelectedOrderId(null);
  };


  const getStatusStyle = (status) => {
    switch (status) {
      case "Accept":
        return {
          color: "#1BB10E",
          border: "1px solid #1BB10E",
          backgroundColor: "#36E82617",
        };
      case "New":
        return {
          color: "#2668E8",
          border: "1px solid #2668E8",
          backgroundColor: "#2668E81A",
        };
      case "Pending":
        return {
          color: "#E88326",
          border: "1px solid #E88326",
          backgroundColor: "#FFF9F4",
        };
      case "Cancelled":
        return {
          color: "#FF0000",
          border: "1px solid #FF0000",
          backgroundColor: "#FFD9D9",
        };
      default:
        return {};
    }
  };


  const handleActionsToggle = (orderId) => {
    setSelectedOrderId(null)
    setSelectedOrderId(orderId);

    const order = filteredOrders.find((o) => o.id === orderId);
    setSelectedOrder(order);
  };

  const handleEditSubmit = ({ status, amount, ...values }) => {
    const numericAmount = parseFloat(amount.replace("$", "").replace(",", ""));

    if (isNaN(numericAmount)) {
      message.error("Invalid amount value");
      return;
    }

    const updatedOrders = filteredOrders.map((order) =>
      order.id === selectedOrder.id
        ? {
          ...order,
          ...values,
          status,
          amount: numericAmount,
        }
        : order
    );

    setFilteredOrders(updatedOrders);
    setSelectedOrderId(null);
    setShowModifyModal(false);

    message.success("Order updated successfully.");
  };


  const handleEditModalOpen = (order) => {
    setSelectedOrderId(null)
    setSelectedOrder(order);
    const orderDateMoment = moment(order.orderDate, "MMMM DD, YYYY");

    editForm.setFieldsValue({
      orderId: order.orderId,
      customer: order.customer,
      amount: order.amount.toFixed(2),
      payment: order.payment,
      orderDate: orderDateMoment,
      status: order.status,
    });

    setShowModifyModal(true);
  };

  const handleDeleteEach = () => {
    setSelectedOrderId(selectedOrder.id);
    handleDeleteConfirmation();
  };

  return (
    <div className="w-full h-full bg-[F9F9F9] px-4 lg:py-0 mt-16">
      <Head>
        <title>Orders</title>
      </Head>
      <div className="h-full w-full my-4  py-0 bg-[#FFFFFF] rounded-md">
      <div className="w-full px-3 lg:max-h-[90px] max-h-[100px] py-0 h-full border-b border-[#DFDFDF]">

<div className="grid grid-cols-[5fr_5fr_2fr] h-full px-2 w-full flex-wrap py-0">
  <div className="flex justify-between items-center px-4 h-full overflow-x-scroll border-r-solid border-r-[1px] border-r-[#00000038] text-[#777777]">
    {/* Buttons for filtering */}
    <div className="flex flex-wrap">
      <button
        className={`uppercase font-[500] flex justify-center items-center h-full mr-3 border-b-solid ${activeButton === "All" ? "border-b-[#ED6C0E]" : "border-b-transparent"
          } border-b-[2px] ${activeButton === "All" ? "text-[#ED6C0E]" : ""
          }`}
        onClick={() => {
          setActiveButton("All");
        }}>
        All
      </button>
      <button
        className={`uppercase font-[500] flex justify-center items-center h-full mr-3 border-b-solid ${activeButton === "Delivered" ? "border-b-[#ED6C0E]" : "border-b-transparent"
          } border-b-[2px] ${activeButton === "Delivered" ? "text-[#ED6C0E]" : ""
          }`}
        onClick={() => {
          setActiveButton("Delivered");
          
        }}>
        Confirmed
      </button>
      <button
        className={`uppercase font-[500] flex justify-center items-center h-full mr-3 border-b-solid ${activeButton === "PickUp" ? "border-b-[#ED6C0E]" : "border-b-transparent"
          } border-b-[2px] ${activeButton === "PickUp" ? "text-[#ED6C0E]" : ""
          }`}
        onClick={() => {
          setActiveButton("PickUp");
          
        }}>
        Pending
      </button>
      <button
        className={`uppercase font-[500] flex justify-center items-center h-full border-b-solid ${activeButton === "Cancelled" ? "border-b-[#ED6C0E]" : "border-b-transparent"
          } border-b-[2px] mr-3 ${activeButton === "Cancelled" ? "text-[#ED6C0E]" : ""
          }`}
        onClick={() => {
          setActiveButton("Cancelled");
        }}>
        Cancelled
      </button>
    </div>
  </div>

  <div className="flex flex-wrap border-r-solid overflow-x-scroll border-r-[1px] gap-x-2 border-r-[#00000038] self-center justify-center px-4 h-full items-center">
    {/* Date pickers */}
    <div className="flex flex-wrap items-center">
      <p>From</p>
      <DatePicker className="w-full h-[40px]" />
    </div>
    <div className="flex flex-wrap items-center">
      <p>To</p>
      <DatePicker className="w-full h-[40px]" />
    </div>
  </div>

  <div className="flex flex-wrap justify-center px-4 items-center">
    {/* Add button */}
    <Button
      type="primary"
      className="flex text-center items-center max-w-[180px] mb-4 sm:mb-0 lg:px-16"
      onClick={handleOrderModal}
      style={{
        backgroundColor: "#08A122",
        color: "#FFFFFF",
        borderRadius: "8px",
        height: "45px",
      }}>
      Add
    </Button>
  </div>
</div>

<div>
  <div></div>
</div>
</div>

        <div>


          {/* Table */}

          <Table
            // loading={isLoading}
            columns={columns}
            dataSource={orders}
            pagination={{ defaultPageSize: 4 }}
            // className="table"
            scroll={{ x: 1000 }}
          />



        </div>

        <EditModal
          visible={showModifyModal}
          onCancel={() => setShowModifyModal(false)}
          onOk={({ image: fileListImage, status, ...values }) =>
            handleEditSubmit({ image: fileListImage, status, ...values })
          }
          editForm={editForm}
          selectedOrder={selectedOrder}
        />
        <Modal
          title="Confirm Deletion"
          visible={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onOk={handleDeleteConfirmed}
          okText="Yes"
          cancelText="No"
          okButtonProps={{
            style: { backgroundColor: "#D83535", color: "#FFFFFF" },
          }}>
          <p>Are you sure you want to delete the selected Order?</p>
        </Modal>

        <OrderModal
          visible={showOrderModal}
          onCancel={() => setShowOrderModal(false)}
          onSubmit={() => console.log("submitted")}
        />
      </div>
    </div>
  );
};

export default Index;
