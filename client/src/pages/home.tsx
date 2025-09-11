import { useState, useEffect, useRef, useCallback } from 'react';
import { Star, Music, Mic, Heart, Volume2, Play, Radio, Tv, Book, Gamepad2, Baby, Globe, ShoppingCart, GraduationCap, Mail, Phone, Globe as GlobeIcon, ChevronLeft, ChevronRight, Quote, Menu, X } from 'lucide-react';
import { useLocation, Link } from 'wouter';
import arabellaImage from '@assets/arabella-harris-voiceover-kid-website-pic_1757598263203.webp';
import arabellaLogo from '@assets/arabella-harris-logo_1757599598657.jpg';
import arabellaBanner from '@assets/arabella-harris-logo-top_1757606004670.jpg';
import arabellaNavLogo from '@assets/arabella-harris-navigation-bar_1757607955178.jpg';
import headerBg from '@assets/header-bg_1757622267624.jpg';

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
        <span className="font-bold text-toontown-darkbrown">{title}</span>
      </div>
      <iframe
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2123619891&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true"
        title={`${title} - Arabella Harris Voice Demo`}
        className="rounded-lg"
        data-testid={`soundcloud-iframe-${index}`}
      />
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
    <section className="mb-12" data-testid="testimonials-section">
      <div className="text-center mb-8">
        <Quote className="text-mickey-red text-4xl mb-4 floating-icon mx-auto" data-testid="testimonials-icon" />
        <h3 className="cartoon-text text-3xl md:text-4xl text-mickey-red">What Clients Say!</h3>
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
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-mickey-yellow hover:bg-mickey-orange transition-colors duration-300 rounded-full p-3 shadow-lg cartoon-border"
          data-testid="testimonial-prev"
        >
          <ChevronLeft className="text-toontown-darkbrown text-xl" />
        </button>
        
        <button
          onClick={nextTestimonial}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-mickey-yellow hover:bg-mickey-orange transition-colors duration-300 rounded-full p-3 shadow-lg cartoon-border"
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
  
  // Get current page for active menu styling
  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location === path) return true;
    return false;
  };

  // Close mobile menu when clicking a link
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const soundCloudItems = [
    { title: "Commercial Demo", icon: Music },
    { title: "Character Voices", icon: Mic },
    { title: "Radio Spots", icon: Radio },
    { title: "TV Commercials", icon: Tv },
    { title: "Narration", icon: Book },
    { title: "Gaming", icon: Gamepad2 },
    { title: "Kids Content", icon: Baby },
    { title: "International", icon: Globe },
  ];

  return (
    <div className="bg-transparent text-foreground min-h-screen relative z-10">
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
      <nav role="navigation" aria-label="Primary" className="sticky top-0 z-50 bg-white/20 backdrop-blur-md border-b-4 border-mickey-yellow shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo on the left */}
            <div className="flex-shrink-0" data-testid="nav-logo">
              <Link href="/" className="block">
                <img 
                  src={arabellaNavLogo} 
                  alt="Arabella Harris - Professional Voiceover Artist"
                  className="h-12 md:h-16 w-auto logo transition-transform duration-300 hover:scale-105"
                  data-testid="arabella-nav-logo"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links - Right Side */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4" data-testid="desktop-nav">
              <Link 
                href="/" 
                className={`font-bold text-lg px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                  isActive('/') 
                    ? 'bg-mickey-yellow text-toontown-darkbrown shadow-lg transform scale-105' 
                    : 'hover:bg-mickey-yellow/30 text-toontown-darkbrown hover:shadow-md'
                }`}
                data-testid="link-audio"
                aria-current={isActive('/') ? 'page' : undefined}
              >
                🎵 Audio Showreel
              </Link>
              <Link 
                href="/video" 
                className={`font-bold text-lg px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                  isActive('/video') 
                    ? 'bg-disney-blue text-white shadow-lg transform scale-105' 
                    : 'hover:bg-disney-blue/30 text-toontown-darkbrown hover:shadow-md'
                }`}
                data-testid="link-video"
                aria-current={isActive('/video') ? 'page' : undefined}
              >
                🎬 Video Showreel
              </Link>
              <Link 
                href="/contact" 
                className={`font-bold text-lg px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                  isActive('/contact') 
                    ? 'bg-mickey-red text-white shadow-lg transform scale-105' 
                    : 'hover:bg-mickey-red/30 text-toontown-darkbrown hover:shadow-md'
                }`}
                data-testid="link-contact"
                aria-current={isActive('/contact') ? 'page' : undefined}
              >
                📧 Contact
              </Link>
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
            <div className="md:hidden mt-4 bg-white/95 border-4 border-mickey-yellow rounded-2xl p-4 shadow-xl animate-in slide-in-from-top-2 duration-300" data-testid="mobile-menu">
              <div className="space-y-3">
                <Link 
                  href="/" 
                  onClick={handleMobileLinkClick}
                  className={`block font-bold text-lg py-3 px-4 rounded-xl text-center transition-all duration-200 ${
                    isActive('/') 
                      ? 'bg-mickey-yellow text-toontown-darkbrown shadow-md' 
                      : 'hover:bg-mickey-yellow/20 text-toontown-darkbrown'
                  }`}
                  data-testid="mobile-link-audio"
                  aria-current={isActive('/') ? 'page' : undefined}
                >
                  🎵 Audio Showreel
                </Link>
                <Link 
                  href="/video" 
                  onClick={handleMobileLinkClick}
                  className={`block font-bold text-lg py-3 px-4 rounded-xl text-center transition-all duration-200 ${
                    isActive('/video') 
                      ? 'bg-disney-blue text-white shadow-md' 
                      : 'hover:bg-disney-blue/20 text-toontown-darkbrown'
                  }`}
                  data-testid="mobile-link-video"
                  aria-current={isActive('/video') ? 'page' : undefined}
                >
                  🎬 Video Showreel
                </Link>
                <Link 
                  href="/contact" 
                  onClick={handleMobileLinkClick}
                  className={`block font-bold text-lg py-3 px-4 rounded-xl text-center transition-all duration-200 ${
                    isActive('/contact') 
                      ? 'bg-mickey-red text-white shadow-md' 
                      : 'hover:bg-mickey-red/20 text-toontown-darkbrown'
                  }`}
                  data-testid="mobile-link-contact"
                  aria-current={isActive('/contact') ? 'page' : undefined}
                >
                  📧 Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* New Golden Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500" data-testid="hero-section">
        {/* Subtle background text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="text-9xl md:text-[12rem] font-bold text-white/30 select-none">
            ARABELLA HARRIS
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Main Heading */}
          <div className="text-center mb-12">
            <h1 className="font-bold text-4xl md:text-6xl text-red-600 mb-4" data-testid="meet-arabella-heading">
              MEET ARABELLA!
            </h1>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Arabella's Image */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative transform -rotate-3 hover:-rotate-6 transition-transform duration-300 mb-6">
                <div className="bg-red-500 p-2 rounded-xl shadow-2xl">
                  <img 
                    src={arabellaImage} 
                    alt="Arabella Harris in recording studio with headphones and microphone"
                    className="w-full max-w-md rounded-lg"
                    data-testid="arabella-hero-image"
                  />
                </div>
              </div>
              
              {/* Airport Style Age Reveal */}
              <div className="relative">
                <div className="bg-black/90 px-6 py-3 rounded-lg border-2 border-yellow-400 shadow-lg">
                  <div className="flex items-center justify-center space-x-2 font-mono text-yellow-400">
                    <span className="text-lg font-bold">AGE:</span>
                    <div className="relative overflow-hidden h-8 w-8 bg-black border border-yellow-400 rounded flex items-center justify-center">
                      <div className="departure-board-digit text-2xl font-bold" data-testid="age-display">9</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Bio Text */}
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-white font-bold leading-relaxed" data-testid="hero-bio-text">
                Arabella is an award-winning young voiceover artist whose clients include household names such as <strong>Tesco</strong>, <strong>Sainsbury's</strong>, <strong>Asda</strong>, <strong>Uber</strong>, <strong>AXA</strong>, <strong>TK Maxx</strong>, <strong>Clarks</strong>, <strong>Peppa Pig</strong>, <strong>Kinder</strong>, <strong>Panasonic</strong>, <strong>Superdrug</strong>, <strong>Kwik Fit</strong>, and <strong>Ring</strong>. She's voiced national radio and TV campaigns, high-profile brand content, and international projects for markets including the UK, Europe, and the Middle East, bringing warmth, energy, and charm to every brief.
              </p>
              
              <div className="bg-white/90 border-4 border-red-500 rounded-2xl p-6 shadow-lg" data-testid="hero-disclaimer-box">
                <GraduationCap className="text-blue-600 text-2xl mb-3 mx-auto" data-testid="hero-graduation-icon" />
                <p className="font-bold text-lg md:text-xl text-gray-800 text-center" data-testid="hero-disclaimer-text">
                  Note: Arabella is not available during school hours or when homework is due! 📚✏️
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">

          {/* Testimonials Section - Always Visible */}
          <TestimonialsCarousel />

          {/* Conditional Content Based on Current Route */}
          {location === '/' && (
            <div data-testid="audio-content">
            <section className="mb-12" data-testid="soundcloud-section">
              <div className="text-center mb-8">
                <Volume2 className="text-mickey-yellow text-4xl mb-4 mx-auto" data-testid="soundcloud-icon" />
                <h3 className="font-bold text-3xl md:text-4xl text-mickey-yellow">Listen to Arabella's Voice!</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {soundCloudItems.map((item, index) => (
                  <SoundCloudItem key={index} title={item.title} icon={item.icon} index={index} />
                ))}
              </div>

              {/* Real SoundCloud Embed */}
              <div className="mt-12 bg-white border-8 border-mickey-yellow rounded-2xl p-6 shadow-lg" data-testid="featured-soundcloud">
                <h4 className="font-bold text-2xl text-toontown-darkbrown mb-4 text-center">🎤 Featured Voice Demo</h4>
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2123619891&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true"
                  title="Arabella Harris Featured Voice Demo"
                  className="rounded-lg"
                  data-testid="featured-soundcloud-iframe"
                />
              </div>
            </section>
            </div>
          )}

          {/* Video Showreel Content */}
          {location === '/video' && (
            <div data-testid="video-content">
            <section className="mb-12" data-testid="youtube-section">
              <div className="text-center mb-8">
                <Play className="text-mickey-red text-4xl mb-4 mx-auto" data-testid="youtube-icon" />
                <h3 className="font-bold text-3xl md:text-4xl text-mickey-red">Watch Arabella in Action!</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Video 1 */}
                <div className="bg-white border-8 border-disney-blue rounded-2xl p-4 shadow-lg" data-testid="video-container-1">
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

            {/* Video 2 */}
            <div className="bg-white border-8 border-mickey-orange rounded-2xl p-4 shadow-lg" data-testid="video-container-2">
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
        </section>
            </div>
          )}

          {/* Contact Content */}
          {location === '/contact' && (
            <div data-testid="contact-content">
        <section className="mb-12" data-testid="contact-section">
          <div className="text-center mb-8">
            <Mail className="text-disney-blue text-4xl mb-4 mx-auto" data-testid="contact-icon" />
            <h3 className="font-bold text-3xl md:text-4xl text-disney-blue">Get in Touch!</h3>
          </div>

          <div className="bg-white border-8 border-toontown-darkbrown rounded-3xl px-6 py-8 mx-4 shadow-lg max-w-2xl mx-auto" data-testid="contact-info">
            <h4 className="font-bold text-2xl md:text-3xl text-toontown-darkbrown mb-4" data-testid="contact-title">
              Ready to Work with Arabella?
            </h4>
            <p className="text-lg text-toontown-darkbrown font-bold font-semibold mb-6" data-testid="contact-text">
              Contact her representation for bookings and inquiries!
            </p>
            
            {/* Book Now Button */}
            <div className="mb-6">
              <a 
                href="mailto:arabella@voiceoverguy.co.uk"
                className="book-now-button"
                data-testid="book-now-button"
              >
                📧 Book Now!
              </a>
            </div>
            
            <div className="flex justify-center space-x-6">
              <Mail className="text-mickey-yellow text-2xl cursor-pointer" data-testid="contact-email" />
              <Phone className="text-mickey-yellow text-2xl cursor-pointer" data-testid="contact-phone" />
              <GlobeIcon className="text-mickey-yellow text-2xl cursor-pointer" data-testid="contact-website" />
            </div>
          </div>
        </section>
            </div>
          )}
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
                  <Heart className="text-mickey-red text-lg floating-icon" data-testid="footer-heart-icon" />
                </div>
              </div>
            </div>
            <div className="md:col-span-3 text-center md:text-left">
              <p className="font-bold text-xl md:text-2xl text-white leading-relaxed" data-testid="footer-note-text">
                She was always going to be good – she's the daughter of award-winning British male voiceover, <strong>Guy Harris</strong>.
              </p>
              <p className="font-bold text-lg text-toontown-cream mt-2 opacity-90">
                🎤 Talent runs in the family! 🎆
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Footer */}
      <footer className="bg-mickey-orange py-4 px-4 mt-8" data-testid="footer-section">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white font-bold">© 2024 Arabella Harris Voice Over</p>
        </div>
      </footer>
      </div> {/* Close main content wrapper */}
    </div>
  );
}
