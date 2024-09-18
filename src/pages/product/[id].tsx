import { NoImageIcon } from '@/components/Icons';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { IProduct } from '@/models/product/ProductModel';
import ProductService from '@/services/ProductService';
import {
  ArrowLeftOutlined,
  LeftOutlined,
  MinusOutlined,
  PlusOutlined,
  RightOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import {
  Image as AntImage,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Descriptions,
  Flex,
  InputNumber,
  Rate,
  Row,
  Statistic,
  Typography,
  theme
} from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const { Text, Title, Paragraph } = Typography;
const { Meta } = Card;

const ProductDetail = () => {
  const [quanlity, setQuanlity] = useState<number>(1);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [detailProduct, setDetailProduct] = useState<IProduct>()
  const carouselProduct = useRef<CarouselRef>(null);
  const router = useRouter()
  const { token } = theme.useToken();

  useEffect(() => {
    if (router.query.id) {
      initData()
    }
  }, [router.query.id])

  const initData = async () => {
    const response = await ProductService.getDetailProduct(router.query.id as string)
    setDetailProduct(response)
  }

  const handleChangeQuantity = (value: number | null): void => {
    if (typeof value === 'number' && value > 0) {
      setQuanlity(value);
    }
  };

  const handleChangePreview = (type: 'next' | 'prev') => {
    if (type === 'next') {
      carouselProduct.current?.next();
    } else {
      carouselProduct.current?.prev();
    }
  };

  const formatValue = (value: number) => {
    if (value < 10) {
      return '0' + value;
    }
    return value;
  };

  const handleChangeSlide = (current: number, next: number) => {
    setCurrentSlide(next);
  };

  const handleRouterBack = () => {
    router.back()
  }

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
      <Row justify="space-between">
        <Row style={{ flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, cursor: 'pointer' }} onClick={handleRouterBack} />

          <Breadcrumb items={[{ title: 'Shop' }, { title: detailProduct?.name }]} style={{ fontSize: 16 }} />
        </Row>

        {detailProduct?.images && detailProduct?.images?.length > 0 && (
          <Row justify="space-between" align="middle" style={{ flexDirection: 'column', gap: 20 }}>
            <Text style={{ fontSize: 16 }}>
              {`${formatValue(currentSlide + 1)} / ${formatValue(detailProduct.images.length)}` }
            </Text>

            <Row style={{ width: '130px', justifyContent: 'space-between' }}>
              <LeftOutlined style={{ fontSize: 20, cursor: 'pointer' }} onClick={() => handleChangePreview('prev')} />
              <RightOutlined style={{ fontSize: 20, cursor: 'pointer' }} onClick={() => handleChangePreview('next')} />
            </Row>
          </Row>
        )}
      </Row>

      <Flex justify="space-between" gap={16} style={{ width: '100%' }}>
        <Row style={{ flexDirection: 'column', gap: '20px', width: '40%' }}>
          <Title level={3}>Apple iPhone 13</Title>
          <Row justify="space-between" align="middle" style={{ width: '100%' }}>
            <Statistic
              value={detailProduct?.price}
              suffix={'đ'}
              valueStyle={{ fontSize: 20, color: '#FF424E', fontWeight: 600 }}
              groupSeparator="."
            />

            <Row align="middle" style={{ gap: 12 }}>
              <Rate defaultValue={4.6} style={{ fontSize: 18 }} allowHalf disabled />

              <Row style={{ gap: 6, marginTop: 4 }}>
                <Text style={{ fontSize: 15 }}>4.6 / 5</Text>

                <Text style={{ fontSize: 15, color: '#A2A3B1' }}>(556)</Text>
              </Row>
            </Row>
          </Row>
          <Paragraph>
            {detailProduct?.description}
          </Paragraph>

          <Row align="middle" style={{ gap: 20 }}>
            <InputNumber
              addonBefore={
                <Button
                  onClick={() => handleChangeQuantity(quanlity - 1)}
                  type="text"
                  className="btn__quantity"
                  disabled={quanlity === 1}
                >
                  <MinusOutlined />
                </Button>
              }
              addonAfter={
                <Button
                  type="text"
                  className="btn__quantity"
                  onClick={() => handleChangeQuantity(quanlity + 1)}
                >
                  <PlusOutlined />
                </Button>
              }
              style={{ width: 130 }}
              className='input__add-to-cart'
              value={quanlity}
              onChange={handleChangeQuantity}
            />

            <Button icon={<ShoppingCartOutlined />} type="primary" style={{ width: '130px' }}>
              Add to cart
            </Button>
          </Row>

          <Text>Free 3-5 day shipping • Tool-free assembly • 30-day trial</Text>

          {/* <Row justify="space-between" align="middle" style={{ width: '100%', marginTop: 16 }}>
            <Row align="middle" style={{ gap: 14 }}>
              <HeartOutlined style={{ color: token.colorPrimary, fontSize: 22, cursor: 'pointer' }} />

              <Text style={{ color: token.colorPrimary }}>Add to Wishlist</Text>
            </Row>

            <Row align="middle" style={{ fontSize: 22, gap: 16 }}>
              <FacebookOutlined style={{ cursor: 'pointer' }} />
              <TwitterOutlined style={{ cursor: 'pointer' }} />
              <InstagramOutlined style={{ cursor: 'pointer' }} />
              <LinkOutlined style={{ cursor: 'pointer' }} />
            </Row>
          </Row> */}
        </Row>

        {(detailProduct?.images && detailProduct?.images.length > 0) ? (
          <Row style={{ flexDirection: 'column', flex: 1 }}>
            <Carousel dots={false} ref={carouselProduct} beforeChange={handleChangeSlide}>
              {detailProduct?.images?.map((item) => {
                return (
                  <Flex key={item}>
                    <AntImage src={item} alt="Product" style={{ width: '100%' }} />
                  </Flex>
                );
              })}
            </Carousel>

            <Row justify="center" style={{ gap: '12px' }}>
              {detailProduct?.images?.map((item, index) => {
                return (
                  <Row
                    key={index}
                    style={{
                      width: 90,
                      height: 90,
                      border: `1px solid ${index === currentSlide ? token.colorPrimary : '#D1D1D8'}`,
                      borderRadius: 8,
                      overflow: 'hidden'
                    }}
                    onClick={() => carouselProduct.current?.goTo(index)}
                  >
                    <AntImage src={item} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Product" />
                  </Row>
                );
              })}
            </Row>
          </Row>
        ) : (
          <Flex justify='center' style={{ flex: 1 }}>
            <NoImageIcon height={60} width={60} />
          </Flex>
        )}

      </Flex>

      {/* <Row style={{ width: '100%' }}>
        <Card style={{ width: '100%' }} title={<Text style={{ fontSize: '18px' }}>Sản phẩm tương tự</Text>}>
          <Carousel
            arrows={true}
            prevArrow={<CustomPrevArrow />}
            nextArrow={<CustomNextArrow styleArrow={{ right: '-10px' }} />}
            slidesToShow={5}
            slidesToScroll={2}
            dots={false}
            className="list-category"
          >
            {listProduct.map((item) => {
              return (
                <div key={JSON.stringify(item)}>
                  <Card
                    hoverable
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
                    className={style['card__product']}
                    style={{
                      width: '100%',
                      cursor: 'pointer',
                      transition: 'width 0.3s ease',
                      border: '1px solid rgb(240, 240, 240)',
                    }}
                  >
                    <Meta title={<Text>{item.label}</Text>} />
                  </Card>
                </div>
              );
            })}
          </Carousel>
        </Card>
      </Row> */}

      <Row style={{ width: '100%' }}>
        <Card style={{ width: '100%' }} title={<Text style={{ fontSize: '18px' }}>Thông tin chi tiết</Text>}>
          <Descriptions>
            <Descriptions.Item label="Công ty phát hành">Nhã Nam</Descriptions.Item>
            <Descriptions.Item label="Ngày xuất bản"> 2021-12-01 00:00:00</Descriptions.Item>
            <Descriptions.Item label="Kích thước">14 x 20.5 cm</Descriptions.Item>
            <Descriptions.Item label="Loại bìa">Bìa mềm</Descriptions.Item>
            <Descriptions.Item label="Số trang">304</Descriptions.Item>
            <Descriptions.Item label="Nhà xuất bản">Nhà Xuất Bản Hội Nhà Văn</Descriptions.Item>
          </Descriptions>
        </Card>
      </Row>
    </Row>
  );
};

ProductDetail.Layout = MainLayout;
export default ProductDetail;
