import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Slider = () => {
  
  const slides = [
    {
      title: "Discover Traditional Tolls",
      subtitle: "Ingoma Gakondo",
      year: "2024/2025",
      description:
        "Magna sed suscipit sed adipiscing varius molestie dui eget nulla commodo wisi, rutrum sed libero etiam quis ac, sagittis massa eget tristique.",
      buttonLabel: "Get It Now",
      image: "/images/n19.jpg", // Replace with actual image path
    },
    {
      title: "Uduseke",
      subtitle: "udukeseke twa kinyarwanda",
      year: "2024/2025",
      description:
        "Magna sed suscipit sed adipiscing varius molestie dui eget nulla commodo wisi, rutrum sed libero etiam quis ac, sagittis massa eget tristique.",
      buttonLabel: "Get It Now",
      image: "/images/n22.jpeg", // Replace with actual image path
    },
    {
      title: "Intebe za kinyarwanda",
      subtitle: "Coffee Machine",
      year: "2024/2025",
      description:
        "Magna sed suscipit sed adipiscing varius molestie dui eget nulla commodo wisi, rutrum sed libero etiam quis ac, sagittis massa eget tristique.",
      buttonLabel: "Get It Now",
      image: "/images/kin4.jpg", // Replace with actual image path
    },
  ];

  // Add the first slide to the end for a seamless transition
  const totalSlides = slides.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);

  // Function to go to the next slide
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  // Reset slide position if we're at the cloned slide
  useEffect(() => {
    // When sliding to the clone, quickly reset to the original slide
    if (currentSlide === totalSlides) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
        sliderRef.current.style.transition = "none";
        sliderRef.current.style.transform = `translateX(0%)`;
      }, 500); // Timeout must match the CSS transition duration
    } else {
      sliderRef.current.style.transition = "transform 0.5s ease-in-out";
      sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [currentSlide, totalSlides]);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="thumbnail-wrapper">
      <div className="slider" ref={sliderRef}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img src={slide.image} alt={slide.subtitle} />
            <div className="thumb-desc">
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>

              <Link className="btn-shop-now">{slide.buttonLabel}</Link>
            </div>
          </div>
        ))}
        {/* Cloned first slide for infinite loop effect */}
        <div className="slide">
          <img src={slides[0].image} alt={slides[0].subtitle} />
          <div className="thumb-desc">
            <h2>{slides[0].title}</h2>
            <h3>{slides[0].subtitle}</h3>
            <button>{slides[0].buttonLabel}</button>
          </div>
        </div>
      </div>
      <button className="prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="next" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

export default Slider;
