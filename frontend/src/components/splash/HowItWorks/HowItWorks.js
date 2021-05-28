import HowItWorksCard from "../HowItWorksCard/HowItWorksCard";
import "./HowItWorks.css";

const HowItWorks = () => {
  const howItWorksState = [
    {
      id: "step-1",
      imageUrl: "",
      header: "1. Create a Pledge",
      description:
        "Small steps can make a big difference.",
    },
    {
      id: "step-2",
      imageUrl: "",
      header: "2. Stick to it",
      description:
        "Keep it up and record your progress.",
    },
    {
      id: "step-3",
      imageUrl: "",
      header: "3. Explore!",
      description:
        "There’s something for everyone. So, find a pledge that’s right for you.",
    },
  ];

  return (
    <section className="how-it-works-section">
      <div className="how-it-works-title">How it works?</div>
      <div className="how-it-works-subtitle">
      Getting to net zero greenhouse gases by 2050 is a huge challenge. It’s easy to feel powerless, to wonder where you fit in and how to start. Everyone has to start somewhere. 
      </div>
      <div className="step-container">
        {howItWorksState.map(({ imageUrl, header, description, id }) => (
          <HowItWorksCard
            key={id}
            header={header}
            imageUrl={imageUrl}
            description={description}
          />
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
