type Blogs = Record<string, { rss: string; blogHome: string; creator: string }>;

export const BLOG_DATA: Blogs = {
  "Kevin Blair": {
    rss: "http://localhost:3001/rss",
    blogHome: "http://localhost:3001",
    creator: "Kevin Blair",
  },
  OlegWock: {
    rss: "https://sinja.io/rss",
    blogHome: "https://sinja.io/",
    creator: "Oleh Wock",
  },
  "Josh W. Comeau": {
    rss: "https://www.joshwcomeau.com/rss.xml",
    blogHome: "https://www.joshwcomeau.com",
    creator: "Josh W. Comeau",
  },
  LocalGhost: {
    rss: "https://localghost.dev/articles.xml",
    blogHome: "https://localghost.dev",
    creator: "Sophie Koonin",
  },
  HeydonWorks: {
    rss: "https://heydonworks.com/feed.xml",
    blogHome: "https://heydonworks.com/",
    creator: "Heydon Pickering",
  },
  "News From Chris": {
    rss: "https://cri.dev/rss.xml",
    blogHome: "https://cri.dev/",
    creator: "Christian Fei",
  },
  "Stefan Judis": {
    rss: "https://www.stefanjudis.com/rss.xml",
    blogHome: "https://www.stefanjudis.com/",
    creator: "Stefan Judis"
  },
  "Sia Codes": {
    rss: "https://sia.codes/feed/feed.xml",
    blogHome: "https://sia.codes/posts/",
    creator: "Sia Karamalegos"
  },
  "Gleb Bahmutov": {
    rss: "https://glebbahmutov.com/blog/atom.xml",
    blogHome: "https://glebbahmutov.com/blog/",
    creator: "Gleb Bahmutov"
  },
};
