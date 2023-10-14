import React, { useState } from "react";
import {
  Button,
  Input,
  Form,
  Select,
  DatePicker,
  Modal,
} from "antd";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
const { Option } = Select;

const Index = () => {
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmationModal(true);
  };

  const handleDeleteConfirmed = () => {
    // Handle delete confirmation
    setShowDeleteConfirmationModal(false);
  };
  const router= useRouter();

  return (
    <div className="w-full h-screen bg-gray-100 p-4">
      <Head>
        <title>Queries</title>
      </Head>
      <div className="w-full max-w-4xl mx-auto my-4 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center border-b border-gray-300 mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Add Query</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDeleteConfirmation}
              className="flex items-center gap-4 rounded-lg text-white border border-[#ffc400] px-4 py-2 mb-2"
              style={{
                background: 'linear-gradient(45deg, #ff5733, #ffc400)',
              }}
            >
              Delete
            </button>

          </div>
        </div>

        <Form layout="vertical">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="name" label="Name">
              <Input size="large" placeholder="Name" />
            </Form.Item>

            <Form.Item name="phone" label="Phone Number">
              <Input size="large" placeholder="Phone Number" />
            </Form.Item>

            <Form.Item name="email" label="Email Address">
              <Input size="large" placeholder="Email Address" />
            </Form.Item>

            <Form.Item name="destination" label="Destination">
              <Input size="large" placeholder="Destination" />
            </Form.Item>

            <Form.Item name="travelMonth" label="Travel Month">
              <DatePicker size="large" placeholder="Travel Month" style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="adults" label="No of Adults">
              <Input size="large" placeholder="No of Adults" />
            </Form.Item>

            <Form.Item name="child" label="No of Children">
              <Input size="large" placeholder="No of Children" />
            </Form.Item>

            <Form.Item name="holidayDeal" label="Holiday/Deal">
              <Select size="large" placeholder="Select Holiday/Deal">
                <Option value="deal1">Deal 1</Option>
                <Option value="deal2">Deal 2</Option>
                {/* Add more options */}
              </Select>
            </Form.Item>
          </div>

          {/* Other form items... */}

          <div className="text-right">
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" onClick={()=>router.push('/deals')}>
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>

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
