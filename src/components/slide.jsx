import React, { Component } from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import Carousel from 'react-bootstrap/Carousel'
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel, CarouselItem } from "react-bootstrap";

class Slide extends Component {
  state = {
    image: [
      "https://media.21cineplex.com/webcontent/gallery/pictures/157475295249247_925x527.jpg",
      "https://media.21cineplex.com/webcontent/gallery/pictures/157622649780563_925x527.jpg",
      "https://media.21cineplex.com/webcontent/gallery/pictures/157615238559955_925x527.jpg",
      "https://media.21cineplex.com/webcontent/gallery/pictures/157615200674102_925x527.jpg",
      "https://media.21cineplex.com/webcontent/gallery/pictures/157597409333097_925x527.jpg",
      "https://media.21cineplex.com/webcontent/gallery/pictures/157597376180318_925x527.jpg",
      "https://media.21cineplex.com/webcontent/gallery/pictures/157613687437598_925x527.jpg",
      "https://media.21cineplex.com/webcontent/gallery/pictures/157562158285278_925x527.jpg"

    ]
  };

  renderSlider = () => {
    return this.state.image.map((val, index) => {
      return (
        <Carousel.Item>
          <img className="d-block w-100" src={val} alt="slide"/>
        </Carousel.Item>
      );
    });
  };

  render() {
    return (
    <Carousel className="slider">
      {this.renderSlider()}
    </Carousel>
    )
  }
}

export default Slide;
