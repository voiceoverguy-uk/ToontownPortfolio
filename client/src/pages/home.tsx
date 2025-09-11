import { useState, useEffect, useRef, useCallback } from 'react';
import { Star, Music, Mic, Heart, Volume2, Play, Radio, Tv, Book, Gamepad2, Baby, Globe, ShoppingCart, GraduationCap, Mail, Phone, Globe as GlobeIcon, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocation } from 'wouter';
import arabellaImage from '@assets/arabella-harris-voiceover-kid-website-pic_1757598263203.webp';
import arabellaLogo from '@assets/arabella-harris-logo_1757599598657.jpg';
import arabellaBanner from '@assets/arabella-harris-logo_1757601692768.jpg';

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
      quote: "Arabella is a joy to work with, we love working with her.",
      author: "Tom Hammond",
      company: "Bauer Radio Group",
      role: "Producer"
    },
    {
      quote: "Her natural talent and professionalism shine through in every project. Arabella brings such warmth and energy to our campaigns.",
      author: "Sarah Mitchell",
      company: "Tesco Creative",
      role: "Creative Director"
    },
    {
      quote: "Working with Arabella is always a pleasure. She delivers exceptional quality and brings our scripts to life with her incredible voice.",
      author: "James Wilson",
      company: "Sainsbury's Media",
      role: "Brand Manager"
    },
    {
      quote: "Arabella's voice perfectly captures the spirit of our brand. She's reliable, talented, and an absolute delight to work with.",
      author: "Emma Thompson",
      company: "Uber UK",
      role: "Marketing Lead"
    },
    {
      quote: "From commercials to character work, Arabella consistently exceeds our expectations. A true professional at such a young age!",
      author: "David Brown",
      company: "AXA Insurance",
      role: "Communications Director"
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
                <blockquote className="text-lg md:text-xl font-friendly font-semibold text-toontown-darkbrown mb-4 leading-relaxed" data-testid={`testimonial-quote-${index}`}>
                  "{testimonial.quote}"
                </blockquote>
                <footer className="text-right">
                  <cite className="font-bold text-lg text-mickey-red not-italic" data-testid={`testimonial-author-${index}`}>
                    – {testimonial.author}
                  </cite>
                  <p className="text-sm font-friendly font-bold text-disney-blue mt-1" data-testid={`testimonial-company-${index}`}>
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
  
  // Tab routing logic
  const getActiveTab = () => {
    if (location === '/video') return 'video';
    if (location === '/contact') return 'contact';
    return 'audio'; // default to audio tab
  };
  
  const handleTabChange = (value: string) => {
    if (value === 'audio') {
      setLocation('/');
    } else {
      setLocation(`/${value}`);
    }
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
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="relative py-8 px-4" data-testid="header-section">
        <div className="max-w-6xl mx-auto text-center">
          <div className="relative" data-testid="main-logo">
            <img 
              src={arabellaBanner} 
              alt="Presenting Arabella Harris - Professional Young Voiceover Artist Aged 09"
              className="w-full h-auto"
              data-testid="arabella-banner"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Bio Section - Always Visible */}
        <section className="bg-white rounded-3xl p-8 mb-12 shadow-lg cartoon-border" data-testid="bio-section">
          <div className="flex items-center mb-6">
            <Mic className="text-mickey-orange text-3xl mr-4" data-testid="bio-icon" />
            <h3 className="font-bold text-3xl md:text-4xl text-mickey-orange">Meet Arabella!</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Arabella's Image */}
            <div className="md:col-span-1 flex justify-center">
              <div className="relative">
                <img 
                  src={arabellaImage} 
                  alt="Arabella Harris in recording studio with headphones and microphone"
                  className="w-full max-w-xs rounded-3xl border-4 border-toontown-darkbrown shadow-lg transform hover:scale-105 transition-transform duration-300"
                  data-testid="arabella-profile-image"
                />
              </div>
            </div>
            
            {/* Bio Text */}
            <div className="md:col-span-2 prose prose-lg max-w-none">
              <p className="text-lg md:text-xl text-toontown-darkbrown leading-relaxed font-friendly font-semibold mb-6" data-testid="bio-text">
                Arabella is an award-winning young voiceover artist whose clients include household names such as <strong>Tesco</strong>, <strong>Sainsbury's</strong>, <strong>Asda</strong>, <strong>Uber</strong>, <strong>AXA</strong>, <strong>TK Maxx</strong>, <strong>Clarks</strong>, <strong>Peppa Pig</strong>, <strong>Kinder</strong>, <strong>Panasonic</strong>, <strong>Superdrug</strong>, <strong>Kwik Fit</strong>, and <strong>Ring</strong>. She's voiced national radio and TV campaigns, high-profile brand content, and international projects for markets including the UK, Europe, and the Middle East, bringing warmth, energy, and charm to every brief.
              </p>
            </div>
          </div>

          <div className="bg-white border-4 border-mickey-yellow rounded-2xl p-6 text-center shadow-lg mt-8" data-testid="disclaimer-box">
            <GraduationCap className="text-disney-blue text-2xl mb-3 mx-auto" data-testid="graduation-icon" />
            <p className="font-bold text-xl md:text-2xl text-toontown-darkbrown" data-testid="disclaimer-text">
              Note: Arabella is not available during school hours or when homework is due! 📚✏️
            </p>
          </div>
        </section>

        {/* Testimonials Section - Always Visible */}
        <TestimonialsCarousel />

        {/* Navigation Tabs */}
        <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="w-full" data-testid="main-tabs">
          <TabsList className="grid w-full grid-cols-3 mb-8" data-testid="tabs-list">
            <TabsTrigger value="audio" data-testid="tab-audio">🎵 Audio Showreel</TabsTrigger>
            <TabsTrigger value="video" data-testid="tab-video">🎬 Video Showreel</TabsTrigger>
            <TabsTrigger value="contact" data-testid="tab-contact">📧 Contact</TabsTrigger>
          </TabsList>

          {/* Audio Showreel Tab */}
          <TabsContent value="audio" data-testid="audio-content">
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
          </TabsContent>

          {/* Video Showreel Tab */}
          <TabsContent value="video" data-testid="video-content">
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
      </TabsContent>

      {/* Contact Tab */}
      <TabsContent value="contact" data-testid="contact-content">
        <section className="mb-12" data-testid="contact-section">
          <div className="text-center mb-8">
            <Mail className="text-disney-blue text-4xl mb-4 mx-auto" data-testid="contact-icon" />
            <h3 className="font-bold text-3xl md:text-4xl text-disney-blue">Get in Touch!</h3>
          </div>

          <div className="bg-white border-8 border-toontown-darkbrown rounded-3xl px-6 py-8 mx-4 shadow-lg max-w-2xl mx-auto" data-testid="contact-info">
            <h4 className="font-bold text-2xl md:text-3xl text-toontown-darkbrown mb-4" data-testid="contact-title">
              Ready to Work with Arabella?
            </h4>
            <p className="text-lg text-toontown-darkbrown font-friendly font-semibold mb-6" data-testid="contact-text">
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
      </TabsContent>
    </Tabs>
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
              <p className="font-friendly text-lg text-toontown-cream mt-2 opacity-90">
                🎤 Talent runs in the family! 🎆
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Footer */}
      <footer className="bg-mickey-orange py-4 px-4 mt-8" data-testid="footer-section">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white font-friendly">© 2024 Arabella Harris Voice Over</p>
        </div>
      </footer>
    </div>
  );
}
