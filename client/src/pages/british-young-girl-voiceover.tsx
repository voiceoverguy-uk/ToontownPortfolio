import { useEffect } from 'react';
import { Link } from 'wouter';
import { Volume2, Star, Mic } from 'lucide-react';
import { AudioProvider } from '@/components/AudioContext';
import { AudioTrackItem } from '@/components/AudioTrackItem';
import { ContactForm } from '@/components/ContactForm';
import { PageShell } from '@/components/PageShell';
import { audioTracks, brandTrackMap } from '@/data/constants';

const brands = [
  'Tesco', 'Sainsbury\'s', 'Peppa Pig', 'Uber', 'AXA', 'TK Maxx',
  'Skoda', 'Clarks', 'Kinder', 'Cherry Blossom', 'Superdrug',
  'Barnardos', 'KISS FM', 'Nickelodeon', 'B&M', 'Morrisons', 'Roblox',
  'Heinz', 'Hotpoint', 'Zara', 'Currys', 'Skechers',
];

export default function BritishYoungGirlVoiceover() {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
    const prevCanon = document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';
    const prevOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? '';
    const prevOgDesc = document.querySelector('meta[property="og:description"]')?.getAttribute('content') ?? '';
    const prevOgUrl = document.querySelector('meta[property="og:url"]')?.getAttribute('content') ?? '';
    const prevTwTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ?? '';
    const prevTwDesc = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content') ?? '';

    const pageTitle = 'British Young Girl Voiceover | Arabella Harris';
    const pageDesc = 'Looking for a British young girl voiceover artist? Arabella Harris is an award-winning natural UK child voice talent trusted by Tesco, Sainsbury\'s, Peppa Pig, and many more major brands. Book now.';
    const pageUrl = 'https://www.arabellaharris.com/british-young-girl-voiceover';

    document.title = pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', pageDesc);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', pageUrl);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', pageTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', pageDesc);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', pageUrl);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', pageTitle);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', pageDesc);

    return () => {
      document.title = prevTitle;
      document.querySelector('meta[name="description"]')?.setAttribute('content', prevDesc);
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', prevCanon);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', prevOgTitle);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', prevOgDesc);
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', prevOgUrl);
      document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', prevTwTitle);
      document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', prevTwDesc);
    };
  }, []);

  return (
    <AudioProvider>
      <PageShell>
        <main className="max-w-5xl mx-auto px-4 py-8">

          {/* Hero Banner */}
          <section className="mb-12 bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 rounded-3xl p-8 md:p-12 border-8 border-white shadow-2xl text-center">
            <div className="inline-flex items-center gap-2 bg-white/30 rounded-full px-4 py-2 mb-4">
              <Star className="w-5 h-5 text-white fill-white" />
              <span className="font-bold text-white text-sm">Award-Winning Child Voice Talent</span>
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
            <h1 className="font-bold text-3xl md:text-5xl text-white drop-shadow-lg mb-4 leading-tight">
              British Young Girl<br />Voiceover Artist
            </h1>
            <p className="text-white font-bold text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Arabella Harris is a natural British young girl voiceover artist based in the UK, 
              bringing warmth, energy, and authentic charm to every script, from national radio 
              campaigns to international brand spots.
            </p>
          </section>

          {/* About Section */}
          <section className="mb-12">
            <div className="bg-white/80 backdrop-blur-sm border-4 border-mickey-yellow rounded-3xl p-8 shadow-lg">
              <h2 className="font-bold text-2xl md:text-3xl text-mickey-red mb-4">
                A Genuine British Young Girl Voice
              </h2>
              <div className="space-y-4 text-toontown-darkbrown font-semibold text-lg leading-relaxed">
                <p>
                  When casting directors and producers search for a British young girl voiceover, 
                  they need more than just a child who can read words from a page. They need a 
                  genuine, warm, and naturally engaging young voice, one that connects with 
                  audiences because it sounds real, not coached or put on.
                </p>
                <p>
                  Arabella Harris delivers exactly that. Born and raised in Yorkshire, her voice 
                  carries the authentic warmth of the North of England while remaining clear and 
                  accessible for any national audience. She takes direction exceptionally well, 
                  adapts tone effortlessly between playful, heartfelt, and energetic reads, and 
                  delivers broadcast-quality takes consistently and efficiently.
                </p>
                <p>
                  Arabella's experience spans national radio, in-store audio, online video, 
                  educational content, animation, and international brand campaigns. She has voiced 
                  for some of the UK's biggest brands and continues to grow her impressive portfolio 
                  of work across multiple sectors. Her natural delivery, combined with her ability 
                  to bring genuine emotion to a script, makes her one of the most sought-after 
                  British young girl voiceover artists available today.
                </p>
                <p>
                  Unlike many child voices, Arabella's reads feel spontaneous and authentic rather 
                  than rehearsed. Engineers regularly comment on how quickly she delivers clean 
                  takes, and clients are consistently pleased with the final result. Exactly what 
                  you want when booking a British young girl voiceover for your next project.
                </p>
              </div>
            </div>
          </section>

          {/* Why a British Young Girl Voice */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-disney-blue to-disney-purple rounded-3xl p-8 border-4 border-white shadow-xl">
              <h2 className="font-bold text-2xl md:text-3xl text-white mb-6 text-center">
                Why Choose a British Young Girl Voiceover?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: '🎙️',
                    title: 'Authentic Accent',
                    body: 'A genuine British accent sounds natural and trustworthy to UK audiences. Something that\'s impossible to fake convincingly, even with the best voice coaching.',
                  },
                  {
                    icon: '⚡',
                    title: 'Natural Energy',
                    body: 'Real kids bring real energy. Arabella\'s voice has the spontaneous enthusiasm and warmth that audiences respond to, especially when marketing to families.',
                  },
                  {
                    icon: '🏆',
                    title: 'Professional Delivery',
                    body: 'Arabella combines a natural child voice with genuine broadcast experience, giving you the authenticity of a real young girl with the efficiency of a professional.',
                  },
                ].map(({ icon, title, body }) => (
                  <div key={title} className="bg-white/20 rounded-2xl p-6 text-center">
                    <div className="text-4xl mb-3">{icon}</div>
                    <h3 className="font-bold text-white text-xl mb-2">{title}</h3>
                    <p className="text-white/90 font-semibold leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Brand Experience */}
          <section className="mb-12">
            <div className="bg-white/80 border-4 border-mickey-red rounded-3xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <Mic className="w-10 h-10 text-mickey-red mx-auto mb-3" />
                <h2 className="font-bold text-2xl md:text-3xl text-mickey-red">
                  Trusted by Major Brands
                </h2>
                <p className="text-toontown-darkbrown font-semibold mt-2">
                  Arabella's British young girl voiceover has been heard in campaigns for:
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {brands.map((brand) => {
                  const trackIndex = brandTrackMap[brand];
                  if (trackIndex !== undefined) {
                    return (
                      <a
                        key={brand}
                        href={`#track-${trackIndex}`}
                        className="bg-mickey-yellow text-toontown-darkbrown font-bold px-4 py-2 rounded-full border-2 border-toontown-darkbrown text-sm shadow flex items-center gap-1.5 hover:bg-mickey-orange hover:scale-105 transition-all duration-200 cursor-pointer"
                      >
                        <span className="text-xs">▶</span>{brand}
                      </a>
                    );
                  }
                  return (
                    <span
                      key={brand}
                      className="bg-mickey-yellow text-toontown-darkbrown font-bold px-4 py-2 rounded-full border-2 border-toontown-darkbrown text-sm shadow"
                    >
                      {brand}
                    </span>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Audio Showreel */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <Volume2 className="text-mickey-yellow text-4xl mb-4 mx-auto w-12 h-12" />
              <h2 className="font-bold text-3xl md:text-4xl text-mickey-red">
                Listen to Arabella's Voice
              </h2>
              <p className="text-toontown-darkbrown font-semibold mt-2 text-lg">
                Real British young girl voiceover recordings from national campaigns
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {audioTracks.map((item, index) => (
                <AudioTrackItem
                  key={index}
                  id={`track-${index}`}
                  title={item.title}
                  icon={item.icon}
                  index={index}
                  url={item.url}
                  description={item.description}
                />
              ))}
            </div>
          </section>

          {/* Internal Cross-Links */}
          <section className="mb-12">
            <div className="bg-white/70 border-4 border-mickey-yellow rounded-3xl p-6 text-center shadow">
              <p className="font-bold text-toontown-darkbrown text-lg leading-relaxed">
                Arabella is also available as an{' '}
                <Link href="/english-speaking-child-voiceover" className="text-mickey-red underline hover:text-disney-blue transition-colors">
                  English speaking child voiceover
                </Link>{' '}
                artist for international projects, perfect for brands targeting European, Middle Eastern, and global audiences.{' '}
                <Link href="/" className="text-mickey-red underline hover:text-disney-blue transition-colors">
                  Visit the home page
                </Link>{' '}
                to learn more about Arabella and her full range of voiceover services.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12" id="faq">
            <div className="bg-white/80 border-4 border-disney-purple rounded-3xl p-8 shadow-lg">
              <h2 className="font-bold text-2xl md:text-3xl text-disney-purple mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-5">
                {([
                  {
                    q: 'How do I book Arabella for a British young girl voiceover?',
                    a: 'Simply use the contact form below or email arabella@voiceoverguy.co.uk. Share details about your project including the type of content, target audience, deadline, and any voice direction notes. You\'ll receive a prompt response with availability and rates.',
                  },
                  {
                    q: 'How much does a British child voiceover cost?',
                    a: 'Rates vary depending on script length, usage rights, and turnaround time. Contact us with your brief for a personalised quote. Arabella offers competitive rates for both domestic UK campaigns and international projects.',
                  },
                  {
                    q: 'Can Arabella record remotely?',
                    a: <>Yes. Arabella records at her dad&apos;s professional <a href="https://www.voiceoverguy.co.uk/voiceover-studio" target="_blank" rel="noopener noreferrer" className="text-disney-purple underline hover:text-mickey-red transition-colors">VoiceoverGuy studio</a> and delivers broadcast-quality audio files directly to clients. She can accommodate remote directed sessions and works efficiently to client timelines.</>,
                  },
                  {
                    q: 'What kinds of projects suit Arabella\'s voice?',
                    a: 'Arabella\'s natural British young girl voice suits a wide range of projects including national radio commercials, in-store audio, TV and online advertising, children\'s animation, educational content, charity campaigns, and international brand spots.',
                  },
                ] as {q: string, a: React.ReactNode}[]).map(({ q, a }) => (
                  <details key={q} className="group border-2 border-disney-purple/30 rounded-2xl overflow-hidden">
                    <summary className="cursor-pointer font-bold text-toontown-darkbrown text-lg px-6 py-4 hover:bg-disney-purple/10 transition-colors list-none flex justify-between items-center">
                      {q}
                      <span className="text-disney-purple ml-3 flex-shrink-0 group-open:rotate-180 transition-transform duration-200">▼</span>
                    </summary>
                    <div className="px-6 pb-5 pt-2 text-toontown-darkbrown font-semibold leading-relaxed border-t border-disney-purple/20">
                      {a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="mb-12" id="contact">
            <div className="bg-gradient-to-br from-mickey-red to-orange-600 rounded-3xl p-8 border-4 border-white shadow-2xl">
              <h2 className="font-bold text-2xl md:text-3xl text-white text-center mb-2">
                Book Arabella's British Young Girl Voiceover
              </h2>
              <p className="text-white font-semibold text-center mb-6 opacity-90">
                Tell us about your project and we'll come back to you promptly.
              </p>
              <div className="bg-white/95 rounded-2xl p-6 shadow-lg max-w-xl mx-auto">
                <ContactForm />
              </div>
            </div>
          </section>

          {/* Schema.org Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([
                {
                  '@context': 'https://schema.org',
                  '@type': 'WebPage',
                  name: 'British Young Girl Voiceover Artist — Arabella Harris',
                  description: 'Arabella Harris is an award-winning British young girl voiceover artist with a natural UK child voice. Trusted by Tesco, Sainsbury\'s, Peppa Pig, and many more.',
                  url: 'https://www.arabellaharris.com/british-young-girl-voiceover',
                  isPartOf: { '@id': 'https://www.arabellaharris.com/#arabella-harris' },
                },
                {
                  '@context': 'https://schema.org',
                  '@type': 'BreadcrumbList',
                  itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.arabellaharris.com/' },
                    { '@type': 'ListItem', position: 2, name: 'British Young Girl Voiceover', item: 'https://www.arabellaharris.com/british-young-girl-voiceover' },
                  ],
                },
                {
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'How do I book Arabella for a British young girl voiceover?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Simply use the contact form on this page or email arabella@voiceoverguy.co.uk. Share details about your project including the type of content, target audience, deadline, and any voice direction notes. You\'ll receive a prompt response with availability and rates.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'How much does a British child voiceover cost?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Rates vary depending on script length, usage rights, and turnaround time. Contact us with your brief for a personalised quote. Arabella offers competitive rates for both domestic UK campaigns and international projects.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Can Arabella record remotely?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes. Arabella records from a professional home studio and delivers broadcast-quality audio files directly to clients. She can accommodate remote directed sessions and works efficiently to client timelines.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What kinds of projects suit Arabella\'s voice?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Arabella\'s natural British young girl voice suits a wide range of projects including national radio commercials, in-store audio, TV and online advertising, children\'s animation, educational content, charity campaigns, and international brand spots.',
                      },
                    },
                  ],
                },
              ]),
            }}
          />
        </main>
      </PageShell>
    </AudioProvider>
  );
}
