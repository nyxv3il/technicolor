import "./App.css";
import PillNav from "./components/PillNav";
import logo from "./assets/computer.png";
import Shuffle from "./components/Shuffle";

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
          baseColor="#1c057d"
          pillColor="#5217f0"
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
      </section>
    </main>
  );
}

export default App;
