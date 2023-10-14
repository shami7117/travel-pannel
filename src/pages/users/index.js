"use client";
import {
    Button,
    Input,
    Pagination,
    Modal,
    message,
    Dropdown,
    Menu, Checkbox,
    Form, Select
} from "antd";
import { Space, Table, Tag, Popconfirm } from "antd";
import Image from "next/image";
import Head from "next/head";
import { SearchOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { FilterOutlined, EditOutlined } from "@ant-design/icons";
import ProductModal from "../../components/ProductModal";
import EditModal from "../../components/EditModal";
const { Option } = Select;
const { Search } = Input;

const Index = () => {
    const ITEMS_PER_PAGE = 5;

    const products = [
        {
            id: 1,
            image: "/images/products1.svg",
            name: "Mercedes",
            price: 124000.0,
            sold: 1,
            earning: 14676.0,
            status: "Available",
        },
        {
            id: 2,
            image: "/images/product2.svg",
            name: "Mercedes",
            price: 124000.0,
            sold: 1,
            earning: 14676.0,
            status: "Disabled",
        },
        {
            id: 3,
            image: "/images/product3.svg",
            name: "Mercedes",
            price: 124000.0,
            sold: 1,
            earning: 14676.0,
            status: "Available",
        },
        {
            id: 4,
            image: "/images/products1.svg",
            name: "Mercedes",
            price: 124000.0,
            sold: 1,
            earning: 14676.0,
            status: "Available",
        },
        {
            id: 5,
            image: "/images/product2.svg",
            name: "Mercedes",
            price: 124000.0,
            sold: 1,
            earning: 14676.0,
            status: "Available",
        },
        {
            id: 6,
            image: "/images/product3.svg",
            name: "Mercedes",
            price: 124000.0,
            sold: 1,
            earning: 14676.0,
            status: "Disabled",
        },
        {
            id: 7,
            image: "/images/products1.svg",
            name: "Mercedes",
            price: 124000.0,
            sold: 1,
            earning: 14676.0,
            status: "Disabled",
        },
        {
            id: 8,
            image: "/images/product2.svg",
            name: "Mercedes",
            price: 124000.0,
            sold: 1,
            earning: 14676.0,
            status: "Available",
        },
        {
            id: 9,
            image: "/images/product3.svg",
            name: "Mercedes",
            price: 124000.0,
            sold: 1,
            earning: 14676.0,
            status: "Available",
        },
    ];
    const columns = [
        {
            title: (
                <div className="flex items-center space-x-4">
                    <span className="text-base font-lato font-medium">User Name</span>
                </div>
            ),
            dataIndex: "no",
            sorter: (a, b) => a.age - b.age,
            render: (_, record) => (
                <div className="w-full gap-x-2 flex items-center justify-start">
                    <Image src={'/girl.svg'} width={51} height={51} />
                    <div className="text-base flex flex-col items-center justify-start font-lato font-normal text-[#777777]">
                        <span className="text-[#000000]">Leo Kenter</span>
                        <span className="text-[#ED6C0E]">#657678</span>

                    </div>
                </div>
            ),
        },
        {
            title: (
                <div className="flex items-center space-x-4">
                    <span className="text-base font-lato font-medium">Email Address</span>
                </div>
            ),
            dataIndex: "no",
            sorter: (a, b) => a.age - b.age,
            render: (_, record) => (
                <div className="w-full gap-x-2 flex items-center justify-start">
                    <div className="text-base flex flex-col items-center justify-start font-lato font-normal text-[#777777]">
                        pavel@verizon.net

                    </div>
                </div>
            ),
        },
        {
            title: (
                <div className="flex items-center space-x-4">
                    <span className="text-base font-lato font-medium">Phone</span>
                </div>
            ),
            dataIndex: "no",
            sorter: (a, b) => a.age - b.age,
            render: (_, record) => (
                <div className="w-full gap-x-2 flex items-center justify-start">
                    <div className="text-base flex flex-col items-center justify-start font-lato font-normal text-[#777777]">
                        +103931833

                    </div>
                </div>
            ),
        },
        {
            title: (
                <div className="flex items-center space-x-4">
                    <span className="text-base font-lato font-medium">Country</span>
                </div>
            ),
            dataIndex: "name",
            render: (_, record) => (
                <div className="w-full flex items-center">
                    <span className="text-base font-lato font-normal text-[#777777]">
                        {/* ${record.price} */}Pakistan
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
            sorter: (a, b) => a.age - b.age,
            render: (_, record) => (
                <div className="w-full">
                    <span style={getStatusStyle(record.status)}
                        className="rounded-md px-2 py-1 text-[14px] font-[400] text-center">
                        {record.status}
                    </span>
                </div>
            ),
        },

        {
            title: (
                <div className="flex items-center space-x-4">
                    <span className="text-base font-lato font-medium">Gender</span>
                </div>
            ),
            dataIndex: "desc",
            sorter: (a, b) => a.age - b.age,
            render: (_, record) => (
                <div className="w-full">
                    <span style={getGenderStyle("Male")}
                        className="rounded-md px-2 py-1 text-[14px] font-[400] text-center">
                        {/* {record.status} */}Male
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

    const getGenderStyle = (status) => {
        switch (status) {
            case "Male":
                return {
                    color: "#03D2EC",
                    border: "1px solid #03D2EC",
                    backgroundColor: "#00BCD41F",
                };
            case "Female":
                return {
                    color: "#FF6FD7",
                    border: "1px solid #FF6FD7",
                    backgroundColor: "#FF6FD71F",
                };
            default:
                return {};
        }
    };
    const getStatusStyle = (status) => {
        switch (status) {
            case "Available":
                return {
                    color: "#1BB10E",
                    border: "1px solid #1BB10E",
                    backgroundColor: "#36E82617",
                };
            case "Disabled":
                return {
                    color: "#E82626",
                    border: "1px solid #E82626",
                    backgroundColor: "#E826261A",
                };
            default:
                return {};
        }
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
                <title>Products</title>
            </Head>
            <div className="h-full w-full my-4   bg-[#FFFFFF] rounded-md">
                <div className="w-full px-3   border-b border-[#DFDFDF]">
                    {/* <div className="flex justify-between items-center w-full px-3 flex-wrap-reverse">
                        <div className="relative flex items-center w-full sm:w-auto">
                            <Search
                                placeholder="Search Cars"
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
                                onClick={handleOrderModal}
                                style={{
                                    backgroundColor: "#08A122",
                                    color: "#FFFFFF",
                                    borderRadius: "8px",
                                    height: "45px",
                                }}>
                                Add Cars
                            </Button>
                        </div>
                    </div> */}

                    {/* <div className="flex justify-between items-center my-5 px-2 w-full flex-wrap  ">
                        <div className="flex text-[#777777] w-full sm:w-auto  justify-center sm:justify-center ">
                            <button
                                className={`uppercase font-[500] mr-3 ${activeButton === "All" ? "text-[#08A122]" : ""
                                    }`}
                                onClick={() => {
                                    setActiveButton("All");
                                    setFilteredProducts(products);
                                }}>
                                All Products {" ("}
                                {products.length}
                                {") "}
                            </button>
                            <button
                                className={`uppercase font-[500] mr-3 ${activeButton === "Available" ? "text-[#08A122]" : ""
                                    }`}
                                onClick={() => {
                                    setActiveButton("Available");
                                    const availableProducts = products.filter(
                                        (product) => product.status === "Available",
                                    );
                                    setFilteredProducts(availableProducts);
                                }}>
                                Available {" ("}
                                {available}
                                {") "}
                            </button>
                            <button
                                className={`uppercase font-[500] mr-3 ${activeButton === "Disabled" ? "text-[#08A122]" : ""
                                    }`}
                                onClick={() => {
                                    setActiveButton("Disabled");
                                    const disabledProducts = products.filter(
                                        (products) => products.status === "Disabled",
                                    );
                                    setFilteredProducts(disabledProducts);
                                }}>
                                Disabled {" ("}
                                {disabled}
                                {") "}
                            </button>
                        </div>

                    </div> */}
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
