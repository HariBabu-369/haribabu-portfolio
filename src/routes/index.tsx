import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const NAV_LINKS = ["About", "Skills", "Projects", "Achievements", "Certifications", "Education", "Contact"];
const ROLES = ["Full Stack Developer", "AI/ML Enthusiast", "Java Developer", "Data Science Learner"];

const SKILLS: Record<string, { name: string; level: number }[]> = {
  "Programming Languages": [
    { name: "Java", level: 85 }, { name: "Python", level: 80 },
    { name: "C", level: 70 }, { name: "JavaScript", level: 78 },
  ],
  "Frontend": [
    { name: "HTML", level: 88 }, { name: "CSS", level: 82 },
    { name: "JavaScript", level: 78 }, { name: "React", level: 72 },
  ],
  "Backend": [
    { name: "PHP", level: 60 }, { name: "MySQL", level: 75 }, { name: "APIs", level: 80 },
  ],
  "ML & Data Science": [
    { name: "Pandas", level: 78 }, { name: "NumPy", level: 75 },
    { name: "Scikit-learn", level: 70 }, { name: "OpenCV", level: 72 }, { name: "Streamlit", level: 80 },
  ],
  "Tools": [
    { name: "GitHub", level: 85 }, { name: "VS Code", level: 90 },
    { name: "Jupyter", level: 80 }, { name: "Oracle SQL", level: 72 },
  ],
};

const PROJECTS = [
  {
    title: "Movie Information System", subtitle: "OMDB API Integration", icon: "▶",
    desc: "A responsive movie web app fetching detailed movie info via the OMDB API. Real-time search, IMDb ratings, cast, and posters with a clean, modern UI.",
    tech: ["HTML", "CSS", "JavaScript", "API"], github: "https://github.com/HariBabu-369",
  },
  {
    title: "Smart Attendance System", subtitle: "OpenCV Face Recognition", icon: "◆",
    desc: "AI-powered attendance using face recognition to auto-detect faces and record attendance with timestamps, exporting data to Excel.",
    tech: ["Python", "OpenCV", "Computer Vision"], github: "https://github.com/HariBabu-369",
  },
  {
    title: "Movie Recommendation System", subtitle: "ML-Powered Suggestions", icon: "◈",
    desc: "Machine learning recommendation engine that suggests movies based on content similarity using the TMDB dataset, deployed via Streamlit.",
    tech: ["Python", "ML", "Streamlit", "Pandas"], github: "https://github.com/HariBabu-369",
  },
];

const ACHIEVEMENTS = [
  { icon: "★", title: "4th Position — AI Ignite Hackathon", org: "Sri Manakula Vinayagar Engineering College" },
  { icon: "◆", title: "Top 10 — 7th Rank", org: "Swafinix AI Agents Hackathon" },
  { icon: "▲", title: "SRM Datathon Participant", org: "SRM Institute of Science and Technology" },
  { icon: "✦", title: "Web Dev Hackathon Participant", org: "Tutedude's Web Development Hackathon" },
];

const CERTIFICATIONS = [
  { title: "Programming in Java", org: "NPTEL", score: "76%", icon: "◉" },
  { title: "Oracle Java Certification", org: "Oracle", score: "90%", icon: "■" },
  { title: "AWS Cloud Foundations", org: "AWS Academy", score: "Graduate", icon: "▲" },
  { title: "Flutter App Development", org: "Infosys Springboard", score: "Completed", icon: "◆" },
];

const EDUCATION = [
  { period: "2023 – Present", degree: "B.Tech Information Technology", school: "Sri Manakula Vinayagar Engineering College", detail: "CGPA: 8.40", icon: "◈", active: true },
  { period: "2022 – 2023", degree: "HSC (12th Grade)", school: "Soorya International Hr Sec School", detail: "Scored: 87.5%", icon: "▬", active: false },
  { period: "2020 – 2021", degree: "SSLC (10th Grade)", school: "Soorya International Hr Sec School", detail: "Passed", icon: "◆", active: false },
];

function TypingText({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = texts[idx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (charIdx < current.length) {
        timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, 60);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, 35);
      } else {
        setDeleting(false); setIdx(i => (i + 1) % texts.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts]);

  return (
    <span className="font-mono">
      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{displayed}</span>
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref}>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-foreground/90">{name}</span>
        <span className="font-mono text-primary">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--surface-2)] overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: visible ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`,
            background: "linear-gradient(90deg, var(--primary), var(--accent))",
          }} />
      </div>
    </div>
  );
}

function ScrollProgress() {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const fn = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setProg(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-transparent">
      <div className="h-full" style={{ width: `${prog}%`, background: "var(--gradient-primary)" }} />
    </div>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2 + 1, delay: Math.random() * 5, duration: Math.random() * 10 + 8,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div key={p.id} className="absolute rounded-full opacity-40"
          style={{
            left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`,
            background: p.id % 2 ? "var(--primary)" : "var(--accent)",
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }} />
      ))}
    </div>
  );
}

function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "achievements", "certifications", "education", "contact"];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) { setActiveSection(s); break; }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen text-foreground relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');
        * { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, var(--primary), var(--accent)); border-radius: 3px; }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
        @keyframes orbit { from { transform: rotate(0deg) translateX(80px) rotate(0deg); } to { transform: rotate(360deg) translateX(80px) rotate(-360deg); } }
        @keyframes pulse-ring { 0% { transform: scale(0.95); opacity: 0.7; } 100% { transform: scale(1.4); opacity: 0; } }
        .float { animation: float 4s ease-in-out infinite; }
        .glass { background: oklch(from var(--surface) l c h / 0.6); backdrop-filter: blur(14px); border: 1px solid oklch(from var(--foreground) l c h / 0.08); }
        .btn-primary { background: var(--gradient-primary); color: var(--primary-foreground); transition: transform .25s, box-shadow .25s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: var(--shadow-glow); }
        .grain::before { content:''; position:absolute; inset:0; pointer-events:none; opacity:.04; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
      `}</style>

      <ScrollProgress />

      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-40 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="font-mono font-bold text-lg">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">hb.dev</span>
          </button>
          <div className="hidden md:flex gap-1">
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === l.toLowerCase()
                    ? "bg-primary/15 text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                }`}>
                {l}
              </button>
            ))}
          </div>
          <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-6 h-0.5 bg-current mb-1.5" /><div className="w-6 h-0.5 bg-current mb-1.5" /><div className="w-6 h-0.5 bg-current" />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden flex flex-col px-6 pb-4 gap-1">
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())} className="text-left px-3 py-2 rounded-lg text-foreground/80 hover:bg-foreground/5">{l}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center px-6 pt-24 pb-12 grain overflow-hidden">
        <ParticleField />
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-[1.4fr_1fr] gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-mono mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Available for opportunities
            </div>
            <p className="font-mono text-primary text-sm mb-3">{`< hello world />`}</p>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-[1.05]">
              Haribabu C
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-2">
              I'm a <TypingText texts={ROLES} />
            </p>
            <p className="text-foreground/60 max-w-lg mb-8">
              Building intelligent and impactful digital experiences.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <button onClick={() => scrollTo("projects")} className="btn-primary px-6 py-3 rounded-xl font-semibold text-sm">
                View Projects →
              </button>
              <button onClick={() => scrollTo("contact")} className="glass px-6 py-3 rounded-xl font-semibold text-sm hover:border-primary/50 transition-all">
                Contact Me
              </button>
              <a href="mailto:haribabu82044@gmail.com" className="glass px-6 py-3 rounded-xl font-semibold text-sm hover:border-accent/50 transition-all">
                ↓ Resume
              </a>
            </div>
            <div className="flex gap-3">
              {[
                { href: "https://github.com/HariBabu-369", label: "GitHub" },
                { href: "https://www.linkedin.com/in/haribabu-cartigueyane", label: "LinkedIn" },
                { href: "mailto:haribabu82044@gmail.com", label: "Email" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  className="glass w-11 h-11 rounded-xl grid place-items-center text-foreground/70 hover:text-primary hover:-translate-y-0.5 transition-all text-xs font-mono">
                  {s.label[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Avatar */}
          <div className="relative flex justify-center">
            <div className="relative w-64 h-64 float">
              <div className="absolute inset-0 rounded-full opacity-60 blur-2xl" style={{ background: "var(--gradient-primary)" }} />
              <div className="relative w-full h-full rounded-full glass border-2 overflow-hidden flex items-center justify-center"
                style={{ borderColor: "oklch(from var(--primary) l c h / 0.4)", background: "linear-gradient(135deg, oklch(from var(--primary) l c h / 0.15) 0%, oklch(from var(--accent) l c h / 0.15) 100%)" }}>
                {/* Animated gradient circles */}
                <div className="absolute top-8 right-8 w-20 h-20 rounded-full opacity-40 blur-xl animate-pulse" style={{ background: "var(--primary)" }} />
                <div className="absolute bottom-12 left-8 w-28 h-28 rounded-full opacity-30 blur-2xl animate-pulse" style={{ background: "var(--accent)", animationDelay: "0.5s" }} />
                {/* Center content */}
                <div className="relative z-10 text-center">
                  <div className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">HC</div>
                  <p className="text-xs font-mono text-foreground/60 mt-2 tracking-widest">Developer</p>
                </div>
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "18s" }}>
                <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-primary -translate-y-1/2" style={{ transform: "translateY(-50%) translateX(120px)" }} />
                <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-accent -translate-y-1/2" style={{ transform: "translateY(-50%) translateX(-120px)" }} />
              </div>
            </div>
            <div className="absolute -top-2 -left-2 glass rounded-2xl px-4 py-3 text-center">
              <div className="text-2xl font-bold text-primary">8.40</div>
              <div className="text-[10px] uppercase tracking-wider text-foreground/60">CGPA</div>
            </div>
            <div className="absolute -bottom-2 -right-2 glass rounded-2xl px-4 py-3 text-center">
              <div className="text-2xl font-bold text-accent">3+</div>
              <div className="text-[10px] uppercase tracking-wider text-foreground/60">Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" no="01" eyebrow="about me" title="Who I Am">
        <div className="grid md:grid-cols-2 gap-10">
          <Reveal className="space-y-4 text-foreground/75 leading-relaxed">
            <p>I am a motivated 3rd-year Information Technology student passionate about Full Stack Web Development, Artificial Intelligence, Machine Learning, and Data Science.</p>
            <p>I enjoy building real-world projects that combine creativity with problem-solving — modern web technologies, intelligent systems, API integrations, and scalable software solutions.</p>
            <p>I continuously learn new technologies and participate in hackathons to sharpen my technical and collaborative skills.</p>
          </Reveal>
          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "College", value: "SMVEC, Pondicherry", icon: "■" },
                { label: "CGPA", value: "8.40 / 10", icon: "▲" },
                { label: "Year", value: "3rd Year IT", icon: "●" },
                { label: "Focus", value: "FullStack + AI/ML", icon: "▬" },
                { label: "Hackathons", value: "4+ Participated", icon: "★" },
                { label: "Status", value: "Open to Work", icon: "✓" },
              ].map(item => (
                <div key={item.label} className="glass rounded-2xl p-4 hover:-translate-y-1 transition-all">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-[10px] uppercase tracking-wider text-foreground/50">{item.label}</div>
                  <div className="text-sm font-semibold text-foreground/90">{item.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" no="02" eyebrow="skills" title="Tech Arsenal">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(SKILLS).map(([cat, skills], ci) => (
            <Reveal key={cat} delay={ci * 80}>
              <div className="glass rounded-2xl p-6 h-full">
                <div className="h-1 w-10 rounded-full mb-4" style={{ background: "var(--gradient-primary)" }} />
                <h3 className="text-lg font-bold mb-5">{cat}</h3>
                <div className="space-y-4">
                  {skills.map((sk, si) => <SkillBar key={sk.name} name={sk.name} level={sk.level} delay={si * 80} />)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" no="03" eyebrow="projects" title="Featured Work">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="glass rounded-2xl p-6 h-full hover:-translate-y-1.5 hover:border-primary/40 transition-all group">
                <div className="text-4xl mb-4 inline-block group-hover:scale-110 transition-transform">{p.icon}</div>
                <p className="font-mono text-xs text-accent mb-1">{p.subtitle}</p>
                <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.map(t => (
                    <span key={t} className="text-[10px] font-mono px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">{t}</span>
                  ))}
                </div>
                <a href={p.github} target="_blank" rel="noreferrer" className="text-sm text-accent hover:text-primary transition-colors font-medium">
                  View on GitHub →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ACHIEVEMENTS */}
      <Section id="achievements" no="04" eyebrow="achievements" title="Milestones">
        <div className="grid md:grid-cols-2 gap-4">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 80}>
              <div className="glass rounded-2xl p-5 flex items-center gap-4 hover:-translate-y-1 transition-all">
                <div className="text-4xl shrink-0 grid place-items-center w-14 h-14 rounded-xl"
                  style={{ background: "linear-gradient(135deg, oklch(from var(--primary) l c h / 0.18), oklch(from var(--accent) l c h / 0.18))" }}>
                  {a.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground/95">{a.title}</h3>
                  <p className="text-sm text-foreground/55">{a.org}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certifications" no="05" eyebrow="certifications" title="Credentials">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="glass rounded-2xl p-5 text-center h-full hover:-translate-y-1 hover:border-accent/40 transition-all">
                <div className="text-4xl mb-3">{c.icon}</div>
                <h3 className="font-semibold mb-1 text-sm">{c.title}</h3>
                <p className="text-xs text-foreground/55 mb-3">{c.org}</p>
                <span className="inline-block text-xs font-mono px-2.5 py-1 rounded-md bg-accent/15 text-accent border border-accent/25">
                  {c.score}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* EDUCATION */}
      <Section id="education" no="06" eyebrow="education" title="Academic Path">
        <div className="relative pl-8 md:pl-0">
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent md:-translate-x-1/2" />
          <div className="space-y-6">
            {EDUCATION.map((e, i) => (
              <Reveal key={e.degree} delay={i * 100}>
                <div className={`md:grid md:grid-cols-2 md:gap-10 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                  <div className="hidden md:block" />
                  <div className="relative [direction:ltr]">
                    <div className="absolute -left-7 md:left-auto md:-translate-x-[calc(50%+1.25rem)] top-5 md:top-6"
                      style={i % 2 ? { left: "auto", right: "-2rem" } : {}}>
                      <div className="w-3 h-3 rounded-full" style={{ background: "var(--gradient-primary)", boxShadow: "0 0 0 4px var(--background)" }} />
                      {e.active && <div className="absolute inset-0 rounded-full bg-primary" style={{ animation: "pulse-ring 2s infinite" }} />}
                    </div>
                    <div className="glass rounded-2xl p-5">
                      <p className="font-mono text-xs text-accent mb-1">{e.period}</p>
                      <h3 className="font-bold text-lg">{e.degree}</h3>
                      <p className="text-sm text-foreground/65">{e.school}</p>
                      <span className="inline-block mt-3 text-xs font-mono px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                        {e.detail}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" no="07" eyebrow="contact" title="Let's Connect">
        <p className="text-center text-foreground/60 max-w-xl mx-auto mb-10 -mt-4">
          Open to internships, collaborations, and exciting opportunities. Drop me a message!
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="space-y-3">
              {[
                { icon: "✉", label: "Email", value: "haribabu82044@gmail.com", href: "mailto:haribabu82044@gmail.com" },
                { icon: "◆", label: "LinkedIn", value: "linkedin.com/in/haribabu-cartigueyane", href: "https://www.linkedin.com/in/haribabu-cartigueyane" },
                { icon: "◉", label: "GitHub", value: "github.com/HariBabu-369", href: "https://github.com/HariBabu-369" },
                { icon: "□", label: "Phone", value: "+91 9361869132", href: "tel:+919361869132" },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                  className="glass rounded-xl p-4 flex items-center gap-4 hover:-translate-y-0.5 hover:border-primary/40 transition-all">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-foreground/50">{c.label}</div>
                    <div className="text-sm font-medium break-all">{c.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <form onSubmit={handleFormSubmit} className="glass rounded-2xl p-6 space-y-4">
              {sent && (
                <div className="px-4 py-3 rounded-lg bg-accent/15 text-accent border border-accent/30 text-sm">
                  Message sent! I'll get back to you soon.
                </div>
              )}
              {[
                { label: "Your Name", key: "name" as const, type: "text", placeholder: "John Doe" },
                { label: "Your Email", key: "email" as const, type: "email", placeholder: "john@example.com" },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs uppercase tracking-wider text-foreground/60 mb-1.5">{f.label}</label>
                  <input type={f.type} value={formState[f.key]} required placeholder={f.placeholder}
                    onChange={e => setFormState(s => ({ ...s, [f.key]: e.target.value }))}
                    className="w-full bg-foreground/5 border border-foreground/10 focus:border-primary/60 rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-foreground/30" />
                </div>
              ))}
              <div>
                <label className="block text-xs uppercase tracking-wider text-foreground/60 mb-1.5">Message</label>
                <textarea rows={4} value={formState.message} required placeholder="Tell me about your project or opportunity..."
                  onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  className="w-full bg-foreground/5 border border-foreground/10 focus:border-primary/60 rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-foreground/30 resize-none" />
              </div>
              <button type="submit" className="btn-primary w-full py-3 rounded-xl font-semibold text-sm">
                Send Message →
              </button>
            </form>
          </Reveal>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-foreground/5 py-10 px-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="font-mono font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">hb.dev</div>
            <p className="text-foreground/50 text-sm italic">"Code. Learn. Build. Repeat."</p>
          </div>
          <p className="text-foreground/40 text-xs font-mono">© 2024 Haribabu C · Built with React</p>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, no, eyebrow, title, children }: { id: string; no: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-12 text-center">
          <p className="font-mono text-xs text-primary mb-2">{no}. {eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">{title}</span>
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
