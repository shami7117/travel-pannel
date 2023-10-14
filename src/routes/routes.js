import Image from "next/image";

const routes = [
  {
    path: "/",
    icon: <Image src="/booking.svg" alt="orders-icon" width={24} height={24} />,
    title: "Booking",
    roles: ["admin", "user"],
  },
  {
    path: "/query",
    icon: <Image src="/users.svg" alt="orders-icon" width={24} height={24} />,
    title: "Query",
    roles: ["admin", "user"],
  },
  // {
  //   path: "/products",
  //   icon: <Image src="/images/products.svg" alt="products" width={24} height={24} />,
  //   title: "Products",
  //   roles: ["user", "admin"],
  // },
  {
    path: "/packages",
    icon: <Image src="/2.svg" alt="buyers" width={24} height={24} />,
    title: "Packages",
    roles: ["user", "admin"],
  },
  {
    path: "/users",
    icon: <Image src="/users.svg" alt="buyers" width={24} height={24} />,
    title: "User Listing",
    roles: ["user", "admin"],
  },
  {
    path: "/deals",
    icon: <Image src="/4.svg" alt="sellers" width={24} height={24} />,
    title: "Deals",
    roles: ["user", "admin"],
  },
  {
    path: "/profile",
    icon: <Image src="/profile.svg" alt="profile" width={24} height={24} />,
    title: "Profile",
    roles: ["user", "admin"],
  },
];

export default routes;
