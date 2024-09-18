import EmptyLayout from '@/layouts/EmptyLayout/EmptyLayout';
import '@/styles/globals.scss';
import "@/styles/config.antd.scss"
import { AppPropsWithLayout } from '@/models/common';
import { ConfigProvider } from 'antd';
import theme from '../styles/theme';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <SessionProvider session={session} refetchOnWindowFocus={false} refetchInterval={10 * 60}>
      <ConfigProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfigProvider>
    </SessionProvider>
  )
}
