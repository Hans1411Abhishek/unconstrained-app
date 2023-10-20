/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo } from "react";
import Slider from "react-slick";
import "./courses.css";
import { images }from "../../components/images";
import CourseCard from "../../components/courseCard/CourseCard";

const Courses = () => {

  const cardData = [
    {
      header: "AI for Routine Tasks",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took.",
      imageUrl: images['course1.png'],
      rating: '4.7',
      review: '207'
    },
    {
      header: "AI for Assessment",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
      imageUrl: images['course2.png'],
      rating: '4.7',
      review: '720'
    },
    {
      header: "AI for Differentiation",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took.",
      imageUrl: images['course3.png'],
      rating: '4.7',
      review: '480'
    },
    {
      header: "AI for Routine Tasks",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took.",
      imageUrl: images['course1.png'],
      rating: '4.7',
      review: '207'
    },
    {
      header: "AI for Assessment",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
      imageUrl: images['course2.png'],
      rating: '4.7',
      review: '720'
    },
  ];

  const NextArrow = (props) => (
    <div
      {...props}
      className="arrow-container"
    >
      <img className="right-arrow" src={images['right-arrow.svg']} loading="lazy" alt="Next" />
    </div>
  );

  const PrevArrow = (props) => (
    <div
      {...props}
      className="arrow-container"
    >
      <img className="left-arrow" src={images['left-arrow.svg']} loading="lazy" alt="Previous" />
    </div>
  );

  let settings = {
    infinite: true,
    speed: 500,
    slidesToShow: window.innerWidth < 768 ? 1 : 3,
    slidesToScroll: 1,
    className: "slider-style",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="courses-container">
      <div className="courses-banner-container">
        <div className="banner-content">
          <div className="banner-title">
            <span className="orange-title">AI</span> for Learning Design
          </div>
          <div className="banner-desc">
            Sed aliquam dictumst quisque eget non nisl in rhoncus. 
            In a ipsum ut aliquam ac felis consequat. In sit diam porta laoreet. 
            Amet id magna diam diam in egestas.
          </div>
          <img className="signup-btn" src={images['courses-signup-btn.svg']} loading="lazy" alt="signup button" />
        </div>
        <div className="courses-banner">
          <div className="banner-image-container">
            <img className="courses-banner" src={images['course_header-img.png']} loading="lazy" alt="courses banner" />
          </div>
        </div>
      </div>
      <div className="educators-container">
        <div className="educators-header">
          <div className="title">Courses for Educators</div>
          {/* <div className="btn-container">
            <img className="view-all-btn" src={images['viewAll-btn.svg']} loading="lazy" alt="View All" />
          </div> */}
        </div>
        <div className="courses-cards">
        <Slider {...settings}>
          {cardData.map((card, i) => {
            return(
              <CourseCard 
                imageUrl={card.imageUrl}
                key={i}
                header={card.header}
                description={card.description}
                rating={card.rating}
                review={card.review}
              />
            )
          })}
        </Slider>
        </div>
      </div>
    </div>
  );
};

export default memo(Courses);
