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
    </main>
  );
}

export default App;
