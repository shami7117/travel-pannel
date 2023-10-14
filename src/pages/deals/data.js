import Image from "next/image";
import { Button, Dropdown, Menu } from "antd";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";

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



export const columns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-base font-lato font-medium">Place Name</span>
        </div>
      ),
      dataIndex: "no",
      sorter: (a, b) => a.age - b.age,
      render: (_, record) => (
        <div className="w-full gap-x-2 flex items-center justify-start">
          <Image src={'/resort.svg'} width={51} height={51} />
          <div className="text-base flex flex-col items-start justify-start font-lato font-normal text-[#777777]">
            <span className="text-[#000000]">The Best Resort</span>
            <span className="text-[#ED6C0E]">Usa</span>

          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-base font-lato font-medium">Offers</span>
        </div>
      ),
      dataIndex: "name",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <span className="text-base font-lato font-normal text-[#777777]">
            {/* ${record.price} */}%70
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-base font-lato font-medium">Date</span>
        </div>
      ),
      dataIndex: "name",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <span className="text-base font-lato font-normal text-[#777777]">
            {/* ${record.price} */}23 Sep, 2023
          </span>
        </div>
      ),
    },


    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-base font-lato font-medium">Country</span>
        </div>
      ),
      dataIndex: "desc",
      sorter: (a, b) => a.age - b.age,
      render: (_, record) => (
        <div className="w-full">
          <span style={getStatusStyle(record.status)}
            className="rounded-md px-2 py-1 text-[14px] font-[400] text-center">
            {/* {record.status} */}America
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
            >
              <Button
                icon={<MoreOutlined />}
                className="more-button"
              />
            </Dropdown>
          </div>
        );
      },
    },
  ];