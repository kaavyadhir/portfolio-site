import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Section from "./components/Section.jsx";
import Featured from "./components/Featured.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import { person } from "./content.js";

export default function App() {
  return (
    <>
      <Nav />

      <main>
        <Hero />

        <Section id="work" label="Work">
          <div className="mt-8">
            <Featured />
          </div>
          <Projects />
        </Section>

        <Section
          id="skills"
          label="Skills"
          title="What I reach for, and why it is on this list."
        >
          <Skills />
        </Section>

        <Section id="about" label="About">
          <About />
        </Section>

        <Section id="contact" label="Contact">
          <Contact />
        </Section>
      </main>

      <footer className="border-t border-line py-8">
        <div className="shell flex flex-col items-center justify-between gap-3 text-sm text-fog sm:flex-row">
          <p>
            © {new Date().getFullYear()} {person.name}
          </p>
          <p className="font-mono text-xs">
            Built with React, Vite and Tailwind — deployed on Vercel.
          </p>
        </div>
      </footer>
    </>
  );
}
