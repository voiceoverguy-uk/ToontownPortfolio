import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import arabellaNavLogo from '@assets/arabella-harris-navigation-bar_1757607955178.jpg';
import headerBg from '@assets/header-bg_1757622267624.jpg';

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClass =
    'font-bold text-lg px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 border-4 border-transparent hover:bg-mickey-yellow/30 text-toontown-darkbrown hover:shadow-md hover:border-yellow-400';

  const mobileLinkClass =
    'w-full block font-bold text-lg py-3 px-4 rounded-xl text-center transition-all duration-200 border-4 border-transparent hover:bg-mickey-yellow/20 text-toontown-darkbrown hover:border-yellow-400';

  return (
    <div className="bg-transparent text-foreground min-h-screen relative z-10 overflow-x-hidden">
      {/* Fixed Background */}
      <div
        className="header-background"
        style={{ backgroundImage: `url(${headerBg})` }}
      />
      <div className="fixed inset-0 bg-white/40 z-[1] pointer-events-none" />

      <div className="relative z-10">
        {/* Navigation */}
        <nav
          role="navigation"
          aria-label="Primary"
          className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-md border-b-4 border-mickey-yellow shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/">
                  <img
                    src={arabellaNavLogo}
                    alt="Arabella Harris Logo - Professional British Child Voiceover Artist"
                    className="h-12 md:h-16 w-auto logo transition-transform duration-300 hover:scale-105 cursor-pointer"
                  />
                </Link>
              </div>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                <a href="/#audio-showreel" className={navLinkClass}>
                  🎵 Arabella's Showreels
                </a>
                <a href="/#video-showreel" className={navLinkClass}>
                  🎬 Dad's Showreel
                </a>
                <a href="/#faq" className={navLinkClass}>
                  ❓ FAQ's
                </a>
                <a href="/#contact" className={navLinkClass}>
                  📞 Contact
                </a>
              </div>

              {/* Hamburger */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-xl bg-mickey-yellow hover:bg-mickey-orange transition-colors duration-200 text-toontown-darkbrown shadow-lg"
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Dropdown */}
            {isMobileMenuOpen && (
              <div className="md:hidden mt-4 bg-white/85 border-4 border-mickey-yellow rounded-2xl p-4 shadow-xl">
                <div className="space-y-3">
                  <a href="/#audio-showreel" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                    🎵 Arabella's Showreels
                  </a>
                  <a href="/#video-showreel" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                    🎬 Dad's Showreel
                  </a>
                  <a href="/#faq" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                    ❓ FAQ's
                  </a>
                  <a href="/#contact" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                    📞 Contact
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Page Content */}
        <div className="pt-24">
          {children}
        </div>

        {/* Footer */}
        <footer className="bg-mickey-orange py-4 px-4 mt-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white font-bold">© {new Date().getFullYear()} Arabella Voiceover Kid</p>
            <p className="text-white font-bold mt-2">
              Website by{' '}
              <a
                href="https://www.voiceoverguy.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-yellow-300 transition-colors"
              >
                VoiceoverGuy Media
              </a>{' '}
              © {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
