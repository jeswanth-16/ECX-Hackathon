import React from 'react';
import { Lightbulb, Users2, Trophy, Medal, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ValueProps: React.FC = () => {
  const valueCards = [
    {
      title: "Build Innovative Solutions",
      description: "Tackle real-world industry problem statements spanning AI, IoT sensors, embedded firmware, web architectures, and sustainable technology.",
      icon: Lightbulb,
      accentColor: "from-blue-600 to-cyan-500",
      iconColor: "text-electric-cyan",
      link: "/themes",
      linkText: "View Problem Themes",
    },
    {
      title: "Learn & Collaborate",
      description: "Collaborate with talented peers, receive continuous mentorship from experienced ECX faculty, and network with leading tech veterans.",
      icon: Users2,
      accentColor: "from-purple-600 to-indigo-500",
      iconColor: "text-purple-400",
      link: "/about",
      linkText: "Discover Experience",
    },
    {
      title: "Win Exciting Prizes",
      description: "Compete for generous cash rewards, prestigious university champion trophies, hardware developer kits, and incubation certificates.",
      icon: Trophy,
      accentColor: "from-amber-500 to-orange-500",
      iconColor: "text-amber-400",
      link: "/prizes",
      linkText: "Explore Rewards",
    },
    {
      title: "Get Recognized",
      description: "Showcase your working prototype to leading industry jurors, receive accredited achievement credentials, and accelerate your engineering career.",
      icon: Medal,
      accentColor: "from-emerald-500 to-teal-500",
      iconColor: "text-emerald-400",
      link: "/register",
      linkText: "Register Your Team",
    },
  ];

  return (
    <section className="py-12 md:py-16 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 bg-blue-950/60 border border-blue-500/30 text-blue-400">
            Why Participate
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Designed to Fuel Your <span className="text-gradient-blue">Engineering Growth</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-400">
            A 24-hour sprint of coding, hardware prototyping, and innovation at Knowledge Institute of Technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {valueCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl bg-dark-900/80 border border-slate-800/80 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover flex flex-col justify-between"
              >
                {/* Top accent bar */}
                <div
                  className={`w-10 h-1 rounded-full bg-gradient-to-r ${card.accentColor} mb-6 transition-all duration-300 group-hover:w-16`}
                />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-dark-950 border border-slate-800 flex items-center justify-center mb-5 group-hover:border-blue-500/40 group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2.5 group-hover:text-blue-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/60">
                  <Link
                    to={card.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>{card.linkText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
