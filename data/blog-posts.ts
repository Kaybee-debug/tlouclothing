/** T.L.O.U. blog — stall clips, updates & customer vibes */
export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  category: 'Stall life' | 'Reviews' | 'Updates'
  type: 'video' | 'article'
  videoSrc?: string
  image?: string
  body?: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'at-the-stall-tembisa',
    title: 'At the stall — Tembisa',
    excerpt: 'A quick look at T.L.O.U. Clothing on a busy day at 933 Winnie Mandela, Zone 10.',
    date: '2026-06-04',
    category: 'Stall life',
    type: 'video',
    videoSrc: encodeURI('/WhatsApp Video 2026-06-04 at 14.38.35.mp4'),
    image: '/tlou_hoodie_beige.png',
    body: 'Walk past our stall in Tembisa and you will see hoodies, tracksuits and sets laid out for the community. This clip shows what a typical day looks like — come through, try a size, and chat with us about what is in stock.',
  },
  {
    slug: 'customer-pickups-and-fits',
    title: 'Pickups & street fits',
    excerpt: 'Customers grabbing their orders and showing off the T.L.O.U. look.',
    date: '2026-06-04',
    category: 'Reviews',
    type: 'video',
    videoSrc: encodeURI('/WhatsApp Video 2026-06-04 at 14.38.37.mp4'),
    image: '/tlou_set_olive.png',
    body: 'Nothing beats seeing the gear out in the streets. Here are a few moments from pickups at the stall — real customers, real fits. Want the same look? WhatsApp us to check sizes and colours.',
  },
  {
    slug: 'welcome-to-tlou-blog',
    title: 'Welcome to the T.L.O.U. blog',
    excerpt: 'Stall updates, new drops and clips from Tembisa — all in one place.',
    date: '2026-06-01',
    category: 'Updates',
    type: 'article',
    image: '/tlou_hoodie.png',
    body: 'This is where we share what is happening at T.L.O.U. Clothing — new stock, stall days, and short videos from the community. Follow along here or on Instagram, and message us on WhatsApp when you are ready to order.',
  },
]

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug)
}
