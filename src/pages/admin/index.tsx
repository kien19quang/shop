import ModalAddAdmin from "@/components/Modals/ModalAddAdmin";
import AdminLayout from "@/layouts/AdminLayout/AdminLayout";
import { IUser, TypeRole } from "@/models/user/UserModel";
import UserService from "@/services/UserService";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Modal, notification, Table, TableColumnsType, Typography } from "antd";
import { isNil } from "lodash";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PiPencil, PiTrash } from "react-icons/pi";

const { Text, Title } = Typography
const { confirm } = Modal

export interface AdminPageProps {
}

function AdminPage (props: AdminPageProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [listUser, setListUser] = useState<IUser[]>([])
  const [openModalAddAdmin, setOpenModalAddAdmin] = useState<boolean>(false)
  const [indexEdit, setIndexEdit] = useState<number>()
  const [loadingConfirm, setLoadingConfirm] = useState<boolean>(false)

  const [form] = Form.useForm()

  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {
    form.resetFields()
    setLoading(true)
    const response = await UserService.getListAdmin()
    setLoading(false)
    setListUser(response || [])
  }

  const handleFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        delete values._id
        if (!isNil(indexEdit)) {
          setLoadingConfirm(true)
          const response = await UserService.updateUser(listUser[indexEdit]._id, {
            ...values,
            role: TypeRole["ADMIN"]
          })
          setLoadingConfirm(false)
          if (response) {
            notification.success({
              message: 'Thành công',
              description: 'Chỉnh sửa admin thành công',
              placement: 'bottomRight'
            })
            setIndexEdit(undefined)
            setOpenModalAddAdmin(false)
            initData()
          }
        }
        else {
          setLoadingConfirm(true)
          const response = await UserService.createUser({
            ...values,
            role: TypeRole["ADMIN"]
          })
          setLoadingConfirm(false)
          if (response) {
            notification.success({
              message: 'Thành công',
              description: 'Tạo admin thành công',
              placement: 'bottomRight'
            })
            setIndexEdit(undefined)
            setOpenModalAddAdmin(false)
            initData()
          }
        }
      })
      .catch(e => console.log(e))
  }

  const handleDeleteAdmin = (record: IUser) => {
    confirm({
      title: 'Bạn có chắc muốn xoá admin này?',
      onOk: async () => {
        const response = await UserService.deleteUser(record._id)
        if (response) {
          notification.success({
            message: 'Thành công',
            description: 'Xoá admin thành công',
            placement: 'bottomRight'
          })
          setListUser(prev => prev.filter(item => item._id !== record._id))
        }
      },
      okText: 'Xác nhận',
      cancelText: 'Huỷ'
    })
  }

  const columns: TableColumnsType<IUser> = [
    {
      key: 'fullname',
      dataIndex: 'fullname',
      title: 'Họ và tên'
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Email'
    },
    {
      key: 'action',
      align: 'center',
      title: 'Action',
      width: 120,
      render: (_, record, index) => {
        return (
          <Flex gap={12} justify='center'>
            <Button 
              icon={<PiPencil size={20} />} 
              onClick={() => {
                form.setFieldsValue(record)
                setOpenModalAddAdmin(true)
                setIndexEdit(index)
              }}
            />
            <Button 
              danger 
              icon={<PiTrash size={20} />} 
              onClick={() => handleDeleteAdmin(record)}
            />
          </Flex>
        )
      }
    }
  ]

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
            margin: '0 40px'
          }}
        >
          <Flex justify="space-between" align="center">
            <Title level={3} style={{ margin: 0, fontSize: 20 }}>
              Danh sách admin
            </Title>

            <Button 
              icon={<PlusOutlined />} 
              type="primary" 
              onClick={() => {
                setOpenModalAddAdmin(true)
                setIndexEdit(undefined)
              }}
            >
              Thêm admin
            </Button>
          </Flex>
          <Table
            loading={loading} 
            pagination={{ showSizeChanger: true }} 
            columns={columns} 
            dataSource={listUser} 
            bordered={false} 
            style={{ width: '100%' }} 
          />
        </Flex>
      </Flex>

      <ModalAddAdmin 
        open={openModalAddAdmin}
        type={!isNil(indexEdit) ? 'edit' : 'create'}
        form={form}
        onCancel={() => {
          setOpenModalAddAdmin(false)
          setIndexEdit(undefined)
          form.resetFields()
        }}
        onOk={handleFinish}
        confirmLoading={loadingConfirm}
      />
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      }
    }
  }

  if (session.user.role === 'USER') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

AdminPage.Layout = AdminLayout

export default AdminPage