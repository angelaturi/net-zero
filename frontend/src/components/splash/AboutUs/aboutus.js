import "../Hero/Hero.css";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import "../Creators/Creators.css";
import "../HowItWorksCard/HowItWorksCard.css";
import "../HowItWorks/HowItWorks.css";
import "./aboutus.css";

const AboutUs = () => {
  return (
    <section className="hero">
      <img
        className="hero-image"
        src="https://netzero-prod.s3.ca-central-1.amazonaws.com/1622135306821_ANTH_BIO_CAN_BC_AVA_03_17_SRC_2K.jpeg"
      />
      <div className="aboutus-box">
        <div className="aboutus-header">
          NETZERO was built by the following talented Software Engineers.{" "}
        </div>
        <div className="aboutus-subheader">
          <div classnName="Creator-info">
            <div className="creator-Name">Angela Turi</div>
            <p className="creator-title">Team Lead</p>
            <div className="creator-links">
              <a
                href="https://www.linkedin.com/in/mohammad-taher-2b502b5b"
                target="_blank"
              >
                <LinkedInIcon
                  className="about-links"
                  style={{ fontSize: 50 }}
                />
              </a>
              <a href="https://github.com/zohebtaher" target="_blank">
                <GitHubIcon className="about-links" style={{ fontSize: 50 }} />
              </a>
            </div>
          </div>
          <div classnName="Creator-info">
            <div className="creator-Name">Mohammad Taher</div>
            <p className="creator-title">Backend Engineer</p>
            <div className="about-links">
              <a
                href="https://www.linkedin.com/in/mohammad-taher-2b502b5b"
                target="_blank"
              >
                <LinkedInIcon
                  style={{ fontSize: 50 }}
                  className="about-links"
                />
              </a>
              <a href="https://github.com/zohebtaher" target="_blank">
                <GitHubIcon style={{ fontSize: 50 }} className="about-links" />
              </a>
            </div>
          </div>
          <div classnName="Creator-info">
            <div className="creator-Name">Philip Lowe</div>
            <p className="creator-title">Frontend Engineer</p>
            <div className="about-links">
              <a
                href="https://www.linkedin.com/in/philip-lowe-274b9a9a/"
                target="_blank"
              >
                <LinkedInIcon
                  style={{ fontSize: 50 }}
                  className="about-links"
                />
              </a>
              <a href="https://github.com/philowe94" target="_blank">
                <GitHubIcon style={{ fontSize: 50 }} className="about-links" />
              </a>
            </div>
          </div>
          <div classnName="Creator-info">
            <div className="creator-Name">Sebastian Sanchez</div>
            <p className="creator-title">Flex Engineer</p>
            <div className="about-links">
              <a
                href="https://www.linkedin.com/in/sebfsanchez/"
                target="_blank"
              >
                <LinkedInIcon
                  className="about-links"
                  style={{ fontSize: 50 }}
                />
              </a>
              <a href="https://github.com/sebastianss1/" target="_blank">
                <GitHubIcon className="about-links" style={{ fontSize: 50 }} />
              </a>
            </div>
          </div>
        </div>
        {/* <button className="hero-button"> <a href="/signup">Get Started</a></button> */}
      </div>
    </section>
  );
};

export default AboutUs;
