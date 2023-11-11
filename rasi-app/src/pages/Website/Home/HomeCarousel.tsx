import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import "./home.css";
const HomeCarousel = () => {

    return (
        <>
            <Carousel className={"carousel"} variant="light">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src= {require( "../../../assets/citas.jpeg")}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h5>Citas Prioritarias</h5>
                        <p>Contamos con 25 años de experiencia</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require( "../../../assets/fingersimage.jpeg")}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h5>Radiologias</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require( "../../../assets/labprobes.jpeg")}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h5>+ servicios de salud</h5>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default HomeCarousel;
