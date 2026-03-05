import type { Metadata } from "next";
import StickerButton from "@/components/StickerButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Souls of Creatives — a digital magazine and social media agency dedicated to the culture of creativity.",
};

const team = [
  {
    name: "Jegede Tobiloba",
    title: "Editor in Chief / Creative Director",
    bio: "Tobi founded SOC at the age of 17 beccause he wanted to build a platform where creatives can show case their art and the creative process behind said art, he wanted to put culture on the center stage.",
    location: "Lagos / London",
  },
  {
    name: "Clinton anifowose",
    title: "Art Director",
    bio: "linton joined SOC at 17 as an Art Director, bringing a strong visual perspective to the platform’s creative direction. At SOC, he helps shape the visual identity and presentation of the platform, working to spotlight emerging creatives and the stories behind their work while keeping culture and artistic expression at the forefront.",
    location: "Lagos",
  },
  {
    name: "Alozie Ikechukwu",
    title: "Chief Designer",
    bio: "At the age of 18, Ikechukwu joined SOC to help drive the vision of building a platform where creatives can showcase their finished masterpieces and the creative process behind said masterpieces. Dedicated to cultural advocacy, he is committed to ensuring that the creative process is celebrated on a global scale",
    location: "Lagos",
  },
  {
    name: "Agbale Dwayne",
    title: "IT Specialist",
    bio: "Dwayne is a tech enthusiast and problem solver who ensures that our digital infrastructure runs smoothly. With a background in IT and a passion for innovation, he keeps our online presence secure and efficient. He built the website and maintains it, ensuring that our content is always accessible to our audience.",
    location: "Lagos / England",
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
              Souls of Creatives is a digital magazine and social media agency
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
                We founded SoC because visibility shouldn't be a byproduct of an algorithm; it should be the result of exceptional craft. In a world of fleeting digital noise, we believe the creative process is just as vital as the final piece. We exist to give creatives the stage, the spotlight, and the permanence they deserve
              </p>
              <p>
                Our platform isn't just a showcase—it’s a cultural bridge. Whether through immersive pop-ups, curated concerts, or high-fidelity digital storytelling, we connect visionary artists with the global audience that needs them. We don’t just broadcast culture; we help build it.
              </p>
              <p>
                Every feature we publish and every event we will produce will be  guided by a single commitment: to showcase creativity and culture on the biggest of stages 
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
          <StickerButton href="mailto:soulsofcreatives7@gmail.com" variant="black" rotate="1">
            Get in Touch →
          </StickerButton>
        </div>
      </section>
    </div>
  );
}
