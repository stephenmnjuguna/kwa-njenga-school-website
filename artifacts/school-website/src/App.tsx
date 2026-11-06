import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowDownRight, ArrowRight, CalendarDays, Check, Clock3, Compass, ExternalLink, Instagram, MapPin, Menu, Navigation, Play, Send, ShieldCheck, Sparkles, X } from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { label: 'Our story', id: 'story' },
  { label: 'Learning', id: 'learning' },
  { label: 'Life at Kwanjenga', id: 'life' },
  { label: 'Admissions', id: 'admissions' },
  { label: 'Visit us', id: 'visit' },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Header({ onVisit }: { onVisit: () => void }) {
  const [open, setOpen] = useState(false);
  const go = (id: string) => { setOpen(false); scrollToId(id); };
  return (
    <header className="absolute inset-x-0 top-0 z-10 text-[hsl(var(--background))]">
      <div className="container-wide flex h-[88px] items-center justify-between border-b border-[hsl(var(--background)/.24)]">
        <button data-testid="button-home" onClick={() => scrollToId('top')} className="flex items-center gap-3 text-left">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]"><Compass size={19} strokeWidth={2.5} /></span>
          <span><span className="block text-sm font-extrabold leading-none tracking-tight">KWANJENGA</span><span className="mt-1 block font-mono text-[8px] uppercase tracking-[.18em] opacity-70">Primary & Junior School · Kenya</span></span>
        </button>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navItems.map((item) => <button key={item.id} data-testid={`link-${item.id}`} className="nav-link" onClick={() => go(item.id)}>{item.label}</button>)}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <button data-testid="button-contact" onClick={() => go('contact')} className="nav-link opacity-80">Contact</button>
          <button data-testid="button-header-visit" onClick={onVisit} className="ink-button bg-[hsl(var(--background))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]">Book a visit <ArrowRight size={14} /></button>
        </div>
        <button data-testid="button-mobile-menu" className="menu-button rounded-full border border-[hsl(var(--background)/.35)] p-2 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X size={19} /> : <Menu size={19} />}</button>
      </div>
      {open && <div className="mobile-drawer container-wide border-b border-[hsl(var(--background)/.2)] bg-[hsl(var(--secondary))] py-5 md:hidden">
        <div className="flex flex-col gap-1">{navItems.map((item) => <button key={item.id} data-testid={`mobile-link-${item.id}`} onClick={() => go(item.id)} className="border-b border-[hsl(var(--background)/.12)] py-3 text-left text-sm font-bold">{item.label}</button>)}</div>
        <button data-testid="button-mobile-visit" onClick={() => { setOpen(false); onVisit(); }} className="ink-button button-coral mt-5 w-full justify-center">Plan a school visit <ArrowRight size={15} /></button>
      </div>}
    </header>
  );
}

function VisitModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return <div className="fixed inset-0 z-30 flex items-center justify-center bg-[hsl(var(--foreground)/.65)] px-4 py-8 backdrop-blur-sm" role="dialog" aria-modal="true">
    <div className="relative w-full max-w-lg bg-[hsl(var(--card))] p-7 shadow-2xl sm:p-10">
      <button data-testid="button-close-visit" aria-label="Close visit form" onClick={onClose} className="absolute right-5 top-5 rounded-full p-2 text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"><X size={18} /></button>
      {!sent ? <><p className="eyebrow text-[hsl(var(--primary))]">Come see our school</p><h2 className="display mt-3 text-4xl text-[hsl(var(--foreground))]">Let’s find a good day.</h2><p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">Tell us a little about your family and our admissions team will be in touch within two school days.</p>
        <form className="mt-7 space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <label className="block text-xs font-bold">Your name<input data-testid="input-visit-name" required className="mt-2 w-full border-b border-[hsl(var(--border))] bg-transparent px-0 py-3 text-sm outline-none focus:border-[hsl(var(--primary))]" placeholder="First and last name" /></label>
          <label className="block text-xs font-bold">Email address<input data-testid="input-visit-email" type="email" required className="mt-2 w-full border-b border-[hsl(var(--border))] bg-transparent px-0 py-3 text-sm outline-none focus:border-[hsl(var(--primary))]" placeholder="you@example.com" /></label>
          <label className="block text-xs font-bold">Child’s level<select data-testid="select-visit-year" className="mt-2 w-full border-b border-[hsl(var(--border))] bg-transparent px-0 py-3 text-sm outline-none"><option>ECDE</option><option>Primary School</option><option>Junior School</option><option>Just exploring</option></select></label>
          <button data-testid="button-submit-visit" className="ink-button button-coral mt-3 w-full justify-center">Request a visit <ArrowRight size={15} /></button>
        </form></> : <div className="py-10 text-center"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--accent))]"><Check size={25} /></span><h2 className="display mt-5 text-4xl">We’ll be in touch.</h2><p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">Thanks for reaching out to Kwanjenga. We’re looking forward to welcoming your family.</p><button data-testid="button-done-visit" onClick={onClose} className="ink-button button-outline mt-7">Close</button></div>}
    </div>
  </div>;
}

function Hero({ onVisit }: { onVisit: () => void }) {
  return <section id="top" className="relative min-h-[760px] overflow-hidden bg-[hsl(var(--secondary))] text-[hsl(var(--background))]">
    <div className="hero-media absolute inset-0"><img src="/kwanjenga-campus.jpg" alt="" className="hero-image h-full w-full object-cover object-center" /><video className="hero-video hidden h-full w-full object-cover object-center md:block" autoPlay muted loop playsInline preload="metadata" poster="/kwanjenga-campus.jpg" aria-hidden="true"><source src="/kwanjenga-hero.mp4" type="video/mp4" /></video></div><div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(197_44%_18%/.98)_0%,hsl(197_44%_18%/.78)_43%,hsl(197_44%_18%/.25)_100%)]" />
    <Header onVisit={onVisit} />
    <div className="container-wide relative z-[1] flex min-h-[760px] items-end pb-20 pt-32 md:pb-24">
      <div className="max-w-[780px]">
        <div className="reveal is-visible pill-label bg-[hsl(var(--accent))]">ECDE · Primary · Junior School</div>
        <h1 data-testid="text-hero-heading" className="display reveal is-visible delay-1 mt-7 max-w-3xl text-6xl leading-[.91] sm:text-8xl md:text-[clamp(5rem,9.5vw,9.5rem)]">Grow with<br /><i>purpose.</i></h1>
        <div className="mt-9 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <p className="reveal is-visible delay-2 max-w-sm text-[15px] leading-7 text-[hsl(var(--background)/.76)]">Kwanjenga Primary and Junior School is a caring learning community in Embakasi South where every child is known, supported, and encouraged to shape a bright future.</p>
          <button data-testid="button-hero-visit" onClick={onVisit} className="ink-button button-coral reveal is-visible delay-3 w-fit">Plan a school visit <ArrowDownRight size={16} /></button>
        </div>
      </div>
    </div>
    <div className="hero-orb" />
    <div className="absolute bottom-7 right-7 hidden items-center gap-3 font-mono text-[9px] uppercase tracking-[.16em] opacity-70 lg:flex"><span className="h-px w-9 bg-current" />Embakasi South · Nairobi, Kenya</div>
  </section>;
}

function Story() {
  return <section id="story" className="bg-[hsl(var(--background))] py-24 md:py-36">
    <div className="container-wide grid gap-14 md:grid-cols-[.82fr_1.18fr] md:items-start">
      <div className="reveal"><p className="eyebrow text-[hsl(var(--primary))]">A place to begin well</p><h2 className="display mt-5 max-w-md text-5xl leading-[.97] md:text-7xl">Every child has<br /><i>room to bloom.</i></h2></div>
      <div className="reveal delay-1 md:pt-16"><p className="max-w-xl text-xl leading-8 text-[hsl(var(--foreground)/.82)]">At Kwanjenga, strong foundations and a full childhood belong together. From the first discoveries in our ECDE centre to the confidence built in Junior School, learning is active, purposeful, and rooted in the world around us.</p><div className="mt-12 grid gap-7 border-t border-[hsl(var(--border))] pt-7 sm:grid-cols-3"><div><span className="display text-5xl text-[hsl(var(--primary))]">3</span><p className="mt-2 text-xs leading-5 text-[hsl(var(--muted-foreground))]">learning stages under one roof</p></div><div><span className="display text-5xl text-[hsl(var(--primary))]">1:15</span><p className="mt-2 text-xs leading-5 text-[hsl(var(--muted-foreground))]">caring adult-to-learner focus</p></div><div><span className="display text-5xl text-[hsl(var(--primary))]">100%</span><p className="mt-2 text-xs leading-5 text-[hsl(var(--muted-foreground))]">room for every learner to shine</p></div></div></div>
    </div>
  </section>;
}

function Learning() {
  const areas = [{ n: '01', title: 'Early years', copy: 'Our ECDE centre gives young learners a joyful start through play, stories, movement, and guided discovery.', tone: 'bg-[hsl(var(--secondary))] text-[hsl(var(--background))]' }, { n: '02', title: 'Strong foundations', copy: 'Primary learning builds confidence in literacy, numeracy, science, creativity, and the skills to learn independently.', tone: 'bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]' }, { n: '03', title: 'Ready for more', copy: 'Junior School learners grow their voice, deepen their thinking, and take on new responsibilities with courage.', tone: 'bg-[hsl(var(--primary))] text-[hsl(var(--background))]' }];
  return <section id="learning" className="bg-[hsl(var(--secondary))] py-24 text-[hsl(var(--background))] md:py-32"><div className="container-wide"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div className="reveal"><p className="eyebrow text-[hsl(var(--accent))]">How learning works here</p><h2 className="display mt-5 max-w-xl text-5xl leading-[.95] md:text-7xl">Small steps.<br /><i>Big horizons.</i></h2></div><p className="reveal delay-1 max-w-xs text-sm leading-6 text-[hsl(var(--background)/.65)]">Every stage has its own rhythm. We give learners the structure, support, and room to ask questions, try bravely, and build lasting confidence.</p></div><div className="mt-16 grid gap-3 md:grid-cols-3">{areas.map((area, i) => <article key={area.n} data-testid={`card-learning-${i}`} className={`reveal delay-${i + 1} flex min-h-[300px] flex-col justify-between p-7 transition-transform duration-500 hover:-translate-y-2 md:min-h-[370px] ${area.tone}`}><span className="font-mono text-[11px] opacity-65">{area.n} / 03</span><div><h3 className="display text-4xl">{area.title}</h3><p className="mt-4 max-w-xs text-sm leading-6 opacity-75">{area.copy}</p><ArrowUpRightIcon /></div></article>)}</div></div></section>;
}

function ArrowUpRightIcon() { return <span className="mt-7 flex h-9 w-9 items-center justify-center rounded-full border border-current opacity-65"><ArrowRight size={14} className="-rotate-45" /></span>; }

function Life() {
  return <section id="life" className="bg-[hsl(var(--background))] py-24 md:py-36"><div className="container-wide"><div className="grid gap-12 md:grid-cols-[1fr_.9fr] md:items-end"><div className="reveal"><p className="eyebrow text-[hsl(var(--primary))]">The texture of a day</p><h2 className="display mt-5 max-w-2xl text-5xl leading-[.95] md:text-7xl">There’s more<br />than one way to <i>belong.</i></h2></div><p className="reveal delay-1 max-w-sm text-sm leading-7 text-[hsl(var(--muted-foreground))]">Morning greetings. Games at break. Clubs, sports, music, and the lunchtime table where everyone is welcome. At Kwanjenga, community is something we practice — not a word on a banner.</p></div><div className="mt-14 grid gap-4 md:grid-cols-[1.35fr_.65fr]"><div className="photo-frame reveal h-[370px] md:h-[500px]"><img src="/kwanjenga-campus.jpg" alt="Kwanjenga school campus in Embakasi South" /><div className="absolute bottom-5 left-5"><span className="pill-label">A place to learn and belong</span></div></div><div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1"><div className="reveal delay-1 flex min-h-[240px] flex-col justify-between bg-[hsl(var(--accent))] p-7"><Sparkles size={21} /><div><p className="eyebrow">Learner voice</p><p className="display mt-3 text-3xl leading-tight">“I feel seen, and I know I can keep trying.”</p><p className="mt-4 text-xs font-bold">— A Kwanjenga learner</p></div></div><div className="reveal delay-2 flex min-h-[240px] flex-col justify-between bg-[hsl(var(--muted))] p-7"><CalendarDays size={21} /><div><p className="eyebrow">Coming up</p><p className="display mt-3 text-3xl leading-tight">Open day at Kwanjenga</p><p className="mt-4 text-xs text-[hsl(var(--muted-foreground))]">Meet our team · Explore the school</p></div></div></div></div></div></section>;
}

function Admissions({ onVisit }: { onVisit: () => void }) {
  return <section id="admissions" className="bg-[hsl(var(--accent))] py-24 md:py-32"><div className="container-wide grid gap-12 md:grid-cols-[.85fr_1.15fr]"><div className="reveal"><p className="eyebrow">A next step for your family</p><h2 className="display mt-5 text-5xl leading-[.93] md:text-7xl">Find your<br /><i>place here.</i></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[hsl(var(--foreground)/.72)]">Whether your child is beginning in ECDE or taking the next step in Junior School, our team is ready to listen, answer questions, and help you discover Kwanjenga.</p><button data-testid="button-admissions-visit" onClick={onVisit} className="ink-button button-coral mt-8">Plan a school visit <ArrowRight size={15} /></button></div><div className="reveal delay-1 md:pt-3"><div className="border-t border-[hsl(var(--foreground)/.25)]">{[{title:'Get to know us',copy:'Visit the school, meet our teachers, and experience a morning at Kwanjenga.',action:'Explore visits'}, {title:'Find the right level',copy:'Learn about ECDE, Primary School, and Junior School admissions.',action:'View levels'}, {title:'Ask anything',copy:'Our admissions team is here to help with the next step for your family.',action:'Talk to our team'}].map((item, i) => <div key={item.title} className="group flex items-start justify-between gap-5 border-b border-[hsl(var(--foreground)/.25)] py-7"><div><span className="font-mono text-[10px] opacity-55">0{i + 1}</span><h3 className="mt-2 text-lg font-extrabold">{item.title}</h3><p className="mt-2 max-w-sm text-sm leading-6 opacity-70">{item.copy}</p></div><button data-testid={`button-admissions-${i}`} onClick={i === 0 ? onVisit : () => scrollToId('contact')} className="mt-1 flex shrink-0 items-center gap-2 text-xs font-extrabold transition-transform group-hover:translate-x-1">{item.action}<ArrowRight size={14} /></button></div>)}</div></div></div></section>;
}

function EventsNews() {
  const events = [{ date: 'TERM 1', title: 'Meet the School Open Day', meta: 'Visit the classrooms · Embakasi South', icon: CalendarDays }, { date: 'SAT', title: 'Family Learning Morning', meta: 'Learning together · Kwanjenga campus', icon: Sparkles }, { date: 'SOON', title: 'Talent and Culture Day', meta: 'Celebrating every learner · Main grounds', icon: Play }];
  return <section className="bg-[hsl(var(--card))] py-24 md:py-32"><div className="container-wide grid gap-16 md:grid-cols-[.72fr_1.28fr]"><div className="reveal"><p className="eyebrow text-[hsl(var(--primary))]">On the horizon</p><h2 className="display mt-5 text-5xl leading-[.95] md:text-7xl">Make a little<br /><i>room.</i></h2><p className="mt-7 max-w-xs text-sm leading-6 text-[hsl(var(--muted-foreground))]">The best way to understand Kwanjenga is to show up. We’d love to welcome you here.</p><button data-testid="button-events-calendar" onClick={() => scrollToId('contact')} className="ink-button button-outline mt-7">Ask about the calendar <ExternalLink size={14} /></button></div><div className="reveal delay-1"><div className="mb-5 flex items-center justify-between"><p className="eyebrow">School moments</p><span className="font-mono text-[10px] text-[hsl(var(--muted-foreground))]">Embakasi South / Kenya</span></div>{events.map((event, i) => { const Icon = event.icon; return <button data-testid={`event-${i}`} onClick={() => scrollToId('contact')} key={event.title} className="group flex w-full items-start gap-5 border-t border-[hsl(var(--border))] py-6 text-left transition-colors hover:bg-[hsl(var(--muted)/.45)]"><span className="w-14 shrink-0 font-mono text-[10px] leading-5 text-[hsl(var(--primary))]">{event.date}</span><span className="flex-1"><span className="block text-lg font-extrabold">{event.title}</span><span className="mt-1 block text-xs text-[hsl(var(--muted-foreground))]">{event.meta}</span></span><Icon size={17} className="mt-1 text-[hsl(var(--muted-foreground))] transition-transform group-hover:translate-x-1" /></button>; })}</div></div></section>;
}

function CommunityStory() {
  return <section id="community-story" className="bg-[hsl(var(--muted))] py-24 md:py-32"><div className="container-wide grid gap-12 md:grid-cols-[.8fr_1.2fr] md:items-start"><div className="reveal"><p className="eyebrow text-[hsl(var(--primary))]">A school rooted in community</p><h2 className="display mt-5 max-w-lg text-5xl leading-[.95] md:text-7xl">A stronger place<br /><i>to learn.</i></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[hsl(var(--muted-foreground))]">Public reports describe Kwa Njenga Primary School as a community-serving public school in Embakasi South. The links here give families a transparent starting point for learning more about the school’s public story.</p></div><div className="reveal delay-1"><div className="grid gap-3 sm:grid-cols-2"><a data-testid="link-community-kna" href="https://www.kenyanews.go.ke/kwa-njenga-primary-school-receives-us-funded-facelift/" target="_blank" rel="noreferrer" className="source-card group bg-[hsl(var(--background))] p-7"><ShieldCheck size={20} className="text-[hsl(var(--primary))]" /><p className="eyebrow mt-10">Kenya News Agency · 2025</p><h3 className="display mt-3 text-3xl">Eight classrooms. Three ablution blocks.</h3><span className="mt-7 flex items-center gap-2 text-xs font-extrabold">Read the report <ExternalLink size={14} className="transition-transform group-hover:translate-x-1" /></span></a><a data-testid="link-community-foundation" href="https://www.safaricomfoundation.org/project/construction-of-latrines-at-kwa-njenga-primary-school-mukuru-2/" target="_blank" rel="noreferrer" className="source-card group bg-[hsl(var(--secondary))] p-7 text-[hsl(var(--background))]"><Sparkles size={20} className="text-[hsl(var(--accent))]" /><p className="eyebrow mt-10 text-[hsl(var(--accent))]">Safaricom Foundation</p><h3 className="display mt-3 text-3xl">Community partnerships that improve daily life.</h3><span className="mt-7 flex items-center gap-2 text-xs font-extrabold">Read the project story <ExternalLink size={14} className="transition-transform group-hover:translate-x-1" /></span></a></div><p className="mt-5 text-[11px] leading-5 text-[hsl(var(--muted-foreground))]">These are independent public sources, not official school statements. We can replace this section with the school’s verified history, milestones, and approved photographs when you provide them.</p></div></div></section>;
}

function CampusMap() {
  return <section id="visit" className="bg-[hsl(var(--background))] py-24 md:py-32"><div className="container-wide"><div className="grid gap-12 md:grid-cols-[.75fr_1.25fr] md:items-end"><div className="reveal"><p className="eyebrow text-[hsl(var(--primary))]">Find your way here</p><h2 className="display mt-5 max-w-md text-5xl leading-[.95] md:text-7xl">Come see<br /><i>Kwanjenga.</i></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[hsl(var(--muted-foreground))]">Use the map to plan your visit to Kwanjenga Primary and Junior School in Embakasi South, Nairobi.</p><div className="mt-8 flex items-start gap-3 text-sm"><MapPin size={17} className="mt-0.5 shrink-0 text-[hsl(var(--primary))]" /><span>Kwa Njenga Ward, Embakasi South<br />Nairobi, Kenya</span></div><a data-testid="link-google-directions" href="https://www.google.com/maps/dir/?api=1&destination=-1.314848,36.884279" target="_blank" rel="noreferrer" className="ink-button button-coral mt-8">Get directions <Navigation size={15} /></a><p className="mt-5 max-w-sm text-[10px] leading-5 text-[hsl(var(--muted-foreground))]">The marker uses publicly listed coordinates for Kwa Njenga Primary School and should be confirmed with the school before publishing as the official gate location.</p></div><div className="reveal delay-1 overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-2 shadow-[var(--shadow-md)]"><iframe data-testid="map-kwanjenga" title="Map showing Kwanjenga Primary School in Embakasi South" src="https://www.google.com/maps?q=-1.314848,36.884279&z=16&output=embed" className="h-[370px] w-full border-0 md:h-[500px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="flex items-center justify-between gap-4 px-3 py-3 text-[10px] text-[hsl(var(--muted-foreground))]"><span>Map area: Kwa Njenga, Embakasi South</span><a href="https://data.afro.co.ke/schools/kwa-njenga/" target="_blank" rel="noreferrer" className="font-bold underline underline-offset-4">View location source</a></div></div></div></div></section>;
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  return <section id="contact" className="bg-[hsl(var(--secondary))] py-24 text-[hsl(var(--background))] md:py-32"><div className="container-wide grid gap-14 md:grid-cols-[1fr_.9fr]"><div className="reveal"><p className="eyebrow text-[hsl(var(--accent))]">Keep in touch</p><h2 className="display mt-5 max-w-xl text-5xl leading-[.95] md:text-7xl">Questions are a<br /><i>great place to start.</i></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[hsl(var(--background)/.65)]">Get school updates, family events, and a closer look at learning in our ECDE, Primary, and Junior School programmes.</p><div className="mt-9 flex items-center gap-3 text-sm text-[hsl(var(--background)/.75)]"><MapPin size={16} className="text-[hsl(var(--accent))]" /> Embakasi South, Nairobi, Kenya</div><div className="mt-3 flex items-center gap-3 text-sm text-[hsl(var(--background)/.75)]"><Clock3 size={16} className="text-[hsl(var(--accent))]" /> Monday–Friday · School hours</div></div><div className="reveal delay-1"><div className="border-t border-[hsl(var(--background)/.25)] pt-7">{submitted ? <div data-testid="status-newsletter-success" className="py-8"><Check size={24} className="text-[hsl(var(--accent))]" /><h3 className="display mt-5 text-4xl">You’re on the list.</h3><p className="mt-3 text-sm text-[hsl(var(--background)/.65)]">A note from Kwanjenga will be in your inbox soon.</p><button data-testid="button-newsletter-reset" onClick={() => setSubmitted(false)} className="mt-6 text-xs font-bold underline underline-offset-4">Use another email</button></div> : <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}><label className="block text-xs font-bold">Email address<input data-testid="input-newsletter-email" required type="email" placeholder="you@example.com" className="mt-4 w-full border-b border-[hsl(var(--background)/.3)] bg-transparent py-4 text-lg text-[hsl(var(--background))] outline-none placeholder:text-[hsl(var(--background)/.42)] focus:border-[hsl(var(--accent))]" /></label><button data-testid="button-submit-newsletter" className="ink-button button-coral mt-8">Send me school updates <Send size={14} /></button><p className="mt-5 text-[10px] leading-5 text-[hsl(var(--background)/.45)]">No inbox clutter. Just useful school news and family updates.</p></form>}</div></div></div></section>;
}

function Footer() {
  return <footer className="bg-[hsl(var(--secondary))] px-6 pb-8 text-[hsl(var(--background))]"><div className="container-wide border-t border-[hsl(var(--background)/.18)] pt-8"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="flex items-center gap-2 text-sm font-extrabold"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]"><Compass size={15} /></span>KWANJENGA SCHOOL</p><p className="mt-3 font-mono text-[9px] uppercase tracking-[.15em] text-[hsl(var(--background)/.45)]">Growing with purpose · Embakasi South</p></div><div className="flex items-center gap-5 text-xs text-[hsl(var(--background)/.65)]"><button data-testid="link-footer-contact" onClick={() => scrollToId('contact')} className="hover:text-[hsl(var(--accent))]">Contact</button><button data-testid="link-footer-privacy" onClick={() => alert('Kwanjenga privacy policy coming soon.')} className="hover:text-[hsl(var(--accent))]">Privacy</button><a data-testid="link-instagram" href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[hsl(var(--accent))]" aria-label="Instagram"><Instagram size={16} /></a></div></div><div className="mt-14 flex flex-col justify-between gap-3 border-t border-[hsl(var(--background)/.1)] pt-5 font-mono text-[9px] uppercase tracking-[.1em] text-[hsl(var(--background)/.38)] sm:flex-row"><span>© 2026 Kwanjenga Primary and Junior School</span><span>Growing with purpose</span></div></div></footer>;
}

function Home() {
  const [visitOpen, setVisitOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold: .12 });
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <div className="site-shell grain"><Hero onVisit={() => setVisitOpen(true)} /><main><Story /><Learning /><Life /><Admissions onVisit={() => setVisitOpen(true)} /><EventsNews /><CommunityStory /><CampusMap /><Contact /></main><Footer />{visitOpen && <VisitModal onClose={() => setVisitOpen(false)} />}</div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}
function RoutedErrorBoundary({ children }: { children: ReactNode }) { const [location] = useLocation(); return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>; }
function App() { return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>; }
export default App;