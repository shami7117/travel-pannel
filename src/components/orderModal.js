import React, { useState } from 'react';
import { Modal, Form, Input, Radio, DatePicker, Select, Button, Row, Col } from 'antd';

const { Option } = Select;

function OrderModal({ visible, onCancel, onSubmit }) {
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState('paypal');

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      visible={visible}
      title="Make a Booking"
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleCancel} size="large">
          Submit
        </Button>,
      ]}
      width={800}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item name="orderId" label="Booking ID" rules={[{ required: true, message: 'Enter booking Id' }]}>
              <Input placeholder="Enter Order ID" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="customer" label="Customer" rules={[{ required: true, message: 'Enter Customer Name' }]}>
              <Input placeholder="Enter Customer Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              name="amount"
              label="Amount"
              rules={[
                {
                  required: true,
                  type: 'number',
                  min: 0,
                  transform: (value) => Number(value),
                  message: 'Amount must be a positive number or zero',
                },
              ]}
            >
              <Input type="number" placeholder="Enter Amount" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item name="orderDate" label="Order Date" rules={[{ required: true, type: 'date' }]}>
              <DatePicker className='w-full' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Select a status' }]}>
              <Select defaultValue="New" dropdownStyle={{ backgroundColor: '#ffffff', padding: '3' }}>
                <Option
                  value="New"
                  style={{
                    background: '#2668E81A',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  New
                </Option>
                <Option
                  value="In Progress"
                  style={{
                    background: '#FFF9F4',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  In Progress
                </Option>
                <Option
                  value="Completed"
                  style={{
                    background: '#E826261A',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Completed
                </Option>
                <Option
                  value="Cancelled"
                  style={{
                    background: '#36E82617',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Cancelled
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Enter Phone Number' }]}>
              <Input placeholder="Enter Phone Number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item name="email" label="Email Address" rules={[{ required: true, message: 'Enter Email Address' }]}>
              <Input placeholder="Enter Email Address" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="package" label="Package/Deal" rules={[{ required: true, message: 'Enter Package/Deal' }]}>
              <Input placeholder="Enter Package/Deal" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="bookingDate" label="Booking Date" rules={[{ required: true, type: 'date' }]}>
              <DatePicker className='w-full' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item name="checkInDate" label="Check-in Date" rules={[{ required: true, type: 'date' }]}>
              <DatePicker className='w-full' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="checkOutDate" label="Check-out Date" rules={[{ required: true, type: 'date' }]}>
              <DatePicker className='w-full' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              name="numRooms"
              label="No of Rooms"
              rules={[
                { required: true, type: 'number', transform: (value) => Number(value) }
              ]}
            >
              <Input type="number" placeholder="Enter No of Rooms" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item
              name="numAdults"
              label="No of Adults"
              rules={[
                { required: true, type: 'number', transform: (value) => Number(value) }
              ]}
            >
              <Input type="number" placeholder="Enter No of Adults" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              name="numChildren"
              label="No of Children"
              rules={[
                { required: true, type: 'number', transform: (value) => Number(value) }
              ]}
            >
              <Input type="number" placeholder="Enter No of Children" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              name="paymentAmount"
              label="Payment Amount"
              rules={[
                { required: true, type: 'number', transform: (value) => Number(value) }
              ]}
            >
              <Input type="number" placeholder="Enter Payment Amount" />
            </Form.Item>

          </Col>
        </Row>
        <Form.Item name="status" label="Payment status" rules={[{ required: true, message: 'Select a type' }]}>
          <Select defaultValue="Completed" dropdownStyle={{ backgroundColor: '#ffffff', padding: '3' }}>
            <Option
              value="In Progress"
              style={{
                background: '#FFF9F4',
                transition: 'background-color 0.3s ease',
              }}
            >
              In Progress
            </Option>
            <Option
              value="Completed"
              style={{
                background: '#E826261A',
                transition: 'background-color 0.3s ease',
              }}
            >
              Completed
            </Option>
            <Option
              value="Cancelled"
              style={{
                background: '#36E82617',
                transition: 'background-color 0.3s ease',
              }}
            >
              Cancelled
            </Option>
          </Select>
        </Form.Item>

        <Form.Item name="additionalNotes" label="Additional Notes" rules={[{ message: 'Enter Additional Notes' }]}>
          <Input.TextArea rows={4} placeholder="Enter Additional Notes" />
        </Form.Item>

      </Form>
    </Modal>
  );
}

export default OrderModal;
