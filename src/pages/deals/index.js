"use client";
import { Modal, message, Form } from "antd";
import {  Table } from "antd";
import Head from "next/head";
import { useState, useEffect } from "react";
import ProductModal from "../../components/ProductModal";
import EditModal from "../../components/EditModal";
import { products } from "@/components/array/array";
import { columns } from "./data";

const Index = () => {
  const ITEMS_PER_PAGE = 5;
    
  <columns />

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [activeButton, setActiveButton] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [available, setAvailable] = useState(0);
  const [disabled, setDisabled] = useState(0);
  const [sortByDate, setSortByDate] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [allRowsSelected, setAllRowsSelected] = useState(false);


  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmationModal(true);
  };

  const handleDeleteConfirmed = () => {
    const updatedProducts = products.filter(
      (product) => !selectedProductIds.includes(product.id),
    );
    setFilteredProducts(updatedProducts);
    setSelectedProductIds([]);
    setShowDeleteConfirmationModal(false);

    message.success("Selected products deleted successfully.");
  };

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
    const availableProducts = products.filter(
      (product) => product.status === "Available",
    );
    setAvailable(availableProducts.length);
  }, [products]);

  useEffect(() => {
    const disabledProducts = products.filter(
      (product) => product.status === "Disabled",
    );
    setDisabled(disabledProducts.length);
  }, [products]);



  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (productId) => {
    setFilteredProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === productId
          ? { ...product, selected: !product.selected }
          : product,
      );

      const updatedSelectedIds = updatedProducts
        .filter((product) => product.selected)
        .map((product) => product.id);

      setSelectedProductIds(updatedSelectedIds);

      return updatedProducts;
    });
  };

  const handleActionsToggle = (productId) => {
    setSelectedProductId(productId);
    const product = products.find((p) => p.id === productId);
    setSelectedProduct(product);
  };

  const handleEditSubmit = ({
    image: fileListImage,
    status,
    price,
    earning,
    ...values
  }) => {
    const numericPrice = parseFloat(price);
    const numericEarning = parseFloat(earning);

    if (isNaN(numericPrice) || isNaN(numericEarning)) {
      message.error("Invalid price or earning value");
      return;
    }

    const updatedProducts = filteredProducts.map((product) =>
      product.id === selectedProduct.id
        ? {
          ...product,
          ...values,
          image: fileListImage,
          status,
          price: numericPrice,
          earning: numericEarning,
        }
        : product,
    );

    setFilteredProducts(updatedProducts);
    setSelectedProductIds([]);
    setEditModalVisible(false);

    message.success("Product updated successfully.");
  };

  const handleEditModalOpen = (product) => {
    setSelectedProduct(product);
    editForm.setFieldsValue({
      productID: product.id,
      productName: product.name,
      price: typeof product.price === "number" ? product.price.toFixed(2) : "",
      earning:
        typeof product.earning === "number" ? product.earning.toFixed(2) : "",
      sold: product.sold,
      status: product.status,
    });
    setEditModalVisible(true);
  };

  const handleDeleteEach = () => {
    setSelectedProductId(selectedProduct);
    handleDeleteConfirmation();
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const handleOrderModal = () => {
    setShowOrderModal(true);
    console.log("modal open");
  };



  const handleHeaderCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setAllRowsSelected(isChecked);

    setFilteredProducts((prevProducts) =>
      prevProducts.map((product) => ({ ...product, selected: isChecked }))
    );

    setSelectedProductIds(isChecked ? filteredProducts.map((product) => product.id) : []);
  };

  return (
    <div className="w-full h-full bg-[F9F9F9] px-4 ">
  <Head>
    <title>Deals</title>
  </Head>
  <div className="h-full w-full my-4 py-3 bg-[#FFFFFF] rounded-md">
    <div className="w-full px-3 py-1 border-b border-[#DFDFDF]">
    </div>
    <div>
      {/* Table */}
      <Table
        // loading={isLoading}
        columns={columns}
        dataSource={products}
        pagination={{ defaultPageSize: 4 }}
        // className="table"
        scroll={{ x: 1000 }}
      />
    </div>

    <EditModal
      visible={editModalVisible}
      onCancel={() => setEditModalVisible(false)}
      onOk={({ image: fileListImage, status, ...values }) =>
        handleEditSubmit({ image: fileListImage, status, ...values })
      }
      editForm={editForm}
      selectedProduct={selectedProduct}
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
      <p>Are you sure you want to delete the selected products?</p>
    </Modal>

    <ProductModal
      visible={showOrderModal}
      onCancel={() => setShowOrderModal(false)}
      onSubmit={() => console.log("submitted")}
    />
  </div>
</div>

  );
};

export default Index;
