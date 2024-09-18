import { Ornament } from '@/components/Icons';
import { LoginUserDto } from '@/models/user/UserModel';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Typography, message } from 'antd';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import SignInBanner from '../../assets/Images/SignInBanner.svg';

const { Text, Title } = Typography;

const Login = () => {
  const router = useRouter()
  const [form] = Form.useForm();

  const [loading, setLoading] = useState<boolean>(false)

  const login = useCallback(async () => {
    try {
      setLoading(true)
      form
        .validateFields()
        .then(async (values: LoginUserDto) => {
          const response = await signIn('credentials', {
            ...values,
            redirect: false,
            callbackUrl: '/'
          });
          if (response?.error) {
            return message.warning(response.error)
          }

          router.push('/')
        })
        .catch((error) => {
          console.log(error)
          if (error?.response?.data?.error) {
            message.error(error?.response?.data?.error)
          }
          else {
            message.error('Vui lòng điền đầy đủ thông tin');
          }
        })
        .finally(() => {
          setLoading(false)
        });

    } catch (error) {
      console.log(error);
    }
  }, [form, router]);

  return (
    <Row style={{ flexWrap: 'nowrap', height: '100vh' }}>
      <Row style={{ width: '50%', maxWidth: 720, flexDirection: 'column', flexWrap: 'nowrap' }}>
        <Row style={{ height: '70%', overflow: 'hidden' }}>
          <Image src={SignInBanner} alt="Robot" style={{ objectFit: 'cover', width: 'auto', height: 'auto' }} priority={true} />
        </Row>
        <Row style={{ height: '30%', flexDirection: 'column', padding: 24, borderTop: '5px solid #27A376', backgroundColor: '#111827', flexWrap: 'nowrap' }} justify="center">
          <Row style={{ flexDirection: 'column', gap: 12, paddingLeft: 12 }}>
            <Title level={1} style={{ margin: 0, fontSize: 32, color: 'white' }}>
              Chào mừng đến với GDay
            </Title>
  
            <Text style={{ color: 'white' }}>Kết nối để xem danh sách các sản phẩm</Text>
          </Row>
        </Row>
      </Row>

      <Row style={{ flex: 1, padding: 24, flexDirection: 'column' }}>
        <Row style={{ flexDirection: 'column', flexGrow: 1, position: 'relative' }} justify="center" align="middle">
          <Row onClick={() => router.back()} style={{ position: 'absolute', top: '5%', left: 60, cursor: 'pointer' }}>
            <Ornament />
          </Row>

          <Row style={{ flexDirection: 'column', gap: 32 }} align="middle">
            <Title level={3} style={{ margin: 0, fontSize: 20 }}>
              Đăng nhập tài khoản của bạn
            </Title>

            <Form form={form} layout="vertical" style={{ width: 400 }} initialValues={{ remember: true }}>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Vui lòng điền email' }]}>
                <Input placeholder="example@gmail.com" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Vui lòng điền mật khẩu' }]}>
                <Input.Password placeholder="Password" prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item shouldUpdate>
                {() => (
                  <Button type="primary" loading={loading} onClick={login} htmlType="submit" disabled={!form.isFieldsTouched(true) || !!form.getFieldsError().filter(({ errors }) => errors.length).length} block style={{ marginTop: 16 }}>
                    Đăng nhập
                  </Button>
                )}
              </Form.Item>

              <Row style={{ flexDirection: 'column', gap: 24 }}>
                <Row align='middle' justify='center' style={{ gap: 4 }}>
                  <Text>Bạn là người mới?</Text>
                  <Link href='/auth/register' style={{ color: '#27A376' }}>Tạo tài khoản</Link>
                </Row>
              </Row>
            </Form>
          </Row>
        </Row>

        <Row justify="center" style={{ gap: 10 }}>
          <Text style={{ color: '#A0AEC0' }}>© 2023 GDay . Alrights reserved.</Text>

          <Text>Terms & Conditions</Text>

          <Text>Privacy Policy</Text>
        </Row>
      </Row>
    </Row>
  );
};

export default Login;