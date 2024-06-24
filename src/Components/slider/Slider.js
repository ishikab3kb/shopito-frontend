import React, { useEffect, useState } from "react";
import styles from "./slider.module.scss";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const [currSlide, setCurrSlide] = useState(0);
  const slideLength = sliderData.length;
  const autoScroll = true;
  let slideInterval;
  const intervalTime = 5000;
  const navigate = useNavigate();

  const prevSlide = () => {
    setCurrSlide(currSlide === 0 ? slideLength - 1 : currSlide - 1);
  };

  const nextSlide = () => {
    setCurrSlide(currSlide === slideLength - 1 ? 0 : currSlide + 1);
  };

  useEffect(() => {
    setCurrSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }

    return () => clearInterval(slideInterval);
  }, [currSlide, intervalTime, autoScroll]);

  return (
    <div className={styles.slider}>
      <AiOutlineArrowLeft
        className={`${styles.arrow} ${styles.prev}`}
        onClick={prevSlide}
      ></AiOutlineArrowLeft>
      <AiOutlineArrowRight
        className={`${styles.arrow} ${styles.next}`}
        onClick={nextSlide}
      ></AiOutlineArrowRight>

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;

        return (
          <div
            key={index}
            className={
              index === currSlide
                ? `${styles.slide} ${styles.current}`
                : `${styles.slide}`
            }
          >
            {index === currSlide && (
              <>
                <img src={image} alt="slide"></img>
                <div className={styles.content}>
                  <span className={styles.span1}></span>
                  <span className={styles.span2}></span>
                  <span className={styles.span3}></span>
                  <span className={styles.span4}></span>

                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr></hr>
                  <button
                    className="--btn --btn-primary"
                    onClick={() => navigate("/shop")}
                  >
                    Shop Now
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
