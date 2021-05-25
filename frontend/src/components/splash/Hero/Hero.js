import "./Hero.css";

const Hero = () => (
  <section className="hero">
      <img className="hero-image" src="https://netzero-prod.s3.ca-central-1.amazonaws.com/shutterstock-1677523960.jpeg" />
    <div className="hero-box">
    <div className="hero-header">Build Golden Habits, Unlock your Potential</div>
    <div className="hero-subheader">
      Focus on what truly matters with NETZERO. Build the best version of
      yourself by mastering your habits.
    </div>
    <button className="hero-button">Get Started</button>
    </div>
  </section>
);

export default Hero;
