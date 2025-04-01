import React from 'react'

function Categories() {
    const categories = [
        { name: "Living Room", image: "/images/pic2.webp" },
        { name: "Home Office", image: "/images/pic1.jpg" },
        { name: "Bedroom", image: "/images/pic2.jpeg" },
        { name: "Dining Room", image: "/images/pic3.png" },
        { name: "Room Sets", image: "/images/pic4.png" }
      ];
  return (
    <div>
              <section className="categories">
        <h3>Categories</h3>
        <div className="category-list">
          {categories.map((cat, index) => (
            <div key={index} className="category">
              <img src={cat.image} alt={cat.name} />
              <p>{cat.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Categories