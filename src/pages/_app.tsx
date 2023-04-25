import EmptyLayout from '@/layouts/EmptyLayout/EmptyLayout';
import { AppPropsWithLayout } from '@/models/common';
import '@/styles/globals.css';
import Theme from '@/styles/theme';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return Theme(
    <Layout>
      <Component {...pageProps} />
    </Layout>,
  );
}
