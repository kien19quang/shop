import SignInBanner from '@/assets/images/SignInBanner.svg';
import { Ornament } from '@/components/Icons';
import ApiClient from '@/configs/axiosConfig';
import { RegisterUserDto } from '@/models/user/UserModel';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Typography, message } from 'antd';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

const { Text, Title } = Typography;

const Register = () => {
  const router = useRouter()
  const [form] = Form.useForm();

  const [loading, setLoading] = useState<boolean>(false)

  const register = useCallback(async () => {
    try {
      setLoading(true)
      form
        .validateFields()
        .then(async (values: RegisterUserDto) => {
          const resRegister = await ApiClient.POST('/user/create_user', values)
          if (resRegister?.error) {
            return
          }

          const response = await signIn('credentials', {
            ...values,
            redirect: false,
            callbackUrl: '/'
          });
          if (response?.error) {
            return message.error(response.error)
          }
          router.push('/')
        })
        .catch((error) => {
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
    } catch (error: any) {
      console.log(error);
    }
  }, [form, router]);

  return (
    <Row style={{ flexWrap: 'nowrap', height: '100vh' }}>
      <Row style={{ flex: 1, padding: 24, flexDirection: 'column' }}>
        <Row style={{ flexDirection: 'column', flexGrow: 1, position: 'relative' }} justify="center" align="middle">
          <Row onClick={() => router.back()} style={{ position: 'absolute', top: '5%', left: 60, cursor: 'pointer' }}>
            <Ornament />
          </Row>

          <Row style={{ flexDirection: 'column', gap: 32 }} align="middle">
            <Title level={3} style={{ margin: 0, fontSize: 20 }}>
              Đăng ký tài khoản
            </Title>

            <Form form={form} layout="vertical" style={{ width: 400 }}>
              <Form.Item name="fullname" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng điền đầy đủ tên của bạn' }]}>
                <Input placeholder="Your full name" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Vui lòng điền email' }]}>
                <Input placeholder="example@gmail.com" prefix={<MailOutlined />} />
              </Form.Item>

              <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Vui lòng điền mật khẩu' }]}>
                <Input.Password placeholder="Password" prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item shouldUpdate>
                {() => (
                  <Button type="primary" loading={loading} onClick={register} htmlType="submit" disabled={!form.isFieldsTouched(true) || !!form.getFieldsError().filter(({ errors }) => errors.length).length} block>
                    Tạo tài khoản
                  </Button>
                )}
              </Form.Item>

              <Row style={{ flexDirection: 'column', gap: 24 }}>
                <Row align='middle' justify='center' style={{ gap: 4 }}>
                  <Text>Bạn đã có tài khoản?</Text>
                  <Link href='/auth/login' style={{ color: '#27A376' }}>Đăng nhập ở đây</Link>
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

      <Row style={{ width: '50%', maxWidth: 720, flexDirection: 'column', flexWrap: 'nowrap' }}>
        <Row style={{ height: '100%' }}>
          <Image src={SignInBanner} alt="Banner" style={{ objectFit: 'cover', width: '100%', height: '100%' }} priority={true} />
        </Row>
      </Row>
    </Row>
  );
};

export default Register;