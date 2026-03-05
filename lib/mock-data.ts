import { Article, Announcement, Category, Playlist } from "./types";

export const mockCategories: Category[] = [
  { id: "1", name: "Fashion", slug: "fashion" },
  { id: "2", name: "Music", slug: "music" },
  { id: "3", name: "Culture", slug: "culture" },
  { id: "4", name: "Interviews", slug: "interviews" },
  { id: "5", name: "Lifestyle", slug: "lifestyle" },
];

export const mockAnnouncement: Announcement = {
  id: "1",
  message:
    "Issue 04 is now live — Featuring 12 rising creatives redefining what it means to 'make it'.",
  cta_url: "/article/issue-04-rising-creatives",
  is_active: true,
  created_at: new Date().toISOString(),
};

const staffWriter = {
  id: "1",
  email: "soulsofcreatives7@gmail.com",
  role: "editor" as const,
  created_at: new Date().toISOString(),
};

const daysAgo = (n: number) =>
  new Date(Date.now() - 86400000 * n).toISOString();

export const mockArticles: Article[] = [
  {
    id: "1",
    title:
      "The Art of the Aesthetic: How Visual Storytelling is Redefining Brand Identity",
    slug: "art-of-aesthetic-visual-storytelling",
    excerpt:
      "In an era where the scroll is endless and attention is the ultimate currency, the brands that win are those that have mastered the art of the freeze — that single image that makes thumbs stop.",
    content: `<p>In an era where the scroll is endless and attention is the ultimate currency, the brands that win are those that have mastered the art of the freeze — that single image that makes thumbs stop.</p>
<p>Visual storytelling isn't new. What's new is the speed at which it must operate, the intimacy it must project, and the authenticity it must carry in a world that has developed finely-tuned filters for anything that feels fake.</p>
<h2>The New Language of Brand</h2>
<p>Today's most resonant brands aren't selling products — they're selling a feeling, a worldview, a sense of belonging. The visual language they use is less about perfect composition and more about emotional precision.</p>
<p>Think about the brands you follow on Instagram. Not the ones you buy from out of necessity, but the ones you actually look forward to seeing. What do they have in common? They make you feel something before you can articulate what that something is.</p>
<h2>Building a Visual Identity That Lasts</h2>
<p>The creatives leading this movement share a common thread: intentionality. Every color choice, every font weight, every piece of negative space is a deliberate decision in service of a larger emotional narrative.</p>
<blockquote>The future of branding isn't louder or brighter — it's more honest, more human, and more deeply felt.</blockquote>
<p>This is the shift we're witnessing in real-time: from broadcast to conversation, from campaign to community, from logo to lived experience.</p>`,
    cover_image: "https://picsum.photos/seed/brand1/1200/800",
    author_id: "1",
    author: staffWriter,
    is_published: true,
    created_at: daysAgo(1),
    updated_at: daysAgo(1),
    categories: [mockCategories[2], mockCategories[0]],
  },
  {
    id: "2",
    title: "What Your Wardrobe Says About Your Brand: The Style-Identity Matrix",
    slug: "wardrobe-brand-style-identity-matrix",
    excerpt:
      "Fashion has always been a form of communication. But in the age of personal branding, what you wear is no longer just an outfit — it's a statement of values, taste, and tribe.",
    content: `<p>Fashion has always been a form of communication. But in the age of personal branding, what you wear is no longer just an outfit — it's a statement of values, taste, and tribe.</p>
<h2>The Visual First Impression</h2>
<p>Before you speak a word, before a single slide loads, before your portfolio is even clicked — people see you. And what they see informs everything that follows. The cognitive science behind this is well-established, but the creative application of it is still being written.</p>
<p>The most influential creatives we've spoken to all share one trait: they dress with intention. Not necessarily expensively, but deliberately. They understand that their aesthetic is an extension of their brand voice.</p>
<h2>Building Your Signature Look</h2>
<p>Start with your core values. If your brand is about bold ideas, your wardrobe might lean toward structural, architectural pieces. If you're selling warmth and community, perhaps it's texture and earth tones. The key is alignment — your visual identity should feel consistent across all touchpoints, including your body.</p>`,
    cover_image: "https://picsum.photos/seed/fashion2/1200/800",
    author_id: "1",
    author: staffWriter,
    is_published: true,
    created_at: daysAgo(3),
    updated_at: daysAgo(3),
    categories: [mockCategories[0]],
  },
  {
    id: "3",
    title:
      "Playlist Curation as Creative Direction: The Sounds Behind 5 Iconic Campaigns",
    slug: "playlist-curation-creative-direction-campaigns",
    excerpt:
      "The right music doesn't just underscore a scene — it creates emotional permission for the audience to feel exactly what you want them to feel. Five creative directors share their sonic strategies.",
    content: `<p>The right music doesn't just underscore a scene — it creates emotional permission for the audience to feel exactly what you want them to feel.</p>
<h2>Sound as Brand Architecture</h2>
<p>When we talk about brand identity, we obsess over color palettes, typography systems, and logo grids. But sound — one of the most emotionally direct mediums we have — often gets treated as an afterthought.</p>
<p>The five creative directors we interviewed for this piece all agree: that's a mistake. Audio branding, when done with the same intentionality as visual branding, creates a level of emotional stickiness that images alone can't achieve.</p>
<h2>The 60-Second Sonic Portrait</h2>
<p>One of our subjects, a creative director for a global streetwear label, described their process as building a "60-second sonic portrait" for every campaign. Before a single frame is shot, the playlist is locked. It sets the tempo of the edit, the energy of the talent, the entire emotional arc of the piece.</p>`,
    cover_image: "https://picsum.photos/seed/music3/1200/800",
    author_id: "1",
    author: staffWriter,
    is_published: true,
    created_at: daysAgo(5),
    updated_at: daysAgo(5),
    categories: [mockCategories[1], mockCategories[2]],
  },
  {
    id: "4",
    title: "In Conversation: Mia Torres on Sustainable Fashion and the Power of 'No'",
    slug: "interview-mia-torres-sustainable-fashion",
    excerpt:
      "The Lagos-born, London-raised designer has built one of the most compelling sustainable fashion brands of the decade — by refusing nearly every shortcut the industry offered her.",
    content: `<p>Mia Torres doesn't rush. That much is clear from the moment she settles into her seat at the Brixton studio she's called home for the past six years. The Lagos-born, London-raised designer has built one of the most compelling sustainable fashion brands of the decade.</p>
<h2>'No' as a Creative Strategy</h2>
<p>"Every 'yes' costs you something," she says, adjusting the oversized collar of what turns out to be a prototype for her next collection. "And in fashion, if you're not careful about what you agree to, you can trade away your entire identity without realizing it."</p>
<p>Her brand, Abèní, has become shorthand in certain circles for a particular kind of ethical luxury — pieces that don't just look beautiful but carry a verifiable story of who made them, where, and under what conditions.</p>
<h2>The Supply Chain as Creative Medium</h2>
<p>"I consider the supply chain part of the design," she tells me. "If I can't trace it back to the source with full transparency, it's not finished yet. The textile, the hands that touched it, the conditions — that's all part of the garment's story."</p>`,
    cover_image: "https://picsum.photos/seed/interview4/1200/800",
    author_id: "1",
    author: staffWriter,
    is_published: true,
    created_at: daysAgo(7),
    updated_at: daysAgo(7),
    categories: [mockCategories[3], mockCategories[0]],
  },
  {
    id: "5",
    title: "The Morning Ritual: How 6 Creative Founders Start Their Day",
    slug: "morning-ritual-creative-founders",
    excerpt:
      "Before the meetings, the content calendars, the client calls — there's the quiet. We asked six of the most productive creatives we know how they protect the first hour of their day.",
    content: `<p>Before the meetings, the content calendars, the client calls — there's the quiet. We asked six of the most productive creatives we know how they protect the first hour of their day.</p>
<h2>The Anti-Optimization Morning</h2>
<p>It would be easy to turn this into a listicle of productivity hacks — cold showers, journal prompts, and 5AM alarm clocks. But what we found in our conversations was something more nuanced: the most creative people we know have designed mornings that protect something specific, not just optimize something generic.</p>
<p>For some, that thing is silence. For others, it's movement. For one, it's the specific playlist that only plays before 8AM, because after that, the algorithm of the day takes over.</p>
<h2>Six Rituals, One Thread</h2>
<p>What connects all six of the founders we spoke to is a single principle: they have reclaimed the first hour from the reactive. No email. No social media. No Slack. The morning belongs to them — to their thinking, their making, their becoming.</p>`,
    cover_image: "https://picsum.photos/seed/lifestyle5/1200/800",
    author_id: "1",
    author: staffWriter,
    is_published: true,
    created_at: daysAgo(9),
    updated_at: daysAgo(9),
    categories: [mockCategories[4], mockCategories[2]],
  },
  {
    id: "6",
    title: "Street Style Season: The 10 Looks Dominating Lagos Fashion Week",
    slug: "street-style-lagos-fashion-week",
    excerpt:
      "Lagos Fashion Week 2025 delivered a masterclass in what happens when African design traditions meet the global visual language of now. Here are the ten looks that stopped us in our tracks.",
    content: `<p>Lagos Fashion Week 2025 delivered a masterclass in what happens when African design traditions meet the global visual language of now.</p>
<h2>The Looks</h2>
<p>From the bold use of Ankara print in unexpected silhouettes to the rise of deconstructed tailoring as a statement of cultural negotiation, this year's street style was a conversation — between past and future, between Lagos and everywhere.</p>
<p>What struck us most was the confidence. Not the performative confidence of someone dressing for attention, but the ease of people who have clearly done the work of figuring out who they are and then dressed accordingly.</p>
<h2>The Influence Direction</h2>
<p>For too long, fashion's influence map has flowed in a single direction. What Lagos Fashion Week makes viscerally clear is that the map has been redrawn. The references are moving both ways now — and the global industry is paying attention.</p>`,
    cover_image: "https://picsum.photos/seed/fashion6/1200/800",
    author_id: "1",
    author: staffWriter,
    is_published: true,
    created_at: daysAgo(11),
    updated_at: daysAgo(11),
    categories: [mockCategories[0], mockCategories[2]],
  },
  {
    id: "7",
    title: "Issue 04 Rising Creatives: 12 Artists Redefining 'Making It'",
    slug: "issue-04-rising-creatives",
    excerpt:
      "We spent three months finding the twelve people we believe are quietly shaping the next wave of creative culture. Here they are — in their own words.",
    content: `<p>We spent three months finding the twelve people we believe are quietly shaping the next wave of creative culture. Not the loudest voices. Not the most followed accounts. The ones doing the actual work of building something new.</p>
<h2>What 'Making It' Means Now</h2>
<p>The old model was simple: get signed, get featured, get famous. The new model is harder to describe precisely because it's different for everyone — and that's the point. These twelve creatives have each defined success on their own terms, and in doing so, have made the territory of possibility a little larger for everyone who comes after them.</p>
<h2>The 12</h2>
<p>From a sound designer in Accra who scores films remotely for studios in Tokyo and Berlin, to a visual artist in Port of Spain whose sculptures have been quietly appearing in the collections of people who don't follow anyone — these are twelve people making the kind of work that doesn't need a press release to find its audience.</p>`,
    cover_image: "https://picsum.photos/seed/issue04/1200/800",
    author_id: "1",
    author: staffWriter,
    is_published: true,
    created_at: daysAgo(2),
    updated_at: daysAgo(2),
    categories: [mockCategories[3], mockCategories[2]],
  },
  {
    id: "8",
    title: "Color Theory for Creatives: Building a Palette That Speaks Before You Do",
    slug: "color-theory-creatives-brand-palette",
    excerpt:
      "Color is the first language your brand speaks — often before a single word is read. Understanding why certain combinations land, and others fall flat, is one of the most powerful tools in a creative's arsenal.",
    content: `<p>Color is the first language your brand speaks — often before a single word is read. Understanding why certain combinations land, and others fall flat, is one of the most powerful tools in a creative's arsenal.</p>
<h2>The Psychology of Color in Brand</h2>
<p>Color psychology isn't mystical — it's cultural, contextual, and deeply personal. The same shade of yellow that reads as "optimistic and energetic" in one context can read as "caution" in another. The key is understanding not just the color, but the container it lives in.</p>
<h2>Building Your Palette with Intent</h2>
<p>Start with three questions: What emotion do you want to evoke first? What's the second-read feeling you want to leave people with? And what do you absolutely want to avoid communicating? These questions will get you to your palette faster than any color wheel exercise.</p>
<blockquote>A great palette isn't the one that follows the rules. It's the one that breaks exactly the right ones.</blockquote>`,
    cover_image: "https://picsum.photos/seed/color8/1200/800",
    author_id: "1",
    author: staffWriter,
    is_published: true,
    created_at: daysAgo(14),
    updated_at: daysAgo(14),
    categories: [mockCategories[2], mockCategories[4]],
  },
];

export const mockPlaylists: Playlist[] = [
  {
    id: "1",
    title: "Creative Hours Vol. 3",
    embed_url:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DX4SBhb3fqCJd?utm_source=generator",
    platform: "spotify",
    description:
      "The playlist for long studio sessions. Deep focus, wide imagination.",
    created_at: daysAgo(3),
  },
  {
    id: "2",
    title: "Lagos to London: The Sounds of Now",
    embed_url:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DWY4xHrwRedOJ?utm_source=generator",
    platform: "spotify",
    description:
      "Afrobeats, Amapiano, UK Garage and everything in between. The global sound of the moment.",
    created_at: daysAgo(7),
  },
  {
    id: "3",
    title: "SOC Mood Board: Issue 04",
    embed_url:
      "https://www.youtube.com/embed/videoseries?list=PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI",
    platform: "youtube",
    description:
      "Every visual reference, every sonic inspiration that went into making Issue 04.",
    created_at: daysAgo(2),
  },
  {
    id: "4",
    title: "Morning Pages",
    embed_url:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ?utm_source=generator",
    platform: "spotify",
    description:
      "Slow mornings, sharp thinking. The playlist we recommend before you open any app.",
    created_at: daysAgo(10),
  },
  {
    id: "5",
    title: "Runway Energy",
    embed_url:
      "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1234567&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
    platform: "soundcloud",
    description:
      "The soundtrack to getting dressed with intention. High energy, high fashion.",
    created_at: daysAgo(5),
  },
  {
    id: "6",
    title: "Golden Hour Sessions",
    embed_url:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DX1s9knjP51Oa?utm_source=generator",
    platform: "spotify",
    description:
      "For the hour when the light changes and anything feels possible.",
    created_at: daysAgo(15),
  },
];

export function getMockFeaturedArticle(): Article {
  return mockArticles[0];
}

export function getMockArticles(categorySlug?: string): Article[] {
  if (categorySlug) {
    return mockArticles.filter((a) =>
      a.categories?.some((c) => c.slug === categorySlug)
    );
  }
  return mockArticles;
}

export function getMockArticleBySlug(slug: string): Article | undefined {
  return mockArticles.find((a) => a.slug === slug);
}
