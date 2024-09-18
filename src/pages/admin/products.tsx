import ModalAddProduct from '@/components/Modals/ModalAddProduct';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout';
import { CreateProductDto, IProduct } from '@/models/product/ProductModel';
import ProductService from '@/services/ProductService';
import { PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Flex, Form, Modal, notification, Statistic, Table, TableColumnsType, Typography } from 'antd';
import { isNil } from 'lodash';
import { useEffect, useState } from 'react';
import { PiPencil, PiTrash } from 'react-icons/pi';

const { Text, Title } = Typography;
const { confirm } = Modal

export interface ProductsPageProps {}

function ProductsPage(props: ProductsPageProps) {
  const [openModalAddProduct, setOpenModalAddProduct] = useState<boolean>(false);
  const [indexEdit, setIndexEdit] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [listProduct, setListProduct] = useState<IProduct[]>([]);
  const [loadingConfirm, setLoadingConfirm] = useState<boolean>(false);

  const [form] = Form.useForm();

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    setLoading(true);
    const response = await ProductService.getListProducts();
    setLoading(false);
    if (response) {
      setListProduct(response);
    }
  };

  const handleFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        const dataForm: CreateProductDto = {
          name: values.name,
          description: values.description,
          price: values.price,
          images: values?.files?.map((item: any) => item.src),
        };
        if (!isNil(indexEdit)) {
          setLoadingConfirm(true);
          const response = await ProductService.updateProduct(listProduct[indexEdit]._id, dataForm);
          setLoadingConfirm(false);
          if (response) {
            notification.success({
              message: 'Thành công',
              description: 'Chỉnh sửa sản phẩm thành công',
              placement: 'bottomRight',
            });
            setIndexEdit(undefined);
            setOpenModalAddProduct(false);
            initData();
          }
        } else {
          setLoadingConfirm(true);
          const response = await ProductService.createProduct(dataForm);
          setLoadingConfirm(false);
          if (response) {
            notification.success({
              message: 'Thành công',
              description: 'Tạo sản phẩm thành công',
              placement: 'bottomRight',
            });
            setIndexEdit(undefined);
            setOpenModalAddProduct(false);
            initData();
          }
        }
      })
      .catch((e) => console.log(e));
  };

  const handleDeleteAdmin = (record: IProduct) => {
    confirm({
      title: 'Bạn có chắc muốn xoá admin này?',
      onOk: async () => {
        const response = await ProductService.deleteProduct(record._id)
        if (response) {
          notification.success({
            message: 'Thành công',
            description: 'Xoá admin thành công',
            placement: 'bottomRight'
          })
          setListProduct(prev => prev.filter(item => item._id !== record._id))
        }
      },
      okText: 'Xác nhận',
      cancelText: 'Huỷ'
    })
  };

  const columns: TableColumnsType<IProduct> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên sản phẩm',
    },
    {
      key: 'description',
      dataIndex: 'description',
      ellipsis: true,
      title: 'Mô tả',
      render: (value) => <Text ellipsis={{ tooltip: true }}>{value}</Text>,
    },
    {
      key: 'price',
      dataIndex: 'price',
      title: 'Giá sản phẩm',
      render: (value) => {
        return <Statistic groupSeparator="." suffix={'đ'} value={value} valueStyle={{ fontSize: 14 }} />;
      },
    },
    {
      key: 'images',
      title: 'Ảnh sản phẩm',
      render: (_, record) => {
        if (!record?.images?.length) return null
        return (
          <Avatar.Group 
            shape='square'
            max={{ count: 4 }}
            style={{ gap: 10 }}
            size={40}
          >
            {record.images.map(item => {
              return (
                <Avatar key={item} src={item} size={40} />
              )
            })}
          </Avatar.Group>
        )
      }
    },
    {
      key: 'action',
      align: 'center',
      title: 'Action',
      width: 120,
      render: (_, record, index) => {
        return (
          <Flex gap={12} justify="center">
            <Button
              icon={<PiPencil size={20} />}
              onClick={() => {
                form.setFieldsValue({
                  ...record,
                  files:
                    record?.images?.map((item) => ({
                      uid: record._id,
                      status: 'done',
                      url: item,
                      src: item,
                    })) || [],
                });
                setOpenModalAddProduct(true);
                setIndexEdit(index);
              }}
            />
            <Button danger icon={<PiTrash size={20} />} onClick={() => handleDeleteAdmin(record)} />
          </Flex>
        );
      },
    },
  ];

  return (
    <>
      <Flex vertical style={{ width: '100%', height: '100%', padding: 24 }} justify="center" align="center">
        <Flex
          justify="center"
          vertical
          style={{
            padding: 20,
            borderRadius: 16,
            backgroundColor: 'white',
            boxShadow: '0px 6px 9px 0px rgba(156, 156, 156, 0.10), 0px 3px 2px 0px rgba(156, 156, 156, 0.08)',
            gap: 24,
            width: '100%',
            margin: '0 40px',
          }}
        >
          <Flex justify="space-between" align="center">
            <Title level={3} style={{ margin: 0, fontSize: 20 }}>
              Danh sách sản phẩm
            </Title>

            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => {
                setOpenModalAddProduct(true);
                setIndexEdit(undefined);
              }}
            >
              Thêm sản phẩm
            </Button>
          </Flex>
          <Table
            loading={loading}
            pagination={{ showSizeChanger: true }}
            columns={columns}
            dataSource={listProduct}
            bordered={false}
            style={{ width: '100%' }}
          />
        </Flex>
      </Flex>

      <ModalAddProduct
        open={openModalAddProduct}
        type={!isNil(indexEdit) ? 'edit' : 'create'}
        form={form}
        onCancel={() => {
          setOpenModalAddProduct(false);
          setIndexEdit(undefined);
          form.resetFields();
        }}
        onOk={handleFinish}
        confirmLoading={loadingConfirm}
      />
    </>
  );
}

ProductsPage.Layout = AdminLayout;

export default ProductsPage;
