const firstSectionExact = [
  { title: '509322 32706202 01 Gnihtdab', duration: '13:21', views: 89000, rating: 89, hd: false },
  { title: 'Warandlovers Long Sloppy Blowjob With Big Cumshot In Mouth Amateur Couple', duration: '20:34', views: 82037, rating: 95, hd: true },
  { title: 'Sedolpxe Ehs Orerreug Anilorac Artxxesrezzarb', duration: '27:47', views: 75074, rating: 76, hd: true },
  { title: 'Salome Gil First Real Anal Ever By Bruno', duration: '34:00', views: 68111, rating: 82, hd: false },
  { title: 'Nwod Kcid Laciport Zepol Anila Artxxesrezzarb', duration: '41:13', views: 61148, rating: 88, hd: true },
  { title: 'Salome Gil Latin Massage', duration: '48:26', views: 54185, rating: 94, hd: false },
  { title: 'Juli Thick Juli With Bbc', duration: '10:39', views: 47222, rating: 75, hd: false },
  { title: 'Nefernikk Bbc Creampie Sextape', duration: '17:52', views: 40259, rating: 81, hd: true },
  { title: 'Angela Spades Analizada Por Max Cartel', duration: '24:05', views: 33296, rating: 87, hd: true },
  { title: 'Anjaamelia Lizaroxx Best Of Stream Mit Meiner Sexy Freundin', duration: '31:18', views: 26333, rating: 85, hd: false },
  { title: 'Rotcartnoc Sv Retnuh Kcoc Gib Etnamaid Aras Artxxesrezzarb', duration: '15:42', views: 55410, rating: 78, hd: true },
  { title: 'Skraps Annerb Legnalive', duration: '22:18', views: 48120, rating: 82, hd: true },
  { title: 'Cata Sanchez The Stepmother Has A Secret Involving Her Stepson', duration: '36:05', views: 42300, rating: 91, hd: false },
  { title: 'We Re Going Straight To The Vip Room', duration: '08:55', views: 38750, rating: 79, hd: true },
  { title: 'Vienna Rose You Can T Say No', duration: '19:30', views: 34500, rating: 86, hd: true },
]

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function buildExactVideos(list, seed) {
  return list.map((v, i) => ({
    id: seed + i,
    slug: slugify(v.title),
    title: v.title,
    href: `/videos/${seed + i}/${slugify(v.title)}/`,
    imageIndex: i % 38,
    duration: v.duration,
    views: v.views,
    rating: v.rating,
    hd: v.hd,
    date: Date.now() - ((i * 41) % 720) * 86400000 - ((i * 7) % 24) * 3600000,
  }))
}

const videoSlugs = [
  'graycee-baybee-dp-diva-4k',
  'mia-river-nothing-has-changed',
  'syren-de-mer-sneaky-gilf-swap-and-dp',
  'noelle-easton',
  'lauren-phillips-stepmom-and-i-get-comfortable-in-4k',
  'brenna-mckenna-dp-diva',
  'curvy-milf-gets-ass-fucked-by-her-daughter-boyfriend-4k',
  'crystal-greenvelle-lola-shine-4on2-dap-gapes-skinny-dap-gapes-atm-cumswapping-gio20',
  'lola-bulgari-interracial-anal',
  'veronica-leal-offers-both-her-holes',
  'busty-teen-eva-elfie-on-casting',
  'arabelle-raphael-jogging-jiggling-and-helping-him-cheat-in-4k',
  'move-your-ass-i-like-that-in-4k',
  'bbc-orgy-pary-enough-big-black-cock-for-every-hole',
  'orgy-masters-party-fuck-fest',
  'easter-special-kyler-quinn-vs-dredd',
  'gabbie-carter-giselle-palmer-busty-threesome',
  'after-work',
  'emma-hix-ultimate-prize-in-4k',
  'massive-cock-vs-stepdaughter-molly-little',
  'lana-rhoades4',
]

function slugToTitle(slug) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function buildVideos(start, count, seed) {
  return Array.from({ length: count }, (_, i) => {
    const idx = start + i
    const slug = videoSlugs[idx % videoSlugs.length]
    return {
      id: seed + i,
      slug,
      title: slugToTitle(slug),
      href: `/videos/${seed + i}/${slug}/`,
      imageIndex: idx % 38,
      duration: `${String(((i * 7 + 8) % 45) + 5).padStart(1, '0')}:${String((i * 13 + 21) % 60).padStart(2, '0')}`,
      views: ((i * 173 + 529) % 90 + 10) * 1000 + i * 37,
      rating: ((i * 31 + 17) % 25) + 72,
      hd: i % 3 !== 0,
      date: Date.now() - ((i * 53) % 720) * 86400000 - ((i * 11) % 24) * 3600000,
    }
  })
}

export const siteMeta = {
  title: 'WhoresHub - Watch Free XXX HD Porn Videos and Movies',
  description:
    'Watch free hd porn videos and hardcore porn movies. Enjoy homemade and amateur videos on WhoresHub porn website. Discover daily new XXX hd porn videos now!',
  keywords: 'free hd porn video, xxx hd porn video, porn website, porn videos, hd porn movies',
}

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Videos', href: '/latest-updates/', dropdownType: 'small' },
  { label: 'Categories', href: '/categories/', dropdownType: 'full' },
  { label: 'Tags', href: '/tags/', dropdownType: 'full' },
  { label: 'Albums', href: '/albums/', dropdownType: 'small' },
  { label: 'Models', href: '/models/', dropdownType: 'full' },
  { label: 'Theporndude', href: 'https://theporndude.com/?ref=whoreshub', external: true, comingSoon: true },
  { label: 'LIVE SEX', href: '#', external: true, comingSoon: true },
  { label: 'Telegram', href: 'https://t.me/whoreshub', external: true, comingSoon: true },
  { label: 'Premium', href: '/premium/', comingSoon: true },
]

export const popularTags = ['milf', 'hardcore', 'blowjob', 'big tits', 'big ass', 'anal']

export const popularCategories = [
  'Bukkake',
  'Pissing',
  'Gangbang',
  'Gaping',
  'Arab',
  'Interracial',
]

export const trendingSearches = [
  {
    name: 'PORN BOX LegalPorno Natasha Teen Danna Baren Miley Kitty Cosplay Anal Deep Fisting und Groe Schwarze Schwnze im Arsch anal bigass bigtits blowjob hardcore black bbc interracial latina orgy teen group durchgefh.mp4',
    value: 530,
  },
  {
    name: 'ALISA HORAKOVA Small teen ass destroyed by grandpas big black dick Belarusian, Anal, All Sex, Blowjob, ATM, Saggy Tits, IR AnalVids CIM.mp4',
    value: 650,
  },
  {
    name: 'PORN BO LegalPorno Natasha Teen Danna Baren Miley Kitty Cosplay Anal Deep Fisting und Groe Schwarze Schwnze im Arsch anal bigass bigtits blowjob hardcore black bbc interracial latina orgy teen group durchgefh.mp4',
    value: 530,
  },
  {
    name: 'Big Prolaps Fucking Hard Shy Teen Olivia Trunk And Her First Anal (25 01 2022) 1080p.mp4',
    value: 724,
  },
  {
    name: 'Anna De Ville, Luna Rival, Rebel Rhyder, Lydia Black, Mell Blanco, Kristy Black, Eden Ivy, Veronica Leal, Baby Kxtten, Ria Sunn, Leila Botwin [Gonzo]',
    value: 425,
  },
]

export const videoSections = [
  {
    id: 'recently_added',
    titleLead: 'Free HD Porn Videos',
    titleRest: 'and Movies',
    as: 'h1',
    sortLabel: null,
    videos: buildExactVideos(firstSectionExact, 1000),
  },
  {
    id: 'top_rated',
    titleLead: 'Top',
    titleRest: 'Rated Videos',
    as: 'h2',
    sortLabel: 'Top Rated',
    videos: buildVideos(0, 15, 2000),
  },
  {
    id: 'most_favourited',
    titleLead: 'Most',
    titleRest: 'Favourited Videos',
    as: 'h2',
    sortLabel: 'Most Favourited',
    videos: buildVideos(15, 15, 3000),
  },
]

export const categorySection = {
  titleLead: 'Most',
  titleRest: 'Viewed Categories',
  sortLabel: 'Most Viewed',
  items: popularCategories.map((name, i) => ({
    name,
    href: `/categories/${name.toLowerCase()}/`,
    imageIndex: 30 + (i % 8),
  })),
}

export const bottomTags = [
  'deepthroat',
  'solo',
  'small tits',
  'fetish',
  'asian',
  'teen',
  'oral',
  'ass',
  'latin',
  'big dick',
  'lesbian',
  'mature',
  'porn',
  'milf',
  'hardcore',
  'blowjob',
  'big tits',
  'big ass',
  'anal',
  '4k',
  'dredd',
  'privatesociety',
]

export const footerSpot = {
  title: 'Welcome To WhoresHub',
  text: 'WhoresHub.com is a large collection of the newest high-quality porn videos in high resolution. Enjoy our user-friendly platform to find and enjoy the best sex videos across different categories on any of your devices. We constantly update each category with the latest HD porn videos to meet the diverse taste of our visitors.',
}

export const footerColumns = [
  {
    title: 'Information',
    mobile: true,
    links: [
      { label: 'Terms & Conditions', href: '/terms/' },
      { label: 'Privacy Policy', href: '/privacy-policy/' },
      { label: 'DMCA', href: '/dmca/' },
      { label: '18 USC 2257', href: '/2257/' },
    ],
  },
  {
    title: 'Work With Us',
    accent: 'Work',
    rest: 'With Us',
    links: [
      { label: 'Content Partners', href: '/coming_soon.php' },
      { label: 'Advertise', href: '/coming_soon.php' },
      { label: 'Webmasters', href: '/coming_soon.php' },
      { label: 'Model Program', href: '/coming_soon.php' },
    ],
  },
  {
    title: 'Support and Help',
    accent: 'Support',
    rest: 'and Help',
    mobile: true,
    links: [
      { label: 'Contact Support', href: '/contact/', external: true },
      { label: 'Sitemap', href: '/sitemap/' },
    ],
  },
  {
    title: 'Friends',
    links: [
      { label: 'Porntrex', href: 'https://www.porntrex.com/', external: true },
      { label: 'Camwhoresbay', href: 'https://www.camwhoresbay.com/', external: true },
      { label: 'Javwhores', href: 'https://www.javbangers.com/', external: true },
      { label: 'BongaCams', href: 'https://bongacams.com/', external: true },
    ],
  },
]

export const footerCopy = '2025 WhoresHub.com All rights reserved.'

export const videoDropdownItems = [
  { label: 'Latest', href: '/latest-updates/' },
  { label: 'Most Viewed', href: '/most-viewed/' },
  { label: 'Top Rated', href: '/top-rated/' },
]

export const categoriesDropdownItems = [
  { name: 'Brazilian', videoCount: 2238, imageIndex: 30 },
  { name: '4K Porn', videoCount: 6967, imageIndex: 31 },
  { name: 'Group Sex', videoCount: 914, imageIndex: 32 },
  { name: 'Japanese', videoCount: 7130, imageIndex: 33 },
  { name: 'Ai', videoCount: 1332, imageIndex: 34 },
  { name: 'Black', videoCount: 6140, imageIndex: 35 },
]

export const tagsDropdownItems = [
  { name: 'Xxx', count: 15230 },
  { name: 'Big Dick', count: 9841 },
  { name: 'Webcam', count: 7621 },
  { name: 'Amateur', count: 12450 },
  { name: 'Bbw', count: 5320 },
  { name: 'Russian', count: 8912 },
  { name: 'Red Head', count: 3456 },
  { name: 'Small Tits', count: 6789 },
  { name: 'Fetish', count: 11234 },
  { name: 'Asian', count: 9456 },
  { name: 'Teen', count: 18765 },
  { name: 'Oral', count: 14321 },
  { name: 'Ass', count: 9987 },
  { name: 'Latin', count: 7654 },
  { name: 'Lesbian', count: 13210 },
  { name: 'Mature', count: 8876 },
  { name: 'Porn', count: 21098 },
  { name: 'Milf', count: 16543 },
  { name: 'Hardcore', count: 15678 },
  { name: 'Blowjob', count: 18901 },
  { name: 'Big Tits', count: 14567 },
  { name: 'Big Ass', count: 12345 },
  { name: 'Anal', count: 16789 },
  { name: '4k', count: 4567 },
]

export const albumsDropdownItems = [
  { label: 'Top Rated', href: '/albums/top-rated/' },
  { label: 'Most Viewed', href: '/albums/most-viewed/' },
]

export const azTagsIndex = []

export const modelsDropdownItems = [
  { name: 'Lana Rhoades', videos: 24, photos: 156, imageIndex: 0 },
  { name: 'Mia Khalifa', videos: 18, photos: 89, imageIndex: 1 },
  { name: 'Riley Reid', videos: 32, photos: 203, imageIndex: 2 },
  { name: 'Sasha Grey', videos: 15, photos: 67, imageIndex: 3 },
  { name: 'Abella Danger', videos: 28, photos: 145, imageIndex: 4 },
  { name: 'Eva Elfie', videos: 12, photos: 78, imageIndex: 5 },
  { name: 'Kendra Sunderland', videos: 20, photos: 112, imageIndex: 6 },
  { name: 'Lena Paul', videos: 22, photos: 98, imageIndex: 7 },
  { name: 'Emily Willis', videos: 26, photos: 134, imageIndex: 8 },
  { name: 'Violet Myers', videos: 14, photos: 56, imageIndex: 9 },
  { name: 'Angela White', videos: 35, photos: 210, imageIndex: 10 },
  { name: 'Brandi Love', videos: 30, photos: 178, imageIndex: 11 },
  { name: 'Kylie Page', videos: 16, photos: 87, imageIndex: 12 },
  { name: 'Nicole Aniston', videos: 21, photos: 95, imageIndex: 13 },
  { name: 'Lisa Ann', videos: 38, photos: 220, imageIndex: 14 },
  { name: 'Kayden Kross', videos: 19, photos: 76, imageIndex: 15 },
  { name: 'Alexis Texas', videos: 27, photos: 142, imageIndex: 16 },
  { name: 'Asa Akira', videos: 33, photos: 189, imageIndex: 17 },
  { name: 'Megan Rain', videos: 21, photos: 103, imageIndex: 18 },
  { name: 'Adriana Chechik', videos: 29, photos: 167, imageIndex: 19 },
  { name: 'Jessa Rhodes', videos: 23, photos: 134, imageIndex: 20 },
  { name: 'Karlee Grey', videos: 25, photos: 145, imageIndex: 21 },
  { name: 'Remy LaCroix', videos: 31, photos: 178, imageIndex: 22 },
  { name: 'Tera Patrick', videos: 28, photos: 165, imageIndex: 23 },
]

const albumNames = [
  'Nicole Aniston - (Vixen)',
  'Tori Black - (Tushy)',
  'Leah Gotti & Kylie Page',
  'Angela White Anal',
  'Riley Reid Best Of',
  'Lana Rhoades Collection',
  'Mia Khalifa Exclusive',
  'Abella Danger Dp',
  'Brandi Love MIlf',
  'Eva Elfie Adventures',
  'Sasha Grey Art',
  'Emily Willis Anal',
  'Lisa Ann Tribute',
  'Kendra Sunderland',
  'Violet Myers Curves',
  'Lena Paul Thick',
  'Kayden Kross Elegance',
  'Kylie Page Teen',
  'Nicole Aniston V2',
  'Tori Black Returns',
  'Angela White Heaven',
  'Riley Reid Daily',
  'Lana Rhoades V2',
  'Mia Khalifa V2',
  'Brandi Love V2',
]

export const albumsData = albumNames.map((name, i) => ({
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''),
  imageIndex: i % 38,
  rating: 85 + (i * 3) % 16,
  photos: 50 + (i * 17) % 200,
  views: (20 + (i * 7) % 80) * 1000,
  age: `${1 + (i % 5)} year${i % 5 === 0 ? '' : 's'} ago`,
}))

const modelProfiles = [
  { name: 'Gemma Massey', age: 41, country: 'United Kingdom', city: 'Tamworth', height: '157cm', weight: '45kg', bio: 'Gemma Massey is a British adult film actress and glamour model. She has appeared in numerous adult films and is known for her natural beauty and captivating performances.' },
  { name: 'Lana Rhoades', age: 27, country: 'United States', city: 'Chicago', height: '163cm', weight: '52kg', bio: 'Lana Rhoades is an American former pornographic actress. She has won multiple awards and is considered one of the most popular adult stars of her generation.' },
  { name: 'Mia Khalifa', age: 31, country: 'Lebanon', city: 'Beirut', height: '157cm', weight: '55kg', bio: 'Mia Khalifa is a Lebanese-American media personality and former pornographic actress. She has since become a sports commentator and social media influencer.' },
  { name: 'Riley Reid', age: 33, country: 'United States', city: 'Miami', height: '160cm', weight: '50kg', bio: 'Riley Reid is an American pornographic actress. She has received numerous industry awards and is widely recognized as one of the most popular performers.' },
  { name: 'Sasha Grey', age: 36, country: 'United States', city: 'Sacramento', height: '168cm', weight: '54kg', bio: 'Sasha Grey is an American author, musician, and former pornographic actress. She has appeared in mainstream films and television shows.' },
  { name: 'Abella Danger', age: 29, country: 'United States', city: 'Miami', height: '160cm', weight: '54kg', bio: 'Abella Danger is an American pornographic actress and dancer. Known for her energetic performances and striking appearance.' },
  { name: 'Eva Elfie', age: 24, country: 'Russia', city: 'Moscow', height: '155cm', weight: '48kg', bio: 'Eva Elfie is a Russian pornographic actress. She gained popularity through her work with various studios and her social media presence.' },
  { name: 'Kendra Sunderland', age: 29, country: 'United States', city: 'Portland', height: '173cm', weight: '61kg', bio: 'Kendra Sunderland is an American pornographic actress and webcam model. She gained fame after a library livestream incident.' },
  { name: 'Lena Paul', age: 30, country: 'United States', city: 'Atlanta', height: '170cm', weight: '57kg', bio: 'Lena Paul is an American pornographic actress. Known for her tall stature and versatile performances in the adult film industry.' },
  { name: 'Emily Willis', age: 26, country: 'United States', city: 'Los Angeles', height: '165cm', weight: '52kg', bio: 'Emily Willis is an American pornographic actress. She has quickly risen to fame with her captivating performances.' },
  { name: 'Violet Myers', age: 25, country: 'United States', city: 'Las Vegas', height: '157cm', weight: '50kg', bio: 'Violet Myers is an American pornographic actress of Mexican descent. Known for her curvy figure and energetic scenes.' },
  { name: 'Angela White', age: 39, country: 'Australia', city: 'Melbourne', height: '160cm', weight: '54kg', bio: 'Angela White is an Australian pornographic actress and director. She has a PhD in gender studies and is one of the most awarded performers.' },
  { name: 'Brandi Love', age: 43, country: 'United States', city: 'Detroit', height: '170cm', weight: '57kg', bio: 'Brandi Love is an American pornographic actress. Known as the MILF next door, she has built a massive following worldwide.' },
  { name: 'Kylie Page', age: 27, country: 'United States', city: 'Dallas', height: '163cm', weight: '52kg', bio: 'Kylie Page is an American pornographic actress. She has worked with major studios and built a loyal fan base.' },
  { name: 'Nicole Aniston', age: 37, country: 'United States', city: 'Los Angeles', height: '168cm', weight: '57kg', bio: 'Nicole Aniston is an American pornographic actress. Known for her stunning looks and professional work ethic in the industry.' },
  { name: 'Lisa Ann', age: 52, country: 'United States', city: 'Los Angeles', height: '160cm', weight: '55kg', bio: 'Lisa Ann is an American former pornographic actress and director. One of the most recognizable names in the adult industry.' },
  { name: 'Kayden Kross', age: 39, country: 'United States', city: 'Los Angeles', height: '165cm', weight: '52kg', bio: 'Kayden Kross is an American pornographic actress, writer, and director. Known for her intelligence and stunning performances.' },
  { name: 'Alexis Texas', age: 38, country: 'United States', city: 'San Antonio', height: '168cm', weight: '59kg', bio: 'Alexis Texas is an American pornographic actress known for her large buttocks and Texas charm. She has won multiple industry awards.' },
  { name: 'Asa Akira', age: 38, country: 'United States', city: 'New York', height: '157cm', weight: '50kg', bio: 'Asa Akira is an American pornographic actress and writer. She has an extensive filmography and has been inducted into multiple Hall of Fames.' },
  { name: 'Megan Rain', age: 28, country: 'United States', city: 'Los Angeles', height: '157cm', weight: '48kg', bio: 'Megan Rain is an American pornographic actress. She has worked with major studios and built a strong following.' },
  { name: 'Adriana Chechik', age: 33, country: 'United States', city: 'Los Angeles', height: '160cm', weight: '52kg', bio: 'Adriana Chechik is an American pornographic actress known for her extreme performances and has won numerous industry awards.' },
  { name: 'Jessa Rhodes', age: 31, country: 'United States', city: 'Portland', height: '163cm', weight: '54kg', bio: 'Jessa Rhodes is an American pornographic actress known for her natural beauty and versatile performances in the adult film industry.' },
  { name: 'Karlee Grey', age: 30, country: 'United States', city: 'Miami', height: '165cm', weight: '55kg', bio: 'Karlee Grey is an American pornographic actress. She has worked with major studios and built a dedicated fan following.' },
  { name: 'Remy LaCroix', age: 36, country: 'United States', city: 'San Francisco', height: '157cm', weight: '50kg', bio: 'Remy LaCroix is an American pornographic actress and dancer. She has won numerous awards and is known for her passionate performances.' },
  { name: 'Tera Patrick', age: 48, country: 'United States', city: 'Los Angeles', height: '173cm', weight: '57kg', bio: 'Tera Patrick is an American former pornographic actress and model. She is one of the most well-known and awarded performers in the industry.' },
]

export const modelsData = modelsDropdownItems.map((item, i) => {
  const profile = modelProfiles[i] || modelProfiles[0]
  return {
    ...item,
    slug: item.name.toLowerCase().replace(/\s+/g, '-'),
    age: profile.age,
    country: profile.country,
    city: profile.city,
    height: profile.height,
    weight: profile.weight,
    bio: profile.bio,
    rating: 85 + (i * 4) % 16,
  }
})
