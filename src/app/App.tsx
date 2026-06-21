import { useState, useEffect, useRef } from "react";
import {
  Palette,
  Linkedin,
  Mail,
  MapPin,
  ChevronDown,
  ExternalLink,
  BookOpen,
  Menu,
  X,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Layers,
  Send,
} from "lucide-react";
// ─── IMPORTS IMAGES ──────────────────────────────────────────
import profileImg         from "../assets/profile.png";
import novatechImg        from "../assets/novatech.webp";
import restoappImg        from "../assets/restoapp.png";
import baridimobImg       from "../assets/baridimob.png";
import luxuryappImg       from "../assets/luxuryapp.webp";
import social1Img         from "../assets/social1.webp";
import social2Img         from "../assets/social2.webp";
import brandingImg        from "../assets/branding.webp";
import formationMasterImg    from "../assets/industrial-automation_2024.jpg";
import formationMarketingImg from "../assets/Marketing-Strategy.webp";
import formationDesignImg    from "../assets/The-Aesthetic-Usability-Effect.webp";
// ─── COLOR TOKENS ────────────────────────────────────────────
const C = {
  accent:    "#214E34", // Primaire / Accent (vert profond)
  secondary: "#5C7457", // Secondaire (vert sauge)
  neutralDark: "#979B8D", // Neutre foncé (kaki gris)
  neutralLight: "#C1BCAC", // Neutre clair (beige taupe)
  bg:        "#EFD0CA", // Background / Clair (rose poudré)
  bgDark:    "#1A1F1B", // Background sombre principal
  bgDeep:    "#101410", // Background très sombre
  bgCard:    "#1E251F", // Cards
  text:      "#EFD0CA", // Texte principal (sur fond sombre)
  textMuted: "#979B8D", // Texte atténué
};

// ─── Particles Canvas ────────────────────────────────────────────────────────

function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const count = Math.min(90, Math.floor((W * H) / 12000));
    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number };
    const pts: P[] = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      a: Math.random() * 0.7 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        // [CHANGE 1] Couleur particules → accent vert
        ctx.fillStyle = `rgba(92,116,87,${p.a})`;
        ctx.fill();
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            // [CHANGE 1] Couleur lignes → secondaire vert sauge
            ctx.strokeStyle = `rgba(92,116,87,${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// ─── Typing Effect ────────────────────────────────────────────────────────────

const TYPING_TEXTS = ["UI/UX Designer", "Brand Designer", "SM Manager",];

function TypingText() {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = TYPING_TEXTS[idx];
    const delay = deleting ? 60 : charIdx === current.length ? 1800 : 110;

    const t = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setText(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        } else {
          setDeleting(true);
        }
      } else {
        if (charIdx > 0) {
          setText(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setIdx((i) => (i + 1) % TYPING_TEXTS.length);
        }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, idx]);

  return (
    <span>
      {text}
      {/* [CHANGE 1] Curseur clignotant → couleur accent */}
      <span
        className="inline-block w-0.5 h-6 ml-0.5 align-middle animate-pulse"
        style={{ backgroundColor: C.accent }}
      />
    </span>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="text-center mb-16">
      {/* [CHANGE 1] Tag → accent vert */}
      <span
        className="text-xs tracking-[0.3em] uppercase font-medium mb-3 block"
        style={{ color: C.accent }}
      >
        {tag}
      </span>
      <h2
        className="text-4xl md:text-5xl font-bold leading-tight"
        style={{ fontFamily: "'Playfair Display', serif", color: C.text }}
      >
        {title}
      </h2>
      {/* [CHANGE 1] Ligne décorative → dégradé accent vert */}
      <div
        className="mx-auto mt-5 h-px w-16"
        style={{ background: `linear-gradient(to right, transparent, ${C.accent}, transparent)` }}
      />
    </div>
  );
}

// ─── Skills data ─────────────────────────────────────────────
const SKILLS = [
  { name: "Figma", emoji: "🎨" },
  { name: "Adobe XD", emoji: "✏️" },
  { name: "Adobe Illustrator", emoji: "🖊️" },
  { name: "Adobe Photoshop", emoji: "🖼️" },
  { name: "Adobe After Effects", emoji: "🎬" },
  { name: "Motion Design", emoji: "⚡" },
  { name: "Webflow", emoji: "🌐" },
  { name: "UI/UX Design", emoji: "💡" },
  { name: "Brand Identity", emoji: "💎" },
  { name: "Brand Strategy", emoji: "🎭" },
  { name: "Prototyping", emoji: "📱" },
  { name: "Design Systems", emoji: "🗂️" },
  { name: "User Research", emoji: "🔍" },       
  { name: "Wireframing", emoji: "📐" },          
  { name: "Social Media Design", emoji: "📣" }, 
  { name: "Typography", emoji: "🔤" },           
  { name: "C / C++", emoji: "💻" },              
  { name: "POO", emoji: "🧩" },                 
];

// ─── Projects data ────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "NovaTech",
    desc: "Interface futuriste pour une startup technologique — design system complet et expérience utilisateur immersive.",
    img: novatechImg,
    tags: ["UI/UX", "Tech"],
    caseStudyUrl: "https://www.behance.net/gallery/234744165/Site-vitrine-NovaTech-Solutions-",
  },
  {
    title: "RestoApp",
    desc: "Application mobile de réservation restaurant avec parcours utilisateur optimisé et identité visuelle gourmande.",
    img: restoappImg,
    tags: ["Mobile", "UX"],
    caseStudyUrl: "https://www.behance.net/gallery/180200527/Food-App-design",
  },
  {
    title: "BaridiMob Refonte",
    desc: "Refonte complète de l'application BaridiMob — accessibilité améliorée, navigation repensée, interface modernisée.",
    img: baridimobImg,
    tags: ["Refonte", "Mobile"],
    caseStudyUrl: "https://www.behance.net/gallery/179153139/Redesign-de-lapplication-BaridiMob",
  },
  {
    title: "Luxury UI App",
    desc: "Application haut de gamme pour une maison de luxe — typographie raffinée, palette sombre et or, micro-animations.",
    img: luxuryappImg,
    tags: ["Luxe", "UI"],
    caseStudyUrl: "/case-study/luxury-ui",
  },
  {
    title: "Social Media Kit 01",
    desc: "Kit de visuels pour réseaux sociaux — cohérence graphique, templates modulables, identité forte.",
    img: social1Img,
    tags: ["Social", "Brand"],
    caseStudyUrl: "/case-study/social-kit-01",
  },
  {
    title: "Social Media Kit 02",
    desc: "Deuxième série de contenus sociaux — campagne saisonnière avec direction artistique distinctive.",
    img: social2Img,
    tags: ["Social", "Motion"],
    caseStudyUrl: "/case-study/social-kit-02",
  },
  {
    title: "Branding & Identité Visuelle",
    desc: "Création d'identité visuelle de A à Z — logo, charte graphique, déclinaisons print et digital.",
    img: brandingImg,
    tags: ["Branding", "Identity"],
    caseStudyUrl: "/case-study/branding-identite",
  },
];

// ─── Experience data ──────────────────────────────────────────────────────────

const EXPERIENCES = [
  {
    role: "Chargée de communication et marketing digital",
    company: "Numilex",
    period: "Oct 2025 – Mai 2026",
    desc: "Pilotage de la stratégie de communication digitale, création de contenus visuels, gestion des campagnes marketing et coordination des actions de branding.",
    icon: <Briefcase size={18} />,
    side: "left",
  },
  {
    role: "Designer Graphique / UI-UX Freelance",
    company: "Indépendante",
    period: "2021 – Présent",
    desc: "Conception d'interfaces, identités visuelles et contenus digitaux pour des clients variés à travers le monde. Plus de 30 projets livrés.",
    icon: <Palette size={18} />,
    side: "right",
  },
  {
    role: "Community Manager",
    company: "Groupe Collable",
    period: "Juin – Juillet 2025",
    desc: "Animation des réseaux sociaux, création de contenu éditorial et graphique, suivi des indicateurs de performance et engagement communautaire.",
    icon: <Layers size={18} />,
    side: "left",
  },
  {
    role: "Téléconseillère",
    company: "Intact Assurance",
    period: "Juin – Déc 2024",
    desc: "Accompagnement client, gestion des demandes, traitement des dossiers et application des procédures qualité dans un environnement exigeant.",
    icon: <Briefcase size={18} />,
    side: "right",
  },
];

// ─── Formation data ───────────────────────────────────────────────────────────
const FORMATION = [
  {
    title: "Master en Automatique",
    subtitle: "Université — Spécialisation Informatique industrielle",
    img: formationMasterImg,
    icon: <GraduationCap size={20} />,
  },
  {
    title: "Certificat en Marketing",
    subtitle: "Formation certifiante — Stratégie & Communication",
    img: formationMarketingImg,
    icon: <BookOpen size={20} />,
  },
  {
    title: "Certifications Design",
    subtitle: "Google UX Design · Figma Advanced · Brand Strategy",
    img: formationDesignImg,
    icon: <Palette size={20} />,
  },
];

// ─── Project Card ─────────────────────────────────────────────
function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        background: C.bgCard,
        // [CHANGE 1] Bordure → accent vert
        border: `1px solid rgba(33,78,52,0.18)`,
        transition: "transform 0.4s cubic-bezier(.25,.8,.25,1), box-shadow 0.4s",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered
          ? `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(33,78,52,0.35)`
          : "0 4px 20px rgba(0,0,0,0.3)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden h-52 bg-neutral-900">
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{
            transition: "transform 0.6s cubic-bezier(.25,.8,.25,1)",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: hovered
              ? "linear-gradient(to bottom, rgba(15,20,15,0.1) 0%, rgba(15,20,15,0.75) 100%)"
              : "linear-gradient(to bottom, rgba(15,20,15,0) 0%, rgba(15,20,15,0.6) 100%)",
            transition: "background 0.4s",
          }}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full font-medium"
              // [CHANGE 1] Tags → couleur accent vert
              style={{ background: "rgba(33,78,52,0.22)", color: C.bg, backdropFilter: "blur(6px)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5">
        <h3
          className="text-lg font-semibold mb-2"
          style={{ fontFamily: "'Playfair Display', serif", color: C.text }}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: C.neutralDark }}>
          {project.desc}
        </p>
        {/* [CHANGE 6] Seul bouton "Case Study" conservé, transformé en lien */}
        <a
          href={project.caseStudyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full transition-all"
          style={{
            border: `1px solid rgba(33,78,52,0.45)`,
            color: C.accent,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = `rgba(33,78,52,0.12)`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
          }}
        >
          <BookOpen size={12} /> Case Study
        </a>
      </div>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Accueil", "Sur moi", "Compétences", "Formation", "Projets", "Expérience", "Contact"];
const NAV_IDS = ["home", "about", "skills", "formation", "projects", "experience", "contact"];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
    setActive(id);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(16,20,16,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid rgba(33,78,52,0.18)` : "none",
          padding: scrolled ? "12px 0" : "20px 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            className="flex items-center gap-2.5 group"
            onClick={() => scrollTo("home")}
          >
            {/* [CHANGE 1] Logo icon → accent vert */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.secondary})` }}
            >
              <Palette size={15} color={C.bg} />
            </div>
            <span
              className="font-semibold text-sm tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif", color: C.text }}
            >
              Anya Lalaoui
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((label, i) => (
              <button
                key={label}
                onClick={() => scrollTo(NAV_IDS[i])}
                className="text-xs tracking-widest uppercase font-medium transition-all"
                style={{
                  // [CHANGE 1] Nav active → accent vert
                  color: active === NAV_IDS[i] ? C.accent : `rgba(193,188,172,0.75)`,
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen((o) => !o)}
            style={{ color: C.text }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col pt-20"
        style={{
          background: "rgba(10,14,10,0.97)",
          backdropFilter: "blur(20px)",
          pointerEvents: mobileOpen ? "auto" : "none",
          opacity: mobileOpen ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        <div className="flex flex-col items-center gap-8 pt-10">
          {NAV_LINKS.map((label, i) => (
            <button
              key={label}
              onClick={() => scrollTo(NAV_IDS[i])}
              className="text-lg tracking-widest uppercase font-medium"
              style={{ color: C.text }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div
      style={{
        background: C.bgDark,
        color: C.text,
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
      }}
    >
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: C.bgDark }}
      >
        <ParticlesCanvas />

        {/* [CHANGE 1] Gradient overlay → teinté vert accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(33,78,52,0.09) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <p
                className="text-xs tracking-[0.4em] uppercase mb-6 font-medium"
                style={{ color: C.accent }}
              >
                Portfolio
              </p>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: C.text }}
              >
                Bonjour,<br />
                {/* [CHANGE 1] "Je suis" → couleur accent vert */}
                <span style={{ color: C.accent }}>Je suis</span><br />
                Anya Lalaoui
              </h1>

              <div
                className="text-xl md:text-2xl mb-10 font-light h-8"
                style={{ color: `rgba(193,188,172,0.85)` }}
              >
                <TypingText />
              </div>

              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={() =>
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium transition-all hover:opacity-90"
                  style={{
                    // [CHANGE 1] Bouton CTA → dégradé vert accent→secondaire
                    background: `linear-gradient(135deg, ${C.accent} 0%, ${C.secondary} 100%)`,
                    color: C.bg,
                    boxShadow: `0 8px 30px rgba(33,78,52,0.35)`,
                  }}
                >
                  En savoir plus <ChevronDown size={15} />
                </button>

                <a
                  href="https://www.linkedin.com/in/ania-lalaoui-4302a52a6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium transition-all"
                  style={{
                    // [CHANGE 1] Bouton LinkedIn → bordure accent vert
                    border: `1px solid rgba(33,78,52,0.5)`,
                    color: C.secondary,
                  }}
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
              </div>

              <div className="flex items-center gap-6">
                <div
                  className="flex items-center gap-3"
                  style={{ color: `rgba(193,188,172,0.45)` }}
                >
                  <div className="h-px w-10" style={{ background: `rgba(33,78,52,0.4)` }} />
                  <span className="text-xs tracking-widest uppercase">
                    UI/UX · Brand · Motion
                  </span>
                </div>
              </div>
            </div>

            {/* Right — hero image */}
            {/* [CHANGE 2] Photo remplacée par src/assets/profile.png */}
            <div className="relative hidden md:flex justify-center">
              <div
                className="relative w-[380px] h-[480px] rounded-3xl overflow-hidden"
                style={{
                  border: `1px solid rgba(33,78,52,0.25)`,
                  boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(33,78,52,0.1)`,
                }}
              >
                {/* [CHANGE 2] Nouvelle source image : assets/profile.png */}
                <img
                  src={profileImg}
                  alt="Anya Lalaoui — portrait"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(16,20,16,0) 60%, rgba(16,20,16,0.7) 100%)",
                  }}
                />
              </div>

              {/* floating badge */}
              <div
                className="absolute -bottom-4 -left-8 px-5 py-3 rounded-2xl"
                style={{
                  background: "rgba(30,37,31,0.92)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid rgba(33,78,52,0.25)`,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                }}
              >
                <p className="text-xs" style={{ color: C.neutralDark }}>Disponible</p>
                <p
                  className="font-semibold text-sm"
                  style={{ fontFamily: "'Playfair Display', serif", color: C.accent }}
                >
                  Pour de nouveaux projets
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: `rgba(193,188,172,0.3)` }}
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <div
            className="w-px h-10 animate-pulse"
            // [CHANGE 1] Scroll hint → couleur accent vert
            style={{ background: `linear-gradient(to bottom, ${C.accent}, transparent)` }}
          />
        </div>
      </section>

      {/* ── SUR MOI ───────────────────────────────────────────── */}
      {/* [CHANGE 3] Photo supprimée, contenu centré, texte enrichi en mode prestataire pro */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader tag="À propos" title="Sur Moi" />

          {/* [CHANGE 3] Texte professionnel orienté services, sans photo */}
          <h3
            className="text-3xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: C.accent }}
          >
            Votre partenaire créative pour un digital qui marque
          </h3>

          <p
            className="text-base leading-relaxed mb-5 mx-auto max-w-2xl"
            style={{ color: `rgba(193,188,172,0.8)` }}
          >
            Je suis <strong style={{ color: C.text }}>Anya Lalaoui</strong>, Designer UI/UX & Brand
            basée en Algérie, spécialisée dans la conception d'expériences digitales à haute valeur
            perçue. Forte d'une formation en ingénierie et d'une pratique créative affûtée depuis 2021,
            je transforme les ambitions de marque en interfaces fonctionnelles, esthétiques et mémorables.
          </p>

          <p
            className="text-base leading-relaxed mb-5 mx-auto max-w-2xl"
            style={{ color: `rgba(193,188,172,0.8)` }}
          >
            Mon offre de services couvre trois axes stratégiques :{" "}
            <strong style={{ color: C.neutralLight }}>Design UI/UX</strong> — de la recherche
            utilisateur au prototype haute fidélité, en passant par les design systems évolutifs ;{" "}
            <strong style={{ color: C.neutralLight }}>Branding & Identité Visuelle</strong> — création
            de logotypes, chartes graphiques et déclinaisons print/digital cohérentes ; et{" "}
            <strong style={{ color: C.neutralLight }}>Social Media Management</strong> — production de
            contenus visuels percutants, kits modulables et stratégie éditoriale orientée engagement.
          </p>

          <p
            className="text-base leading-relaxed mb-10 mx-auto max-w-2xl"
            style={{ color: `rgba(193,188,172,0.8)` }}
          >
            Je travaille en remote avec des clients en Algérie et à l'international. Chaque collaboration
            est traitée comme un partenariat : rigueur analytique, écoute active, livrables de qualité
            studio. Si vous cherchez un regard créatif exigeant pour faire passer votre marque au niveau
            supérieur, parlons-en.
          </p>

          {/* [CHANGE 3] Infos contact centrées */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-3" style={{ color: `rgba(193,188,172,0.7)` }}>
              <Mail size={16} style={{ color: C.accent }} />
              <span className="text-sm">ayna.designpro@gmail.com</span>
            </div>
            <div className="flex items-center gap-3" style={{ color: `rgba(193,188,172,0.7)` }}>
              <MapPin size={16} style={{ color: C.accent }} />
              <span className="text-sm">Béjaia, Algérie · Disponible à distance</span>
            </div>
          </div>

          {/* [CHANGE 4] Bouton "Voir mon CV" SUPPRIMÉ — aucun bouton CV ici */}
        </div>
      </section>

      {/* ── COMPÉTENCES ──────────────────────────────────────────── */}
      <section
        id="skills"
        className="py-28 px-6"
        // [CHANGE 1] Background section → très sombre teinté vert
        style={{ background: "#111614" }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader tag="Outils & Savoir-faire" title="Compétences & Outils" />
          {/* [CHANGE 5] Grille élargie pour accueillir les nouvelles compétences */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {SKILLS.map((skill) => (
              <div
                key={skill.name}
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-300 cursor-default"
                style={{
                  background: C.bgCard,
                  // [CHANGE 1] Bordure → vert accent
                  border: `1px solid rgba(33,78,52,0.14)`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(33,78,52,0.5)`;
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.4)";
                  (e.currentTarget as HTMLDivElement).style.background = `rgba(33,78,52,0.08)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(33,78,52,0.14)`;
                  (e.currentTarget as HTMLDivElement).style.transform = "none";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLDivElement).style.background = C.bgCard;
                }}
              >
                <span className="text-3xl">{skill.emoji}</span>
                <span
                  className="text-sm font-medium text-center"
                  style={{ color: C.text }}
                >
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMATION ─────────────────────────────────────────────── */}
      <section id="formation" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader tag="Parcours académique" title="Ma Formation" />
          <div className="grid md:grid-cols-3 gap-6">
            {FORMATION.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: C.bgCard,
                  border: `1px solid rgba(33,78,52,0.15)`,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(33,78,52,0.4)`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 50px rgba(0,0,0,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "none";
                  (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(33,78,52,0.15)`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
                }}
              >
                <div className="relative h-44 overflow-hidden bg-neutral-900">
                  <img
                    src={f.img}
                    alt={f.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 30%, rgba(30,37,31,0.85) 100%)",
                    }}
                  />
                  {/* [CHANGE 1] Icône formation → couleur accent vert */}
                  <div
                    className="absolute bottom-3 left-4 w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(33,78,52,0.25)", backdropFilter: "blur(8px)", color: C.accent }}
                  >
                    {f.icon}
                  </div>
                </div>
                <div className="p-5">
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ fontFamily: "'Playfair Display', serif", color: C.text }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: C.neutralDark }}>
                    {f.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJETS ───────────────────────────────────────────────── */}
      <section
        id="projects"
        className="py-28 px-6"
        style={{ background: "#111614" }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader tag="Portfolio" title="Projets Réalisés" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPÉRIENCE ────────────────────────────────────────────── */}
      <section id="experience" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader tag="Parcours professionnel" title="Expérience" />

          {/* Timeline */}
          <div className="relative">
            {/* center line */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
              style={{
                // [CHANGE 1] Ligne timeline → vert accent
                background:
                  `linear-gradient(to bottom, transparent, rgba(33,78,52,0.35) 10%, rgba(33,78,52,0.35) 90%, transparent)`,
              }}
            />

            <div className="space-y-12">
              {EXPERIENCES.map((exp, i) => (
                <div key={i} className="relative">
                  {/* Center dot */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full hidden md:flex items-center justify-center z-10"
                    style={{
                      // [CHANGE 1] Dot timeline → gradient vert
                      background: `linear-gradient(135deg, ${C.accent}, ${C.secondary})`,
                      boxShadow: `0 0 0 4px rgba(33,78,52,0.2)`,
                    }}
                  />

                  <div
                    className={`md:w-[45%] ${
                      exp.side === "right" ? "md:ml-[55%]" : ""
                    }`}
                  >
                    <div
                      className="p-6 rounded-2xl transition-all duration-300"
                      style={{
                        background: C.bgCard,
                        border: `1px solid rgba(33,78,52,0.15)`,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(33,78,52,0.4)`;
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(33,78,52,0.15)`;
                        (e.currentTarget as HTMLDivElement).style.transform = "none";
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            // [CHANGE 1] Icône expérience → fond vert accent
                            background: "rgba(33,78,52,0.15)",
                            color: C.accent,
                          }}
                        >
                          {exp.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-[10px] tracking-widest uppercase mb-1 font-medium"
                            style={{ color: C.accent }}
                          >
                            {exp.period}
                          </p>
                          <h3
                            className="text-base font-semibold mb-0.5"
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              color: C.text,
                            }}
                          >
                            {exp.role}
                          </h3>
                          <p
                            className="text-xs mb-3 font-medium"
                            style={{ color: C.neutralDark }}
                          >
                            {exp.company}
                          </p>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: `rgba(193,188,172,0.65)` }}
                          >
                            {exp.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-28 px-6"
        style={{ background: "#111614" }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader tag="Travaillons ensemble" title="Contact" />
          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* Left image */}
            <div className="relative hidden md:block">
              <div
                className="relative rounded-3xl overflow-hidden h-[420px] bg-neutral-900"
                style={{
                  border: `1px solid rgba(33,78,52,0.2)`,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1542435503-956c469947f6?w=600&h=800&fit=crop&auto=format"
                  alt="Contact"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-8"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(16,20,16,0.92) 0%, rgba(16,20,16,0.1) 60%)",
                  }}
                >
                  <p
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", color: C.text }}
                  >
                    "Le design est la façon dont ce qui est fait répond à ce qui est voulu."
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: "Votre nom", key: "name", type: "text", placeholder: "Anya Lalaoui" },
                {
                  label: "Adresse email",
                  key: "email",
                  type: "email",
                  placeholder: "hello@example.com",
                },
              ].map((field) => (
                <div key={field.key}>
                  <label
                    className="block text-xs tracking-widest uppercase mb-2 font-medium"
                    style={{ color: C.neutralDark }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))
                    }
                    className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: C.bgCard,
                      // [CHANGE 1] Bordure champ → vert accent
                      border: `1px solid rgba(33,78,52,0.2)`,
                      color: C.text,
                    }}
                    onFocus={(e) =>
                      ((e.target as HTMLInputElement).style.borderColor = `rgba(33,78,52,0.6)`)
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLInputElement).style.borderColor = `rgba(33,78,52,0.2)`)
                    }
                  />
                </div>
              ))}

              <div>
                <label
                  className="block text-xs tracking-widest uppercase mb-2 font-medium"
                  style={{ color: C.neutralDark }}
                >
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Parlez-moi de votre projet..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all resize-none"
                  style={{
                    background: C.bgCard,
                    border: `1px solid rgba(33,78,52,0.2)`,
                    color: C.text,
                  }}
                  onFocus={(e) =>
                    ((e.target as HTMLTextAreaElement).style.borderColor = `rgba(33,78,52,0.6)`)
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLTextAreaElement).style.borderColor = `rgba(33,78,52,0.2)`)
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-medium transition-all hover:opacity-90"
                style={{
                  // [CHANGE 1] Bouton submit → gradient vert
                  background: `linear-gradient(135deg, ${C.accent}, ${C.secondary})`,
                  color: C.bg,
                  boxShadow: `0 8px 30px rgba(33,78,52,0.3)`,
                }}
              >
                {formSent ? (
                  "Message envoyé ✓"
                ) : (
                  <>
                    <Send size={15} /> Envoyer le message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer
        className="py-16 px-6"
        style={{
          background: C.bgDeep,
          borderTop: `1px solid rgba(33,78,52,0.14)`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.secondary})` }}
                >
                  <Palette size={16} color={C.bg} />
                </div>
                <span
                  className="font-bold text-lg"
                  style={{ fontFamily: "'Playfair Display', serif", color: C.text }}
                >
                  Anya Lalaoui
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: C.neutralDark }}>
                UI/UX & Brand Designer. Créatrice d'expériences digitales élégantes et
                mémorables, entre rigueur et sensibilité artistique.
              </p>
            </div>

            {/* Links */}
            <div>
              <p
                className="text-xs tracking-widest uppercase mb-5 font-medium"
                style={{ color: C.accent }}
              >
                Liens rapides
              </p>
              <div className="space-y-3">
                {NAV_LINKS.map((label, i) => (
                  <button
                    key={label}
                    onClick={() =>
                      document
                        .getElementById(NAV_IDS[i])
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="block text-sm transition-all"
                    style={{ color: C.neutralDark }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.neutralLight)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.neutralDark)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p
                className="text-xs tracking-widest uppercase mb-5 font-medium"
                style={{ color: C.accent }}
              >
                Contact
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={14} style={{ color: C.accent }} />
                  <span className="text-sm" style={{ color: C.neutralDark }}>
                    ayna.designpro@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={14} style={{ color: C.accent }} />
                  <span className="text-sm" style={{ color: C.neutralDark }}>
                    Algérie · Remote
                  </span>
                </div>
                <a
                  href="https://www.linkedin.com/in/ania-lalaoui-4302a52a6/"
                  className="flex items-center gap-3 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={14} style={{ color: C.accent }} />
                  <span
                    className="text-sm transition-colors"
                    style={{ color: C.neutralDark }}
                  >
                    LinkedIn
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: `1px solid rgba(33,78,52,0.1)` }}
          >
            <p className="text-xs" style={{ color: `rgba(151,155,141,0.6)` }}>
              © 2026 Anya Lalaoui · Tous droits réservés
            </p>
            <p className="text-xs" style={{ color: `rgba(151,155,141,0.4)` }}>
              Conçu avec soin · UI/UX - Brand Design & SM Manager
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}