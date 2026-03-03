import type { Metadata } from "next";
import StickerButton from "@/components/StickerButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Souls of Creative — a digital magazine and social media agency dedicated to the culture of creativity.",
};

const team = [
  {
    name: "Zara Okonkwo",
    title: "Editor in Chief",
    bio: "Former fashion editor turned digital media strategist. Zara founded SOC to bridge the gap between editorial excellence and the real-time demands of social media.",
    location: "Lagos / London",
  },
  {
    name: "Marcus Reid",
    title: "Creative Director",
    bio: "Art director and photographer whose work has appeared in i-D, Dazed, and numerous independent publications. Marcus shapes every visual decision SOC makes.",
    location: "London",
  },
  {
    name: "Nia Baptiste",
    title: "Music & Culture Editor",
    bio: "Music journalist and DJ whose ear for what's next has made her one of the most sought-after tastemakers in the UK underground scene.",
    location: "Manchester / Port of Spain",
  },
  {
    name: "Kofi Mensah",
    title: "Contributing Editor",
    bio: "Cultural critic and essayist. Kofi writes with a precision and warmth that makes even complex ideas feel like conversations.",
    location: "Accra / Berlin",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Mission hero */}
      <section className="bg-yellow-300 border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <StickerButton variant="black" rotate="-2" small>
                Our Story
              </StickerButton>
            </div>
            <h1 className="font-serif font-black text-6xl md:text-8xl text-black leading-none mb-8">
              We are
              <br />
              Souls of
              <br />
              Creative.
            </h1>
            <p className="font-mono text-base text-black/80 max-w-2xl leading-relaxed">
              Souls of Creative is a digital magazine and social media agency
              dedicated to the culture of creativity. We cover fashion, music,
              art, and the people building something new — told with the depth
              and craft they deserve.
            </p>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-serif font-black text-4xl text-black mb-6">
              The Mission
            </h2>
            <div className="space-y-4 font-mono text-sm text-black/80 leading-relaxed">
              <p>
                We started SOC because we believed that creative culture
                deserved better coverage. Not the breathless hype cycles. Not
                the algorithm-optimized hot takes. Just good, honest,
                beautifully-made editorial — the kind that respects both the
                subject and the reader.
              </p>
              <p>
                As a social media agency, we help brands speak in the language
                of culture — authentically, consistently, and with the kind of
                visual clarity that makes people stop scrolling and start
                feeling something.
              </p>
              <p>
                Everything we publish, every campaign we build, is guided by a
                single question: <em>Does this add something real to the
                conversation?</em>
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="space-y-4">
            {[
              {
                label: "01",
                title: "Craft Over Clicks",
                desc: "We measure success by the quality of the work, not just the metrics.",
              },
              {
                label: "02",
                title: "Authenticity First",
                desc: "We only cover and partner with people and brands whose work we genuinely believe in.",
              },
              {
                label: "03",
                title: "Global Perspective",
                desc: "Creative culture doesn't have a single center. We cover it wherever it's happening.",
              },
              {
                label: "04",
                title: "Community Over Competition",
                desc: "We believe in lifting others as we grow. The creative world is not zero-sum.",
              },
            ].map((value) => (
              <div
                key={value.label}
                className="border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono font-bold text-lg text-black/30 shrink-0">
                    {value.label}
                  </span>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-black mb-1">
                      {value.title}
                    </h3>
                    <p className="font-mono text-sm text-black/70">{value.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-t-2 border-black bg-black py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif font-black text-5xl text-yellow-300 mb-10 border-b border-white/10 pb-6">
            The Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div
                key={member.name}
                className={`border-2 p-5 ${
                  i % 2 === 0
                    ? "border-yellow-300 bg-yellow-300 text-black"
                    : "border-white bg-black text-white"
                } shadow-[4px_4px_0px_0px_rgba(255,127,80,1)]`}
              >
                {/* Avatar placeholder */}
                <div
                  className={`w-16 h-16 border-2 mb-4 flex items-center justify-center font-serif font-black text-2xl ${
                    i % 2 === 0 ? "border-black bg-black text-yellow-300" : "border-yellow-300 bg-yellow-300 text-black"
                  }`}
                >
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-serif font-bold text-xl mb-0.5">
                  {member.name}
                </h3>
                <p
                  className={`font-mono text-xs mb-3 ${
                    i % 2 === 0 ? "text-black/60" : "text-white/60"
                  }`}
                >
                  {member.title} · {member.location}
                </p>
                <p
                  className={`font-mono text-xs leading-relaxed ${
                    i % 2 === 0 ? "text-black/80" : "text-white/70"
                  }`}
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-black py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-serif font-black text-4xl text-black mb-4">
            Work with us.
          </h2>
          <p className="font-mono text-sm text-black/70 mb-8">
            We&apos;re always open to interesting collaborations — editorial,
            agency, and creative partnerships.
          </p>
          <StickerButton href="mailto:hello@soulsofcreative.com" variant="black" rotate="1">
            Get in Touch →
          </StickerButton>
        </div>
      </section>
    </div>
  );
}
