import { ConfigProvider } from 'antd';
import * as React from 'react';

export default function Theme(children: JSX.Element) {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#3aa39f', colorFillSecondary: '#ceefee',  } }}>{children}</ConfigProvider>
  );
}
