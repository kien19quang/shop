import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { Card, Carousel, Col, List, Row, Statistic, Typography } from 'antd';
import Image from 'next/image';
import { CarOutlined, DollarOutlined, LeftOutlined, RightOutlined, UserOutlined } from '@ant-design/icons';
import ProductImage from '@/assets/images/Product.svg';
import CategoryImage from '@/assets/images/Category.jpg';
import CategoryImage2 from '@/assets/images/Category2.jpg';
import Banner1 from '@/assets/images/Banner1.png';
import Banner2 from '@/assets/images/Banner2.png';
import Banner3 from '@/assets/images/Banner3.png';
import MainBanner from '@/assets/images/MainBanner.png';
import { useRouter } from 'next/router';
import { CustomNextArrow, CustomPrevArrow } from '@/components/common/Arrow';

const { Text } = Typography;
const { Meta } = Card;
const listProduct: number[] = [];
const tabList: Array<{ key: string; tab: React.ReactNode }> = [
  {
    key: 'ForYou',
    tab: (
      <Row style={{ fontSize: 16 }}>
        <UserOutlined style={{ fontSize: 18 }} /> Dành cho bạn
      </Row>
    ),
  },
  {
    key: 'CheapEveryDay',
    tab: (
      <Row style={{ fontSize: 16 }}>
        <DollarOutlined style={{ fontSize: 18 }} /> Rẻ mỗi ngày
      </Row>
    ),
  },
  {
    key: 'Freeship',
    tab: (
      <Row style={{ fontSize: 16 }}>
        <CarOutlined style={{ fontSize: 18 }} /> Freeship
      </Row>
    ),
  },
];

for (let i = 0; i < 42; i++) {
  listProduct.push(i);
}


const listCategory: Array<{ label: string; urlImage: any }> = [
  { label: 'Kiến thức - Bách khoa', urlImage: CategoryImage },
  { label: 'Tiểu thuyết', urlImage: CategoryImage2 },
  { label: 'Kiến thức - Bách khoa', urlImage: CategoryImage },
  { label: 'Tiểu thuyết', urlImage: CategoryImage2 },
  { label: 'Kiến thức - Bách khoa', urlImage: CategoryImage },
  { label: 'Tiểu thuyết', urlImage: CategoryImage2 },
  { label: 'Kiến thức - Bách khoa', urlImage: CategoryImage },
  { label: 'Tiểu thuyết', urlImage: CategoryImage2 },
];



const Shop = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>('ForYou');

  const router = useRouter()

  const handleShowProduct = (item: any) => {
    router.push({pathname: "product/Apple_iPhone_13", query: { id: item }})
  }

  const renderContent = (dataSource: any, text: any): React.ReactNode => {
    return (
      <List
        grid={{ gutter: 24, column: 4, xxl: 6 }}
        dataSource={dataSource}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 24,
          showSizeChanger: true
        }}
        renderItem={(item) => {
          return (
            <List.Item>
              <Card
                hoverable
                style={{ width: '100%', paddingTop: '24px', transition: "width 0.3s ease" }}
                cover={
                  <Image
                    src={ProductImage}
                    alt="Product"
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  />
                }
                bodyStyle={{ borderTop: '1px solid rgb(240, 240, 240)' }}
                onClick={() => handleShowProduct(item)}
              >
                <Meta
                  title={<Text>Apple iPhone 13</Text>}
                  description={
                    <Row align="middle" style={{ gap: '6px' }}>
                      <Statistic
                        value={18000000}
                        suffix={'đ'}
                        valueStyle={{ fontSize: 16, color: '#FF424E', fontWeight: 600 }}
                        groupSeparator="."
                      />
                      <Statistic
                        value={text}
                        suffix={'%'}
                        valueStyle={{ fontSize: 14, color: '#FF424E', fontWeight: 500 }}
                      />
                    </Row>
                  }
                />
              </Card>
            </List.Item>
          );
        }}
      />
    );
  };

  const contentTab: Record<string, React.ReactNode> = {
    ForYou: renderContent(listProduct, 20),
    CheapEveryDay: renderContent(listProduct, 40),
    Freeship: renderContent(listProduct, 60),
  };

  const onTabChange = (tab: string) => {
    setActiveTabKey(tab);
  };

  return (
    <Row style={{ flexDirection: 'column', gap: '24px' }}>
      <Row
        style={{
          gap: '16px',
          width: '100%',
          height: '280px',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Row style={{ flex: 1, borderRadius: 8 }}>
          <Carousel
            style={{ height: '280px', width: '100%', cursor: "pointer" }}
            prevArrow={<CustomPrevArrow />}
            nextArrow={<CustomNextArrow />}
            autoplay
            arrows={true}
          >
            <Row style={{ height: '280px' }}>
              <Image src={Banner1} alt="Banner" style={{ width: '100%', height: '280px', borderRadius: 8, userSelect: 'none' }} />
            </Row>

            <Row style={{ height: '280px' }}>
              <Image src={Banner2} alt="Banner" style={{ width: '100%', height: '280px', borderRadius: 8, userSelect: 'none' }} />
            </Row>

            <Row style={{ height: '280px' }}>
              <Image src={Banner3} alt="Banner" style={{ width: '100%', height: '280px', borderRadius: 8, userSelect: 'none' }} />
            </Row>
          </Carousel>
        </Row>

        <Row style={{ width: '25%', height: '280px', cursor: "pointer" }}>
          <Image
            src={MainBanner}
            alt="Main Banner"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
          />
        </Row>
      </Row>

      <Card
        title={<Text style={{ fontSize: '18px' }}>Thương hiệu chính hãng</Text>}
        style={{
          width: '100%',
          background:
            'linear-gradient(rgba(255, 255, 255, 0) 22.49%, rgb(255, 255, 255) 73.49%), linear-gradient(264.03deg, rgb(220, 229, 251) -10.27%, rgb(234, 236, 255) 35.65%, rgb(213, 236, 253) 110.66%)',
        }}
      >
        <Carousel
          arrows={true}
          prevArrow={<CustomPrevArrow />}
          nextArrow={<CustomNextArrow />}
          slidesToShow={5}
          slidesToScroll={2}
          dots={false}
          responsive={[
            { breakpoint: 1500, settings: { slidesToShow: 5 } },
            { breakpoint: 2800, settings: { slidesToShow: 8 } },
            { breakpoint: 2000, settings: { slidesToShow: 6 } },
          ]}
          className="list-category"
        >
          {listCategory.map((item, index) => {
            return (
              <div key={index}>
                <Card
                  cover={
                    <Image
                      src={item.urlImage}
                      alt="Danh mục"
                      style={{
                        width: '100%',
                        height: '170px',
                        objectFit: 'cover',
                        border: '1px solid rgb(240, 240, 240)',
                      }}
                    />
                  }
                  style={{ width: '100%', cursor: 'pointer', transition: "width 0.3s ease" }}
                >
                  <Meta title={<Text>{item.label}</Text>} />
                </Card>
              </div>
            );
          })}
        </Carousel>
      </Card>

      <Card title={<Text style={{ fontSize: '18px' }}>Danh mục nổi bật</Text>} style={{ width: '100%' }}>
        <Carousel
          arrows={true}
          prevArrow={<CustomPrevArrow />}
          nextArrow={<CustomNextArrow />}
          slidesToShow={5}
          slidesToScroll={2}
          dots={false}
          responsive={[
            { breakpoint: 1500, settings: { slidesToShow: 5 } },
            { breakpoint: 2800, settings: { slidesToShow: 8 } },
            { breakpoint: 2000, settings: { slidesToShow: 6 } },
          ]}
          className="list-category"
        >
          {listCategory.map((item, index) => {
            return (
              <div key={index}>
                <Card
                  cover={
                    <Image
                      src={item.urlImage}
                      alt="Danh mục"
                      style={{
                        width: '100%',
                        height: '170px',
                        objectFit: 'cover',
                        border: '1px solid rgb(240, 240, 240)',
                      }}
                    />
                  }
                  style={{ width: '100%', cursor: 'pointer', transition: "width 0.3s ease" }}
                >
                  <Meta title={<Text>{item.label}</Text>} />
                </Card>
              </div>
            );
          })}
        </Carousel>
      </Card>

      <Card
        title={<Text style={{ fontSize: '18px' }}>Gợi ý cho bạn</Text>}
        style={{ width: '100%' }}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
      >
        {contentTab[activeTabKey]}
      </Card>
    </Row>
  );
};

Shop.Layout = MainLayout;

export default Shop;
