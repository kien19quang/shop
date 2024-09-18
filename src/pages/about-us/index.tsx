import AboutUsImage from '../../assets/Images/AboutUs.png';
import CEO from '../../assets/Images/CEO.jpeg';
import RowAnimation from '@/components/RowAnimation';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { GlobalOutlined, LockOutlined, SettingOutlined, ShoppingCartOutlined, StarOutlined, TagOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Row, Typography, theme } from 'antd';
import Image from 'next/image';

const { Text, Paragraph, Title } = Typography;
const { Meta } = Card;

const listUtils: Array<{ title: string; description: string; icon: React.ReactNode }> = [
  {
    title: 'Giao hàng toàn quốc',
    description: 'Hỗ trợ giao hàng mọi miền trên đất nước Việt Nam',
    icon: <GlobalOutlined style={{fontSize: 35}}/>,
  },
  {
    title: 'Chất lượng tốt nhất',
    description: 'Sản phẩm được kiểm tra và đánh giá kỹ lưỡng trước khi tới tay khách hàng',
    icon: <StarOutlined style={{fontSize: 35}}/>,
  },
  {
    title: 'Giá tốt nhất',
    description: 'Mức giá hợp lý cùng nhiều ưu đãi giảm giá',
    icon: <TagOutlined style={{fontSize: 35}}/>,
  },
  {
    title: 'Chính sách bảo mật',
    description: 'Cam kết mọi thông tin thanh toán của khách hàng đều được giữ kín',
    icon: <LockOutlined style={{fontSize: 35}}/>,
  },
];

const AboutUs = () => {
  const { token } = theme.useToken();

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
      <Row align="middle" justify="space-between" style={{ width: '100%', gap: 20 }}>
        <RowAnimation animation="slideInFromLeft" styleAnimation={{ width: '40%' }}>
          <Row style={{ flexDirection: 'column', gap: 20 }}>
            <Title level={2} style={{ margin: 0 }}>
              <Text style={{ color: token.colorPrimary, fontSize: 'inherit' }}>Nền tảng</Text>
              &nbsp;quản lý và bán hàng đa kênh
            </Title>

            <Text style={{ fontSize: 18, color: '#A2A3B1' }}>
              Quản lý bán hàng toàn diện trên mạng xã hội và nền tảng thương mại điện tử
            </Text>

            <Button type="primary" style={{ height: 50, fontSize: 18, width: 240 }} icon={<SettingOutlined />}>
              Trải nghiệm
            </Button>
          </Row>
        </RowAnimation>

        <RowAnimation animation="slideInFromRight" styleAnimation={{ flex: 1, height: '400px' }}>
          <Image
            src={AboutUsImage}
            alt="About Us"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
          />
        </RowAnimation>
      </Row>

      <Divider />

      <Row style={{ flexDirection: 'column', width: '100%', paddingTop: '20px' }}>
        <RowAnimation animation="slideInFromLeft" styleAnimation={{ width: '100%', textAlign: 'center' }}>
          <Title level={2} style={{ width: '100%' }}>
            Đội ngũ quản lý
          </Title>
        </RowAnimation>

        <RowAnimation styleAnimation={{ width: '100%' }}>
          <Row style={{ width: '100%' }}>
            <Row gutter={24} style={{ marginTop: 60, width: '100%' }}>
              <Col span={8}>
                <Card
                  hoverable
                  style={{ width: '100%' }}
                  cover={<Image alt="CEO" src={CEO} style={{ width: '100%', objectFit: 'cover' }} />}
                >
                  <Meta title="Amanda Lee" description="Creative Head" />
                </Card>
              </Col>

              <Col span={8}>
                <Card
                  hoverable
                  style={{ width: '100%' }}
                  cover={<Image alt="CEO" src={CEO} style={{ width: '100%', objectFit: 'cover' }} />}
                >
                  <Meta title="Amanda Lee" description="Creative Head" />
                </Card>
              </Col>

              <Col span={8}>
                <Card
                  hoverable
                  style={{ width: '100%' }}
                  cover={<Image alt="CEO" src={CEO} style={{ width: '100%', objectFit: 'cover' }} />}
                >
                  <Meta title="Amanda Lee" description="Creative Head" />
                </Card>
              </Col>
            </Row>
          </Row>
        </RowAnimation>
      </Row>

      <Row
        justify="space-between"
        align="middle"
        style={{ marginTop: 40, padding: '30px', backgroundColor: token.colorPrimary, borderRadius: 8 }}
      >
        <Row style={{ width: '60%' }} align="middle">
          <Title level={2} style={{ color: 'white', margin: 0 }}>
            Mua sắm thoả thích không lo nghĩ về giá
          </Title>
        </Row>

        <Row style={{ width: '40%' }} justify="end">
          <Button style={{ height: 42, width: 180 }} icon={<ShoppingCartOutlined />} ghost className="btn-hover-white">
            Mua sắm
          </Button>
        </Row>
      </Row>

      <Row style={{ padding: '40px 0', flexDirection: 'column' }} align="middle">
        <Title level={2} style={{ color: token.colorPrimary, margin: 0 }}>
          Tiện ích
        </Title>
        <Title level={3}>Tại sao nên chọn dịch vụ của GDay?</Title>
        <Row gutter={24} style={{ width: '100%', marginTop: '36px' }}>
          {listUtils.map((item) => {
            return (
              <Col span={6} key={JSON.stringify(item)}>
                <Card
                  hoverable
                  style={{ width: '100%', backgroundColor: token.colorFillSecondary, minHeight: 210 }}
                  cover={
                    <Row style={{ padding: '24px 24px 0', width: '100%', display: 'flex' }} justify="center">
                      {item.icon}
                    </Row>
                  }
                >
                  <Meta
                    title={<Text style={{ fontSize: 18 }}>{item.title}</Text>}
                    description={item.description}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Row>
    </Row>
  );
};

AboutUs.Layout = MainLayout;
export default AboutUs;
