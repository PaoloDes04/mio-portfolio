import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Shield, Code, User, Mail, Briefcase, 
  GraduationCap, Award, ExternalLink, ChevronRight, 
  Github, Linkedin, Menu, X, Database, Server, Download
} from 'lucide-react';

// --- UI COMPONENTS ---

// Componente per le animazioni allo scroll
const RevealOnScroll = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const GlowingCard = ({ children, className = '' }) => (
  <div className={`relative group rounded-xl bg-slate-900/50 border border-slate-800 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] ${className}`}>
    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    {children}
  </div>
);

const SectionTitle = ({ title, subtitle, icon: Icon }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-2">
      {Icon && <Icon className="text-cyan-400 w-6 h-6" />}
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
    </div>
    {subtitle && <p className="text-slate-400 font-mono text-sm uppercase tracking-wider">{subtitle}</p>}
    <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-transparent mt-4 rounded-full" />
  </div>
);

const Badge = ({ children, className = '' }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${className}`}>
    {children}
  </span>
);

// --- MAIN APP ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = "Building Real-World Experience.";

  // Effetto di digitazione per la Hero
  useEffect(() => {
    let i = 0;
    setTypedText('');
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Griglia Cyber */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.05) 0%, transparent 70%)' }} />

      {/* Barra di navigazione */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 transition-all">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tighter">
            <Shield className="text-cyan-400 w-6 h-6" />
            <span>P.DESIDERIO</span>
          </div>
          
          {/* Navigazione Desktop */}
          <div className="hidden md:flex items-center gap-8 font-mono text-sm">
            {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="hover:text-cyan-400 transition-colors">
                <span className="text-cyan-500/50 mr-1">//</span>{item}
              </button>
            ))}
            <button onClick={() => scrollTo('contact')} className="px-5 py-2 rounded-md bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all font-semibold">
              Hire Me
            </button>
          </div>

          {/* Toggle Menu Mobile */}
          <button className="md:hidden text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Navigazione Mobile */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-slate-900 border-b border-slate-800 py-4 px-6 flex flex-col gap-4 font-mono">
            {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-left py-2 text-slate-300 hover:text-cyan-400">
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Contenuto Principale */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-32">
        
        {/* SEZIONE HERO */}
        <section id="hero" className="min-h-[80vh] flex flex-col-reverse md:flex-row items-center justify-between pt-10 gap-12">
          
          <div className="flex-1 flex flex-col justify-center items-start">
            <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
              Available for Opportunities
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Cyber Security Student <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                {typedText}<span className="animate-pulse border-r-4 border-cyan-400 ml-1"></span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
              I am <strong className="text-slate-200">Paolo Desiderio</strong>. Blending rigorous academic theory with a practical problem-solving mindset to build secure, robust systems. Ready to protect and innovate.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto">
              <button onClick={() => scrollTo('projects')} className="group flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 text-slate-950 rounded-lg font-bold hover:bg-cyan-400 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                View My Work <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => scrollTo('contact')} className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-slate-700 text-white rounded-lg font-bold hover:border-slate-500 hover:bg-slate-800 transition-all">
                <Mail className="w-5 h-5" /> Contact Me
              </button>
              <a href="/tuo-cv.pdf" download="Paolo_Desiderio_CV.pdf" className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 border border-slate-800 text-cyan-400 rounded-lg font-bold hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all">
                <Download className="w-5 h-5" /> Download CV
              </a>
            </div>
          </div>

          <div className="w-full md:w-auto flex justify-center md:justify-end mb-10 md:mb-0 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-cyan-500/30 p-2 backdrop-blur-sm group hover:border-cyan-400/80 transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center relative">
                <img 
                  src="https://i.imgur.com/L5mGwyc.jpg" 
                  alt="Paolo Desiderio" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 relative z-10" 
                />
              </div>
            </div>
          </div>

        </section>

        {/* SEZIONE ABOUT & SKILLS */}
        <section id="about" className="scroll-mt-32">
          <SectionTitle title="System Profile" subtitle="About Me & Core Competencies" icon={User} />
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 text-slate-400 leading-relaxed text-lg">
              <p>
                My journey into technology is driven by a deep curiosity about how complex systems operate—and, more importantly, how to secure them against modern threats.
              </p>
              <p>
                Currently pursuing a degree in <strong className="text-cyan-400 font-medium">Computer Engineering and Cyber Security</strong>, I refuse to be limited to just theoretical concepts. I am highly practical, focusing on hands-on development, continuous growth, and adapting quickly to new challenges.
              </p>
              <p>
                Whether it's managing customer interactions in a fast-paced environment or developing full-stack applications with secure authentication, I bring a unique blend of <span className="text-white">technical aptitude and strong soft skills</span> to every team I join.
              </p>
            </div>

            <GlowingCard>
              <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                Technical & Soft Skills
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-sm text-slate-500 mb-3 uppercase">Security & Dev</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Cyber Security Fundamentals', 'Python / Django', 'Network Security', 'Linux Environment', 'React / Web Tech'].map(skill => (
                      <Badge key={skill} className="bg-slate-800 border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors cursor-default">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-mono text-sm text-slate-500 mb-3 uppercase">Professional Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Problem Solving', 'Customer Service', 'Cross-Cultural Communication', 'Adaptability'].map(skill => (
                      <Badge key={skill} className="bg-slate-800/50 border-slate-700/50 text-slate-400 cursor-default">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-sm text-slate-500 mb-3 uppercase">Languages</h4>
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1 text-sm text-slate-300"><span className="w-2 h-2 rounded-full bg-cyan-400"></span> Italian (Native)</span>
                    <span className="flex items-center gap-1 text-sm text-slate-300"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> English (Professional)</span>
                  </div>
                </div>
              </div>
            </GlowingCard>
          </div>
        </section>

        {/* ESPERIENZA & FORMAZIONE */}
        <section id="experience" className="scroll-mt-32">
          <RevealOnScroll>
            <SectionTitle title="Experience & Education" subtitle="My professional and academic timeline" icon={Briefcase} />
          </RevealOnScroll>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Colonna Formazione */}
            <div className="space-y-6">
              <RevealOnScroll delay={100}>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                  <GraduationCap className="text-cyan-400" /> Academic Background
                </h3>
              </RevealOnScroll>
              
              <RevealOnScroll delay={200}>
                <GlowingCard className="relative pl-8">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-500 to-transparent rounded-l-xl" />
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Currently Enrolled</Badge>
                    <span className="text-xs text-slate-500 font-mono">2023 - Present</span>
                  </div>
                  <h4 className="text-lg font-bold text-white">Computer Engineering and Cyber Security (L-8)</h4>
                  <p className="text-slate-400 font-medium mb-2">Università degli Studi di Napoli Parthenope</p>
                  <p className="text-sm text-slate-500 mt-2">Deep-diving into network protocols, cryptographic systems, and secure software engineering methodologies.</p>
                </GlowingCard>
              </RevealOnScroll>

              <RevealOnScroll delay={400}>
                <GlowingCard className="relative pl-8">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-blue-800 to-transparent rounded-l-xl" />
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-slate-800 text-slate-300 border-slate-700">Graduated</Badge>
                    <span className="text-xs text-slate-500 font-mono">2018 - 2023</span>
                  </div>
                  <h4 className="text-lg font-bold text-white">High school Diploma: Computer Science and Telecommunications</h4>
                  <p className="text-slate-400 font-medium">I.I.S. Antonio Pacinotti (Scafati)</p>
                  <p className="text-sm text-slate-500 mt-2">Built foundational knowledge in computer science, telecommunications, and basic programming.</p>
                </GlowingCard>
              </RevealOnScroll>
            </div>

            {/* Colonna Esperienza & Certificazioni */}
            <div className="space-y-6">
              <RevealOnScroll delay={150}>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                  <Award className="text-emerald-400" /> Experience & Programs
                </h3>
              </RevealOnScroll>

              <RevealOnScroll delay={300}>
                <GlowingCard className="relative pl-8 border-emerald-500/20">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-emerald-500 to-transparent rounded-l-xl" />
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Certified</Badge>
                      <span className="text-xs text-slate-500 font-mono">2023</span>
                    </div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-5 h-5 opacity-50 invert" />
                  </div>
                  <h4 className="text-lg font-bold text-white mt-1">Apple Foundation Program</h4>
                  <p className="text-emerald-400 font-mono text-sm mb-4">Basic & Advanced Course Completion</p>
                  <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
                    <li>Mastered Swift fundamentals and iOS app design.</li>
                    <li>Collaborated in agile teams to prototype real-world solutions.</li>
                    <li>Focused on UX/UI principles and performance optimization.</li>
                  </ul>
                  
                  {/* Bottoni Attestati */}
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a href="https://drive.google.com/file/d/1VoqzZSsImhyWdMHW-MV1SSDx2ReZfY0P/view?usp=drive_link" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40 rounded-lg text-xs font-bold transition-all">
                      <ExternalLink className="w-3.5 h-3.5" /> Basic Certificate
                    </a>
                    <a href="https://drive.google.com/file/d/1n6GxIesDRXbm_nhlDz-vpFStSjQGQyhb/view?usp=drive_link" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40 rounded-lg text-xs font-bold transition-all">
                      <ExternalLink className="w-3.5 h-3.5" /> Advanced Certificate
                    </a>
                  </div>
                </GlowingCard>
              </RevealOnScroll>

              <RevealOnScroll delay={500}>
                <GlowingCard className="relative pl-8 border-orange-500/20">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-500 to-transparent rounded-l-xl" />
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">Work Experience</Badge>
                    <span className="text-xs text-slate-500 font-mono">Summer 2023 & On-call</span>
                  </div>
                  <h4 className="text-lg font-bold text-white">Greeter</h4>
                  <p className="text-orange-400 font-medium mb-4">Askos Tour</p>
                  <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
                    <li>Managed front-line customer interactions for an international client base.</li>
                    <li>Drastically improved professional English communication skills.</li>
                    <li>Developed crisis-management and rapid problem-solving abilities.</li>
                  </ul>
                </GlowingCard>
              </RevealOnScroll>
            </div>

          </div>
        </section>

        {/* SEZIONE PROGETTI */}
        <section id="projects" className="scroll-mt-32">
          <SectionTitle title="Featured Builds" subtitle="Proof of work & implementation" icon={Code} />
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group rounded-xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-colors">
              <div className="h-48 bg-slate-950 border-b border-slate-800 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950" />
                <div className="relative z-10 flex gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  <Server className="w-12 h-12 text-cyan-500" />
                  <Database className="w-12 h-12 text-emerald-500" />
                </div>
                <div className="absolute bottom-4 left-4 font-mono text-xs text-cyan-500/50">SYSTEM_STATUS: ONLINE</div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">Tour Operator Management System</h3>
                  <a href="https://github.com/PaoloDes04/Project_databases" target="_blank" rel="noreferrer" className="p-2 bg-slate-800 rounded-md hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors text-slate-400">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                  A robust, full-stack platform built for Askos Tours to streamline operations. I engineered the backend logic to handle diverse user flows securely.
                </p>
                <ul className="text-sm text-slate-300 space-y-2 mb-6">
                  <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-400" /> Engineered Secure Authentication Systems</li>
                  <li className="flex items-center gap-2"><User className="w-4 h-4 text-cyan-400" /> Implemented Role-Based Access Control (RBAC)</li>
                  <li className="flex items-center gap-2"><Code className="w-4 h-4 text-purple-400" /> Built Dynamic Review & Filtering Logic</li>
                </ul>
                <div className="flex gap-2">
                  <Badge className="bg-slate-950 text-slate-300 border-slate-800">Django</Badge>
                  <Badge className="bg-slate-950 text-slate-300 border-slate-800">Python</Badge>
                  <Badge className="bg-slate-950 text-slate-300 border-slate-800">SQL</Badge>
                </div>
              </div>
            </div>

            <div className="group rounded-xl bg-slate-900/30 border border-slate-800 border-dashed flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
              <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                <Terminal className="w-8 h-8 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-300 mb-2">More Projects Compiling...</h3>
              <p className="text-slate-500 text-sm max-w-xs">
                Actively building and learning. New cyber security research and web applications will be deployed here soon.
              </p>
              <div className="mt-6 font-mono text-xs text-emerald-500/70 animate-pulse">
                &gt; git commit -m "Continuous Growth"
              </div>
            </div>
          </div>
        </section>

        {/* SEZIONE CONTATTO - Versione con solo Link Social */}
        <section id="contact" className="scroll-mt-32">
          <GlowingCard className="text-center p-12 md:p-20 border-cyan-500/20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Work Together</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg">
              Whether you have an opportunity, a project, or just want to discuss the latest in cybersecurity, I'm always open to connecting with forward-thinking teams.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="mailto:paolodp004@gmail.com" className="group flex items-center justify-center gap-3 px-8 py-5 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all border border-slate-700 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                <Mail className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-lg">paolodp004@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/paolo-desiderio-9979b9394/" target="_blank" rel="noreferrer" className="group flex items-center justify-center gap-3 px-8 py-5 bg-[#0A66C2] text-white rounded-xl font-bold hover:bg-[#004182] transition-all border border-[#0A66C2] hover:shadow-[0_0_20px_rgba(10,102,194,0.3)]">
                <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-lg">Connect on LinkedIn</span>
              </a>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-800/50 font-mono text-xs text-slate-500 tracking-widest uppercase">
              Handshake Protocol Ready
            </div>
          </GlowingCard>
        </section>

      </main>

      {/* PIÈ DI PAGINA */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 relative z-10 text-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white font-bold tracking-tighter opacity-80">
            <Shield className="text-cyan-400 w-5 h-5" />
            <span>P.DESIDERIO</span>
          </div>
          <p className="text-slate-500 text-sm font-mono">
            &copy; {new Date().getFullYear()} Paolo Desiderio. System Secured.
          </p>
          <div className="flex gap-6">
            <a href="https://github.com/PaoloDes04" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors"><Github className="w-6 h-6" /></a>
            <a href="https://www.linkedin.com/in/paolo-desiderio-9979b9394/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors"><Linkedin className="w-6 h-6" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}