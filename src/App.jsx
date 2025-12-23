import "./App.css";
import PillNav from "./components/PillNav";
import logo from "./assets/computer.png";
import Shuffle from "./components/Shuffle";
import TargetCursor from "./components/TargetCursor";

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
          // baseColor="#16064b"
          baseColor="transparent"
          pillColor="transparent"
          // pillColor="#4213c0"
          hoveredPillTextColor="#fff"
          pillTextColor="#fff"
        />
      </nav>
      <section id="about">
        <img src={logo} alt="Computer" />
        <Shuffle
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
        />
        <p className="about">
          Intra-School <b>Graphic Design</b> Competition
        </p>
        <div>
          <TargetCursor
            spinDuration={2}
            hideDefaultCursor={true}
            parallaxOn={true}
          />

          <button className="cursor-target register">Register</button>
        </div>
      </section>
      <section id="categories">
        <h1 className="sectionTitle">categories</h1>
      </section>
    </main>
  );
}

export default App;
