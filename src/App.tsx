import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Code2,
  Download,
  FileText,
  GitBranch,
  Mail,
  MapPin,
  Network,
  PenTool,
  Wrench,
} from 'lucide-react'
import './styles.css'

type Project = {
  name: string
  kicker: string
  description: string
  stack: string[]
  href?: string
  image?: string
  repo?: string
  featured?: boolean
}

type SkillGroup = {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

type NavItem = {
  href: string
  label: string
  activeClass: string
  idleClass: string
  dotClass: string
}

const navItems: NavItem[] = [
  {
    href: '#work',
    label: 'Work',
    activeClass: 'border-emerald-700 bg-emerald-700 text-white shadow-emerald-900/15',
    idleClass: 'border-emerald-200 bg-emerald-50 text-emerald-900 hover:border-emerald-400 hover:bg-emerald-100',
    dotClass: 'bg-emerald-500',
  },
  {
    href: '#about',
    label: 'About',
    activeClass: 'border-cyan-700 bg-cyan-700 text-white shadow-cyan-900/15',
    idleClass: 'border-cyan-200 bg-cyan-50 text-cyan-900 hover:border-cyan-400 hover:bg-cyan-100',
    dotClass: 'bg-cyan-500',
  },
  {
    href: '#resumes',
    label: 'Résumés',
    activeClass: 'border-rose-700 bg-rose-700 text-white shadow-rose-900/15',
    idleClass: 'border-rose-200 bg-rose-50 text-rose-900 hover:border-rose-400 hover:bg-rose-100',
    dotClass: 'bg-rose-500',
  },
  {
    href: '#skills',
    label: 'Skills',
    activeClass: 'border-amber-600 bg-amber-500 text-zinc-950 shadow-amber-900/15',
    idleClass: 'border-amber-200 bg-amber-50 text-amber-900 hover:border-amber-400 hover:bg-amber-100',
    dotClass: 'bg-amber-500',
  },
  {
    href: '#contact',
    label: 'Contact',
    activeClass: 'border-violet-700 bg-violet-700 text-white shadow-violet-900/15',
    idleClass: 'border-violet-200 bg-violet-50 text-violet-900 hover:border-violet-400 hover:bg-violet-100',
    dotClass: 'bg-violet-500',
  },
]

const projects: Project[] = [
  {
    name: 'Mwawa Gas Suppliers',
    kicker: 'Business operations web app',
    featured: true,
    description:
      'A supplier-focused gas management project built to support product visibility, customer access, and smoother day-to-day operations. The work sharpened my ability to design practical interfaces around real business needs.',
    stack: ['React', 'JavaScript', 'Responsive UI', 'GitHub'],
    href: 'https://github.com/simonwamugunda/mwawa-gas',
  },
  {
    name: 'DeKUT Student Medical Centre',
    kicker: 'Attachment project',
    description:
      'A student medical centre system I contributed to during my attachment at Dedan Kimathi University of Technology. It helped me grow in structured problem solving, documentation, support workflows, and building software for real users.',
    stack: ['Web Development', 'Systems Support', 'Documentation', 'User Workflows'],
  },
  {
    name: 'MRF Application',
    kicker: 'Recycling workflow platform',
    description:
      "A Material Recovery Facility application for tracking recyclable materials through a facility's workflow. I focused on clean data flow, reliable Firebase integration, and an interface teams can understand quickly.",
    stack: ['React', 'Firebase', 'Firestore', 'Firebase Auth'],
  },
  {
    name: 'Instakill Fumigation',
    kicker: 'Pest control service website',
    description:
      'A deployed website for a fumigation business showcasing services, contact details, and booking information. Built to convert visitors into leads with clear calls-to-action and a responsive layout.',
    stack: ['Responsive UI', 'HTML', 'CSS', 'JavaScript', 'Deployment'],
    href: 'https://instakill-fumigation.vercel.app/',
    repo: 'https://github.com/simonwamugunda/instakill-fumigation',
    image: '/instakill-screenshot.jpg',
  },
]

const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend Development',
    description: 'React, JavaScript, HTML, CSS, responsive interfaces, and accessible UI patterns.',
    icon: Code2,
  },
  {
    title: 'Backend and Tools',
    description: 'Firebase, Firestore, REST APIs, Git, deployment workflows, and practical debugging.',
    icon: Wrench,
  },
  {
    title: 'Copywriting',
    description: 'Clear product copy, portfolio storytelling, and user-focused communication.',
    icon: PenTool,
  },
  {
    title: 'IT Support',
    description: 'Network troubleshooting, hardware troubleshooting, software setup, and support.',
    icon: Network,
  },
]

const tools = [
  'React',
  'Firebase',
  'Firestore',
  'JavaScript',
  'HTML',
  'CSS',
  'Git',
  'REST APIs',
  'Copywriting',
  'Network Support',
  'Hardware Support',
  'Software Support',
]

const resumes = [
  {
    language: 'English',
    description: 'Download my professional résumé in English.',
    href: '/Simon_Wamugunda_Waweru_Resume.docx',
    accent: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  },
  {
    language: 'Kiswahili',
    description: 'Pakua wasifu wangu wa kitaalamu kwa Kiswahili.',
    href: '/Simon_Wamugunda_Waweru_Resume_Kiswahili.docx',
    accent: 'border-cyan-200 bg-cyan-50 text-cyan-800',
  },
  {
    language: 'Kikuyu',
    description: 'Hingura wasifu wakwa wa githomo na mũrimo na Gĩkũyũ.',
    href: '/Simon_Wamugunda_Waweru_Resume_Kikuyu.docx',
    accent: 'border-amber-200 bg-amber-50 text-amber-800',
  },
]

export default function App() {
  const year = useMemo(() => new Date().getFullYear(), [])
  const [activeSection, setActiveSection] = useState('work')

  useEffect(() => {
    const updateFromHash = () => {
      const section = window.location.hash.replace('#', '')

      if (section) {
        setActiveSection(section)
      }
    }

    updateFromHash()
    window.addEventListener('hashchange', updateFromHash)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.12, 0.3, 0.6] },
    )

    navItems.forEach((item) => {
      const section = document.querySelector(item.href)

      if (section) {
        observer.observe(section)
      }
    })

    return () => {
      window.removeEventListener('hashchange', updateFromHash)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#f8faf9] text-zinc-950 antialiased">
      <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-[#f8faf9]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-zinc-950 text-sm font-bold text-white">
              SW
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold">Simon Wamugunda</span>
              <span className="block text-xs text-zinc-600">Developer and IT Support</span>
            </span>
          </a>

          <nav className="hidden items-center gap-2 text-sm font-medium md:flex" aria-label="Primary navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1)

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveSection(item.href.slice(1))}
                  className={
                    'inline-flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm transition ' +
                    (isActive ? item.activeClass : item.idleClass)
                  }
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={'h-2 w-2 rounded-full ' + (isActive ? 'bg-white/85' : item.dotClass)} />
                  {item.label}
                </a>
              )
            })}
          </nav>

          <a
            href="mailto:simonwamugunda25@gmail.com"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-950 shadow-sm transition hover:border-emerald-700 hover:text-emerald-800"
            aria-label="Email Simon"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
        <nav className="scrollbar-hide mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-4 text-sm font-medium sm:px-6 md:hidden" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1)

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActiveSection(item.href.slice(1))}
                className={
                  'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 shadow-sm transition ' +
                  (isActive ? item.activeClass : item.idleClass)
                }
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={'h-2 w-2 rounded-full ' + (isActive ? 'bg-white/85' : item.dotClass)} />
                {item.label}
              </a>
            )
          })}
        </nav>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:min-h-[calc(100vh-121px)] lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
                Nairobi based developer
              </p>
              <p className="w-fit rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-600">
                Open to junior developer and IT support roles
              </p>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
              I build fast, useful web experiences and keep the systems behind them running.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-700 sm:text-lg">
              I am a front-end focused developer with hands-on skill in Firebase apps, copywriting,
              network troubleshooting, hardware support, and software support.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-900"
              >
                View Projects
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-950 shadow-sm transition hover:border-zinc-400"
              >
                Let&apos;s Work Together
              </a>
            </div>

            <div className="mt-8 grid gap-3 border-y border-zinc-200 py-5 sm:grid-cols-3">
              <ProofPoint label="Primary stack" value="React + Firebase" />
              <ProofPoint label="Strength" value="Business-ready UI" />
              <ProofPoint label="Support edge" value="Networks, hardware, software" />
            </div>
          </div>

          <aside className="relative">
            <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-xl shadow-zinc-200/80">
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Profile</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">Available</span>
              </div>
              <div className="aspect-[4/5] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200">
              <img
                src="/portfolio.jpeg"
                alt="Simon Wamugunda Waweru"
                className="h-full w-full object-cover"
              />
              </div>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              <Stat value="4+" label="Core projects" />
              <Stat value="4" label="Skill lanes" />
              <Stat value="2026" label="Updated" />
            </div>
          </aside>
        </section>

        <Section id="work" eyebrow="Selected work" title="Practical projects with business value">
          <div className="grid gap-4 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </Section>

        <Section id="about" eyebrow="About" title="A practical builder with a support mindset">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
            <div className="max-w-3xl text-base leading-8 text-zinc-700 sm:text-lg">
              <p>
                I am Simon Wamugunda Waweru, a web developer who enjoys turning everyday problems
                into clean digital tools. My work combines front-end development with a grounded IT
                support background, so I care about how software looks, how it behaves, and how people
                recover when something breaks.
              </p>
              <p className="mt-5">
                Beyond development, I bring copywriting, network troubleshooting, hardware
                troubleshooting, and software support skills. That mix helps me communicate clearly,
                diagnose issues faster, and build portfolio work that feels useful instead of decorative.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 border-l-4 border-l-cyan-700 bg-white p-6 shadow-sm">
              <FileText className="h-6 w-6 text-cyan-700" />
              <h3 className="mt-5 text-xl font-bold">Attachment Growth</h3>
              <p className="mt-3 leading-7 text-zinc-700">
                The DeKUT Student Medical Centre project gave me real workplace exposure and helped
                me strengthen technical support, user communication, and disciplined project delivery.
              </p>
            </div>
          </div>
        </Section>

        <Section id="resumes" eyebrow="Résumé" title="My résumé, in three languages">
          <p className="-mt-2 mb-8 max-w-2xl leading-7 text-zinc-700">
            Choose the version that works best for you. Each file opens or downloads as a Microsoft Word document.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {resumes.map((resume) => (
              <a
                key={resume.language}
                href={resume.href}
                download
                className="group rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-rose-300 hover:shadow-md"
              >
                <div className={'grid h-11 w-11 place-items-center rounded-lg border ' + resume.accent}>
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-zinc-950">{resume.language}</h3>
                <p className="mt-3 min-h-14 leading-7 text-zinc-700">{resume.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rose-800 underline decoration-2 underline-offset-4 group-hover:text-rose-950">
                  Download résumé
                  <Download className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </Section>

        <Section id="skills" eyebrow="Capabilities" title="Development, communication, and support">
          <div className="grid gap-4 md:grid-cols-2">
            {skillGroups.map((skill) => {
              const Icon = skill.icon

              return (
                <article key={skill.title} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-emerald-50 text-emerald-800">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{skill.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-700">{skill.description}</p>
                </article>
              )
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-700"
              >
                {tool}
              </span>
            ))}
          </div>
        </Section>
      </main>

      <footer id="contact" className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">Contact</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <h2 className="text-3xl font-bold leading-tight sm:text-5xl">Let&apos;s work together.</h2>
              <a
                href="mailto:simonwamugunda25@gmail.com"
                className="mt-5 inline-flex max-w-full items-center gap-3 break-all text-lg font-semibold text-white underline decoration-emerald-400 decoration-2 underline-offset-8 hover:text-emerald-300 sm:text-xl"
              >
                <Mail className="h-5 w-5 shrink-0" />
                simonwamugunda25@gmail.com
              </a>
              <a
                href="mailto:sw0757153838@gmail.com"
                className="mt-3 inline-flex max-w-full items-center gap-3 break-all text-base font-semibold text-zinc-300 underline decoration-cyan-400 decoration-2 underline-offset-8 hover:text-white sm:text-lg"
              >
                <Mail className="h-5 w-5 shrink-0" />
                sw0757153838@gmail.com
              </a>
            </div>

            <div className="grid gap-3 text-sm">
              <FooterLink href="https://github.com/simonwamugunda" label="GitHub" value="github.com/simonwamugunda" icon={GitBranch} />
              <FooterLink href="https://linkedin.com/in/simonwamugunda" label="LinkedIn" value="linkedin.com/in/simonwamugunda" icon={Network} />
              <div className="flex items-center gap-3 rounded-md border border-white/15 bg-white/5 px-4 py-3 text-zinc-300">
                <MapPin className="h-4 w-4 text-emerald-300" />
                Nairobi, Kenya
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-5 text-xs text-zinc-500">
            Simon Wamugunda Waweru, {year}
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className={
        'group flex min-h-[28rem] flex-col rounded-xl border p-5 transition hover:-translate-y-1 hover:shadow-lg ' +
        (project.featured
          ? 'border-emerald-900 bg-zinc-950 text-white shadow-lg shadow-zinc-300/40'
          : 'border-zinc-200 bg-white text-zinc-950 shadow-sm')
      }
    >
      <div
        className={
          'grid aspect-[16/10] place-items-center rounded-lg border text-4xl font-bold overflow-hidden ' +
          (project.featured
            ? 'border-white/15 bg-emerald-100 text-emerald-950'
            : index === 1
              ? 'border-zinc-200 bg-cyan-700 text-white'
              : 'border-zinc-950/10 bg-zinc-100 text-zinc-950')
        }
      >
        {project.image ? (
          <img src={project.image} alt={`${project.name} screenshot`} className="h-full w-full object-cover" />
        ) : (
          String(index + 1).padStart(2, '0')
        )}
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <p className={project.featured ? 'text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300' : 'text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500'}>
          {project.kicker}
        </p>
        <h3 className="mt-3 text-xl font-bold leading-tight">{project.name}</h3>
        <p className={project.featured ? 'mt-4 leading-7 text-zinc-300' : 'mt-4 leading-7 text-zinc-700'}>
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className={
                'rounded-full border px-3 py-1 text-xs font-medium ' +
                (project.featured ? 'border-white/15 bg-white/10 text-white' : 'border-zinc-950/10 bg-zinc-50 text-zinc-700')
              }
            >
              {item}
            </span>
          ))}
        </div>

        {project.href || project.repo ? (
          <div className="mt-auto pt-7 flex gap-3">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className={
                  'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold underline decoration-2 underline-offset-4 ' +
                  (project.featured ? 'text-white decoration-emerald-300' : 'text-zinc-950 decoration-cyan-600')
                }
              >
                View Live
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}

            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className={
                  'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold border ' +
                  (project.featured ? 'border-white/15 text-white' : 'border-zinc-200 text-zinc-700')
                }
              >
                View Code
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        ) : (
          <span className={project.featured ? 'mt-auto pt-7 text-sm font-medium text-zinc-400' : 'mt-auto pt-7 text-sm font-medium text-zinc-500'}>
            Case study available on request
          </span>
        )}
      </div>
    </article>
  )
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="portfolio-section mx-auto max-w-7xl scroll-mt-32 rounded-2xl px-4 py-14 transition sm:px-6 lg:px-8 lg:py-18">
      <div className="mb-8 max-w-3xl">
        <div className="mb-4 h-1 w-12 rounded-full bg-emerald-700" />
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{eyebrow}</p>
        <h2 className="mt-3 text-2xl font-bold leading-tight text-zinc-950 sm:text-4xl">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="text-xl font-bold">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">{label}</div>
    </div>
  )
}

function ProofPoint({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-zinc-950">{value}</div>
    </div>
  )
}

function FooterLink({
  href,
  label,
  value,
  icon: Icon,
}: {
  href: string
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex min-w-0 items-center justify-between gap-4 rounded-md border border-white/15 bg-white/5 px-4 py-3 text-zinc-300 transition hover:border-emerald-300 hover:text-white"
    >
      <span className="flex items-center gap-3 font-bold">
        <Icon className="h-4 w-4 text-emerald-300" />
        {label}
      </span>
      <span className="truncate text-zinc-500 group-hover:text-zinc-300">{value}</span>
    </a>
  )
}
