import React from 'react'
import CarouselFromReact from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from './data';

const Carousel = ({products}) => {
  return (
    <div>
        <CarouselFromReact
            showDots={false}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            customTransition="all 500ms ease"
            transitionDuration={1000}
        >
            {products}
        </CarouselFromReact>
    </div>
  )
}

export default Carousel