import { ConfigProvider } from 'antd';
import * as React from 'react';

export default function Theme(children: JSX.Element) {
  return <ConfigProvider theme={{ token: { colorPrimary: '#3aa39f', borderRadius: 16 } }}>{children}</ConfigProvider>;
}
