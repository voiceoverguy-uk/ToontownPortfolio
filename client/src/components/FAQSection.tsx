import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "What makes Arabella perfect for child voiceover work?",
      answer: "Arabella brings natural warmth, energy, and authenticity to every project. As a professionally trained 9-year-old British voice artist, she delivers genuine, age-appropriate performances that resonate with audiences. Her award-winning talent and experience with major brands like Tesco, Sainsbury's, and Peppa Pig make her ideal for commercials, animation, and educational content."
    },
    {
      question: "What types of projects has Arabella worked on?",
      answer: "Arabella has voiced national radio campaigns, TV commercials, animation characters, educational content, and international brand projects. Her portfolio includes work for household names like Uber, AXA, TK Maxx, Clarks, Kinder, and Superdrug. She's experienced in delivering both playful character voices and professional commercial reads for UK, European, and Middle East markets."
    },
    {
      question: "How do I book Arabella for my voiceover project?",
      answer: "Simply click the 'Book Now!' button to send an email inquiry. Provide details about your project including the type of content, target audience, deadline, and any specific voice direction. You'll receive a prompt response with availability and rates. Arabella's agent will work with you to ensure the perfect voice for your brief."
    },
    {
      question: "What age range does Arabella's voice suit?",
      answer: "Arabella's natural voice authentically represents children aged 7-11 years old. Her versatile vocal range allows her to deliver both younger, playful character voices and slightly more mature commercial reads, making her perfect for children's products, educational content, and family-friendly brands targeting this key demographic."
    },
    {
      question: "Is Arabella available for international projects?",
      answer: "Yes! Arabella has voiced projects for UK, European, and Middle East markets. As a professional British child voice artist, she's available for international commercials, animation dubbing, and global brand campaigns. She records from a professional home studio and can accommodate various time zones and delivery requirements."
    },
    {
      question: "What is Arabella's voiceover experience and training?",
      answer: "Arabella is a Yorkshire born Voiceover. Daughter of established Male Voiceover Artist Guy Harris whose voice is heard worldwide on TV, Radio, Websites, Games and betond. Arabella is winner of a Marketing Week Award. Despite her young age, she has professional recording experience with major national brands and understands studio direction, timing, and client requirements. She's a reliable, professional young talent who takes direction well."
    }
  ];

  return (
    <section className="mb-12 scroll-mt-24" data-testid="faq-section">
      <div className="text-center mb-8">
        <HelpCircle className="text-disney-purple text-4xl mb-4 mx-auto" data-testid="faq-icon" />
        <h2 className="font-bold text-3xl md:text-4xl text-disney-purple">Frequently Asked Questions</h2>
        <p className="text-lg text-toontown-darkbrown mt-2">Everything you need to know about booking Arabella</p>
      </div>

      <div className="bg-white border-8 border-disney-purple rounded-3xl px-6 py-8 mx-4 shadow-lg max-w-4xl mx-auto" data-testid="faq-container">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-disney-purple/30">
              <AccordionTrigger 
                className="text-left font-bold text-lg md:text-xl text-toontown-darkbrown hover:text-disney-purple transition-colors"
                data-testid={`faq-question-${index}`}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent 
                className="text-base md:text-lg text-gray-700 leading-relaxed"
                data-testid={`faq-answer-${index}`}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
