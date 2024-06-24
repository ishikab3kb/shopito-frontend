import React from 'react'
import Slider from '../../Components/slider/Slider'
import HomeInfoBox from './HomeInfoBox'
import { productData } from '../../Components/Carousel/data'
import CarouselItem from '../../Components/Carousel/CarouselItem'
import Carousel from '../../Components/Carousel/Carousel'
import ProductsCategory from './ProductsCategory'
import FooterLinks from '../../Components/footer/FooterLinks'


const PageHeading = ({heading,btnText}) => {
  return(
    <>
      <div className='--flex-between'>
        <h2 className='--fw-thin'>{heading}</h2>
        <button className='--btn'>{btnText}</button>
      </div>
      <div className='--hr'></div>
    </>
  )
}

const Home = () => {
  const productss = productData.map((item) => {
    return(
      <div key={item.id}>
        <CarouselItem url={item.imageurl} name={item.name} price={item.price} description={item.description}></CarouselItem>
      </div>
    )
  })
  return (
    <>
      <Slider></Slider>
      <section>
        <div className='container'>
          <HomeInfoBox></HomeInfoBox>
          <PageHeading heading="Latest Products" btnText="Shop Now!!"></PageHeading>
          <Carousel products={productss}></Carousel>
        </div>
      </section>
      <section className='--bg-grey'>
        <div className='container'>
          <h3>Categories</h3>
          <ProductsCategory></ProductsCategory>
        </div>
      </section>
      <section>
        <div className='container'>
          <PageHeading heading="Mobile Phones" btnText="Shop Now!!"></PageHeading>
          <Carousel products={productss}></Carousel>
        </div>
      </section>
      <FooterLinks></FooterLinks>
    </>
  )
}

export default Home