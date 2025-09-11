import { useState, useEffect, useRef } from 'react';
import { Star, Music, Mic, Heart, Volume2, Play, Radio, Tv, Book, Gamepad2, Baby, Globe, ShoppingCart, GraduationCap, Mail, Phone, Globe as GlobeIcon } from 'lucide-react';

interface FloatingIconProps {
  icon: React.ElementType;
  className?: string;
  delay?: number;
  position: string;
}

const FloatingIcon = ({ icon: Icon, className = "", delay = 0, position }: FloatingIconProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);
  };

  return (
    <Icon
      className={`absolute text-2xl cursor-pointer floating-icon transition-transform duration-500 ${position} ${className} ${
        isClicked ? 'scale-[1.2] rotate-[360deg]' : ''
      }`}
      style={{ animationDelay: `${delay}s` }}
      onClick={handleClick}
      data-testid={`floating-icon-${position.replace(/\s+/g, '-')}`}
    />
  );
};

const AnimatedCounter = () => {
  const [displayAge, setDisplayAge] = useState(9);
  const [isAnimating, setIsAnimating] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  const animateCounter = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const finalAge = 9;
    const animationDuration = 2000;
    const frameRate = 100;
    const totalFrames = animationDuration / frameRate;
    let frame = 0;

    const interval = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 21);
      setDisplayAge(randomNum);
      
      if (counterRef.current) {
        counterRef.current.style.transform = `rotateY(${frame * 18}deg) scale(${1 + Math.sin(frame * 0.3) * 0.1})`;
      }

      frame++;

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayAge(finalAge);
        if (counterRef.current) {
          counterRef.current.style.transform = 'rotateY(0deg) scale(1)';
          counterRef.current.style.color = '#FFD700';
        }
        setIsAnimating(false);
      }
    }, frameRate);
  };

  useEffect(() => {
    const timer = setTimeout(animateCounter, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span
      ref={counterRef}
      className="counter-digit text-toontown-yellow cursor-pointer"
      onClick={animateCounter}
      data-testid="age-counter"
    >
      {displayAge}
    </span>
  );
};

const SoundCloudItem = ({ title, icon: Icon, index }: { title: string; icon: React.ElementType; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={itemRef}
      className={`soundcloud-item transition-all duration-700 ${isVisible ? 'animate-in' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
      data-testid={`soundcloud-item-${index}`}
    >
      <div className="flex items-center mb-3">
        <Icon className="text-mickey-red text-xl mr-2" data-testid={`soundcloud-icon-${index}`} />
        <span className="font-friendly font-bold text-toontown-darkbrown">{title}</span>
      </div>
      <iframe
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1234567890&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
        title={`${title} - Arabella Harris Voice Demo`}
        className="rounded-lg"
        data-testid={`soundcloud-iframe-${index}`}
      />
    </div>
  );
};

export default function Home() {
  const soundCloudItems = [
    { title: "Commercial Demo", icon: Music },
    { title: "Character Voices", icon: Mic },
    { title: "Radio Spots", icon: Radio },
    { title: "TV Commercials", icon: Tv },
    { title: "Narration", icon: Book },
    { title: "Gaming", icon: Gamepad2 },
    { title: "Kids Content", icon: Baby },
    { title: "International", icon: Globe },
    { title: "E-learning", icon: ShoppingCart },
    { title: "Award Winners", icon: Star },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="relative overflow-hidden py-8 px-4" data-testid="header-section">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <FloatingIcon 
            icon={Star} 
            className="text-toontown-yellow" 
            delay={0} 
            position="top-10 left-10" 
          />
          <FloatingIcon 
            icon={Music} 
            className="text-toontown-red text-xl" 
            delay={1} 
            position="top-20 right-20" 
          />
          <FloatingIcon 
            icon={Mic} 
            className="text-toontown-blue" 
            delay={2} 
            position="bottom-20 left-20" 
          />
          <FloatingIcon 
            icon={Heart} 
            className="text-toontown-red text-xl" 
            delay={1.5} 
            position="bottom-10 right-10" 
          />
        </div>

        {/* Main Sign */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="wooden-sign px-8 py-12 mx-4 relative bounce-in" data-testid="main-sign">
            {/* Decorative screws */}
            <div className="absolute top-4 left-4 w-6 h-6 bg-toontown-brown rounded-full shadow-inner" data-testid="screw-tl"></div>
            <div className="absolute top-4 right-4 w-6 h-6 bg-toontown-brown rounded-full shadow-inner" data-testid="screw-tr"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-toontown-brown rounded-full shadow-inner" data-testid="screw-bl"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 bg-toontown-brown rounded-full shadow-inner" data-testid="screw-br"></div>

            <h1 className="cartoon-text text-4xl md:text-6xl lg:text-7xl text-mickey-yellow mb-6" data-testid="presenting-text">
              Presenting...
            </h1>
            <h2 className="cartoon-text-glow text-5xl md:text-7xl lg:text-8xl text-white mb-8" data-testid="name-text">
              Arabella Harris!
            </h2>

            {/* Animated Counter */}
            <div className="bg-mickey-red rounded-2xl px-6 py-4 inline-block cartoon-border" data-testid="age-counter-container">
              <span className="cartoon-text-glow text-2xl md:text-3xl text-white">
                Aged... <AnimatedCounter />
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Bio Section */}
        <section className="bg-white rounded-3xl p-8 mb-12 shadow-lg cartoon-border" data-testid="bio-section">
          <div className="flex items-center mb-6">
            <Mic className="text-mickey-orange text-3xl mr-4 floating-icon" data-testid="bio-icon" />
            <h3 className="cartoon-text text-3xl md:text-4xl text-mickey-orange">Meet Arabella!</h3>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg md:text-xl text-toontown-darkbrown leading-relaxed font-friendly font-semibold mb-6" data-testid="bio-text">
              Arabella is an award-winning young voiceover artist whose clients include household names such as <strong>Tesco</strong>, <strong>Sainsbury's</strong>, <strong>Asda</strong>, <strong>Uber</strong>, <strong>AXA</strong>, <strong>TK Maxx</strong>, <strong>Clarks</strong>, <strong>Peppa Pig</strong>, <strong>Kinder</strong>, <strong>Panasonic</strong>, <strong>Superdrug</strong>, <strong>Kwik Fit</strong>, and <strong>Ring</strong>. She's voiced national radio and TV campaigns, high-profile brand content, and international projects for markets including the UK, Europe, and the Middle East, bringing warmth, energy, and charm to every brief.
            </p>

            <div className="bg-mickey-yellow rounded-2xl p-6 text-center cartoon-border" data-testid="disclaimer-box">
              <GraduationCap className="text-disney-blue text-2xl mb-3 floating-icon mx-auto" data-testid="graduation-icon" />
              <p className="cartoon-text text-xl md:text-2xl text-toontown-darkbrown" data-testid="disclaimer-text">
                Note: Arabella is not available during school hours or when homework is due! 📚✏️
              </p>
            </div>
          </div>
        </section>

        {/* YouTube Section */}
        <section className="mb-12" data-testid="youtube-section">
          <div className="text-center mb-8">
            <Play className="text-mickey-red text-4xl mb-4 floating-icon mx-auto" data-testid="youtube-icon" />
            <h3 className="cartoon-text text-3xl md:text-4xl text-mickey-red">Watch Arabella in Action!</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Video 1 */}
            <div className="video-container bg-disney-blue p-4 cartoon-border" data-testid="video-container-1">
              <div className="bg-white rounded-lg p-2">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Arabella Harris Voiceover Demo 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                  data-testid="youtube-iframe-1"
                />
              </div>
            </div>

            {/* Video 2 */}
            <div className="video-container bg-mickey-orange p-4 cartoon-border" data-testid="video-container-2">
              <div className="bg-white rounded-lg p-2">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Arabella Harris Voiceover Demo 2"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                  data-testid="youtube-iframe-2"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SoundCloud Section */}
        <section className="mb-12" data-testid="soundcloud-section">
          <div className="text-center mb-8">
            <Volume2 className="text-disney-blue text-4xl mb-4 floating-icon mx-auto" data-testid="soundcloud-header-icon" />
            <h3 className="cartoon-text text-3xl md:text-4xl text-disney-blue">Listen to Arabella's Voice Reels!</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6" data-testid="soundcloud-grid">
            {soundCloudItems.map((item, index) => (
              <SoundCloudItem
                key={index}
                title={item.title}
                icon={item.icon}
                index={index}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-mickey-orange py-8 px-4 mt-12" data-testid="footer-section">
        <div className="max-w-4xl mx-auto text-center">
          <div className="wooden-sign px-6 py-8 mx-4" data-testid="footer-sign">
            <h4 className="cartoon-text-glow text-2xl md:text-3xl text-white mb-4" data-testid="footer-title">
              Ready to Work with Arabella?
            </h4>
            <p className="text-lg text-toontown-cream font-friendly font-semibold mb-4" data-testid="footer-text">
              Contact her representation for bookings and inquiries!
            </p>
            <div className="flex justify-center space-x-6">
              <Mail className="text-mickey-yellow text-2xl floating-icon cursor-pointer" data-testid="contact-email" />
              <Phone className="text-mickey-yellow text-2xl floating-icon cursor-pointer" style={{ animationDelay: '0.5s' }} data-testid="contact-phone" />
              <GlobeIcon className="text-mickey-yellow text-2xl floating-icon cursor-pointer" style={{ animationDelay: '1s' }} data-testid="contact-website" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
