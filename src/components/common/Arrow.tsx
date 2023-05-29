import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const customArrow: React.CSSProperties = {
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '50%',
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 5,
};


const CustomPrevArrow = (props: any) => {
  const { onClick, styleArrow } = props;
  return (
    <div style={{ ...customArrow, left: 0, ...styleArrow }} onClick={onClick}>
      <LeftOutlined />
    </div>
  );
};

const CustomNextArrow = (props: any) => {
  const { onClick, styleArrow } = props;
  return (
    <div style={{ ...customArrow, right: 0, ...styleArrow }} onClick={onClick}>
      <RightOutlined />
    </div>
  );
};

export { CustomNextArrow, CustomPrevArrow }