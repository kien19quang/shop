import MainLayout from '@/layouts/MainLayout/MainLayout';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  MinusOutlined,
  PlusOutlined,
  TagOutlined,
} from '@ant-design/icons';
import {
  Card,
  Row,
  Typography,
  Statistic,
  theme,
  Divider,
  Select,
  Button,
  List,
  InputNumber,
  Checkbox,
  Dropdown,
  MenuProps,
} from 'antd';
import Product from '../../assets/Images/Product.svg';
import Image from 'next/image';
import { useState } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useRouter } from 'next/router';
import OrderSummary from '@/components/common/OrderSummary';

const { Text } = Typography;
const listProduct: Array<{ label: string; urlImage: any }> = [];
for (let i = 0; i < 20; i++) {
  listProduct.push({ label: `Sản phẩm ${i}`, urlImage: Product });
}

const items: MenuProps['items'] = [
  {
    key: 'checkedAll',
    label: (
      <Row align="middle" style={{ gap: 8 }}>
        <CheckOutlined />
        Chọn tất cả
      </Row>
    ),
  },
  {
    key: 'unCheckedAll',
    label: (
      <Row align="middle" style={{ gap: 8 }}>
        <CloseOutlined />
        Chọn tất cả
      </Row>
    ),
  },
  {
    key: 'deleteChecked',
    label: (
      <Row align="middle" style={{ gap: 8 }}>
        <DeleteOutlined />
        Xoá đã chọn
      </Row>
    ),
    danger: true,
  },
  {
    key: 'deleteAll',
    label: (
      <Row align="middle" style={{ gap: 8 }}>
        <DeleteOutlined />
        Xoá tất cả
      </Row>
    ),
    danger: true,
  },
];

const Cart = () => {
  const [showBulkAction, setShowBulkAction] = useState<boolean>(false);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const { token } = theme.useToken();
  const router = useRouter();

  const handleChangeCheckedAll = (e: CheckboxChangeEvent) => {
    setCheckedAll(e.target.checked);
    if (showBulkAction) {
      setShowBulkAction(false);
    }
  };

  return (
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
          <List
            header={
              <Row justify="space-between" align="middle">
                <Text style={{ fontSize: 22 }} strong>
                  Cart
                </Text>

                <Dropdown
                  menu={{ items }}
                  overlayStyle={{ width: '180px' }}
                  placement="bottom"
                  trigger={['click']}
                  arrow
                  open={showBulkAction}
                  onOpenChange={(open) => setShowBulkAction(open)}
                >
                  <Button style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 8px' }}>
                    <Checkbox
                      onClick={(e) => e.stopPropagation()}
                      onChange={handleChangeCheckedAll}
                      checked={checkedAll}
                    />
                    <DownOutlined />
                  </Button>
                </Dropdown>
              </Row>
            }
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              showSizeChanger: true,
              defaultPageSize: 3,
              pageSizeOptions: [3, 5, 10, 20, 50],
            }}
            itemLayout="vertical"
            style={{ width: '100%' }}
            dataSource={listProduct}
            renderItem={(item, index) => {
              return (
                <List.Item
                  key={item.label}
                  extra={<Image width={250} alt="logo" src={item.urlImage} />}
                  style={{ display: 'flex', alignItems: 'center' }}
                  actions={[
                    <Row align="middle" style={{ gap: 8, height: '100%' }} key={index}>
                      <Checkbox />

                      <Divider type="vertical" style={{ height: '2em' }} />

                      <DeleteOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
                    </Row>,
                  ]}
                >
                  <List.Item.Meta title={<Text style={{ fontSize: 16 }}>{item.label}</Text>} style={{ margin: 0 }} />

                  <Statistic
                    value={18000000}
                    suffix={'đ'}
                    valueStyle={{ fontSize: 16, color: '#FF424E', fontWeight: 600 }}
                    groupSeparator="."
                  />

                  <InputNumber
                    addonBefore={
                      <Button type="text" className="btn__quantity">
                        <MinusOutlined />
                      </Button>
                    }
                    addonAfter={
                      <Button type="text" className="btn__quantity">
                        <PlusOutlined />
                      </Button>
                    }
                    value={1}
                    style={{ width: 130, marginTop: 12 }}
                  />
                </List.Item>
              );
            }}
          />
        </Row>

        <Row style={{ width: '30%', maxWidth: '330px', height: '500px' }}>
          <OrderSummary
            price={319.98}
            discount={31.9}
            shipping="Free"
            estimatedDelivery={new Date()}
            titleButton="Proceed to Checkout"
            listCoupon={[{value: 1, label: "Giảm 50%"}]}
            onOk={() => router.push('/cart/payment-process')}
          />
        </Row>
      </Row>
    </Row>
  );
};

Cart.Layout = MainLayout;
export default Cart;
