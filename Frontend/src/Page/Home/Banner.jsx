
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Banner.css'

import { Autoplay, Pagination, Navigation } from 'swiper';
import { useRef } from 'react';
import img1 from '/img1.jpg'
import img2 from '/img2.jpg'
import img3 from '/img3.jpg'
import img4 from '/img4.jpg'

const Banner = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <>

            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >
                <SwiperSlide>

                    <img className='rounded-sm' src={img1} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='rounded-sm' src={img2} alt="" />

                </SwiperSlide>
                <SwiperSlide>
                    <img className='rounded-sm' src={img3} alt="" />

                </SwiperSlide>
                <SwiperSlide>
                    <img className='rounded-sm' src={img4} alt="" />

                </SwiperSlide>

                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>

        </>
    );
};

export default Banner;