import React from "react";


const Thumb2Puppy = () => {
  return (
    <div className="cards-container">
      {/* First Card: Console & Game Pad */}

      <div className="card">
        <img
          src="/images/pic2.webp"
          alt="Amayugi "
          className="puppy-image"
        />
        <div className="card-content">
          <h2 className="card-title">
            Amayugi
          </h2>
          <p className="card-subtitle">
            New Arrivals In <span className="highlight">Amayugi</span> At Best Prices
          </p>
          <p className="card-sale">
            Sale <span className="discount">40% Off</span> This Week
          </p>
        </div>
      </div>

      {/* Second Card: Hair Dryer */}
      <div className="card">
        <img
          src="/images/n8.jpeg"
          alt="Inkangara"
          className="puppy-image"
        />
        <div className="card-content">
          <h2 className="card-title">
            Gift Special <span className="year">2025</span>
          </h2>
          <p className="card-subtitle">
            Meet <span className="highlight">Inkangara</span> Gakondo
          </p>
          <p className="card-sale">
            Sale Up To <span className="discount">30% Off</span> On A Black Friday
          </p>
        </div>
      </div>
    </div>
  );
};

export default Thumb2Puppy;
