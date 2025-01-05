import { Button } from 'bootstrap';
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Cat = () => {
    const coffee = [
        {
          name: "Espresso Ember",
          description: " A rich and intense shot of espresso, perfect for coffee enthusiast",
          price: "$15.00",
          rating: 4.5,
          image: "sub1.jpg", 
        },
        {
            name: "Golden Brew",
            description: "A smooth and creamy latte with a silky texture.",
            price: "$17.00",
            rating: 5.0,
            image: "sub2.jpg", 
          },
          {
            name: "Café Bliss",
            description: "Delight: A frothy blend of espresso, steamed milk, and foam.",
            price: "$25.00",
            rating: 4.9,
            image: "sub3.jpg", 
          },
          {
            name: "Morning Ember",
            description: " A chocolatey espresso treat, combining rich coffee with velvety cocoa.",
            price: "$20.00",
            rating: 5.0,
            image: "sub4.jpg", 
          },
          {
            name: "Caffeine Rush",
            description: " A sweet espresso topped with steamed milk and caramel drizzle.",
            price: "$12.00",
            rating: 4.3,
            image: "sub5.jpg", 
          },
          {
            name: "Cuppa Comfort",
            description: "A simple yet flavorful espresso diluted with hot water for a smooth taste.",
            price: "$18.00",
            rating: 4.8,
            image: "sub6.jpg", 
          },
          {
            name: "Cold Bean Magic",
            description: "A warm latte spiced with cinnamon for a cozy, aromatic flavor.",
            price: "$30.00",
            rating: 4.9,
            image: "sub7.jpg", 
          },
          {
            name: "Velvet Java",
            description: " A spirited blend of hot coffee, whiskey, and cream.",
            price: "$15.00",
            rating: 4.5,
            image: "sub9.jpg", 
          },
          {
            name: "Misty Mocha",
            description: "A smooth espresso with a hint of nutty hazelnut flavor.",
            price: "$25.00",
            rating: 4.1,
            image: "sub10.jpg", 
          },
          {
            name: "Cold Brew Bliss",
            description: "A smooth, strong coffee brewed cold for a less acidic taste.",
            price: "$30.00",
            rating: 5.0,
            image: "sub11.jpg", 
          },
          {
            name: "Iced Velvet",
            description: "A cold espresso drink topped with frothy milk and ice.",
            price: "$35.00",
            rating: 4.9,
            image: "sub12.jpg", 
          },
          {
            name: "Winter's Brew",
            description: " A chilled coffee blended with ice for a refreshing, creamy treat.",
            price: "$35.00",
            rating: 5.0,
            image: "sub13.jpg", 
          }
      ];
  return (
<>
<Container>
        <div className="special-coffee-container">
          <div className="d-flex flex-column mb-12">
            <h3>Special Coffee</h3>
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <h1 className="fw-bolder">Standout Coffee From Our Menu</h1>
            </div>
          </div>
          <div className="coffee-grid">
            {coffee.map((coffee, index) => (
              <div key={index} className="coffee-card">
                <div className="coffee-card-content">
                  <div className="coffee-image-container">
                    <img
                      src={coffee.image}
                      alt={coffee.name}
                      className="coffee-image"
                    />
                  </div>
                  <h3 className="coffee-name">{coffee.name}</h3>
                  <p className="coffee-description">{coffee.description}</p>
                  <div className="price-rating">
                    <p className="coffee-price">{coffee.price}</p>
                    <div className="coffee-rating">
                      <span>⭐</span>
                      <span>{coffee.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              //   </Col>
            ))}
          </div>
        </div>
      </Container>
</>
)
}

export default Cat