import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import arabellaNavLogo from '@assets/arabella-harris-navigation-bar_1757607955178.jpg';
import confetti from 'canvas-confetti';

const PARTY_COLOURS = ['#e23636', '#f5c842', '#8b5cf6', '#4a90e2', '#ff7f3f', '#10b981'];

function fireConfetti() {
  const opts = {
    colors: PARTY_COLOURS,
    startVelocity: 45,
    spread: 120,
    ticks: 120,
    gravity: 0.9,
    scalar: 1.1,
    origin: { x: 0.5, y: 0.55 },
  };
  confetti({ ...opts, particleCount: 80, angle: 90 });
  setTimeout(() => {
    confetti({ ...opts, particleCount: 60, angle: 75, origin: { x: 0.35, y: 0.6 } });
    confetti({ ...opts, particleCount: 60, angle: 105, origin: { x: 0.65, y: 0.6 } });
  }, 300);
}

const BIRTHDAY_CLIPS = ['/b1.mp3', '/b2.mp3', '/b3.mp3', '/b4.mp3'];

const DAD_WHATSAPP = 'https://wa.me/447973350178?text=Hi%21%20I%27d%20love%20to%20come%20to%20Arabella%27s%20birthday%20party%20%F0%9F%8E%89';

const PARTY_DATE = new Date('2026-06-06T13:00:00');

const activities = [
  {
    id: 'crafting',
    emoji: '🎨',
    title: 'Snack Box Crafting',
    desc: 'We\'re making our very own personalised snack boxes — decorate yours and fill it with treats!',
    colour: 'bg-mickey-yellow border-mickey-orange',
    textColour: 'text-toontown-darkbrown',
  },
  {
    id: 'karaoke',
    emoji: '🎤',
    title: 'Karaoke',
    desc: 'Grab the mic and sing your heart out! Bops only, no bad vibes allowed.',
    colour: 'bg-disney-purple border-disney-blue',
    textColour: 'text-white',
  },
  {
    id: 'movie',
    emoji: '🎬',
    title: 'Movie in the Cinema Room',
    desc: 'We\'ve got the whole cinema room to ourselves — snuggle up and watch something amazing!',
    colour: 'bg-disney-blue border-disney-purple',
    textColour: 'text-white',
  },
  {
    id: 'chicken',
    emoji: '🍗',
    title: 'Chicken Tenders & Snacks',
    desc: 'The best birthday food ever. Chicken tenders, dips, and all the snacks you could ever want.',
    colour: 'bg-mickey-orange border-mickey-red',
    textColour: 'text-white',
  },
  {
    id: 'robes',
    emoji: '🩷',
    title: 'Birthday Robes',
    desc: 'Everyone gets their very own birthday robe to wear all night. So cosy, so cute. High quality from Shein!',
    colour: 'bg-mickey-red border-mickey-orange',
    textColour: 'text-white',
  },
  {
    id: 'spa',
    emoji: '💅',
    title: 'Mini Spa',
    desc: 'Nails, face masks, the works. Full pamper mode is ON. (Do your own feet though!)',
    colour: 'bg-toontown-green border-disney-blue',
    textColour: 'text-white',
  },
  {
    id: 'sleepover',
    emoji: '🌙',
    title: 'Sleepover!',
    desc: 'Stay the night, stay up late (maybe!), and wake up for the best morning ever. If your best morning is 6am and cold porridge!',
    colour: 'bg-disney-purple border-mickey-red',
    textColour: 'text-white',
  },
];

const navLinks = [
  { label: '🎬 Movie Time', short: '🎬 Movie', href: '#movie' },
  { label: '🎨 Crafting', short: '🎨 Crafting', href: '#crafting' },
  { label: '🩷 Free Robes', short: '🩷 Robes', href: '#robes' },
  { label: '🍗 Chicken Tenders', short: '🍗 Chicken', href: '#chicken' },
  { label: '🎤 Karaoke', short: '🎤 Karaoke', href: '#karaoke' },
  { label: '💅 Mini Spa', short: '💅 Spa', href: '#spa' },
  { label: '🌙 Sleepover', short: '🌙 Sleepover', href: '#sleepover' },
  { label: '🎒 What to Bring', short: '🎒 Bring', href: '#bring' },
];

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

export default function Birthday() {
  const { days, hours, minutes, seconds } = useCountdown(PARTY_DATE);
  const [confetti, setConfetti] = useState<{ id: number; x: number; colour: string; delay: number; size: number }[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastClipRef = useRef<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const playRandomClip = () => {
    let idx: number;
    do { idx = Math.floor(Math.random() * BIRTHDAY_CLIPS.length); }
    while (idx === lastClipRef.current && BIRTHDAY_CLIPS.length > 1);
    lastClipRef.current = idx;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    const audio = new Audio(BIRTHDAY_CLIPS[idx]);
    audioRef.current = audio;
    setIsPlaying(true);
    setHasPlayed(true);
    fireConfetti();
    audio.play();
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => setIsPlaying(false);
  };

  useEffect(() => {
    const colours = ['#e23636', '#f5c842', '#4a90e2', '#ff7f3f', '#8b5cf6', '#10b981'];
    setConfetti(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        colour: colours[i % colours.length],
        delay: Math.random() * 3,
        size: 8 + Math.random() * 10,
      }))
    );
  }, []);

  useEffect(() => {
    const prevTitle = document.title;
    const prevOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? '';
    const prevOgDesc = document.querySelector('meta[property="og:description"]')?.getAttribute('content') ?? '';
    const prevOgUrl = document.querySelector('meta[property="og:url"]')?.getAttribute('content') ?? '';
    const prevTwTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ?? '';
    const prevTwDesc = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content') ?? '';

    const bdTitle = "Arabella's 10th Birthday Party! 🎉";
    const bdDesc = "You're invited to Arabella's 10th birthday sleepover party on Saturday 6th June 2026! Movies, karaoke, spa, chicken tenders and more. 🎂";
    const bdUrl = 'https://www.arabellaharris.com/birthday';

    document.title = bdTitle;
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', bdTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', bdDesc);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', bdUrl);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', bdTitle);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', bdDesc);

    return () => {
      document.title = prevTitle;
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', prevOgTitle);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', prevOgDesc);
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', prevOgUrl);
      document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', prevTwTitle);
      document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', prevTwDesc);
    };
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'linear-gradient(135deg, #f9e4f0 0%, #e8f4fd 30%, #fef9e7 60%, #e8f4fd 100%)' }}>

      {/* Birthday Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-md border-b-4 border-mickey-yellow shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo → home */}
          <Link href="/">
            <img
              src={arabellaNavLogo}
              alt="Arabella Harris"
              className="h-12 md:h-16 w-auto cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 flex-wrap justify-end">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="font-bold text-sm px-2 py-2 rounded-xl transition-all duration-200 hover:scale-105 border-4 border-transparent hover:bg-mickey-yellow/40 text-toontown-darkbrown hover:shadow-md hover:border-yellow-400"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                {l.short}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden bg-mickey-yellow text-toontown-darkbrown font-black rounded-xl p-3 text-xl border-4 border-mickey-orange shadow-md"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white/95 border-t-4 border-mickey-yellow px-6 py-4 space-y-2">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="w-full block font-bold text-lg py-3 px-4 rounded-xl text-center border-4 border-transparent hover:bg-mickey-yellow/30 text-toontown-darkbrown hover:border-yellow-400 transition-all"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Floating confetti */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute rounded-sm opacity-70"
            style={{
              left: `${c.x}%`,
              top: '-20px',
              width: c.size,
              height: c.size,
              backgroundColor: c.colour,
              animation: `confettiFall ${4 + c.delay}s linear ${c.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-28 pb-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-2 animate-bounce">🎉</div>
          <h1
            className="text-4xl md:text-6xl font-black mb-2 leading-tight"
            style={{
              fontFamily: "'Luckiest Guy', cursive",
              color: '#e23636',
              textShadow: '3px 3px 0 #f5c842, 5px 5px 0 #4a90e2',
              WebkitTextStroke: '1px #5c2d0e',
            }}
          >
            ARABELLA<br />{Date.now() >= new Date('2026-06-04').getTime() ? 'IS 10! 🎂' : 'WILL BE 10! 🎂'}
          </h1>
          <p className="text-base font-bold text-disney-purple mt-2" style={{ fontFamily: "'Fredoka One', cursive" }}>
            Birthday: Wednesday 4th June 🎂
          </p>
          <p className="text-2xl md:text-3xl font-black text-mickey-orange mt-1" style={{ fontFamily: "'Fredoka One', cursive" }}>
            Party: Saturday 6th June 2026 at 1pm 🎉
          </p>
        </div>

        {/* You're Invited */}
        <div className="rounded-3xl p-6 mb-5 text-center shadow-xl border-4 border-mickey-yellow" style={{ background: 'linear-gradient(135deg, #8b5cf6, #4a90e2)' }}>
          <p className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Luckiest Guy', cursive", textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}>
            YOU'RE INVITED! 🎀
          </p>
          <p className="text-white text-lg font-bold opacity-90" style={{ fontFamily: "'Fredoka One', cursive" }}>
            Arabella is turning 10 and she'd love you to join her for a very special sleepover party on <span className="underline">Saturday 6th June</span>!
          </p>
        </div>

        {/* PRESS ME */}
        <div className="mb-8 text-center">
          <button
            onClick={playRandomClip}
            className="relative inline-block select-none focus:outline-none"
            style={{ transform: isPlaying ? 'scale(0.94)' : 'scale(1)', transition: 'transform 0.15s ease' }}
          >
            <div
              className="rounded-full px-10 py-6 font-black text-white text-3xl md:text-4xl shadow-2xl border-4 border-white"
              style={{
                fontFamily: "'Luckiest Guy', cursive",
                background: isPlaying ? 'linear-gradient(135deg, #10b981, #4a90e2)' : 'linear-gradient(135deg, #e23636, #ff7f3f)',
                boxShadow: isPlaying ? '0 6px 0 #065f46, 0 10px 30px rgba(16,185,129,0.5)' : '0 6px 0 #991b1b, 0 10px 30px rgba(226,54,54,0.5)',
                textShadow: '2px 2px 0 rgba(0,0,0,0.25)',
                letterSpacing: '0.05em',
              }}
            >
              {isPlaying ? '🔊 Playing...' : '🎙️ PRESS ME!'}
            </div>
          </button>
          <p className="text-sm font-bold text-disney-purple mt-3" style={{ fontFamily: "'Fredoka One', cursive" }}>
            {hasPlayed && !isPlaying ? '...again!' : 'Hear a message from Arabella!'}
          </p>
        </div>

        {/* Countdown */}
        <div className="mb-8">
          <p className="text-center font-black text-disney-purple text-lg mb-3" style={{ fontFamily: "'Fredoka One', cursive" }}>
            ⏰ Party starts in...
          </p>
          <div className="grid grid-cols-4 gap-3">
            {[{ label: 'Days', val: days }, { label: 'Hours', val: hours }, { label: 'Mins', val: minutes }, { label: 'Secs', val: seconds }].map(({ label, val }) => (
              <div key={label} className="bg-white rounded-2xl border-4 border-disney-purple p-3 text-center shadow-lg">
                <div className="text-3xl md:text-4xl font-black text-mickey-red leading-none" style={{ fontFamily: "'Luckiest Guy', cursive" }}>
                  {pad(val)}
                </div>
                <div className="text-xs font-bold text-disney-purple uppercase tracking-wide mt-1" style={{ fontFamily: "'Fredoka One', cursive" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What's Happening */}
        <div className="mb-8">
          <h2
            className="text-center text-3xl font-black mb-5"
            style={{ fontFamily: "'Luckiest Guy', cursive", color: '#ff7f3f', textShadow: '2px 2px 0 #e23636' }}
          >
            WHAT'S HAPPENING! 🌟
          </h2>
          <div className="space-y-4">
            {activities.map((a) => (
              <div
                key={a.id}
                id={a.id}
                className={`rounded-2xl border-4 p-4 shadow-lg flex items-start gap-4 scroll-mt-28 ${a.colour}`}
              >
                <span className="text-4xl flex-shrink-0">{a.emoji}</span>
                <div>
                  <h3 className={`text-xl font-black mb-1 ${a.textColour}`} style={{ fontFamily: "'Fredoka One', cursive" }}>
                    {a.title}
                  </h3>
                  <p className={`text-sm font-semibold leading-snug ${a.textColour} opacity-90`}>
                    {a.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What to bring */}
        <div id="bring" className="bg-white rounded-3xl border-4 border-mickey-yellow p-6 mb-8 shadow-lg scroll-mt-28">
          <h2 className="text-center text-2xl font-black mb-4 text-mickey-orange" style={{ fontFamily: "'Luckiest Guy', cursive" }}>
            WHAT TO BRING 🎒
          </h2>
          <ul className="space-y-2">
            {[
              { emoji: '🛏️', text: 'Sleeping bag or comfy PJs' },
              { emoji: '🪥', text: 'Toothbrush and overnight bits' },
              { emoji: '🧴', text: 'Your favourite face wash or moisturiser for the spa' },
              { emoji: '👟', text: 'Cosy socks — we\'ll be in robes all evening!' },
              { emoji: '🎶', text: 'Your go-to karaoke bop ready to go' },
              { emoji: '💖', text: 'Your best vibes and LOTS of excitement' },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-toontown-darkbrown font-semibold">
                <span className="text-2xl">{item.emoji}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RSVP */}
        <div className="rounded-3xl p-5 mb-8 text-center shadow-xl border-4 border-toontown-green" style={{ background: 'linear-gradient(135deg, #10b981, #4a90e2)' }}>
          <p className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Luckiest Guy', cursive", textShadow: '2px 2px 0 rgba(0,0,0,0.25)' }}>
            RSVP 📱
          </p>
          <p className="text-white font-bold mb-3 opacity-90" style={{ fontFamily: "'Fredoka One', cursive" }}>
            Can you come? Let us know by WhatsApp!
          </p>
          <a
            href={DAD_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-2xl px-8 py-3 font-black text-xl text-white shadow-lg border-4 border-white hover:scale-105 transition-transform duration-200"
            style={{ background: '#25D366', fontFamily: "'Luckiest Guy', cursive", textShadow: 'none' }}
          >
            💬 WhatsApp Dad
          </a>
        </div>

        {/* Footer */}
        <div className="rounded-3xl p-6 text-center shadow-xl border-4 border-mickey-red" style={{ background: 'linear-gradient(135deg, #e23636, #ff7f3f)' }}>
          <p className="text-white text-2xl font-black mb-1" style={{ fontFamily: "'Luckiest Guy', cursive", textShadow: '2px 2px 0 rgba(0,0,0,0.2)' }}>
            Can't wait to see you! 🥳
          </p>
          <p className="text-white font-bold opacity-90" style={{ fontFamily: "'Fredoka One', cursive" }}>
            Love from Arabella 💖
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">arabellaharris.com/birthday</p>
      </div>

      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 0.8; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
