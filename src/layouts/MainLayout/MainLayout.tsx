import { LayoutProps } from '@/models/common';
import { Space, Layout, Row, Col } from 'antd';
import Image from 'next/image';
import Logo from '@/assets/logo.svg';
import { MenuOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

export interface INavbar {
  label: string;
  link: string;
}

const listOptionNavbar: INavbar[] = [
  { label: 'Shop', link: '' },
  { label: 'Collective', link: '' },
  { label: 'Designers', link: '' },
  { label: 'About us', link: '' },
  { label: 'Contact', link: '' },
];

const MainLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Layout>
        <Header
          style={{
            height: '75px',
            backgroundColor: '#fff',
            borderBottom: '1px solid #d1d1d8',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Row className="container" align="middle" style={{ height: '100%', width: '100%' }}>
            <Col flex={2} style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <Image src={Logo} height={40} width={70} alt="Logo Cozy" />
            </Col>

            <Col flex={6} style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
              {listOptionNavbar.map((item, index) => {
                return (
                  <Row key={index} style={{ textTransform: 'uppercase', fontWeight: 700 }}>
                    {item.label}
                  </Row>
                );
              })}
            </Col>

            <Col
              flex={2}
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '20px',
                fontSize: '20px',
              }}
            >
              <MenuOutlined style={{ cursor: 'pointer' }} />
              <SearchOutlined style={{ cursor: 'pointer' }} />
              <ShoppingCartOutlined style={{ cursor: 'pointer' }} />
            </Col>
          </Row>
        </Header>
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </Space>
  );
};

export default MainLayout;
