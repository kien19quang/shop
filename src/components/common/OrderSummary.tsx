import { TagOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Row, Select, Statistic, Typography, theme } from "antd";
import moment from "moment";

const { Text } = Typography
export interface OrderSummaryProps {
  price: number;
  discount: number;
  shipping: string;
  estimatedDelivery: Date;
  listCoupon: Array<{value: number, label: string}>
  titleButton: string;
  onOk?: () => void
}

export default function OrderSummary( props : OrderSummaryProps ) {
  const { token } = theme.useToken()
  const { price, discount, shipping, estimatedDelivery, listCoupon, titleButton, onOk = () => {} } = props

  const handleClickButton = () => {
    onOk()
  }

  return (
    <Card title={<Text style={{ fontSize: 16 }}>Order Summary</Text>} style={{ width: '100%' }}>
      <Row style={{ flexDirection: 'column', gap: 24 }}>
        <Row justify="space-between">
          <Text>Price</Text>
          <Statistic value={price} prefix="$" valueStyle={{ fontSize: 14 }} />
        </Row>

        <Row justify="space-between">
          <Text>Discount</Text>
          <Statistic value={discount} prefix="$" valueStyle={{ fontSize: 14 }} />
        </Row>

        <Row justify="space-between">
          <Text>Shipping</Text>
          <Text style={{ color: token.colorPrimary }}>{shipping}</Text>
        </Row>

        <Row justify="space-between">
          <Text>Coupon Applied</Text>
          <Statistic value={0.0} prefix="$" valueStyle={{ fontSize: 14 }} />
        </Row>
      </Row>

      <Divider />

      <Row style={{ flexDirection: 'column', gap: 24 }}>
        <Row justify="space-between">
          <Text>TOTAL</Text>
          <Statistic value={288.08} prefix="$" valueStyle={{ fontSize: 14, fontWeight: 600 }} />
        </Row>

        <Row justify="space-between">
          <Text>Estimated Delivery by</Text>
          <Text strong>{moment(estimatedDelivery).format("DD MMM, YYYY")}</Text>
        </Row>

        <Select placeholder="Coupon Code" options={listCoupon} mode="tags" suffixIcon={<TagOutlined />} allowClear />

        <Button type="primary" onClick={handleClickButton}>
          {titleButton}
        </Button>
      </Row>
    </Card>
  );
}
