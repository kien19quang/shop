import { FormInstance, Modal, ModalProps } from "antd";

export interface ModalPaymentMethodProps extends ModalProps {
  form: FormInstance<any>;
}

export default function ModalPaymentMethod({form, ...props}: ModalPaymentMethodProps) {
  return (
    <Modal {...props}>

    </Modal>
  )
}