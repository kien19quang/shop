import MainLayout from '@/layouts/MainLayout/MainLayout';
import { Row } from 'antd';

const PaymentProcess = () => {
  return (
    <Row
      style={{
        flexDirection: 'column',
        width: '100%',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        padding: '30px',
        borderRadius: '12px',
        gap: '40px',
      }}
    >
      Payment Process
    </Row>
  );
};

PaymentProcess.Layout = MainLayout;
export default PaymentProcess;
