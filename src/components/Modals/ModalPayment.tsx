import { Modal, ModalProps, QRCode, Row } from "antd";

export interface ModalPaymentProps extends ModalProps {

}

export default function ModalPayment(props: ModalPaymentProps) {
  return (
    <Modal {...props}>
      <Row justify="center" align="middle" style={{width: "100%", height: "300px"}}>
        <QRCode value="https://www.facebook.com/kien19quang" size={200}/>
      </Row>
    </Modal>
  )
}