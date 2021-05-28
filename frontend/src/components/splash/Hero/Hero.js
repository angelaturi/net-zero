import "./Hero.css";

const Hero = () => (
  <section className="hero">
      <img className="hero-image" src="https://netzero-prod.s3.ca-central-1.amazonaws.com/shutterstock-1677523960.jpeg" />
    <div className="hero-box">
    <div className="hero-header">Weaving sustainability into everyday life. </div>
    <div className="hero-subheader">
      Netzero gives an easy and simple way for anyone to take high-impact, achievable pledges to reduce their carbon pollution.
    </div>
    {/* <button className="hero-button"> <a href="/signup">Get Started</a></button> */}
    </div>
  </section>
);

export default Hero;
