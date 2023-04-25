import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import MainLayout from '@/layouts/MainLayout/MainLayout';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  return <div>Alo</div>;
};

Home.Layout = MainLayout;

export default Home;
