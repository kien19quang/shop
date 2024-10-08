import ProductService from "@/services/ProductService";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, FormInstance, Input, InputNumber, Modal, ModalProps, Upload, UploadProps } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import axios from "axios";
import { useState } from "react";

export interface ModalAddProductProps extends ModalProps {
  type: 'edit' | 'create',
  form: FormInstance<any>
}

export default function ModalAddProduct ({ form, type, ...props }: ModalAddProductProps) {
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done' || info.file.status === 'error') {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Modal
    title={type === 'create' ? 'Tạo sản phẩm' : 'Chỉnh sửa sản phẩm'}
    okText='Xác nhận'
    cancelText='Huỷ'
      {...props}
    >
      <Form style={{ marginTop: 18 }} form={form} layout='vertical'>
        <Form.Item
          label="Tên sản phẩm"
          name='name'
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
        >
          <Input placeholder='Iphone 16' />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name='description'
          rules={[{ required: false, message: 'Vui lòng nhập mô tả' }]}
        >
          <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} placeholder='Mô tả sản phẩm' />
        </Form.Item>

        <Form.Item
          label='Giá'
          name='price'
          rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}
        >
          <InputNumber 
            style={{ width: '100%' }} 
            formatter={(value) => `${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            parser={(value) => Number(value?.replace(/\./g, '').replace(/\s?đ/g, ''))}
          />
        </Form.Item>

        <Form.Item name="files" label="Ảnh sản phẩm" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: false, message: 'Vui lòng thêm ảnh cho món ăn!' }]}>
          <Upload
            name="files" 
            listType="picture-card" 
            onChange={handleChange}
            accept='image/jpeg, image/png, image/jpg'
            action={undefined}
            customRequest={options => {
              const { onSuccess, onError, file, onProgress } = options;

              const fmData = new FormData();
              const config = {
                headers: { "content-type": "multipart/form-data" },
              };
              fmData.append("file", file);
              axios
                .post("https://zchat-staging.f99.link/api/advertise/attachments", fmData, config)
                .then(res => {
                  if (typeof onSuccess === 'function') {
                    (file as any).src = res?.data?.data?.src
                    onSuccess(file);
                  }
                })
                .catch(err=>{
                  const error = new Error('Some error');
                  if (typeof onError === 'function') {
                    onError({event:error} as any);
                  }
                });
            }}
            method='post'
            headers={{
              'Content-Type': 'multipart/form-data',
            }}
            onPreview={(file: any) => window.open(file?.data?.src, '_blank')}
          >
            {uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
