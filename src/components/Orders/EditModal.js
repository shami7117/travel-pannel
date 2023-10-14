import React from 'react';
import { Modal, Form, Input, Select, Button, Row, Col, DatePicker } from 'antd';
const { Option } = Select;

function OrderModal({ visible, onCancel, onSubmit, selectedOrder, editForm }) {
  return (
    <Modal
      visible={visible}
      title="Edit booking detail"
      onCancel={onCancel}
      footer={[
        <Button key="submit" type="primary" onClick={onCancel}>
          Update
        </Button>,
      ]}
      width={800}
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item name="orderId" label="Booking ID">
              <Input placeholder="Enter Order ID" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="customer" label="Customer">
              <Input placeholder="Enter Customer Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="amount" label="Amount">
              <Input type="number" placeholder="Enter Amount" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item name="orderDate" label="Order Date">
              <DatePicker className='w-full' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="status" label="Status">
              <Select defaultValue="New" dropdownStyle={{ backgroundColor: '#ffffff', padding: '3' }}>
                <Option value="New">New</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Completed">Completed</Option>
                <Option value="Cancelled">Cancelled</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="phone" label="Phone Number">
              <Input placeholder="Enter Phone Number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item name="email" label="Email Address">
              <Input placeholder="Enter Email Address" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="package" label="Package/Deal">
              <Input placeholder="Enter Package/Deal" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="bookingDate" label="Booking Date">
              <DatePicker className='w-full' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item name="checkInDate" label="Check-in Date">
              <DatePicker className='w-full' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="checkOutDate" label="Check-out Date">
              <DatePicker className='w-full' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="numRooms" label="No of Rooms">
              <Input type="number" placeholder="Enter No of Rooms" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item name="numAdults" label="No of Adults">
              <Input type="number" placeholder="Enter No of Adults" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="numChildren" label="No of Children">
              <Input type="number" placeholder="Enter No of Children" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="paymentAmount" label="Payment Amount">
              <Input type="number" placeholder="Enter Payment Amount" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="status" label="Payment status">
          <Select defaultValue="Completed" dropdownStyle={{ backgroundColor: '#ffffff', padding: '3' }}>
            <Option value="In Progress">In Progress</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
        </Form.Item>
        <Form.Item name="additionalNotes" label="Additional Notes">
          <Input.TextArea rows={4} placeholder="Enter Additional Notes" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default OrderModal;
