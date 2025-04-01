import React from "react";


const Thumb2Puppy = () => {
  return (
    <div className="cards-container">
      {/* First Card: Console & Game Pad */}
      <div className="card">
        <img
          src="/images/dog12.avif"
          alt="Console & Game Pad"
          className="puppy-image"
        />
        <div className="card-content">
          <h2 className="card-title">
            New German Shephered
          </h2>
          <p className="card-subtitle">
            New Arrivals In <span className="highlight">Binchonpoo</span> At Best Prices
          </p>
          <p className="card-sale">
            Sale <span className="discount">40% Off</span> This Week
          </p>
        </div>
      </div>

      {/* Second Card: Hair Dryer */}
      <div className="card">
        <img
          src="/images/dog9.webp"
          alt="Professional Hair Dryer"
          className="puppy-image"
        />
        <div className="card-content">
          <h2 className="card-title">
            Gift Special <span className="year">2024</span>
          </h2>
          <p className="card-subtitle">
            Meet <span className="highlight">German shepeherd</span> Lunny
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
