import EmptyLayout from '@/layouts/EmptyLayout/EmptyLayout';
import { AppPropsWithLayout } from '@/models/common';
import '@/styles/globals.css';
import "@/styles/config.antd.scss"
import Theme from '../styles/theme'
import '../../public/antd.min.css';
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return Theme(
    <Layout>
      <Component {...pageProps} />
    </Layout>,
  );
}
