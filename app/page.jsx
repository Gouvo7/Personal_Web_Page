"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Moon, Sun } from "lucide-react";

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
  { label: "C#", level: 90 },
  { label: "Java", level: 80 },
  { label: "Python", level: 80 },
  { label: "HTML/CSS", level: 80 },
  { label: "JavaScript", level: 70 },
  { label: "SQL", level: 75 }
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
    <main className="space-y-28 pb-28">
      <Nav theme={theme} onToggle={toggleTheme} />
      <Hero />
      <Section id="projects" title="Featured Work" eyebrow="Projects">
        <ProjectsGrid />
      </Section>
      <Section id="skills" title="Skills & Tools" eyebrow="Capabilities">
        <SkillsGrid />
      </Section>
      <Section id="about" title="About Me" eyebrow="Profile">
        <About />
      </Section>
      <Section id="contact" title="Contact" eyebrow="Connect">
        <Contact />
      </Section>
      <Footer />
    </main>
  );
}

function Nav({ theme, onToggle }) {
  return (
    <div className="sticky top-0 z-30 backdrop-blur-xl bg-surface-1/85 border-b border-deluge/20">
      <div className="section flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <img src="/images/logo2.png" alt="Logo" className="h-10 w-10 rounded-full shadow-card object-contain" />
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-accent/80">Portfolio</p>
            <p className="text-accent font-semibold">Nektarios Gkouvousis</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium text-accent/90">
          {[
            { href: "#projects", label: "Projects" },
            { href: "#skills", label: "Skills" },
            { href: "#about", label: "About" },
            { href: "#contact", label: "Contact" }
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-full hover:bg-white/10 hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onToggle}
            className="px-3 py-2 rounded-full border border-deluge/40 text-deluge hover:bg-deluge/15 transition-colors inline-flex items-center gap-2"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="section pt-14">
      <motion.div {...fadeUp} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/15 border border-accent/35 shadow-card">
        <span className="text-xs uppercase tracking-[0.2em] text-accent/90 font-semibold">Full Stack Engineer</span>
        <span className="text-xs font-mono text-accent">.NET / Web / UI</span>
      </motion.div>
      <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="mt-6 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-semibold text-deluge leading-tight">
          I craft thoughtful software and interfaces that feel intentional and polished.
        </h1>
        <p className="mt-4 text-lg text-accent/80 dark:text-accent/85">
          Blending backend reliability with front-end nuance. Currently focused on .NET desktop and web experiences.
        </p>
      </motion.div>
      <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.18 }} className="mt-8 flex flex-wrap gap-3">
        <a
          href="#projects"
          className="px-5 py-3 rounded-full bg-deluge text-white font-semibold shadow-card hover:scale-[1.01] transition-transform"
        >
          View projects
        </a>
        <a
          href="#contact"
          className="px-5 py-3 rounded-full border border-deluge/50 text-deluge hover:bg-deluge/10 transition-colors"
        >
          Contact
        </a>
      </motion.div>
    </section>
  );
}

function Section({ id, title, eyebrow, children }) {
  return (
    <section id={id} className="section space-y-8 scroll-mt-28">
      <motion.div {...fadeUp} className="flex items-center gap-3">
        <span className="pill bg-deluge/15 text-deluge border border-deluge/30">{eyebrow}</span>
        <h2 className="text-3xl font-semibold text-deluge">{title}</h2>
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
            <h3 className="text-xl font-semibold text-deluge">{project.title}</h3>
            <a
              href={project.link}
              className="text-deluge hover:text-ink transition-colors inline-flex items-center gap-1 text-sm"
            >
              Code <ArrowUpRight size={16} />
            </a>
          </div>
          <p className="text-accent/90 dark:text-accent-soft">{project.summary}</p>
          <div className="flex flex-wrap gap-2 text-ink dark:text-prelude">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-accent/15 text-accent/90 text-xs font-semibold border border-accent/40 dark:bg-accent/25"
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
            <span className="text-deluge">{skill.label}</span>
            <span className="text-accent/80 text-sm dark:text-accent-soft">{skill.level}%</span>
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
      <p className="text-accent/90 dark:text-accent-soft">
        Based in Athens, I build full-stack products across desktop and web. I care about reliable APIs, smooth UI,
        and shipping with polish.
      </p>
      <p className="text-accent/90 dark:text-accent-soft/90">
        Currently at DataBlue S.A. as a Junior Fullstack .NET Developer, expanding healthcare workflows and desktop
        experiences.
      </p>
    </motion.div>
  );
}

function Contact() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <motion.div {...fadeUp} className="glass rounded-2xl p-6 space-y-4">
        <h3 className="text-xl font-semibold text-deluge">Let’s build something</h3>
        <p className="text-accent/90 dark:text-accent-soft">
          Reach out for collaborations, opportunities, or just to say hi. I’m open to new challenges.
        </p>
        <a
          className="inline-flex items-center gap-2 text-deluge font-semibold hover:text-ink transition-colors"
          href="mailto:gouvousisnektarios@gmail.com"
        >
          <Mail size={18} />
          gouvousisnektarios@gmail.com
        </a>
        <div className="flex justify-end">
          <a
            href="/src/CV_Gkouvousis_en.pdf"
            className="inline-flex px-5 py-3 rounded-full bg-deluge text-white font-semibold shadow-card hover:scale-[1.01] transition-transform"
          >
            Download resume
          </a>
        </div>
      </motion.div>
      <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="glass rounded-2xl p-6 space-y-4">
        <h3 className="text-xl font-semibold text-deluge">Social</h3>
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
      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 border border-accent/30 text-accent/80 hover:border-accent hover:text-accent transition-colors dark:bg-surface-1/80 dark:text-accent-soft"
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
    <div className="section pt-10 pb-4 text-sm text-accent/80 dark:text-accent-soft">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p>© {new Date().getFullYear()} Nektarios Gkouvousis. Crafted with care.</p>
        <a href="#top" className="hover:text-accent dark:hover:text-accent-soft">Back to top</a>
      </div>
    </div>
  );
}
