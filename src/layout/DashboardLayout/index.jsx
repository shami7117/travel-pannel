import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { useState } from 'react'
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image"
import {
    Avatar,
    Button,
    Dropdown,
    Input,
    Layout,
    Spin
} from "antd";
const { Header, Content } = Layout;
import { Menu } from "antd";
import routes from "@/routes/routes";
import {
    MenuOutlined,
    DashboardOutlined,
    ShoppingCartOutlined,
    AppstoreAddOutlined,
    UnorderedListOutlined,
    HistoryOutlined,
    StarOutlined,
    SettingOutlined,
    DownOutlined
} from "@ant-design/icons";

import { Inter } from "next/font/google";

const font361 = Inter({
    subsets: ["latin"],
    weight: [
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900"
    ]
});


const Index = ({ children }) => {
    const router = useRouter();
    const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");

    const handleMenuClick = (item) => {
        setSelectedMenuItem(item.key);
    };

    const navMenu = (
        <Menu className="custom-dropdown-menu">
          <Menu.Item
            key="Orders"
            icon={<Image src="/images/order.svg" alt="orders-icon" width={17} height={17} />}
            onClick={handleMenuClick}
          >
            <Link href="/">Booking</Link>
          </Menu.Item>
          <Menu.Item
            key="Products"
            icon={<Image src="/images/products.svg" alt="products" width={17} height={17} />}
            onClick={handleMenuClick}
          >
            <Link href="/query">Query</Link>
          </Menu.Item>
          <Menu.Item
            key="Buyers"
            icon={<Image src="/images/buyer.svg" alt="buyers" width={17} height={17} />}
            onClick={handleMenuClick}
          >
            <Link href="/packages">Packages</Link>
          </Menu.Item>
          <Menu.Item
            key="Sellers"
            icon={<Image src="/images/sellers.svg" alt="sellers" width={17} height={17} />}
            onClick={handleMenuClick}
          >
            <Link href="/users">User Listing</Link>
          </Menu.Item>
          <Menu.Item
            key="Earning"
            icon={<Image src="/images/earnings.svg" alt="earning" width={17} height={17} />}
            onClick={handleMenuClick}
          >
            <Link href="/deals">Deals</Link>
          </Menu.Item>
          <Menu.Item
            key="Profile"
            icon={<Image src="/images/user.svg" alt="profile" width={17} height={17} />}
            onClick={handleMenuClick}
          >
            <Link href="/profile">Profile</Link>
          </Menu.Item>
        </Menu>
      );
      


    const getPageTitle = (path) => {
        let route = routes.find((r) => r.path === path);
        if (!route) {
            if (path === "/") {
                route = routes.find((r) => r.path === "/")
                return route.title
            }
        }
        return route ? route.title : "";
    }

    const adminImageSrc = "/images/admin.svg";


    const items = [
        {
            key: "2",
            label: (
                <div style={
                    {
                        display: "flex",
                        flexDirection: "column"
                    }
                }>
                    <span className="text-sm md:text-lg font-medium font-poppins"
                        style={
                            {
                                textTransform: "capitalize",
                                color: "#F49342"
                            }
                        }>
                        {/* {data?.name} */}
                        John Doe
                    </span>
                    <span className="text-black opacity-50 text-xs md:text-sm font-normal font-poppins"
                        style={
                            {
                                textTransform: "capitalize",
                                opacity: "60"
                            }
                        }>
                        {/* {data?.role} */}
                        Admin
                    </span>
                </div>
            )
        }, {
            key: "1",
            label: (
                <span className="text-red-600 opacity-50 text-xs md:text-base font-normal font-poppins"
                    style={
                        { color: "red" }
                    }
                // onClick={() => logoutMutation.mutate()}
                >
                    Logout
                </span>
            )
        },
    ];

    return (
        <Layout style={
            { minHeight: "100vh" }

        }>
            <Sidebar role={"admin"} />
            <Layout className="site-layout">
                <Header className="flex items-center justify-between w-full "
                    style={
                        {
                            paddingTop: 20,
                            paddingBottom: 20,
                            // height: "4rem",
                            paddingLeft: 4,
                            paddingRight: 0,
                            backgroundColor: "#F9F9F9"
                        }
                    }>


                    <div className="flex items-center justify-between w-full bg-[#FFFFFF] border border-[#C2C2C266]  px-5">
                        <div>
                            <h1 className={
                                `text-[24px] font-[700] font-inter`}
                                style={{ fontSize: "24px !important", fontWeight: "700 !important" }}
                            >
                                {
                                    getPageTitle(router.pathname)
                                }</h1>
                        </div>

                        <div className="flex justify-center items-center h-full ">
                            <Image src={'/notification.svg'}
                                alt="Admin Image"
                                width={26}
                                height={26}
                                className="flex items-center justify-center mr-8 cursor-pointer rounded-full" />
                            <div className="mr-2">
                                <Image src={'/dp1.svg'}
                                    alt="Admin Image"
                                    width={43}
                                    height={43}
                                    className="flex items-center justify-center bg-[#0852C1] cursor-pointer rounded-full" />
                            </div>
                            <div className="flex flex-col justify-center h-full">
                                <h6 className="text-[#000000]  font-normal text-[14px]">James</h6>
                                {/* <h6 className="text-[#0000009C] ">Admin</h6> */}
                            </div>



                            <div className="md:hidden block " style={{ marginLeft: "1rem" }}>
                                <Dropdown  menu={navMenu} 
                                    trigger={
                                        ["click"]
                                    }>
                                    <a className="text-[#0852C1]">
                                        <MenuOutlined style={
                                            { fontSize: "24px", color: "#08A122" }
                                        } />
                                    </a>
                                </Dropdown>
                            </div>
                        </div>


                    </div>
                </Header>
                <Content>{children}</Content>
            </Layout>

        </Layout>
    );
};

export default Index;
