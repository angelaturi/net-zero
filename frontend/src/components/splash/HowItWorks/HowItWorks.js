import HowItWorksCard from "../HowItWorksCard/HowItWorksCard";
import "./HowItWorks.css";

const HowItWorks = () => {
  const howItWorksState = [
    {
      id: "step-1",
      imageUrl: "",
      header: "1. Set up your Habits",
      description:
        "String together a list of habits to create your daily routines and start your journey.",
    },
    {
      id: "step-2",
      imageUrl: "",
      header: "2. Get the Cue",
      description:
        "Stay accountable and never forget your habits with multiple reminders.",
    },
    {
      id: "step-3",
      imageUrl: "",
      header: "3. See your Progress",
      description:
        "View your habit development through the weeks and months with detailed reports.",
    },
  ];

  return (
    <section className="how-it-works-section">
      <div className="how-it-works-title">How it works?</div>
      <div className="how-it-works-subtitle">
        Habit building in its essential steps: choose a habit, actually remember
        to do it, and track your development.
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
