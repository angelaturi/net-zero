import "./HowItWorksCard.css";

const HowItWorksCard = ({ image, header, description }) => (
  <div>
    <img src={image} />
    <h2>{header}</h2>
    <p>{description}</p>
  </div>
);

export default HowItWorksCard;
