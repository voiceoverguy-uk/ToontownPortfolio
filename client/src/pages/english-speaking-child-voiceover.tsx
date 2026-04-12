import { useEffect } from 'react';
import { Link } from 'wouter';
import { Volume2, Star, Globe } from 'lucide-react';
import { AudioProvider } from '@/components/AudioContext';
import { AudioTrackItem } from '@/components/AudioTrackItem';
import { ContactForm } from '@/components/ContactForm';
import { PageShell } from '@/components/PageShell';
import { audioTracks } from '@/data/constants';

const brands = [
  'Tesco', 'Sainsbury\'s', 'Peppa Pig', 'Uber', 'AXA', 'TK Maxx',
  'Skoda', 'Clarks', 'Kinder', 'Cherry Blossom', 'Superdrug',
  'Barnardos', 'KISS FM', 'B&M', 'Morrisons', 'Roblox', 'Heinz',
];

export default function EnglishSpeakingChildVoiceover() {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
    const prevCanon = document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';

    document.title = 'English Speaking Child Voiceover | Arabella Harris';

    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Need an English speaking child voiceover for your international campaign? Arabella Harris is a native British child voice artist trusted by global brands across the UK, Europe, and the Middle East.');

    const canon = document.querySelector('link[rel="canonical"]');
    if (canon) canon.setAttribute('href', 'https://www.arabellaharris.com/english-speaking-child-voiceover');

    return () => {
      document.title = prevTitle;
      if (desc) desc.setAttribute('content', prevDesc);
      if (canon) canon.setAttribute('href', prevCanon);
    };
  }, []);

  return (
    <AudioProvider>
      <PageShell>
        <main className="max-w-5xl mx-auto px-4 py-8">

          {/* Hero Banner */}
          <section className="mb-12 bg-gradient-to-br from-disney-blue via-disney-purple to-disney-blue rounded-3xl p-8 md:p-12 border-8 border-white shadow-2xl text-center">
            <div className="inline-flex items-center gap-2 bg-white/30 rounded-full px-4 py-2 mb-4">
              <Globe className="w-5 h-5 text-white" />
              <span className="font-bold text-white text-sm">International Projects Welcome</span>
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-3xl md:text-5xl text-white drop-shadow-lg mb-4 leading-tight">
              English Speaking Child<br />Voiceover Artist
            </h1>
            <p className="text-white font-bold text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Arabella Harris is a native English speaking child voiceover artist, recording 
              from the UK for brands across Europe, the Middle East, and beyond, delivering 
              clear, authentic British English with professional ease.
            </p>
          </section>

          {/* About Section */}
          <section className="mb-12">
            <div className="bg-white/80 backdrop-blur-sm border-4 border-mickey-yellow rounded-3xl p-8 shadow-lg">
              <h2 className="font-bold text-2xl md:text-3xl text-mickey-red mb-4">
                A Native English Speaking Child Voice for Global Campaigns
              </h2>
              <div className="space-y-4 text-toontown-darkbrown font-semibold text-lg leading-relaxed">
                <p>
                  Finding a reliable English speaking child voiceover artist for an international 
                  campaign can be challenging. Many productions need a child voice that sounds 
                  natural and uncoached, with a native British English accent that travels well across 
                  markets, resonates with global audiences, and still sounds like a real child 
                  rather than a trained performer.
                </p>
                <p>
                  Arabella Harris is that voice. Based in Yorkshire in the north of England, 
                  Arabella is a native English speaker whose clear, expressive voice has been 
                  used in campaigns for UK, European, and Middle Eastern markets. Her recordings 
                  for brands such as Reem Mall in Dubai and Skechers in the USA demonstrate her 
                  versatility and international appeal. She can adapt her delivery to suit 
                  different markets while keeping her voice sounding genuine and fresh.
                </p>
                <p>
                  For brands who need an English speaking child voiceover, native delivery is 
                  everything. Intonation, rhythm, and word stress are nearly impossible to teach 
                  to a non-native speaker without the result sounding unnatural. Arabella's 
                  British English is crisp and clear, making her an excellent choice for 
                  educational content, children's media, advertising, and any project where 
                  authentic child delivery in English is essential.
                </p>
                <p>
                  She records remotely from a professional home studio setup, delivering broadcast-
                  quality audio files quickly and to client specification. Whether you need a warm, 
                  narrative read for an educational platform or an energetic, upbeat performance 
                  for a global brand campaign, Arabella delivers.
                </p>
              </div>
            </div>
          </section>

          {/* Why Native English */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-mickey-orange to-mickey-red rounded-3xl p-8 border-4 border-white shadow-xl">
              <h2 className="font-bold text-2xl md:text-3xl text-white mb-6 text-center">
                Why Native English Matters
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: '🗣️',
                    title: 'Natural Intonation',
                    body: 'Native English speakers naturally stress words and phrase sentences the way audiences expect. No amount of coaching fully replicates what a native child voice delivers instinctively.',
                  },
                  {
                    icon: '🌍',
                    title: 'International Appeal',
                    body: 'British English is widely understood and respected across global markets. Arabella\'s clear accent works equally well for UK domestic campaigns and international productions.',
                  },
                  {
                    icon: '🎯',
                    title: 'Fast Turnaround',
                    body: 'No language barriers mean no coaching delays. Arabella reads scripts naturally from the first take, keeping studio time and revision rounds to a minimum.',
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

          {/* Markets */}
          <section className="mb-12">
            <div className="bg-white/80 border-4 border-disney-blue rounded-3xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <Star className="w-10 h-10 text-disney-blue mx-auto mb-3 fill-disney-blue" />
                <h2 className="font-bold text-2xl md:text-3xl text-disney-blue mb-2">
                  Markets Arabella Has Voiced For
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6 text-toontown-darkbrown font-semibold text-lg">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🇬🇧</span>
                    <div>
                      <strong>United Kingdom:</strong> National radio, in-store audio, digital campaigns, children's media, and charity advertising across the UK.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🇦🇪</span>
                    <div>
                      <strong>Middle East:</strong> International English language advertising for brands including Reem Mall (Dubai) and Arabian Radio Network.
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <strong>Europe:</strong> English language campaigns for European brands seeking a genuine British child voice with international reach.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🇺🇸</span>
                    <div>
                      <strong>USA:</strong> American accent capability (as heard on the Skechers Back to School campaign) for clients who need a flexible English speaking child voice.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Brand Experience */}
          <section className="mb-12">
            <div className="bg-white/80 border-4 border-mickey-red rounded-3xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <h2 className="font-bold text-2xl md:text-3xl text-mickey-red">
                  Brands That Have Booked Arabella
                </h2>
                <p className="text-toontown-darkbrown font-semibold mt-2">
                  English speaking child voiceover for some of the world's most recognised names:
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {brands.map((brand) => (
                  <span
                    key={brand}
                    className="bg-mickey-yellow text-toontown-darkbrown font-bold px-4 py-2 rounded-full border-2 border-toontown-darkbrown text-sm shadow"
                  >
                    {brand}
                  </span>
                ))}
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
                Real English speaking child voiceover recordings from broadcast campaigns
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {audioTracks.map((item, index) => (
                <AudioTrackItem
                  key={index}
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
                Also looking for a{' '}
                <Link href="/british-young-girl-voiceover" className="text-mickey-red underline hover:text-disney-blue transition-colors">
                  British young girl voiceover
                </Link>{' '}
                specifically? That page has more information about Arabella's natural Yorkshire accent and UK domestic broadcast experience.{' '}
                <Link href="/" className="text-mickey-red underline hover:text-disney-blue transition-colors">
                  Visit the home page
                </Link>{' '}
                for the full picture.
              </p>
            </div>
          </section>

          {/* Contact Form */}
          <section className="mb-12" id="contact">
            <div className="bg-gradient-to-br from-disney-blue to-disney-purple rounded-3xl p-8 border-4 border-white shadow-2xl">
              <h2 className="font-bold text-2xl md:text-3xl text-white text-center mb-2">
                Book Your English Speaking Child Voiceover
              </h2>
              <p className="text-white font-semibold text-center mb-6 opacity-90">
                Tell us about your project and we'll come back to you promptly.
              </p>
              <div className="bg-white/95 rounded-2xl p-6 shadow-lg max-w-xl mx-auto">
                <ContactForm />
              </div>
            </div>
          </section>

          {/* Schema.org WebPage */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                name: 'English Speaking Child Voiceover Artist — Arabella Harris',
                description:
                  'Arabella Harris is a native English speaking child voiceover artist based in the UK, trusted by global brands across Europe, the Middle East, and beyond.',
                url: 'https://www.arabellaharris.com/english-speaking-child-voiceover',
                isPartOf: { '@id': 'https://www.arabellaharris.com/#arabella-harris' },
              }),
            }}
          />
        </main>
      </PageShell>
    </AudioProvider>
  );
}
