import { useState, useEffect, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/data/constants';

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

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
}
