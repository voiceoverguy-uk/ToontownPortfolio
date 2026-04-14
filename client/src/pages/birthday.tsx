import { useState, useEffect, useRef } from 'react';
import { PageShell } from '@/components/PageShell';

const BIRTHDAY_CLIPS = ['/b1.mp3', '/b2.mp3', '/b3.mp3', '/b4.mp3'];

const PARTY_DATE = new Date('2026-06-04T17:00:00');

const activities = [
  {
    emoji: '🎨',
    title: 'Snack Box Crafting',
    desc: 'We\'re making our very own personalised snack boxes — decorate yours and fill it with treats!',
    colour: 'bg-mickey-yellow border-mickey-orange',
    textColour: 'text-toontown-darkbrown',
  },
  {
    emoji: '🎤',
    title: 'Karaoke',
    desc: 'Grab the mic and sing your heart out! Bops only, no bad vibes allowed.',
    colour: 'bg-disney-purple border-disney-blue',
    textColour: 'text-white',
  },
  {
    emoji: '🎬',
    title: 'Movie in the Cinema Room',
    desc: 'We\'ve got the whole cinema room to ourselves — snuggle up and watch something amazing!',
    colour: 'bg-disney-blue border-disney-purple',
    textColour: 'text-white',
  },
  {
    emoji: '🍗',
    title: 'Chicken Tenders & Snacks',
    desc: 'The best birthday food ever. Chicken tenders, dips, and all the snacks you could ever want.',
    colour: 'bg-mickey-orange border-mickey-red',
    textColour: 'text-white',
  },
  {
    emoji: '🩷',
    title: 'Birthday Robes',
    desc: 'Everyone gets their very own birthday robe to wear all night. So cosy, so cute.',
    colour: 'bg-mickey-red border-mickey-orange',
    textColour: 'text-white',
  },
  {
    emoji: '💅',
    title: 'Mini Spa',
    desc: 'Nails, face masks, the works. Full pamper mode is ON.',
    colour: 'bg-toontown-green border-disney-blue',
    textColour: 'text-white',
  },
  {
    emoji: '🌙',
    title: 'Sleepover!',
    desc: 'Stay the night, stay up late (maybe!), and wake up for the best morning ever.',
    colour: 'bg-disney-purple border-mickey-red',
    textColour: 'text-white',
  },
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastClipRef = useRef<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const playRandomClip = () => {
    let idx: number;
    do { idx = Math.floor(Math.random() * BIRTHDAY_CLIPS.length); }
    while (idx === lastClipRef.current && BIRTHDAY_CLIPS.length > 1);
    lastClipRef.current = idx;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const audio = new Audio(BIRTHDAY_CLIPS[idx]);
    audioRef.current = audio;
    setIsPlaying(true);
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

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <PageShell>
    <div className="min-h-screen overflow-x-hidden pt-24" style={{ background: 'linear-gradient(135deg, #f9e4f0 0%, #e8f4fd 30%, #fef9e7 60%, #e8f4fd 100%)' }}>

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
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">

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
          <p
            className="text-xl md:text-2xl font-bold text-disney-purple mt-2"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            Thursday 4th June 2026
          </p>
        </div>

        {/* You're Invited card */}
        <div
          className="rounded-3xl p-6 mb-8 text-center shadow-xl border-4 border-mickey-yellow"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #4a90e2)' }}
        >
          <p className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Luckiest Guy', cursive", textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}>
            YOU'RE INVITED! 🎀
          </p>
          <p className="text-white text-lg font-bold opacity-90" style={{ fontFamily: "'Fredoka One', cursive" }}>
            Arabella is turning 10 and she'd love you to come for a very special sleepover party!
          </p>
        </div>

        {/* PRESS ME button */}
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
                background: isPlaying
                  ? 'linear-gradient(135deg, #10b981, #4a90e2)'
                  : 'linear-gradient(135deg, #e23636, #ff7f3f)',
                boxShadow: isPlaying
                  ? '0 6px 0 #065f46, 0 10px 30px rgba(16,185,129,0.5)'
                  : '0 6px 0 #991b1b, 0 10px 30px rgba(226,54,54,0.5)',
                textShadow: '2px 2px 0 rgba(0,0,0,0.25)',
                letterSpacing: '0.05em',
              }}
            >
              {isPlaying ? '🔊 Playing...' : '🎙️ PRESS ME!'}
            </div>
          </button>
          <p className="text-sm font-bold text-disney-purple mt-3" style={{ fontFamily: "'Fredoka One', cursive" }}>
            Hear a message from Arabella!
          </p>
        </div>

        {/* Countdown */}
        <div className="mb-8">
          <p className="text-center font-black text-disney-purple text-lg mb-3" style={{ fontFamily: "'Fredoka One', cursive" }}>
            ⏰ Party starts in...
          </p>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Days', val: days },
              { label: 'Hours', val: hours },
              { label: 'Mins', val: minutes },
              { label: 'Secs', val: seconds },
            ].map(({ label, val }) => (
              <div key={label} className="bg-white rounded-2xl border-4 border-disney-purple p-3 text-center shadow-lg">
                <div
                  className="text-3xl md:text-4xl font-black text-mickey-red leading-none"
                  style={{ fontFamily: "'Luckiest Guy', cursive" }}
                >
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
            style={{
              fontFamily: "'Luckiest Guy', cursive",
              color: '#ff7f3f',
              textShadow: '2px 2px 0 #e23636',
            }}
          >
            WHAT'S HAPPENING! 🌟
          </h2>
          <div className="space-y-4">
            {activities.map((a, i) => (
              <div
                key={i}
                className={`rounded-2xl border-4 p-4 shadow-lg flex items-start gap-4 ${a.colour}`}
              >
                <span className="text-4xl flex-shrink-0">{a.emoji}</span>
                <div>
                  <h3
                    className={`text-xl font-black mb-1 ${a.textColour}`}
                    style={{ fontFamily: "'Fredoka One', cursive" }}
                  >
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
        <div className="bg-white rounded-3xl border-4 border-mickey-yellow p-6 mb-8 shadow-lg">
          <h2
            className="text-center text-2xl font-black mb-4 text-mickey-orange"
            style={{ fontFamily: "'Luckiest Guy', cursive" }}
          >
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

        {/* Footer message */}
        <div
          className="rounded-3xl p-6 text-center shadow-xl border-4 border-mickey-red"
          style={{ background: 'linear-gradient(135deg, #e23636, #ff7f3f)' }}
        >
          <p className="text-white text-2xl font-black mb-1" style={{ fontFamily: "'Luckiest Guy', cursive", textShadow: '2px 2px 0 rgba(0,0,0,0.2)' }}>
            Can't wait to see you! 🥳
          </p>
          <p className="text-white font-bold opacity-90" style={{ fontFamily: "'Fredoka One', cursive" }}>
            Love from Arabella 💖
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          arabellaharris.com/birthday
        </p>
      </div>

      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 0.8; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
    </PageShell>
  );
}
