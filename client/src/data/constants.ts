import { Music, Mic, Book, ShoppingCart } from 'lucide-react';

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
  role: string;
}

export interface AudioTrack {
  title: string;
  icon: React.ElementType;
  url: string;
  description?: string;
}

export const testimonials: Testimonial[] = [
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
  },
  {
    quote: "I first used Arabella's voice when she was just a few months old. Now she's a talented young voiceover who keeps getting better every time. By the time you read this, she'll probably be even better still!",
    author: "Gavin Harris",
    company: "MORE Radio",
    role: "Producer"
  },
  {
    quote: "Working with Arabella has been a joy. As Production Manager at Arabian Radio Network in Dubai, I've worked with many voiceover talents, and her voice always brings scripts to life – fun, fresh, exciting, upbeat, and full of personality. Even working with her remotely, her recordings make production smooth and spots get approved quickly. I would happily work with her again.",
    author: "Russell Featherstone",
    company: "ARN Dubai",
    role: "Production Manager"
  },
  {
    quote: "Arabella's voice adds warmth, character, and energy to every project. She has an impressive tonal range and always hits the right expression. A reliable talent who makes the whole process effortless.",
    author: "Josh Wray",
    company: "Imagesound",
    role: "Audio Producer"
  }
];

export const audioTracks: AudioTrack[] = [
  { title: "Tesco Fruit and Veg", icon: ShoppingCart, url: "https://www.voiceoverguy.co.uk/assets/audio/tesco-fruit-and-veg-arabella-harris.mp3" },
  { title: "Nickelodeon Radio Ad", icon: Music, url: "https://www.voiceoverguy.co.uk/assets/audio/pleasure-beach-resort-nickelodeon-arabella-harris.mp3" },
  { title: "Skoda National Radio", icon: Music, url: "https://www.voiceoverguy.co.uk/assets/audio/skoda-arabella-harris.mp3" },
  { title: "Narration Showreel", icon: Book, url: "https://www.voiceoverguy.co.uk/assets/audio/narration-demo-arabella-harris.mp3" },
  { title: "Barnardos Radio", icon: Mic, url: "https://www.voiceoverguy.co.uk/assets/audio/barnardos-arabella-harris.mp3", description: "a nice compassionate read" },
  { title: "Sainsburys Instore", icon: ShoppingCart, url: "https://www.voiceoverguy.co.uk/assets/audio/sainsburys-tu-arabella-harris.mp3" },
  { title: "Cherry Blossom National Advert", icon: Music, url: "https://www.voiceoverguy.co.uk/assets/audio/cherry-blossom-arabella-harris.mp3" },
  { title: "Reem Mall - Dubai", icon: ShoppingCart, url: "https://www.voiceoverguy.co.uk/assets/audio/reem-mall-madagascar-arabella-harris.mp3" },
  { title: "Skechers Dubai Radio", icon: Music, url: "https://www.voiceoverguy.co.uk/assets/audio/sketchers-back-to-school-usa-accent-arabella-harris.mp3" },
  { title: "Wickstead Park Radio Ad", icon: Music, url: "https://www.voiceoverguy.co.uk/assets/audio/wicksteed-park-arabella-harris.mp3" },
  { title: "Dear Santa Radio Ad", icon: Music, url: "https://www.voiceoverguy.co.uk/assets/audio/dear-santa-arabella-harris.mp3" },
  { title: "Isle of White Ice Cream", icon: Music, url: "https://www.voiceoverguy.co.uk/assets/audio/isle-of-wight-ice-cream-arabella-harris.mp3" },
];
