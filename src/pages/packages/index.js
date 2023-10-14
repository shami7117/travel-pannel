import { useState, useEffect } from "react";
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
  Select, Table, DatePicker, Row, Col
} from "antd";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  SearchOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import SellerModal from "../../components/Sellers/SellerModal";
import EditModal from "../../components/Sellers/EditModal";

const { Option } = Select;
const { Search } = Input;

const Index = () => {
  const router =useRouter();
  const ITEMS_PER_PAGE = 5;
  const sellers = [
    {
      id: 1,
      image: "/images/seller1.svg",
      name: "Michael Johnson",
      registered: "Aug 06, 2023",
      country: "USA",
      group: "Default",
      earn: 20000.00,
    },
    {
      id: 2,
      image: "/images/seller2.svg",
      name: "Emily Brown",
      registered: "Aug 06, 2023",
      country: "USA",
      group: "Default",
      earn: 18000.00,
    },
    {
      id: 3,
      image: "/images/seller3.svg",
      name: "David Wilson",
      registered: "Aug 06, 2023",
      country: "USA",
      group: "Default",
      earn: 25000.00,
    },
    {
      id: 4,
      image: "/images/seller4.svg",
      name: "Sarah Johnson",
      registered: "Aug 06, 2023",
      country: "USA",
      group: "Default",
      earn: 22000.00,
    },
    {
      id: 5,
      image: "/images/seller1.svg",
      name: "David Wilson",
      registered: "Aug 06, 2023",
      country: "USA",
      group: "Default",
      earn: 28000.00,
    },
    {
      id: 6,
      image: "/images/seller2.svg",
      name: "Emily Brown",
      registered: "Aug 06, 2023",
      country: "USA",
      group: "Default",
      earn: 19000.00,
    },
    {
      id: 7,
      image: "/images/seller3.svg",
      name: "Michael Johnson",
      registered: "Aug 06, 2023",
      country: "USA",
      group: "Default",
      earn: 23000.00,
    },
    {
      id: 8,
      image: "/images/seller4.svg",
      name: "Michael Johnson",
      registered: "Aug 06, 2023",
      country: "USA",
      group: "Default",
      earn: 21000.00,
    },
    {
      id: 9,
      image: "/images/seller1.svg",
      name: "Michael Johnson",
      registered: "Aug 06, 2023",
      country: "USA",
      group: "Default",
      earn: 24000.00,
    },
  ];


  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const [Facilities, setFacilities] = useState("It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).");
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [activeButton, setActiveButton] = useState("About");
  const [filteredSellers, setFilteredSellers] = useState(sellers);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [selectedSeller, setSelectedSeller] = useState(null);

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmationModal(true);
  };

  const handleDeleteConfirmed = () => {
    const updatedSellers = sellers.filter(
      (seller) => !selectedSellerIds.includes(seller.id)
    );
    setFilteredSellers(updatedSellers);
    setSelectedSellerIds([]);
    setShowDeleteConfirmationModal(false);

    message.success("Selected seller deleted successfully.");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSellerIds, setSelectedSellerIds] = useState([]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (sellerId) => {
    setFilteredSellers((prevSellers) => {
      const updatedSellers = prevSellers.map((seller) =>
        seller.id === sellerId
          ? { ...seller, selected: !seller.selected }
          : seller
      );

      const updatedSelectedIds = updatedSellers
        .filter((seller) => seller.selected)
        .map((seller) => seller.id);

      setSelectedSellerIds(updatedSelectedIds);

      return updatedSellers;
    });
  };

  const handleActionsToggle = (sellerId) => {
    setSelectedSellerId(null);
    setSelectedSellerId(sellerId);
    const seller = sellers.find((s) => s.id === sellerId);
    setSelectedSeller(seller);
  };

  const handleEditSubmit = ({
    image: fileListImage,
    group,
    earn,
    ...values
  }) => {
    const numericEarn = parseFloat(earn);

    if (isNaN(numericEarn)) {
      message.error("Invalid earn value");
      return;
    }

    const updatedSellers = filteredSellers.map((seller) =>
      seller.id === selectedSeller.id
        ? {
          ...seller,
          ...values,
          image: fileListImage,
          group,
          earn: numericSpent,
        }
        : seller
    );

    setFilteredSellers(updatedSellers);
    setEditModalVisible(false);

    message.success("Seller updated successfully.");
  };

  const handleEditModalOpen = (seller) => {
    setSelectedSeller(seller);

    const registeredDate = moment(seller.registered, 'MMM DD,YYYY');

    editForm.setFieldsValue({
      id: seller.id,
      name: seller.name,
      registered: registeredDate,
      country: seller.country,
      group: seller.group,
      earn: seller.earn.toFixed(2),
    });

    setEditModalVisible(true);
  };

  const handleDeleteEach = () => {
    setSelectedSellerId(selectedSeller);
    handleDeleteConfirmation();
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const handleSellerModal = () => {
    setShowSellerModal(true);
  };

  const handleHeaderCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setFilteredSellers((prevSellers) => {
      const updatedSellers = prevSellers.map((seller) => ({
        ...seller,
        selected: isChecked,
      }));

      const updatedSelectedIds = isChecked
        ? updatedSellers.map((seller) => seller.id)
        : [];

      setSelectedSellerIds(updatedSelectedIds);

      return updatedSellers;
    });
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
  };
  const [myArray, setMyArray] = useState([1]);
  console.log("ARRAY", myArray)

  return (
    <div className="w-full h-full  bg-[F9F9F9] px-4 ">
      <Head>
        <title>Packages</title>
      </Head>
      <div className="h-full w-full my-4 py-3   bg-[#FFFFFF] rounded-md">

        <div className="flex justify-between px-4 pb-[0px] items-center  h-full overflow-x-scroll border-b-solid border-b-[1px] max-h-[100px] lg:max-h-[52px] h-full border-b-[#00000038] text-[#777777]">
          <h1 className="text-[#1B2430] font-semibold text-[24px]">
            Add New Package
          </h1>

        </div>

        <div className="flex justify-between px-4 pb-[0px] items-center  h-full overflow-x-scroll border-b-solid border-b-[1px] max-h-[100px] lg:max-h-[52px] h-full border-b-[#00000038] text-[#777777]">
          <button
            className={`uppercase mb-0 pb-0 font-[500] flex justify-center  items-center h-full mr-3 border-b-solid ${activeButton === "Packages" ? "border-b-[#ED6C0E]" : "border-b-transparent"
              }  border-b-[2px] ${activeButton === "Packages" ? "text-[#ED6C0E]" : "text-[#363B49]"
              }`}
            onClick={() => {
              setActiveButton("Packages");
            }}>
            Packages
          </button>
          <button
            className={`uppercase mb-0 pb-0 font-[500] flex justify-center  items-center h-full mr-3 border-b-solid ${activeButton === "About" ? "border-b-[#ED6C0E]" : "border-b-transparent"
              }  border-b-[2px] ${activeButton === "About" ? "text-[#ED6C0E]" : "text-[#363B49]"
              }`}
            onClick={() => {
              setActiveButton("About");
            }}>
            About the hotel
          </button>
          <button
            className={`uppercase font-[500]  flex justify-center  items-center h-full mr-3 border-b-solid ${activeButton === "Rooms" ? "border-b-[#ED6C0E]" : "border-b-transparent"
              }  border-b-[2px] ${activeButton === "Rooms" ? "text-[#ED6C0E]" : "text-[#363B49]"
              }`}
            onClick={() => {
              setActiveButton("Rooms");

            }}>
            Rooms
          </button>
          <button
            className={`uppercase font-[500] flex justify-center  items-center  h-full mr-3 border-b-solid ${activeButton === "Facilities" ? "border-b-[#ED6C0E]" : "border-b-transparent"
              }  border-b-[2px] ${activeButton === "Facilities" ? "text-[#ED6C0E]" : "text-[#363B49]"
              }`}
            onClick={() => {
              setActiveButton("Facilities");

            }}>
            Facilities
          </button>
          <button
            className={`uppercase font-[500] flex justify-center  items-center  h-full border-b-solid ${activeButton === "Location" ? "border-b-[#ED6C0E]" : "border-b-transparent"
              }  border-b-[2px] mr-3 ${activeButton === "Location" ? "text-[#ED6C0E]" : "text-[#363B49]"
              }`}
            onClick={() => {
              setActiveButton("Location");

            }}>
            Location, View on Map
          </button>
          <button
            className={`uppercase font-[500] flex justify-center  items-center  h-full border-b-solid ${activeButton === "Galleries" ? "border-b-[#ED6C0E]" : "border-b-transparent"
              }  border-b-[2px] mr-3 ${activeButton === "Galleries" ? "text-[#ED6C0E]" : "text-[#363B49]"
              }`}
            onClick={() => {
              setActiveButton("Galleries");

            }}>
            Image Galleries          </button>
        </div>


        <div className="py-4 px-4">
          {activeButton === "Packages" && (
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200 shadow-md bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs sm:text-base font-medium text-gray-500  tracking-wider"
                    >
                      Package Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs sm:text-base font-medium text-gray-500  tracking-wider"
                    >
                      Tags (Destination, Package Theme)
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs sm:text-base font-medium text-gray-500  tracking-wider"
                    >
                      Travel Date Validity
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs sm:text-base font-medium text-gray-500  tracking-wider"
                    >
                      Booking Date Validity
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs sm:text-base font-medium text-gray-500  tracking-wider"
                    >
                      Price/Cost per head
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs sm:text-base font-medium text-gray-500  tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Add your package data here */}
                  <tr className="bg-white">
                    <td className="px-4 py-4 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">Package 1</td>
                    <td className="px-4 py-4 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">Tag 1, Tag 2</td>
                    <td className="px-4 py-4 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">2023-10-01</td>
                    <td className="px-4 py-4 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">2023-09-15</td>
                    <td className="px-4 py-4 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">$500</td>
                    <td className="px-4 py-4 sm:px-6 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-x-4 ">
                        <div className="flex text-[#000000] tex-[16px] sm:text-base font-medium items-center justify-center gap-x-2">
                          <Image src={'/delete.svg'} width={18} height={20} />
                          Delete
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-4 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">Package 1</td>
                    <td className="px-4 py-4 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">Tag 1, Tag 2</td>
                    <td className="px-4 py-4 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">2023-10-01</td>
                    <td className="px-4 py-4 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">2023-09-15</td>
                    <td className="px-4 py-4 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">$500</td>
                    <td className="px-4 py-4 sm:px-6 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-x-4 ">
                        <div className="flex text-[#000000] tex-[16px] sm:text-base font-medium items-center justify-center gap-x-2">
                          <Image src={'/delete.svg'} width={18} height={20} />
                          Delete
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-4 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">Package 1</td>
                    <td className="px-4 py-4 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">Tag 1, Tag 2</td>
                    <td className="px-4 py-4 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">2023-10-01</td>
                    <td className="px-4 py-4 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">2023-09-15</td>
                    <td className="px-4 py-4 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">$500</td>
                    <td className="px-4 py-4 sm:px-6 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-x-4 ">
                        <div className="flex text-[#000000] tex-[16px] sm:text-base font-medium items-center justify-center gap-x-2">
                          <Image src={'/delete.svg'} width={18} height={20} />
                          Delete
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    {/* Add more rows as needed */}
                  </tr>
                </tbody>
              </table>
            </div>
          )}


          {/* About Hotel */}

          {
            activeButton === "About" && <Form onFinish={onFinish}>
              <div className="flex flex-col md:flex-row justify-between w-full items-center gap-x-4 ">

                <Form.Item className="h-[50px]  w-full" initialValue={"Hotel Name"} name="hotelName" label="">
                  <Input className="h-[50px] w-full" placeholder="Hotel Name" />
                </Form.Item>


                <Form.Item className="h-[50px]  w-full" initialValue={"Owner Name"} name="ownerName" label="">
                  <Input className="h-[50px] w-full" placeholder="Owner Name" />
                </Form.Item>


                <Form.Item className="h-[50px]  w-full" name="country" label="">
                  <Select className="h-[50px] w-full" placeholder="Country">
                    <Option value="usa">USA</Option>
                    <Option value="canada">Canada</Option>
                    {/* Add more options */}
                  </Select>
                </Form.Item>

              </div>
              <div className="flex flex-col md:flex-row justify-between w-full items-center gap-x-4 ">

                <Form.Item className="h-[50px]  w-full" initialValue={"Contact Number"} name="ContactNumber" label="">
                  <Input className="h-[50px] w-full" placeholder="Contact Number" />
                </Form.Item>


                <Form.Item className="h-[50px]  w-full" initialValue={"About Hotel"} name="AboutHotel" label="">
                  <Input className="h-[50px] w-full" placeholder="About Hotel" />
                </Form.Item>


                <Form.Item className="h-[50px]  w-full" initialValue={"Activities"} name="Activities" label="">
                  <Input className="h-[50px] w-full" placeholder="Activities" />

                </Form.Item>

              </div>

              <div className="flex flex-col md:flex-row justify-between w-full items-center gap-x-4 ">

                <Form.Item className="h-[50px]  w-full" initialValue={"Food & Dining info"} name="Food" label="">
                  <Input className="h-[50px] w-full" placeholder="Food & Dining info" />
                </Form.Item>


                <Form.Item className="h-[50px]  w-full" initialValue={"Property"} name="Property" label="">
                  <Input className="h-[50px] w-full" placeholder="Property" />
                </Form.Item>



                <Form.Item className="h-[50px]  w-full" initialValue={"About Hotel"} name=" HotelSurounding" label="">
                  <Input className="h-[50px] w-full" placeholder="About Hotel Surounding" />
                </Form.Item>

              </div>

              <div className="flex flex-col md:flex-row justify-between w-full items-center gap-x-4 ">

                <Form.Item className="h-[50px]  w-full" initialValue={"Number of Rooms  "} name="hotelName" label="">
                  <Select className="h-[50px] w-full" placeholder="Number of Rooms">
                    <Option value="10">10</Option>
                    <Option value="20">20</Option>
                    {/* Add more options */}
                  </Select>              </Form.Item>
                <Form.Item className="h-[50px]  w-full" initialValue={"Choose Amenities"} name="ChooseAmenities" label="">
                  <Select className="h-[50px] w-full" placeholder="Choose Amenities">
                    <Option value="5 Star">5 Star</Option>
                    <Option value="4 Star">4 Star</Option>
                    {/* Add more options */}
                  </Select>              </Form.Item>
                <Form.Item className="h-[50px]  w-full" initialValue={"Add Special Notes"} name="AddSpecialNotes" label="">
                  <Input className="h-[50px] w-full" placeholder="Add Special Notes" />
                </Form.Item>

              </div>

              <div className="flex flex-col md:flex-row justify-between w-full items-center gap-x-4 ">

                <Form.Item className="h-[50px]    w-full" name="Email" initialValue={"Email"} label="">
                  <Input className="h-[50px] w-full" placeholder="Email" />
                </Form.Item>


                <Form.Item className="h-[50px]  w-full" name="checkOutTime" label="">
                  <DatePicker className="h-[50px]  bg w-full" placeholder="Check In Time" />
                </Form.Item>

                <Form.Item className="h-[50px]  w-full" name="checkOutTime" label="">
                  <DatePicker className="h-[50px] bg  w-full" placeholder="Check Out Time" />
                </Form.Item>
              </div>
              <div className="flex justify-end">
                <Button className="h-[50px]" type="primary" htmlType="submit" onClick={()=>router.push('/')}>
                  Submit
                </Button>
              </div>
            </Form>
          }
          {/* Rooms */}
          {
            activeButton === "Rooms" && <Form className="flex flex-col justify-center items-start" onFinish={onFinish}>
              {
                myArray.map((index) => {
                  return <div key={index} className="flex flex-col justify-center w-full  items-start gap-y-4   border-b-solid border-b-[1px] pb-16 mb-6 border-b-[#00000038]">
                    <h1 className="text-[#363B49] text-[16px]">Room Type {index}</h1>
                    <div className="flex flex-col md:flex-row justify-between w-full items-center gap-x-4 ">
                      <Form.Item className="h-[50px]  w-full" initialValue={"Hotel Name"} name="hotelName" label="">
                        <Input className="h-[50px] w-full" placeholder="Hotel Name" />
                      </Form.Item>


                      <Form.Item className="h-[50px]  w-full" initialValue={"Owner Name"} name="ownerName" label="">
                        <Input className="h-[50px] w-full" placeholder="Owner Name" />
                      </Form.Item>


                      <Form.Item className="h-[50px]  w-full" name="country" label="">
                        <Select className="h-[50px] w-full" placeholder="Country">
                          <Option value="usa">USA</Option>
                          <Option value="canada">Canada</Option>
                          {/* Add more options */}
                        </Select>
                      </Form.Item>
                    </div>
                    <h1 className="text-[#363B49] text-[16px]">Add Images</h1>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 justify-between items-center ">

                      <div class="flex items-center justify-center w-full">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center   w-full  h-[156px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent">

                          <Image src={'/pre.svg'} width={58} height={50} />
                          <input id="dropzone-file" style={{ display: "none" }} type="file" class="hidden" />
                        </label>
                      </div>
                      <div class="flex items-center justify-center w-full">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center   w-full  h-[156px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent">

                          <Image src={'/pre.svg'} width={58} height={50} />
                          <input id="dropzone-file" style={{ display: "none" }} type="file" class="hidden" />
                        </label>
                      </div>
                      <div class="flex items-center justify-center w-full">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center   w-full  h-[156px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent">

                          <Image src={'/pre.svg'} width={58} height={50} />
                          <input id="dropzone-file" style={{ display: "none" }} type="file" class="hidden" />
                        </label>
                      </div>
                      <div class="flex items-center justify-center w-full">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center   w-full  h-[156px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent">

                          <Image src={'/pre.svg'} width={58} height={50} />
                          <input id="dropzone-file" style={{ display: "none" }} type="file" class="hidden" />
                        </label>
                      </div>
                      <div class="flex items-center justify-center w-full">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center   w-full  h-[156px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent">

                          <Image src={'/pre.svg'} width={58} height={50} />
                          <input id="dropzone-file" style={{ display: "none" }} type="file" class="hidden" />
                        </label>
                      </div>
                      <div class="flex items-center justify-center w-full">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center   w-full  h-[156px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent">

                          <Image src={'/pre.svg'} width={58} height={50} />
                          <input id="dropzone-file" style={{ display: "none" }} type="file" class="hidden" />
                        </label>
                      </div>

                    </div>
                  </div>
                })
              }

              <h1 className="text-[#ED6C0E] text-[18px] font-medium flex gap-x-2 ">Add New Room Type <Image onClick={() => {
                const updatedArray = [...myArray, myArray.length + 1];
                setMyArray(updatedArray);
              }} className="cursor-pointer" src={'/add.svg'} width={36} height={36} /></h1>
              <div className="flex justify-end">
                <Button className="h-[50px]" type="primary" htmlType="submit" onClick={()=>router.push('/')}>
                  Submit
                </Button>
              </div>
            </Form>
            
          }

          {
            activeButton === "Facilities" && <div className="mt-4">
              <label
                htmlFor="about"
                className="text-[16px] font-normal text-[#777777]"
              >
                Facilities
              </label>
              <textarea
                id="about"
                name="about"
                value={Facilities}
                placeholder="Write here..."
                // onChange={handleChange}
                className="w-full h-[150px]  py-2 px-3 border border-[#2668E81A] rounded transition duration-300 bg-[#2668E803] focus:outline-none focus:border-[#2668E855] hover:border-[#2668E855]"
                rows={4}
                style={{ resize: "none" }}
              />
            </div>
          }

          {
            activeButton === "Location" && <iframe
              width='100%'
              height='260'
              frameBorder='0'
              scrolling='no'
              marginHeight='0'
              marginWidth='0'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2101841401635!2d-73.98631788492222!3d40.75889637932875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7e2651687b1e66e1!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1630186065097!5m2!1sen!2sus'
            ></iframe>
          }
          {
            activeButton === "Galleries" && (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((index) => {
                return <a href="#" key={index} class="flex flex-col items-center max-w-[500px] w-full min-h-[400px] h-full  bg-white border border-gray-200 rounded-lg shadow  w-full ">
                  <img class="object-cover w-full rounded-t-lg w-full h-full rounded-lg " src="/dom.png" alt="" />
                  <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#1B2430]">Noteworthy technology acquisitions 2021</h5>
                    <p class="mb-3 font-normal text-[#1B2430]">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  </div>
                </a>
              })}
            </div>)

          }


        </div>

        <SellerModal
          visible={showSellerModal}
          onCancel={() => setShowSellerModal(false)}
          onSubmit={() => {
            setShowSellerModal(false);
            message.success("Seller Added!");
          }}
        />

        <EditModal
          visible={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          onOk={({ image: fileListImage, status, ...values }) =>
            handleEditSubmit({ image: fileListImage, status, ...values })
          }
          editForm={editForm}
          selectedSeller={selectedSeller}
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
          }}
        >
          <p>Are you sure you want to delete the selected seller?</p>
        </Modal>
      </div>
    </div>
  );
};

export default Index;
