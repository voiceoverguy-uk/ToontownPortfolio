import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { Star, Music, Mic, Heart, Volume2, Play, Radio, Tv, Book, Gamepad2, Baby, Globe, ShoppingCart, GraduationCap, Mail, Phone, Globe as GlobeIcon, ChevronLeft, ChevronRight, Quote, Menu, X } from 'lucide-react';
import { useLocation, Link } from 'wouter';
import arabellaImage from '@assets/arabella-harris-voiceover-kid-website-pic_1757598263203.webp';
import arabellaLogo from '@assets/arabella-harris-logo_1757599598657.jpg';
import arabellaBanner from '@assets/arabella-harris-logo-top_1757606004670.jpg';
import arabellaNavLogo from '@assets/arabella-harris-navigation-bar_1757607955178.jpg';
import headerBg from '@assets/header-bg_1757622267624.jpg';

// Audio Context for managing currently playing audio
const AudioContext = createContext<{
  currentlyPlaying: string | null;
  setCurrentlyPlaying: (id: string | null) => void;
}>({
  currentlyPlaying: null,
  setCurrentlyPlaying: () => {},
});

const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  
  return (
    <AudioContext.Provider value={{ currentlyPlaying, setCurrentlyPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};

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

// AnimatedCounter component removed - no longer needed for mature pre-teen design

// Simple Audio Player Component
function SimpleAudioPlayer({ audioSrc, testId }: { audioSrc: string, testId: string }) {
  const { currentlyPlaying, setCurrentlyPlaying } = useContext(AudioContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Stop this player if another one starts playing
  useEffect(() => {
    if (currentlyPlaying !== testId && isPlaying) {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        setIsPlaying(false);
      }
    }
  }, [currentlyPlaying, testId, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentlyPlaying(null);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        setCurrentlyPlaying(null);
      } else {
        // Stop any other currently playing audio
        setCurrentlyPlaying(testId);
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio playback failed:', error);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 w-48 md:w-56" data-testid={testId}>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="flex-shrink-0 w-6 h-6 bg-gray-600 text-white rounded-sm flex items-center justify-center hover:bg-gray-500 transition-colors"
        data-testid={`${testId}-play-button`}
      >
        {isPlaying ? (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 4h2v12H6V4zm6 0h2v12h-2V4z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 4l8 6-8 6V4z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Current Time */}
      <span className="text-xs text-gray-600 font-medium">
        {formatTime(currentTime)}
      </span>

      {/* Progress Bar */}
      <div className="flex-1 bg-gray-300 rounded-full h-1">
        <div 
          className="bg-gray-600 h-1 rounded-full transition-all duration-100"
          style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
        />
      </div>

      {/* Total Duration */}
      <span className="text-xs text-gray-600 font-medium">
        {formatTime(duration)}
      </span>
    </div>
  );
}

const AudioTrackItem = ({ title, icon: Icon, index, url }: { title: string; icon: React.ElementType; index: number; url: string }) => {
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
      data-testid={`audio-track-item-${index}`}
    >
      <div className="bg-white border-4 border-mickey-yellow rounded-2xl p-4 shadow-lg">
        <div className="flex items-center mb-3">
          <Icon className="text-mickey-red text-xl mr-2" data-testid={`audio-track-icon-${index}`} />
          <span className="font-bold text-toontown-darkbrown">{title}</span>
        </div>
        <SimpleAudioPlayer 
          audioSrc={url}
          testId={`audio-track-player-${index}`}
        />
      </div>
    </div>
  );
};

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  role: string;
}

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const testimonials: Testimonial[] = [
    {
      quote: "Arabella has an incredible gift, her voice is full of charm, authenticity, and youthful energy. I especially love it when she dances during our voiceover sessions 😊 She brings every project to life with a true natural delivery, she's a rare young voice talent! Arabella is an absolute joy to work with, and we look forward to the next project.",
      author: "Graham Hellis",
      company: "Clearwave",
      role: "Producer"
    },
    {
      quote: "Arabella has been a pleasure to record on a number of occasions. She takes direction well, mature beyond her age and I always end up with a great result.",
      author: "Steve Withey",
      company: "Sound Logic",
      role: "Producer"
    },
    {
      quote: "Arabella is one of the best CVO's I've had the joy of working with. She is a go to for any project, due to her amazing direction understanding, and can deliver depth, character and emotion into any script given.",
      author: "Tom Hammond",
      company: "Bauer Media",
      role: "Producer"
    },
    {
      quote: "Arabella is a joy to work with, welcome anytime at the North Pole to help the elves",
      author: "Guy Harris",
      company: "North Pole",
      role: "Voice of Santa"
    }
  ];

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextTestimonial]);

  return (
    <section className="mb-12 pb-8" data-testid="testimonials-section">
      <div className="text-center mb-8">
        <Quote className="text-mickey-red text-4xl mb-4 floating-icon mx-auto" data-testid="testimonials-icon" />
        <h3 className="font-bold text-3xl md:text-4xl text-mickey-red">What Clients Say!</h3>
      </div>

      <div className="testimonial-carousel relative max-w-4xl mx-auto" data-testid="testimonials-carousel">
        <div className="relative min-h-[300px]" onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-slide ${
                index === currentIndex ? 'active' : 
                index === (currentIndex - 1 + testimonials.length) % testimonials.length ? 'prev' : ''
              }`}
              data-testid={`testimonial-${index}`}
            >
              <div className="testimonial-bubble max-w-2xl mx-auto">
                <Quote className="text-disney-blue text-2xl mb-4 floating-icon" data-testid={`quote-icon-${index}`} />
                <blockquote className="text-lg md:text-xl font-bold font-semibold text-toontown-darkbrown mb-4 leading-relaxed" data-testid={`testimonial-quote-${index}`}>
                  "{testimonial.quote}"
                </blockquote>
                <footer className="text-right">
                  <cite className="font-bold text-lg text-mickey-red not-italic" data-testid={`testimonial-author-${index}`}>
                    – {testimonial.author}
                  </cite>
                  <p className="text-sm font-bold text-disney-blue mt-1" data-testid={`testimonial-company-${index}`}>
                    {testimonial.role}, {testimonial.company}
                  </p>
                </footer>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevTestimonial}
          className="absolute left-4 top-[40%] transform -translate-y-1/2 bg-mickey-yellow hover:bg-mickey-orange transition-colors duration-300 rounded-full p-3 shadow-lg cartoon-border"
          data-testid="testimonial-prev"
        >
          <ChevronLeft className="text-toontown-darkbrown text-xl" />
        </button>
        
        <button
          onClick={nextTestimonial}
          className="absolute right-4 top-[40%] transform -translate-y-1/2 bg-mickey-yellow hover:bg-mickey-orange transition-colors duration-300 rounded-full p-3 shadow-lg cartoon-border"
          data-testid="testimonial-next"
        >
          <ChevronRight className="text-toontown-darkbrown text-xl" />
        </button>

        {/* Dots Navigation */}
        <div className="carousel-dots" data-testid="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              data-testid={`testimonial-dot-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [heartClicked, setHeartClicked] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  
  // Calculate Arabella's current age (birthday: June 4th, 2016)
  const calculateAge = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const birthday = new Date(currentYear, 5, 4); // June 4th (month is 0-indexed)
    const birthYear = 2016; // Born June 4, 2016
    
    // If today is before June 4th this year, she hasn't had her birthday yet
    if (today < birthday) {
      return currentYear - birthYear - 1; // Subtract 1 because birthday hasn't happened yet this year
    } else {
      return currentYear - birthYear; // Birthday has happened this year
    }
  };
  
  const arabellaAge = calculateAge();
  
  
  // Smooth scroll to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  // Get current active section (no default active state - buttons light up when selected)
  const isActive = (sectionId: string) => {
    return false; // No default active state - buttons will light up when clicked/selected
  };

  // Handle heart click
  const handleHeartClick = () => {
    setHeartClicked(true);
    setShowThankYou(true);
    
    // Hide thank you message after 3 seconds
    setTimeout(() => {
      setShowThankYou(false);
    }, 3000);
    
    // Reset heart to default after 3 seconds
    setTimeout(() => {
      setHeartClicked(false);
    }, 3000);
  };

  const audioTracks = [
    { title: "Nickelodeon", icon: Music, url: "https://www.voiceoverguy.co.uk/assets/audio/pleasure-beach-resort-nickelodeon-arabella-harris.mp3" },
    { title: "Skoda National Radio", icon: Music, url: "https://www.voiceoverguy.co.uk/assets/audio/skoda-arabella-harris.mp3" },
    { title: "Narration Showreel", icon: Book, url: "https://www.voiceoverguy.co.uk/assets/audio/narration-demo-arabella-harris.mp3" },
    { title: "Barnardos", icon: Mic, url: "https://www.voiceoverguy.co.uk/assets/audio/barnardos-arabella-harris.mp3" },
    { title: "Sainsburys", icon: ShoppingCart, url: "https://www.voiceoverguy.co.uk/assets/audio/sainsburys-tu-arabella-harris.mp3" },
    { title: "Cherry Blossom National Radio Advert", icon: Music, url: "https://www.voiceoverguy.co.uk/assets/audio/cherry-blossom-arabella-harris.mp3" },
    { title: "Reem Mall - Dubai", icon: ShoppingCart, url: "https://www.voiceoverguy.co.uk/assets/audio/reem-mall-madagascar-arabella-harris.mp3" },
    { title: "Sketchers", icon: Music, url: "https://www.voiceoverguy.co.uk/assets/audio/sketchers-back-to-school-usa-accent-arabella-harris.mp3" },
    { title: "Wickstead Park Radio Commercial", icon: Music, url: "https://www.voiceoverguy.co.uk/assets/audio/wicksteed-park-arabella-harris.mp3" },
    { title: "Rainbow Allotment", icon: Music, url: "https://www.voiceoverguy.co.uk/assets/audio/rainbow-allotment-arabella-harris.mp3" },
    { title: "Dear Santa", icon: Music, url: "https://www.voiceoverguy.co.uk/assets/audio/dear-santa-arabella-harris.mp3" },
    { title: "Isle of White Ice Cream", icon: Music, url: "https://www.voiceoverguy.co.uk/assets/audio/isle-of-wight-ice-cream-arabella-harris.mp3" },
  ];

  return (
    <AudioProvider>
      <div className="bg-transparent text-foreground min-h-screen relative z-10 overflow-x-hidden">
        {/* Fixed Background Image */}
        <div 
          className="header-background"
          style={{ 
            backgroundImage: `url(${headerBg})`
          }}
          data-testid="header-background"
        />
        
        {/* Subtle overlay for content readability */}
        <div className="fixed inset-0 bg-white/40 z-[1] pointer-events-none" data-testid="bg-overlay" />
        
        {/* Main Content Wrapper */}
        <div className="relative z-10">
        {/* Top Navigation Bar */}
      <nav role="navigation" aria-label="Primary" className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-md border-b-4 border-mickey-yellow shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo on the left */}
            <div className="flex-shrink-0" data-testid="nav-logo">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="block cursor-pointer"
                data-testid="nav-logo-button"
              >
                <img 
                  src={arabellaNavLogo} 
                  alt="Arabella Harris - Professional Voiceover Artist"
                  className="h-12 md:h-16 w-auto logo transition-transform duration-300 hover:scale-105"
                  data-testid="arabella-nav-logo"
                />
              </button>
            </div>

            {/* Desktop Navigation Links - Right Side */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4" data-testid="desktop-nav">
              <button 
                onClick={() => scrollToSection('audio-showreel')}
                className={`font-bold text-lg px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 border-4 border-transparent ${
                  isActive('audio-showreel') 
                    ? 'bg-mickey-yellow text-toontown-darkbrown shadow-lg transform scale-105' 
                    : 'hover:bg-mickey-yellow/30 text-toontown-darkbrown hover:shadow-md hover:border-yellow-400'
                }`}
                data-testid="link-audio"
                aria-current={isActive('audio-showreel') ? 'page' : undefined}
              >
                🎵 Audio Showreel
              </button>
              <button 
                onClick={() => scrollToSection('video-showreel')}
                className={`font-bold text-lg px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 border-4 border-transparent ${
                  isActive('video-showreel') 
                    ? 'bg-disney-blue text-white shadow-lg transform scale-105' 
                    : 'hover:bg-disney-blue/30 text-toontown-darkbrown hover:shadow-md hover:border-yellow-400'
                }`}
                data-testid="link-video"
                aria-current={isActive('video-showreel') ? 'page' : undefined}
              >
                🎬 Video Showreel
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`font-bold text-lg px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 border-4 border-transparent ${
                  isActive('contact') 
                    ? 'bg-mickey-red text-white shadow-lg transform scale-105' 
                    : 'hover:bg-mickey-red/30 text-toontown-darkbrown hover:shadow-md hover:border-yellow-400'
                }`}
                data-testid="link-contact"
                aria-current={isActive('contact') ? 'page' : undefined}
              >
                📞 Contact
              </button>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden" data-testid="mobile-menu-toggle">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl bg-mickey-yellow hover:bg-mickey-orange transition-colors duration-200 text-toontown-darkbrown shadow-lg hover:shadow-xl"
                data-testid="hamburger-button"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 bg-white/85 border-4 border-mickey-yellow rounded-2xl p-4 shadow-xl animate-in slide-in-from-top-2 duration-300" data-testid="mobile-menu">
              <div className="space-y-3">
                <button 
                  onClick={() => scrollToSection('audio-showreel')}
                  className={`w-full block font-bold text-lg py-3 px-4 rounded-xl text-center transition-all duration-200 border-4 border-transparent ${
                    isActive('audio-showreel') 
                      ? 'bg-mickey-yellow text-toontown-darkbrown shadow-md' 
                      : 'hover:bg-mickey-yellow/20 text-toontown-darkbrown hover:border-yellow-400'
                  }`}
                  data-testid="mobile-link-audio"
                  aria-current={isActive('audio-showreel') ? 'page' : undefined}
                >
                  🎵 Audio Showreel
                </button>
                <button 
                  onClick={() => scrollToSection('video-showreel')}
                  className={`w-full block font-bold text-lg py-3 px-4 rounded-xl text-center transition-all duration-200 border-4 border-transparent ${
                    isActive('video-showreel') 
                      ? 'bg-disney-blue text-white shadow-md' 
                      : 'hover:bg-disney-blue/20 text-toontown-darkbrown hover:border-yellow-400'
                  }`}
                  data-testid="mobile-link-video"
                  aria-current={isActive('video-showreel') ? 'page' : undefined}
                >
                  🎬 Video Showreel
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className={`w-full block font-bold text-lg py-3 px-4 rounded-xl text-center transition-all duration-200 border-4 border-transparent ${
                    isActive('contact') 
                      ? 'bg-mickey-red text-white shadow-md' 
                      : 'hover:bg-mickey-red/20 text-toontown-darkbrown hover:border-yellow-400'
                  }`}
                  data-testid="mobile-link-contact"
                  aria-current={isActive('contact') ? 'page' : undefined}
                >
                  📞 Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* New Golden Hero Section */}
      <section className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500" data-testid="hero-section">
        {/* Subtle background text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="text-9xl md:text-[12rem] font-bold text-white/30 select-none">
            ARABELLA HARRIS
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Arabella's Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative transform -rotate-3 hover:-rotate-6 transition-all duration-500 hover:scale-105 group pb-16 md:pb-0">
                <div className="bg-red-500 p-2 rounded-xl shadow-2xl">
                  <img 
                    src={arabellaImage} 
                    alt="Arabella Harris in recording studio with headphones and microphone"
                    className="w-full max-w-md rounded-lg"
                    data-testid="arabella-hero-image"
                  />
                </div>
                
                {/* Airport Style Age Reveal - Above Audio Player */}
                <div className="mt-2 flex justify-center md:absolute md:-bottom-12 md:left-1/2 md:transform md:-translate-x-1/2 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                  <div className="bg-gradient-to-r from-black via-gray-900 to-black px-4 py-2 rounded-full border-2 border-yellow-400 shadow-xl animate-pulse-slow">
                    <div className="flex items-center justify-center space-x-3 font-mono text-yellow-400">
                      <span className="text-sm font-bold tracking-wider">AGE:</span>
                      <div className="relative overflow-hidden h-7 w-7 bg-black border border-yellow-400 rounded-sm flex items-center justify-center shadow-inner">
                        <div className="departure-board-digit text-xl font-bold animate-bounce-subtle" data-testid="age-display">{arabellaAge}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Custom Audio Player - Below Age */}
                <div className="mt-6 flex justify-center z-10 md:absolute md:-bottom-24 md:left-1/2 md:transform md:-translate-x-1/2 md:transition-all md:duration-500 md:group-hover:scale-110 md:group-hover:-translate-y-1">
                  <div className="bg-white/95 backdrop-blur-sm border-2 border-mickey-red rounded-full px-2 md:px-4 py-1 md:py-2 shadow-lg">
                    <SimpleAudioPlayer 
                      audioSrc="https://www.voiceoverguy.co.uk/assets/audio/arabella-harris-age-9-showreel-2025.mp3"
                      testId="arabella-voice-player"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Bio Text */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-mickey-red mb-4" data-testid="meet-arabella-heading">
                Meet Arabella Harris
              </h2>
              <p className="text-lg md:text-xl text-white font-bold leading-relaxed" data-testid="hero-bio-text">
                Arabella is an award-winning young talented voiceover artist whose clients include brands such as <strong>Tesco</strong>, <strong>Sainsbury's</strong>, <strong>Asda</strong>, <strong>Uber</strong>, <strong>AXA</strong>, <strong>TK Maxx</strong>, <strong>Clarks</strong>, <strong>Peppa Pig</strong>, <strong>Kinder</strong>, <strong>Cherry Blossom</strong>, <strong>Superdrug</strong>, <strong>Kwik Fit</strong>, and <strong>Ring</strong>. She's voiced national radio campaigns, high-profile brand content, and international projects for markets including the UK, Europe, and the Middle East, bringing warmth, energy, and charm to every brief.
              </p>
              
              <div className="bg-white/90 border-4 border-red-500 rounded-2xl p-6 shadow-lg" data-testid="hero-disclaimer-box">
                <GraduationCap className="text-blue-600 text-2xl mb-3 mx-auto" data-testid="hero-graduation-icon" />
                <p className="font-bold text-lg md:text-xl text-gray-800 text-center" data-testid="hero-disclaimer-text">
                  Note: Arabella is not available during school hours, cleaning duties or when homework is due! 📚
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">

          {/* Audio Showreel Section - Always Visible */}
          <div data-testid="audio-content">
            <section id="audio-showreel" className="mb-12 scroll-mt-24" data-testid="soundcloud-section">
              <div className="text-center mb-8">
                <Volume2 className="text-mickey-yellow text-4xl mb-4 mx-auto" data-testid="soundcloud-icon" />
                <h3 className="font-bold text-3xl md:text-4xl text-mickey-yellow">Listen to Arabella's Voice!</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {audioTracks.map((item, index) => (
                  <AudioTrackItem key={index} title={item.title} icon={item.icon} index={index} url={item.url} />
                ))}
              </div>
            </section>
            </div>

          {/* Video Showreel Section - Always Visible */}
          <div data-testid="video-content">
            <section id="video-showreel" className="mb-12 scroll-mt-24" data-testid="youtube-section">
              <div className="text-center mb-8">
                <Play className="text-mickey-red text-4xl mb-4 mx-auto" data-testid="youtube-icon" />
                <h3 className="font-bold text-3xl md:text-4xl text-mickey-red">Hear Arabella in Action!</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Video 1 */}
                <div className="bg-white border-8 border-disney-blue rounded-2xl p-4 shadow-lg" data-testid="video-container-1">
                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/XUJm7iRZ8FI"
                    title="Arabella Showreel 2025"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                    data-testid="youtube-iframe-1"
              />
              <p className="text-center font-bold text-xl text-disney-blue mt-3" data-testid="video-label-1">Arabella</p>
            </div>

            {/* Video 2 */}
            <div className="bg-white border-8 border-mickey-orange rounded-2xl p-4 shadow-lg" data-testid="video-container-2">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/TqkdBK8mBW8"
                title="Arabella's Dad, Guy"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
                data-testid="youtube-iframe-2"
              />
              <p className="text-center font-bold text-xl text-mickey-orange mt-3" data-testid="video-label-2">Daddy</p>
            </div>
          </div>
        </section>
            </div>

          {/* Testimonials Section - Always Visible */}
          <TestimonialsCarousel />

          {/* Contact Section - Always Visible */}
          <div data-testid="contact-content">
        <section id="contact" className="mb-12 scroll-mt-24" data-testid="contact-section">
          <div className="text-center mb-8">
            <Mail className="text-disney-blue text-4xl mb-4 mx-auto" data-testid="contact-icon" />
            <h3 className="font-bold text-3xl md:text-4xl text-disney-blue">Get in Touch!</h3>
          </div>

          <div className="bg-white border-8 border-toontown-darkbrown rounded-3xl px-6 py-8 mx-4 shadow-lg max-w-xl mx-auto" data-testid="contact-info">
            <h4 className="font-bold text-2xl md:text-3xl text-toontown-darkbrown mb-6 text-center" data-testid="contact-title">
              Ready to Work with Arabella?
            </h4>
            
            <div className="text-center">
              <a 
                href="mailto:arabella@voiceoverguy.co.uk"
                className="book-now-button"
                data-testid="book-now-button"
              >
                Book Now!
              </a>
            </div>
          </div>
        </section>
            </div>
        </main>

      {/* Footer Note */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="footer-note" data-testid="footer-note">
          <div className="grid md:grid-cols-4 gap-6 items-center">
            <div className="md:col-span-1 flex justify-center">
              <div className="relative">
                <img 
                  src={arabellaImage} 
                  alt="Arabella Harris - Professional Young Voiceover Artist"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg transform hover:scale-110 transition-transform duration-300"
                  data-testid="arabella-footer-image"
                />
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                  <Heart 
                    className={`text-lg floating-icon cursor-pointer transition-all duration-500 hover:scale-110 ${
                      heartClicked ? 'text-red-600 fill-red-600' : 'text-mickey-red'
                    }`}
                    onClick={handleHeartClick}
                    data-testid="footer-heart-icon" 
                  />
                  
                  {/* Thank You Message */}
                  {showThankYou && (
                    <div className="absolute -top-12 -left-8 bg-mickey-yellow text-toontown-darkbrown px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce z-10 whitespace-nowrap">
                      Thank you! 💕
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="md:col-span-3 text-center md:text-left">
              <p className="font-bold text-xl md:text-2xl text-white leading-relaxed" data-testid="footer-note-text">
                She was always going to be good – she's the daughter of award-winning British male voiceover, <strong>Guy Harris</strong>.
              </p>
              <p className="font-bold text-lg text-toontown-cream mt-2 opacity-90">
                🎤 Takes after her Daddy!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Footer */}
      <footer className="bg-mickey-orange py-4 px-4 mt-8" data-testid="footer-section">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white font-bold">(c) 2025 Arabella Voiceover Kid</p>
        </div>
        </footer>
        </div> {/* Close main content wrapper */}
      </div> {/* Close main background div */}
    </AudioProvider>
  );
}
