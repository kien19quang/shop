import OrderSummary from '@/components/common/OrderSummary';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { EStepPayment } from '@/models/cart/cartModel';
import {
  CreditCardOutlined,
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  PlusOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Divider,
  Form,
  List,
  Modal,
  Radio,
  Row,
  Steps,
  StepsProps,
  Tag,
  Typography,
  theme,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Visa from '@/assets/Images/visa.svg';
import MasterCard from '@/assets/Images/mastercard.svg';
import Image from 'next/image';
import ModalAddress from '@/components/Modals/ModalAddress';
import ModalPaymentMethod from '@/components/Modals/ModalPaymentMethod';
import ModalPayment from '@/components/Modals/ModalPayment';

const listShipping: any = [1, 2];

const listItemStep: StepsProps['items'] = [
  { title: 'Address', icon: <EnvironmentOutlined style={{ marginTop: 4 }} /> },
  { title: 'Shipping', icon: <RocketOutlined style={{ marginTop: 4 }} /> },
  { title: 'Payment', icon: <CreditCardOutlined style={{ marginTop: 4 }} /> },
];

const listTitleButton = ['Continue to Shipping', 'Continue to Payment', 'Place Your Order and Pay'];

const { Text } = Typography;

const PaymentProcess = () => {
  const [currentStep, setCurrenStep] = useState<number>(0);
  const [showModalAddress, setShowModalAddress] = useState<boolean>(false);
  const [showModalPaymentMethod, setShowModalPaymentMethod] = useState<boolean>(false);
  const [showModalPayment, setShowModalPayment] = useState<boolean>(false);
  const [dataSourceAddress, setDataSourceAddress] = useState<any>([]);
  const [selectedAddress, setSelectedAddress] = useState<number>(-1);
  const [selectedShipping, setSelectedShipping] = useState<number>(-1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(-1);
  const { token } = theme.useToken();
  const [formAddress] = Form.useForm();
  const [formPaymentMethod] = Form.useForm();

  useEffect(() => {
    const newDataSource = [];
    for (let i = 0; i < 3; i++) {
      newDataSource.push({
        fullName: 'Vũ Quang Kiên',
        phoneNumber: '0847972859',
        address: 'Hạ Long, Quảng Ninh',
        addressDetail: 'Hà Khẩu, Hạ Long, Quảng Ninh',
        typeAddress: 'home',
      });
    }
    setDataSourceAddress(newDataSource);
  }, []);

  const handleChangeStep = (step: number) => {
    setCurrenStep(step);
  };

  const hideCardNumber = (value: string) => {
    const hiddenDigits = '•'.repeat(value.length - 8);
    const visibleDigits = value.slice(-4);
    return `${hiddenDigits}${visibleDigits}`;
  };

  const renderContent: Record<string, React.ReactNode> = {
    Address: (
      <List
        dataSource={dataSourceAddress}
        itemLayout="horizontal"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          showSizeChanger: true,
          defaultPageSize: 3,
          pageSizeOptions: [3, 5, 10, 20, 50],
        }}
        footer={
          <Button icon={<PlusOutlined />} onClick={() => setShowModalAddress(true)}>
            Add New Address
          </Button>
        }
        style={{ width: '100%' }}
        renderItem={(item: any, index) => {
          return (
            <List.Item
              key={index}
              actions={[
                <Row align="middle" style={{ gap: 8, height: '100%' }}>
                  <Button icon={<EditOutlined />} type="primary" onClick={() => handleEditAddress(item)} />

                  <Divider type="vertical" style={{ height: '2.4em' }} />

                  <Button icon={<DeleteOutlined />} danger onClick={() => handleDeleteAddress(index)} />
                </Row>,
              ]}
            >
              <Row style={{ marginRight: 16 }}>
                <Radio checked={selectedAddress === index} onChange={() => handleChangeChecked(index, 'address')}/>
              </Row>
              <List.Item.Meta
                title={
                  <Row align="middle" style={{ gap: 12 }}>
                    <Text strong style={{ fontSize: 16 }}>
                      {item.fullName}
                    </Text>
                    <Tag
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: '#fff',
                        borderColor: token.colorPrimary,
                        color: token.colorPrimary,
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.typeAddress}
                    </Tag>
                  </Row>
                }
                description={
                  <Row style={{ flexDirection: 'column', marginTop: 8, gap: 4 }}>
                    <Text>Quảng Ninh, Hạ Long</Text>
                    <Text>{item.addressDetail}</Text>
                    <Row>
                      <Text style={{ fontWeight: 500 }}>Liên hệ - </Text>
                      <Text>&nbsp;{item.phoneNumber}</Text>
                    </Row>
                  </Row>
                }
              />
            </List.Item>
          );
        }}
      />
    ),
    Shipping: (
      <List
        style={{ width: '100%', marginTop: 12 }}
        header={
          <Text style={{ fontSize: 16 }} strong>
            Shipment Method
          </Text>
        }
        footer={
          <Row justify="space-between" align="middle">
            <Row style={{ gap: 16 }} align="middle">
              <Radio checked={selectedShipping === 100} onChange={() => handleChangeChecked(100, 'shipping')}/>
              <Text strong>Schedule</Text>
              <Text>Choose a date that works for you.</Text>
            </Row>

            <DatePicker disabledDate={(current) => current && current < moment().startOf('day')} />
          </Row>
        }
        dataSource={listShipping}
        itemLayout="horizontal"
        renderItem={(item, index) => {
          return (
            <List.Item actions={[<Text strong>{moment().format('DD MMM, YYYY')}</Text>]}>
              <Row style={{ gap: 16 }}>
                <Radio checked={selectedShipping === index} onChange={() => handleChangeChecked(index, 'shipping')}/>
                <Text strong>Free</Text>
                <Text>Regular Shipment</Text>
              </Row>
            </List.Item>
          );
        }}
      />
    ),
    Payment: (
      <List
        style={{ width: '100%', marginTop: 12 }}
        header={
          <Text style={{ fontSize: 16 }} strong>
            Payment Method
          </Text>
        }
        dataSource={listShipping}
        itemLayout="horizontal"
        footer={
          <Button icon={<PlusOutlined />} onClick={() => setShowModalPaymentMethod(true)}>
            Add Payment Method
          </Button>
        }
        renderItem={(item, index) => {
          return (
            <List.Item actions={[<Button icon={<DeleteOutlined />} danger type="primary" />]}>
              <Row style={{ gap: 16 }}>
                <Radio checked={selectedPaymentMethod === index} onChange={() => handleChangeChecked(index, 'paymentMethod')}/>
                <Row align="middle">
                  <Image src={Visa} alt="Visa Card" />
                </Row>
                <Text strong>{hideCardNumber('68608062003')}</Text>
                <Text style={{ color: '#A2A3B1' }}>Expires 06/2021</Text>
              </Row>
            </List.Item>
          );
        }}
      />
    ),
  };

  const handlePayment = () => {
    if (currentStep < 2) {
      setCurrenStep((currentStep) => currentStep + 1);
    } else {
      setShowModalPayment(true);
    }
  };

  const handleEditAddress = (record: any) => {
    setShowModalAddress(true);
    formAddress.setFieldsValue(record);
  };

  const handleDeleteAddress = (indexDelete: number) => {
    Modal.confirm({
      title: 'Bạn có muốn xoá địa chỉ này không?',
      onOk: () => {
        const newDataSource = dataSourceAddress.filter((item: any, index: number) => index !== indexDelete && item);
        setDataSourceAddress(newDataSource);
      },
      okType: 'danger',
      okButtonProps: { type: 'primary' },
    });
  };

  const handleConfirmAddress = () => {
    formAddress
      .validateFields()
      .then((values) => {
        setDataSourceAddress([values, ...dataSourceAddress]);
        setShowModalAddress(false);
        formAddress.resetFields();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCancelModalAddress = () => {
    formAddress.resetFields();
    setShowModalAddress(false);
  };

  const handleChangeChecked = (index: number, type: 'address' | 'shipping' | 'paymentMethod') => {
    if (type === "address") {
      setSelectedAddress(index)
    }
    else if (type === "shipping") {
      setSelectedShipping(index)
    }
    else {
      setSelectedPaymentMethod(index)
    }
  }

  return (
    <>
      <Row
        style={{
          flexDirection: 'column',
          width: '100%',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          padding: '30px',
          borderRadius: '12px',
          gap: '40px',
        }}
      >
        <Row justify="space-between" style={{ width: '100%' }}>
          <Row style={{ width: '65%', flexDirection: 'column' }}>
            <Row style={{ paddingBlock: '12px', borderBlockEnd: '1px solid rgba(5, 5, 5, 0.06)' }}>
              <Steps items={listItemStep} current={currentStep} onChange={handleChangeStep} />
            </Row>

            <Row style={{ width: '100%' }}>{renderContent[EStepPayment[currentStep]]}</Row>
          </Row>

          <Row style={{ width: '30%', maxWidth: '330px', height: '500px' }}>
            <OrderSummary
              price={319.98}
              discount={31.9}
              shipping="Free"
              estimatedDelivery={new Date()}
              titleButton={listTitleButton[currentStep]}
              listCoupon={[{ value: 1, label: 'Giảm 50%' }]}
              onOk={handlePayment}
            />
          </Row>
        </Row>
      </Row>
      <ModalAddress
        title="Địa chi mới"
        open={showModalAddress}
        onCancel={handleCancelModalAddress}
        form={formAddress}
        onOk={handleConfirmAddress}
      />
      <ModalPaymentMethod
        title="Thêm phương thức thanh toán"
        open={showModalPaymentMethod}
        onCancel={() => setShowModalPaymentMethod(false)}
        form={formPaymentMethod}
      />
      <ModalPayment
        title="Thanh toán"
        open={showModalPayment}
        onCancel={() => setShowModalPayment(false)}
        onOk={() => setShowModalPayment(false)}
      />
    </>
  );
};

PaymentProcess.Layout = MainLayout;
export default PaymentProcess;
