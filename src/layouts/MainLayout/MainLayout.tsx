import { KeyMenuAsRoute, LayoutProps } from '@/models/common';
import { Layout, Row, Menu, MenuProps, Input, Popover, Button, Avatar, theme, Select, Badge, Divider, Typography } from 'antd';
import Image from 'next/image';
import Logo from '@/assets/LogoSecondary.svg';
import { ShopOutlined, TeamOutlined, MailOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MenuInfo } from 'rc-menu/lib/interface';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;
const { Title } = Typography

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  style?: React.CSSProperties,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    style,
    children,
    label,
    type,
  } as MenuItem;
}

const ListMenuItem: MenuProps['items'] = [
  getItem('Shop', 'Shop', <ShopOutlined style={{ fontSize: 18 }} />, { fontSize: 16 }),
  getItem('About Us', 'About Us', <TeamOutlined style={{ fontSize: 18 }} />, { fontSize: 16 }),
  getItem('Contact', 'Contact', <MailOutlined style={{ fontSize: 18 }} />, { fontSize: 16 }),
];

const listRouteMenuItem: Array<{ route: string; key: string }> = [
  { route: 'about-us', key: 'About Us' },
  { route: 'contact', key: 'Contact' },
];

const MainLayout = ({ children }: LayoutProps): JSX.Element => {
  const { token } = theme.useToken();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeyMenu, setSelectedKeyMenu] = useState<string>('Shop');
  const router = useRouter();

  useEffect(() => {
    for (let i = 0; i < listRouteMenuItem.length; i++) {
      const item = listRouteMenuItem[i];
      if (router.pathname.includes(`${item.route}`)) {
        setSelectedKeyMenu(item.key);
        break;
      }
    }
  }, []);

  const handleRouterCart = () => {
    router.push('/cart');
  };

  const handleClickMenu = (value: MenuInfo) => {
    const keyMenu = value.key as keyof typeof KeyMenuAsRoute;
    if (keyMenu !== selectedKeyMenu) {
      router.push(`/${KeyMenuAsRoute[keyMenu]}`);
      setSelectedKeyMenu(keyMenu);
    }
  };

  return (
    <Layout hasSider style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <Sider
        width={220}
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        style={{
          boxShadow:
            '0px 24px 32px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          transition: 'width 1s linear'
        }}
      >
        <Row align="middle" justify="center" style={{marginTop: '24px', cursor: 'pointer',}} onClick={() => router.push('/')}>
          <Row style={{ height: '65px', width: '90px' }} align="middle">
            <Image src={Logo} alt="Logo Thăng Long" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Row>
          
          {!collapsed && <Title level={3} italic underline style={{margin: 0, fontWeight: 500, transition: 'all 0.3s linear'}}>GDay Shop</Title>}
        </Row>
        <Menu
          style={{ marginTop: '20px' }}
          selectedKeys={[selectedKeyMenu]}
          items={ListMenuItem}
          onClick={handleClickMenu}
        />
      </Sider>
      <Layout
        style={{ marginLeft: collapsed ? 80 : 220, backgroundColor: '#fff', transition: 'margin-left 0.3s ease' }}
      >
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '60px',
            backgroundColor: '#fff',
            boxShadow:
              '0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 0px 1px rgba(0, 0, 0, 0.04)',
            position: 'fixed',
            top: 0,
            right: 0,
            left: collapsed ? 80 : 220,
            zIndex: 10,
            transition: 'left 0.3s ease',
          }}
        >
          <Row style={{ width: '50%', maxWidth: '600px' }} justify="center" align="middle">
            <Search placeholder="Search for anything here" allowClear />
          </Row>

          <Row style={{ flex: 1, gap: '20px' }} justify="end" align="middle">
            <Select
              style={{ width: '120px' }}
              defaultValue="vi"
              options={[
                { value: 'vi', label: 'Tiếng Việt' },
                { value: 'en', label: 'Tiếng Anh' },
              ]}
            />

            <Popover
              trigger="click"
              placement="bottomRight"
              content={
                <Row style={{ flexDirection: 'column' }}>
                  <Button type="link" style={{ color: token.colorPrimary }}>
                    Đăng xuất
                  </Button>
                </Row>
              }
            >
              <Avatar size={34} icon={<UserOutlined />} />
            </Popover>

            <Badge count={99} overflowCount={10}>
              <ShoppingCartOutlined style={{ cursor: 'pointer', fontSize: '30px' }} onClick={handleRouterCart} />
            </Badge>
          </Row>
        </Header>
        <Content style={{ padding: '40px', marginTop: '60px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
