"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, LinkedinIcon, LucideLinkedin, Mail, Moon, Sun } from "lucide-react";
import { useLenis } from "../components/lenis-provider";

const projects = [
  {
    title: "Shooting Range Data Management System",
    summary:
      "Automated registration, paperwork, inventory, and training workflows for a shooting range with a desktop app.",
    stack: [".NET", "C#", "SQL", "WPF"],
    link: "https://github.com/Gouvo7"
  },
  {
    title: "Vodafone Appointment Manager",
    summary:
      "Java-based scheduler generating daily/monthly reports to streamline retail appointment tracking.",
    stack: ["Java", "Swing", "Apache POI"],
    link: "https://github.com/Gouvo7"
  },
  {
    title: "Exam Schedule Composition System",
    summary:
      "Excel-driven scheduling engine for university exams with rule-based constraints and portable data pipelines.",
    stack: ["Java", "Excel I/O"],
    link: "https://github.com/Gouvo7"
  }
];

const skills = [
  { label: "C# / .NET", level: 90 },
  { label: "SQL", level: 90 },
  { label: "Java", level: 80 },
  { label: "Python", level: 80 },
  { label: "HTML/CSS", level: 80 },
  { label: "JavaScript", level: 70 }
];

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.8, 0.4, 1] }
};

export default function Home() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const next = stored || "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next === "dark" ? "dark" : "");
  }, []);

  useEffect(() => {
    if (!theme) return;
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <main className="space-y-20 pb-20">
      <Nav theme={theme} onToggle={toggleTheme} />
      <Hero />
      <Section id="about" title="About Me">
        <About />
      </Section>
      <Section id="skills" title="Skills & Tools">
        <SkillsGrid />
      </Section>
      <Section id="projects" title="Featured Work">
        <ProjectsGrid />
      </Section>
      <Section id="contact" title="Contact">
        <Contact />
      </Section>
      <Footer />
    </main>
  );
}

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" }
];

function Nav({ theme, onToggle }) {
  const lenis = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavClick(e, href) {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const header = document.getElementById("site-header");
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const targetTop = window.scrollY + target.getBoundingClientRect().top - headerHeight - 8;
    if (lenis) {
      const distance = Math.abs(targetTop - window.scrollY);
      const duration = Math.min(Math.max(distance / 1200, 0.4), 2.2);
      lenis.scrollTo(targetTop, { duration, easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else {
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }
  }

  function handleLogoClick(e) {
    e.preventDefault();
    window.scrollTo({ top: 0 });
    window.location.reload();
  }

  return (
    <div id="site-header" className="sticky top-0 z-30 backdrop-blur-xl bg-surface-1/100 border-b border-deluge/100">
      <div className="section flex items-center justify-between py-2">
        {/* Logo */}
        <a href="/" onClick={handleLogoClick} className="flex items-center gap-4 cursor-pointer">
          <Image src={`${process.env.NODE_ENV === "production" ? "/Personal_Web_Page" : ""}/images/logo2.ico`} alt="Logo" width={80} height={80} className="h-20 w-20 object-contain self-center" />
          <div className="flex flex-col justify-center">
            <p className="t-label">Portfolio</p>
            <p className="t-label2 text">Nektarios Gkouvousis</p>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3 py-1 rounded-full nav-link underline-slide"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onToggle}
            aria-label="Toggle theme"
            className="px-3 py-3 rounded-full btn-theme inline-flex items-center"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="rounded-full btn-theme inline-flex flex-col items-center justify-center gap-[5px] w-11 h-11"
          >
            <span className={`block w-5 h-0.5 bg-deluge transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-5 h-0.5 bg-deluge transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-deluge transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
          <button
            type="button"
            onClick={onToggle}
            aria-label="Toggle theme"
            className="px-3 py-3 rounded-full btn-theme inline-flex items-center"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-64 border-t border-deluge/20" : "max-h-0"}`}>
        <div className="section flex flex-col py-3 gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-4 py-3 rounded-xl nav-link underline-slide"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const lenis = useLenis();

  function handleCtaClick(e, href) {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    if (lenis) {
      const distance = Math.abs(target.getBoundingClientRect().top);
      const duration = Math.min(Math.max(distance / 1200, 0.4), 2.2);
      lenis.scrollTo(target, { duration, easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section className="section pt-18">
      <motion.div {...fadeUp} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/15 border border-accent/35 shadow-card">
        <span className="t-labelHeader text-accent/90">Full Stack Engineer</span>
        <span className="t-monoPop">.NET / Databases / UI & UX  / Web </span>
      </motion.div>
      <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="mt-6 max-w-4xl">
        <h1 className="t-hero pt-4">
          I craft memorable software with care, because that's what I love to do.
        </h1>
        <p className="mt-4 t-body-lg">
          Blending backend reliability with front-end nuance. Currently focused on .NET desktop applications using a wide variety of toolsets and technologies.
        </p>
      </motion.div>
      <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.18 }} className="mt-8 flex flex-wrap gap-3">
        <a
          href="#projects"
          onClick={(e) => handleCtaClick(e, "#projects")}
          className="px-5 py-3 rounded-full bg-deluge text-white font-semibold shadow-card hover:scale-[1.07] transition-transform"
        >
          View projects
        </a>
        <a
          href="#contact"
          onClick={(e) => handleCtaClick(e, "#contact")}
          className="px-5 py-3 rounded-full border border-deluge/50 text-deluge hover:bg-deluge/10 hover:scale-[1.07] transition-transform"
        >
          Contact
        </a>
      </motion.div>
    </section>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="section space-y-8 scroll-mt-28">
      <motion.div {...fadeUp} className="flex items-center gap-3">
        <h2 className="t-section-title">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}

function ProjectsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project, i) => (
        <motion.article
          key={project.title}
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: i * 0.08 }}
          className="glass rounded-2xl p-6 flex flex-col gap-4 border border-deluge/20 bg-white/90 text-ink shadow-card dark:bg-surface-1/95 dark:text-prelude"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="t-card-title">{project.title}</h3>
            <a
              href={project.link}
              className="text-deluge hover:text-ink dark:hover:text-accent transition-colors inline-flex items-center gap-1 text-sm"
            >
              Code <ArrowUpRight size={18} />
            </a>
          </div>
          <p className="t-body">{project.summary}</p>
          <div className="flex flex-wrap gap-2 ">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-accent/15 border border-accent/40 dark:bg-accent/15 t-monoPopSmall"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function SkillsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill, i) => (
        <motion.div
          key={skill.label}
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: i * 0.04 }}
          className="glass rounded-xl p-4 border border-deluge/20 bg-white/90 text-ink shadow-card dark:bg-surface-1/95 dark:text-prelude"
        >
          <div className="flex items-center justify-between text-accent/90 font-semibold">
            <span className="t-meta">{skill.label}</span>
            <span className="t-meta">{skill.level}%</span>
          </div>
          <div className="h-2 rounded-full bg-deluge/15 mt-3 overflow-hidden">
            <div
              className="h-full rounded-full bg-deluge"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function About() {
  return (
    <motion.div {...fadeUp} className="glass rounded-2xl p-6 space-y-4">
      <p className="t-body">
        Hey there! And thanks for visiting my portfolio page (:
      </p>
      <p className="t-body">
        I am young developer based in Athens Greece, who just recently graduated from the Department of Informatics and Computer Engineering at the University of West Attica. 
        Being able to provide solutions to real world problems through code is a passion of mine and that's what always encourages me to learn more.
      </p>
      <p className="t-body">
        Working as a Mid - Fullstack .NET Developer at Databluse S.A. for almost 3 years now, I have gained valuable 
        experience on how to build efficient and reliable software solutions, especially in the medical field.
        Apart from the backend side of things, I adore designing and implementing memorable user interfaces that are smooth and offer the best user experience.
      </p>
    </motion.div>
  );
}

function Contact() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <motion.div {...fadeUp} className="glass rounded-2xl p-6 space-y-4">
        <h3 className="t-card-title">Lets build something</h3>
        <p className="t-body">
          Reach out for collaborations, opportunities, or whatever else might come to your mind. I am always open to new challenges and sharing information with others.
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <a
            href="mailto:gouvousisnektarios@gmail.com"
            className="inline-flex items-center py-2 gap-2 text-accent font-semibold underline-slide"
          >
            <Mail size={18} />
            gouvousisnektarios@gmail.com
          </a>
          <a href={`${process.env.NODE_ENV === "production" ? "/Personal_Web_Page" : ""}/CV_Gkouvousis_en.pdf`} className="inline-flex px-5 py-3 rounded-full bg-deluge text-white font-semibold shadow-card hover:scale-[1.07] transition-transform">
            Download resume
          </a>
        </div>
      </motion.div>
      <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="glass rounded-2xl p-6 space-y-6">
        <h3 className="t-card-title">Social</h3>
        <div className="flex flex-col gap-2">
          <SocialLink href="https://github.com/Gouvo7" icon={<Github size={18} />} label="GitHub" />
          <SocialLink href="https://www.linkedin.com/in/nektarios-gkouvousis-581a9a1a8/" icon={<Linkedin size={18} />} label="LinkedIn" />
        </div>
      </motion.div>
    </div>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 border border-accent/30 text-accent/80 hover:border-accent hover:text-accent hover:scale-[1.03] transition-colors dark:bg-surface-1/80 dark:text-accent-soft"
      target="_blank"
      rel="noreferrer"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

function Footer() {
  return (
    <div className="section pt-2 pb-4 t-metaFooter ">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p>© {new Date().getFullYear()} Nektarios Gkouvousis. Crafted with care.</p>
        <a href="#top" className="underline-slide">Back to top</a>
      </div>
    </div>
  );
}
