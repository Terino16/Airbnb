import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const MyCarousel = ({ item }) => {
  return (
    <Carousel
      showArrows={true}
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
    >
      {item.imageUrls.map((imageUrl, imgIndex) => (
        <div key={imgIndex}>
          <img src={imageUrl} alt={`${imgIndex}`} className='w-100 h-64 rounded-xl' />
        </div>
      ))}
    </Carousel>
  );
};

export default MyCarousel;
