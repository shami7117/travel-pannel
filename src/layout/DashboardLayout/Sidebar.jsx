import { useEffect, useState } from "react";
import { Layout, Menu, Button } from "antd";
import routes from "@/routes/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const { Sider } = Layout;

const Sidebar = ({ role, handleLogout }) => {
  const router = useRouter();
  const [current, setCurrent] = useState(router.pathname);

  useEffect(() => {
    if (router.pathname) {
      if (current !== router.pathname) {
        setCurrent(router.pathname);
      }
    }
  }, [router, current]);

  return (
    <Sider
      style={{ background: "#1B2430" }}
      className="h-full mb-0 hidden md:block"
    >
      <div className="flex items-center justify-center">
        <Image src={"/logo.svg"} width={170} height={60} alt="logo" />
      </div>
      <Menu
        style={{
          // marginTop: "2rem",
        }}
        className="sidebar"
        theme="light"
        defaultSelectedKeys={[current]}
        onClick={({ key }) => {
          setCurrent(key);
        }}
        mode="inline"
        items={routes.map((route) => {
          if (route.roles.includes(role)) {
            return {
              key: route.path,
              icon: (
                <Image
                  src={route.icon.props.src}
                  alt={route.icon.props.alt}
                  width={24}
                  height={24}
                  style={{
                    filter: current === route.path ? "none" : "brightness(0) invert(1)",
                  }}
                />
              ),
              label:
                route?.childrens?.length > 0 ? (
                  <button
                    href={route.path}
                    className="font-normal text-base font-poppins text-white"
                  >
                    {route.title}
                  </button>
                ) : (
                  <Link
                    href={route.path}
                    className={`font-normal text-base font-poppins group ${current === route.path ? "text-white" : "text-white"
                      }`}
                  >
                    {route.title}
                  </Link>
                ),
              children: route?.childrens?.map((child) => {
                if (child.roles.includes(role)) {
                  return {
                    key: child.path,
                    icon: (
                      <Image
                        src={child.icon.props.src}
                        alt={child.icon.props.alt}
                        width={24}
                        height={24}
                        style={{
                          filter: current === child.path ? "none" : "brightness(0) invert(1)",
                        }}
                      />
                    ),
                    label: (
                      <Link
                        href={child.path}
                        className={`font-normal text-base font-poppins group ${current === child.path ? "text-white" : "text-white"
                          }`}
                      >
                        {child.title}
                      </Link>
                    ),
                  };
                }
              }),
            };
          }
        })}
      />

      <div style={{
        position: "absolute",
        bottom: "2%",
        left: "50%",
        transform: "translateX(-50%)",

      }} className="bg-[#FFC400] flex flex-col justify-center items-center py-3 px-3 rounded-[10px] ">
        <Image src={'/dp1.svg'} width={83} height={83} />
        <p className="text-[#000000] font-semibold text-[14px]">James Williams</p>
        <p className="text-[#0000009C] text-[14px]">User77@email.com</p>
        <Button
          type="text"
          onClick={handleLogout}
          className="flex items-center mt-3 font-[16px] text-[500] bg-[#000000] w-full flex justify-center items-center font-poppins text-[#FFFFFF] mt-auto mb-2"
        >
          Log Out
        </Button>
      </div>
    </Sider>
  );
};

export default Sidebar;
