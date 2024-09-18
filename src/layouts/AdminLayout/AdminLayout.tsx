import { KeyMenuAdminAsRouter, LayoutProps } from '@/models/common';
import { Avatar, Dropdown, Flex, Input, Layout, Menu, MenuProps, Popover, Select, Typography } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Logo from '../../assets/LogoSecondary.svg';
import { PiArrowsClockwise, PiShoppingCart, PiSignOut, PiUser } from 'react-icons/pi'
import { UserOutlined } from '@ant-design/icons';
import { signOut, useSession } from 'next-auth/react';

const { Header, Footer, Content, Sider } = Layout
const { Text, Title } = Typography

const ListMenuItem: MenuProps["items"] = [
  { label: 'Quản lý admin', key: 'manage-admin', icon: <PiUser size={16} /> },
  { label: 'Quản lý sản phẩm', key: 'products', icon: <PiShoppingCart size={16} /> }
]

const items: MenuProps['items'] = [
  {
    label: (
      <Flex gap={8} align='center' style={{ fontSize: 15 }}>
        <PiSignOut size={18} fill='currentColor' /> Đăng xuất
      </Flex>
    ),
    key: 'sign-out',
    danger: true,
  },
];

const AdminLayout = ({ children }: LayoutProps): JSX.Element => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeyMenu, setSelectedKeyMenu] = useState<string>('manage-admin');

  const { data } = useSession()
  const router = useRouter()

  const handleClickMenu: MenuProps["onClick"] = (info) => {
    const keyMenu = info.key as keyof typeof KeyMenuAdminAsRouter;
    if (info.key !== selectedKeyMenu) {
      router.push(`/${KeyMenuAdminAsRouter[keyMenu]}`);
      setSelectedKeyMenu(info.key)
    }
  }

  const handleClickDropdown: MenuProps["onClick"] = (info) => {
    if (info.key === 'sign-out') {
      signOut({ redirect: true, callbackUrl: '/auth/login' });
    }
  }

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
        <Flex align='center' justify="center" style={{marginTop: '24px', cursor: 'pointer',}} onClick={() => router.push('/')}>
          <Flex style={{ height: '65px', width: '90px' }} align="center">
            <Image src={Logo} alt="Logo Thăng Long" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Flex>
          
          {!collapsed && <Title level={3} italic underline style={{margin: 0, fontWeight: 500, transition: 'all 0.3s linear'}}>GDay Shop</Title>}
        </Flex>
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
          <Flex style={{ width: '50%', maxWidth: '600px' }} justify="center" align="center">
            <Input placeholder="Search for anything here" allowClear />
          </Flex>

          <Flex style={{ flex: 1, gap: '20px' }} justify="end" align="center">
            <Dropdown trigger={['click']} menu={{ items, style: { minWidth: 200 }, onClick: handleClickDropdown }} placement='bottomRight' arrow>
              <Flex align='center' gap={8} style={{ cursor: 'pointer' }}>
                <Avatar size={34} icon={<UserOutlined />} />
                <Text>{data?.user?.name}</Text>
              </Flex>
            </Dropdown>
          </Flex>
        </Header>
        <Content style={{ padding: '40px', marginTop: '60px', backgroundColor: '#fafafa' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
