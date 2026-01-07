import "./App.css";
import PillNav from "./components/PillNav";
import logo from "./assets/computer.png";
import Shuffle from "./components/Shuffle";
import Magnet from "./components/Magnet";
import TextType from "./components/TextType";
import SpotlightCard from "./components/SpotlightCard";
import poster from "./assets/poster.png";
import manipulation from "./assets/manipulation.png";
import mockup from "./assets/mockup.png";
import video from "./assets/video.png";
import whatsapp from "./assets/wa.png";

function App() {
  return (
    <main>
      <nav>
        <PillNav
          logo={logo}
          logoAlt="Technicolor'26"
          items={[
            { label: "About", href: "#" },

            { label: "Categories", href: "#categories" },

            { label: "RNR", href: "#rnr" },

            { label: "Contact", href: "#contact" },
          ]}
          activeHref=""
          className="navbar"
          ease="power2.easeOut"
          baseColor="#transparent"
          // baseColor="transparent"
          // pillColor="transparent"
          pillColor="#4213c0"
          hoveredPillTextColor="#fff"
          pillTextColor="#fff"
        />
      </nav>
      <section id="about">
        <img src={logo} alt="Computer" />
        {/* <Shuffle
          tag="h1"
          className="title"
          text="TECHNICOLOR"
          shuffleDirection="right"
          duration={0.35}
          animationMode="evenodd"
          shuffleTimes={1}
          ease="power3.out"
          stagger={0.03}
          threshold={0.1}
          triggerOnce={true}
          triggerOnHover={true}
          respectReducedMotion={true}
        /> */}
        <TextType
          text={["TECHNICOLOR", "HOSTED BY", "ANANDA COLLEGE"]}
          typingSpeed={120}
          pauseDuration={2000}
          showCursor={true}
          cursorCharacter="_"
          className="title"
        />
        <p className="about">
          Intra-School <b>Graphic Design</b> Competition
        </p>
        <Magnet padding={50} disabled={false} magnetStrength={10}>
          <p
            className="register"
            onClick={() => {
              window.open("https://www.example.com", "_blank");
            }}
          >
            register
          </p>
        </Magnet>
      </section>
      <section id="categories">
        <h1 className="sectionTitle">categories</h1>
        <div className="cards">
          <SpotlightCard
            className="custom-spotlight-card category"
            spotlightColor="#4213c0"
          >
            <h1 className="title">Poster Design</h1>
            <img src={poster} alt="Poster Design" />
          </SpotlightCard>
          <SpotlightCard
            className="custom-spotlight-card category"
            spotlightColor="#4213c0"
          >
            <h1 className="title">Mockup</h1>
            <img src={mockup} alt="Mockup" />
          </SpotlightCard>
          <SpotlightCard
            className="custom-spotlight-card category"
            spotlightColor="#4213c0"
          >
            <h1 className="title">Video Editing</h1>
            <img src={video} alt="Video Editing" />
          </SpotlightCard>
          <SpotlightCard
            className="custom-spotlight-card category"
            spotlightColor="#4213c0"
          >
            <h1 className="title">Manipulation</h1>
            <img src={manipulation} alt="Manipulation" />
          </SpotlightCard>
        </div>
      </section>
      <section id="rnr">
        <h1 className="sectionTitle">rules and regulations</h1>
        <div className="rules">
          <h2 className="subtitle">general rules and guidelines</h2>
          <ul>
            <li>
              This competition is exclusively for students of Ananda College.
            </li>
            <li>
              This is an individual competition; team submissions are not
              allowed.
            </li>
            <li>
              Each contestant may submit only ONE entry per competition
              category.
            </li>
            <li>
              Submissions received after the specified deadline will not be
              accepted under any circumstances.
            </li>
            <li>All project files must be uploaded to Google Drive.</li>
            <li>
              A shareable link to the Google Drive folder must be submitted via
              the official submission form.
            </li>
            <li>
              The Google Drive folder must also contain 5 screenshots of your
              workspace during the creation process.
            </li>
            <li>
              The main project file (or zip file) must be renamed in the format:
              "Grade_YourName.zip" (e.g., "11_JohnDoe.zip").
            </li>
            <li>
              Final artwork must be submitted in either .png or .jpg format,
              unless otherwise specified.
            </li>
          </ul>
          <br />
          <br />
          <h2 className="subtitle">mockup</h2>
          <ul>
            <li>
              <strong>Task: </strong>Design a t-shirt design for the Ananda
              College ICT Society.
            </li>
            <li>Design both the front and back of the t-shirt.</li>
            <li>
              Use only Ananda College colors as the main colors: Maroon, Gold,
              and White.
            </li>
            <li>
              The design should be relevant to the Ananda College ICT Society.
            </li>
            <li>Software: Adobe Photoshop or Adobe Illustrator only.</li>
            <li>The artwork must be exported in either .png or .jpg format.</li>
          </ul>
          <br />
          <br />
          <h2 className="subtitle">video editing</h2>
          <ul>
            <li>
              <strong>Task: </strong>Create a trailer for "Technicolor '26."
            </li>
            <li>Output format: .mp4.</li>
            <li>Software: Adobe After Effects or Adobe Premier Pro only.</li>
            <li>Resolution: Must be HD(1280x720) or higher.</li>
          </ul>
          <br />
          <br />
          <h2 className="subtitle">poster design</h2>
          <ul>
            <li>
              <strong>Task: </strong>Create a poster for a Robotics Competition
              organized by the Ananda College ICT Society.
            </li>
            <li>Dimensions: 1080 x 1080 pixels.</li>
            <li>
              Content: The poster must clearly communicate the details of the
              Robotics Competition.
            </li>
            <li>Software: Adobe Photoshop or Canva.</li>
            <li>The artwork must be exported in either .png or .jpg format.</li>
          </ul>
          <br />
          <br />
          <h2 className="subtitle">photo manipulation</h2>
          <ul>
            <li>
              <strong>Task: </strong>Create a photo manipulation based on the
              theme "The Rise of AI and Robots in Cyber Warfare."
            </li>
            <li>Theme: "The Rise of AI and Robots in Cyber Warfare."</li>
            <li>Software: Adobe Photoshop only.</li>
            <li>Dimensions: Any dimension is acceptable.</li>
            <li>
              Project Files: Submit ALL project files (including any textures,
              overlays, images, etc.) as a .zip file.
            </li>
            <li>
              Final artwork must be exported in either .png or .jpg format.
            </li>
          </ul>
          <br />
          <br />
          <h2 className="subtitle">submission</h2>
          <ul>
            <li>
              Ensure that your Google Drive folder permissions are set to
              "Anyone with the link can view."
            </li>
            <li>Double-check your file names and formats before submitting.</li>
            <li>Any form of plagiarism will result in disqualification.</li>
            <li>The judges' decisions are final.</li>
          </ul>
        </div>
      </section>
      <section id="contact">
        <h1 className="sectionTitle">contact us</h1>
        <div className="cards">
          <SpotlightCard
            className="custom-spotlight-card contact"
            spotlightColor="#4213c0"
          >
            <a href="https://wa.me/+94773133499" target="_blank">
              <img src={whatsapp} alt="whatsapp logo" />
            </a>
            <h1 className="name">Manuth Ranawaka</h1>
          </SpotlightCard>
          <SpotlightCard
            className="custom-spotlight-card contact"
            spotlightColor="#4213c0"
          >
            <a href="https://wa.me/+94762677872" target="_blank">
              <img src={whatsapp} alt="whatsapp logo" />
            </a>
            <h1 className="name">Nethsuka Balasuriya</h1>
          </SpotlightCard>
        </div>
      </section>
      <footer>ACICTS © 2026</footer>
    </main>
  );
}

export default App;
