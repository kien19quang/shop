import { Row, RowProps } from 'antd';
import { useInView, inView } from 'framer-motion';
import { useRef } from 'react';

export enum ESectionAnimation {
  'slideInFromBottom' = 'slideInFromBottom',
  'slideInFromLeft' = 'slideInFromLeft',
  'slideInFromRight' = 'slideInFromRight',
  'slideInFromTop' = 'slideInFromTop',
}

export interface RowAnimationProps {
  children: React.ReactNode;
  animation?: keyof typeof ESectionAnimation;
  styleAnimation?: React.CSSProperties;
}

export default function RowAnimation(props: RowAnimationProps) {
  const { children, animation = 'slideInFromBottom', styleAnimation } = props
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true});
  

  return (
    <Row
      ref={ref}
      style={{
        flexDirection: 'column',
        animation: isInView ? `${animation} 1s ease-out` : 'none',
        willChange: 'transform, opacity',
        ...styleAnimation,
      }}
    >
      {children}
    </Row>
  );
}
