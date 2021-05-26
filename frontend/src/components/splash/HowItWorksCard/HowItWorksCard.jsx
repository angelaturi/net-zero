import "./HowItWorksCard.css";

const HowItWorksCard = ({ image, header, description }) => (
  <div className="how-it-works-card-container">
    <img src={image} />
    <div className="how-it-works-card-header">{header}</div>
    <p>{description}</p>
  </div>
);

export default HowItWorksCard;
