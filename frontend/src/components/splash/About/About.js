import "./About.css";

const About = () => {

  return (
    <section className="about-section">
      <div className="about-title">About</div>
      <div className="about-subtitle">
        In the next 10 years we must halve the world’s greenhouse gas emissions
        if we stand any chance of preventing the worst impacts of climate
        change. Pollution, extreme weather and rising sea levels are already
        threatening communities and economies around the world. Threatening our
        health and the health of our planet. The NetZero mission was to create a
        platform that gives an easy and simple way for anyone to take
        high-impact, achievable steps to reduce their carbon pollution and
        persuade others to do the same.
      </div>
      <div className="about-people">
        <p>Team Lead: Angela Turi</p>
        <p>Backend Lead: Mohammad Taher</p>
        <p>Frontend Lead: Philip Lowe</p>
        <p>Design Lead: Sebastian Sanchez</p>
      </div>
    </section>
  );
};

export default About;
