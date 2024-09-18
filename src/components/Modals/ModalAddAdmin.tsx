import { Form, FormInstance, Input, Modal, ModalProps } from 'antd';

export interface ModalAddAdminProps extends ModalProps {
  type: 'edit' | 'create',
  form: FormInstance<any>
}

export default function ModalAddAdmin ({ type, form, ...props }: ModalAddAdminProps) {
  return ( 
    <Modal
      title={type === 'create' ? 'Tạo admin' : 'Chỉnh sửa admin'}
      okText='Xác nhận'
      cancelText='Huỷ'
      {...props}
    >
     <Form style={{ marginTop: 18 }} form={form} layout='vertical'>
        <Form.Item
          label="Họ và tên"
          name='fullname'
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
        >
          <Input placeholder='Nguyễn Văn A' />
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Vui lòng nhập email' }]}
        >
          <Input placeholder='example@gmail.com' />
        </Form.Item>

        <Form.Item
          label='Mật khẩu'
          name='password'
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
        >
          <Input.Password placeholder='Nhập mật khẩu' />
        </Form.Item>
      </Form> 
    </Modal>
  );
}
