import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import "./Creators.css";

const Creators = () => {
  return (
    <section className="how-it-works-section about-section">
      <div className="how-it-works-title">About Us</div>

      <div className="step-container">
        <div className="Creator-info">
          <div className="creator-Name">Angela Turi</div>
          <p className="creator-title">Team Lead</p>
          <div className="creator-links">
            {/* <a
              href="https://www.linkedin.com/in/mohammad-taher-2b502b5b"
              target="_blank"
            >
              <LinkedInIcon
                className="creator-links"
                style={{ fontSize: 50 }}
              />
            </a>
            <a href="https://github.com/zohebtaher" target="_blank">
              <GitHubIcon className="creator-links" style={{ fontSize: 50 }} />
            </a> */}
          </div>
        </div>
        <div className="Creator-info">
          <div className="creator-Name">Mohammad Taher</div>
          <p className="creator-title">Backend Engineer</p>
          <div className="creator-links">
            <a
              href="https://www.linkedin.com/in/mohammad-taher-2b502b5b"
              target="_blank"
            >
              <LinkedInIcon
                style={{ fontSize: 50 }}
                className="creator-links"
              />
            </a>
            <a href="https://github.com/zohebtaher" target="_blank">
              <GitHubIcon style={{ fontSize: 50 }} className="creator-links" />
            </a>
          </div>
        </div>
        <div className="Creator-info">
          <div className="creator-Name">Philip Lowe</div>
          <p className="creator-title">Frontend Engineer</p>
          <div className="creator-links">
            <a
              href="https://www.linkedin.com/in/philip-lowe-274b9a9a/"
              target="_blank"
            >
              <LinkedInIcon
                style={{ fontSize: 50 }}
                className="creator-links"
              />
            </a>
            <a href="https://github.com/philowe94" target="_blank">
              <GitHubIcon style={{ fontSize: 50 }} className="creator-links" />
            </a>
          </div>
        </div>
        <div className="Creator-info">
          <div className="creator-Name">Sebastian Sanchez</div>
          <p className="creator-title">Flex Engineer</p>
          <div className="creator-links">
            <a href="https://www.linkedin.com/in/sebfsanchez/" target="_blank">
              <LinkedInIcon
                className="creator-links"
                style={{ fontSize: 50 }}
              />
            </a>
            <a href="https://github.com/sebastianss1/" target="_blank">
              <GitHubIcon className="creator-links" style={{ fontSize: 50 }} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Creators;
