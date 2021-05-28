import "./Hero.css";

const Hero = () => (
  <section className="hero">
    <img
      className="hero-image"
      src="https://netzero-prod.s3.ca-central-1.amazonaws.com/shutterstock-1677523960.jpeg"
    />
    <div className="hero-box">
      <div className="hero-header">No one is too small to make a difference.</div>
      <div className="hero-subheader">
        Weaving sustainability into everyday life. Showcasing its importance and
        impact in daily decisions and illuminating the way to a net zero carbon
        future. Net Zero gives an easy and simple way for anyone to take
        high-impact, achievable pledges to reduce their carbon pollution.
      </div>
      <button className="hero-button">Get Started</button>
    </div>
  </section>
);

export default Hero;
