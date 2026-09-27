import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Cpu, 
  Lightbulb, 
  Users, 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight,
  Binary,
  Building
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { eventConfig } from '../data/eventConfig';

export const About: React.FC = () => {
  const whoCanParticipateItems = [
    {
      title: "Undergraduate Engineers",
      desc: "B.E. / B.Tech students from all engineering disciplines including ECE, CSE, IT, EEE, Mechanical, Mechatronics, and AI.",
      icon: GraduationCap,
    },
    {
      title: "Postgraduate Scholars",
      desc: "M.E. / M.Tech, MCA, and M.Sc Computer Science / Electronics students looking to demonstrate advanced applied research.",
      icon: Binary,
    },
    {
      title: "Polytechnic Innovators",
      desc: "Diploma students passionate about hands-on microcontrollers, robotics, circuit assembly, and web development.",
      icon: Cpu,
    },
    {
      title: "Multidisciplinary Teams",
      desc: "Cross-departmental and cross-college collaborations are enthusiastically encouraged to promote holistic system engineering.",
      icon: Users,
    },
  ];

  const whatYouCanBuild = [
    {
      title: "Smart Hardware & Embedded IoT",
      desc: "Microcontroller sensors, edge AI appliances, LoRa mesh monitors, and automated robotic telemetry systems.",
      badge: "Hardware & Firmware",
    },
    {
      title: "Intelligent Software & AI Agents",
      desc: "Neural network models, generative vision assistants, predictive analytics dashboards, and autonomous workflow bots.",
      badge: "AI & Data",
    },
    {
      title: "Distributed Web & Mobile Platforms",
      desc: "Progressive web applications, high-performance APIs, real-time dispatch systems, and civic assistance tools.",
      badge: "Web & Cloud",
    },
    {
      title: "Security & Privacy Architectures",
      desc: "Zero-trust verification routines, honeypots, behavioral anomaly screeners, and tamper-resistant audit ledgers.",
      badge: "Cyber & Security",
    },
  ];

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Header & Overview */}
      <SectionHeader
        badge="About the Event"
        title="Department of ECX Presents"
        highlightedText={eventConfig.name}
        subtitle="An intensive hackathon fostering engineering excellence, hands-on experimentation, and high-impact technology creation."
      />

      {/* 2. Department & College Background */}
      <div className="mb-16 p-6 sm:p-10 rounded-3xl bg-dark-900 border border-slate-800 shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/70 text-blue-300 border border-blue-500/30">
              <Building className="w-3.5 h-3.5 text-electric-cyan" />
              {eventConfig.college}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Pioneering the Intersection of Electronics & Computing
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              The <strong>{eventConfig.department} (ECX)</strong> at Knowledge Institute of Technology (KIOT) was established to bridge the gap between embedded hardware physics and modern computational architectures.
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {eventConfig.name} is conceived as a premier technical celebration that brings together ambitious student innovators from across Tamil Nadu and all of India. Over an exhilarating sprint, teams ideate, solder, code, test, and pitch real-world solutions directly to industry practitioners and academic jury leaders.
            </p>
          </div>

          <div className="lg:col-span-4 p-6 rounded-2xl bg-dark-950/80 border border-slate-800 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] uppercase font-bold text-slate-400">Campus Location</span>
              <p className="text-sm font-semibold text-white mt-0.5">{eventConfig.venue}</p>
              <p className="text-xs text-slate-400">Salem, Tamil Nadu</p>
            </div>
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] uppercase font-bold text-slate-400">Allowed Team Size</span>
              <p className="text-sm font-semibold text-white mt-0.5">{eventConfig.teamSize.min} to {eventConfig.teamSize.max} Members</p>
              <p className="text-xs text-slate-400">With designated team leader</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Registration Model</span>
              <p className="text-sm font-semibold text-emerald-400 mt-0.5">Free Registration</p>
              <p className="text-xs text-slate-400">Zero fee to register or submit project</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Why Participate? */}
      <div className="mb-16">
        <SectionHeader
          badge="Value & Impact"
          title="Why"
          highlightedText="Participate?"
          subtitle="Gain hands-on skills, expand your technical network, and put your engineering theories to the test."
          align="left"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Industry Mentorship",
              desc: "Get real-time feedback from practicing engineers, alumni founders, and senior ECX faculty throughout the hack sprint.",
              icon: Sparkles,
            },
            {
              title: "Modern Lab Facilities",
              desc: "Access specialized soldering benches, digital oscilloscopes, high-speed Wi-Fi, and sensor toolkits at KIOT laboratories.",
              icon: Cpu,
            },
            {
              title: "Project Incubation",
              desc: "Winning teams receive incubation guidance and academic project credit support to advance their prototype into a commercial product.",
              icon: Lightbulb,
            },
            {
              title: "Exciting Prize Pool",
              desc: "Take home champion trophies, substantial cash rewards (placeholders ₹XX,XXX), electronic gadgets, and merit credentials.",
              icon: Award,
            },
            {
              title: "Peer Collaboration",
              desc: "Brainstorm with passionate coders and hardware designers, forging relationships that often lead to startups and research papers.",
              icon: Users,
            },
            {
              title: "Official Digital Credentials",
              desc: "Every participant receives an authenticated digital certificate verifying their hands-on prototype submission.",
              icon: CheckCircle2,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-electric-cyan mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. What You Can Build */}
      <div className="mb-16">
        <SectionHeader
          badge="Scope & Freedom"
          title="What You"
          highlightedText="Can Build"
          subtitle="Whether hardware, cloud software, or hybrid embedded devices, the canvas is yours."
          align="left"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {whatYouCanBuild.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-dark-900 border border-slate-800 hover:border-purple-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-purple-950/70 border border-purple-500/30 text-purple-300 mb-3 inline-block">
                  {item.badge}
                </span>
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/80">
                <Link
                  to="/themes"
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                >
                  <span>Explore Track Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Who Can Participate? */}
      <div className="mb-16">
        <SectionHeader
          badge="Eligibility"
          title="Who Can"
          highlightedText="Participate?"
          subtitle="Open to all enthusiastic tech students eager to solve challenges through technology."
          align="left"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whoCanParticipateItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-dark-900/90 border border-slate-800"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-electric-cyan mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-dark-900 via-blue-950/40 to-dark-900 border border-blue-500/30 text-center flex flex-col items-center">
        <h3 className="text-2xl font-bold text-white mb-2">Have a question in mind?</h3>
        <p className="text-sm text-slate-400 mb-6 max-w-md">
          Check our frequently asked questions or jump straight into team registration.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-electric-blue to-electric-purple text-white text-xs sm:text-sm font-bold shadow-glow-blue hover:opacity-95 transition-opacity"
          >
            Register Your Team
          </Link>
          <Link
            to="/faq"
            className="px-6 py-3 rounded-xl bg-dark-950 border border-slate-700 text-slate-300 text-xs sm:text-sm font-semibold hover:text-white"
          >
            View FAQs
          </Link>
        </div>
      </div>
    </div>
  );
};
