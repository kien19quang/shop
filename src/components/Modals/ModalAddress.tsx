import { HomeOutlined, LaptopOutlined } from '@ant-design/icons';
import { Radio, Cascader, Form, FormInstance, Input, Modal, ModalProps, Row } from 'antd';

export interface ModalAddressProps extends ModalProps {
  form: FormInstance<any>;
}

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 14,
    label: 'Quảng Ninh',
    children: [
      { value: 'HL', label: 'Hạ Long' },
      { value: 'CP', label: 'Cẩm Phả' },
    ],
  },
  {
    value: 29,
    label: 'Hà Nội',
    children: [
      { value: 'QHM', label: 'Quận Hoàng Mai' },
      { value: 'QLB', label: 'Quận Long Biên' },
    ],
  },
];

export default function ModalAddress({ form, ...props }: ModalAddressProps) {
  return (
    <Modal {...props}>
      <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 20 }} style={{ marginTop: 24 }}>
        <Form.Item label="id" name="_id" hidden />

        <Form.Item label="Họ và tên" name="fullName" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
          <Cascader placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã" options={options} showSearch />
        </Form.Item>

        <Form.Item label="Điạ chỉ cụ thể" name="addressDetail">
          <Input placeholder="Nhập địa chỉ cụ thể" />
        </Form.Item>

        <Form.Item label="Loại địa chỉ" name="typeAddress">
          <Radio.Group style={{ gap: 12 }}>
            <Radio.Button value="home">
              <Row style={{ gap: 8 }}>
                <HomeOutlined /> Home
              </Row>
            </Radio.Button>
            <Radio.Button value="office">
              <Row style={{ gap: 8 }}>
                <LaptopOutlined /> Office
              </Row>
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}
