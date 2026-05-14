import { useMemo } from 'react'
import './styles.css'


type Project = {
  name: string
  description: string
  featured?: boolean
  tags: string[]
}

const projects: Project[] = [
  {
    name: 'MRF Application',
    featured: true,
    description:
      "A Material Recovery Facility application that streamlines the tracking and management of recyclable materials through a facility's workflow.",
    tags: ['React', 'Firebase', 'Firestore', 'Firebase Auth', 'Real-time DB'],
  },
]

const skills = ['React', 'Firebase', 'JavaScript', 'HTML/CSS', 'Firestore', 'Git', 'Responsive', 'REST APIs']

export default function App() {
  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Background accent */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute top-64 -left-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-20 border-b border-white/5 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-white/5">
              <img
                alt="Simon Wamugunda Waweru"
                src="/portfolio.jpeg"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Simon Wamugunda Waweru</div>
              <div className="text-xs text-zinc-400">Available for hire</div>
            </div>
          </div>

          <nav className="hidden gap-6 text-sm text-zinc-300 md:flex">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#skills" className="hover:text-white">Skills</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
              href="https://github.com/simonwamugunda"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <span aria-hidden className="text-sm font-bold">GH</span>
            </a>
            <a
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
              href="https://linkedin.com/in/simonwamugunda"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <span aria-hidden className="text-sm font-bold">in</span>
            </a>

          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-10">
          <div className="grid items-start gap-10 md:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Available for hire</span>
              </div>

              <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                I build web applications that are fast, functional, and built to last — from frontend interfaces to full-stack systems.
              </h1>

              <div className="mt-6 flex flex-wrap gap-6 text-sm">
                <div>
                  <div className="text-2xl font-semibold">2+</div>
                  <div className="text-zinc-400">Years coding</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold">5+</div>
                  <div className="text-zinc-400">Projects built</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold">3</div>
                  <div className="text-zinc-400">Tech stacks</div>
                </div>
              </div>

              <p className="mt-6 max-w-prose text-zinc-300">
                Fast, clean UI. Solid architecture. Reliable integrations.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-white/90"
                >
                  View projects
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-200 hover:bg-white/10"
                >
                  Get in touch
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm text-zinc-400">Quick profile</div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">Simon</div>
                  <div className="text-zinc-400">Nairobi, Kenya</div>
                </div>
                <div className="text-xs rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-300">Web Developer</div>
              </div>

              <div className="mt-5 grid gap-3">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs text-zinc-400">Specialty</div>
                  <div className="mt-1 font-medium">React + Firebase apps</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs text-zinc-400">Focus</div>
                  <div className="mt-1 font-medium">Performance • UX • Maintainability</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <Section id="about" title="About">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
            <div className="text-zinc-300">
              <p className="leading-relaxed">
                I'm Simon, a web developer based in Nairobi, Kenya. I specialize in building modern web applications using React and Firebase,
                turning ideas into clean, user-focused digital experiences. I'm passionate about writing solid code and learning new tools that
                help me build better products.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs text-zinc-400">Tech stacks</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {['React', 'Firebase', 'JavaScript'].map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-zinc-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Projects */}
        <Section id="projects" title="Projects">
          <div className="flex flex-col gap-5">
            {projects.map((p) => (
              <article
                key={p.name}
                className={
                  'rounded-2xl border ' +
                  (p.featured ? 'border-fuchsia-500/30 bg-fuchsia-500/10' : 'border-white/10 bg-white/5') +
                  ' p-6'
                }
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">{p.name}</h3>
                      {p.featured ? (
                        <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/15 px-3 py-1 text-xs text-fuchsia-200">
                          Featured
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-zinc-300 leading-relaxed">{p.description}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-zinc-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-zinc-300">Have more work to show?</div>
            <div className="mt-2 text-zinc-400 text-sm">Tell me the project name, what it does, and the tech used.</div>
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" title="Skills">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s) => (
              <div key={s} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-medium">{s}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" title="Contact">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm text-zinc-400">Email</div>
              <a
                href="mailto:simonwamugunda25@gmail.com"
                className="mt-2 inline-flex items-center gap-2 text-lg font-semibold hover:text-white"
              >
                <span aria-hidden className="text-base">✉️</span>
                simonwamugunda25@gmail.com
              </a>


              <div className="mt-4 text-xs text-zinc-400">Location</div>
              <div className="mt-1 text-sm">Nairobi, Kenya</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm text-zinc-400">Links</div>
              <div className="mt-3 flex flex-col gap-3">
                <a className="group inline-flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm hover:bg-white/10" href="https://github.com/simonwamugunda" target="_blank" rel="noreferrer">
                  <span className="font-medium">github</span>
                  <span className="text-zinc-400 group-hover:text-zinc-200">github.com/simonwamugunda</span>
                </a>

                <a className="group inline-flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm hover:bg-white/10" href="https://linkedin.com/in/simonwamugunda" target="_blank" rel="noreferrer">
                  <span className="font-medium">linkedin</span>
                  <span className="text-zinc-400 group-hover:text-zinc-200">linkedin.com/in/simonwamugunda</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-zinc-500">simon wamugunda waweru · nairobi, kenya · {year}</div>
        </Section>
      </main>
    </div>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-12 scroll-mt-24">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

