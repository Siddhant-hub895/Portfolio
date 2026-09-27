import About from "./components/About/About";
import Certifications from "./components/Certifications/Certifications";
import Contact from "./components/Contact/Contact";
import Education from "./components/Education/Education";
import Experience from "./components/Experience/Experience";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import SectionBoundary from "./components/UI/SectionBoundary";

const sections = [Hero, About, Experience, Projects, Skills, Education, Certifications, Contact];

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        {sections.map((Section) => (
          <SectionBoundary key={Section.name}>
            <Section />
          </SectionBoundary>
        ))}
      </main>
      <Footer />
    </>
  );
}
