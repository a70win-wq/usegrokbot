export type Sponsor = {
  slug: string;
  name: string;
  href: string;
  logo: string;
};

export const sponsors: readonly Sponsor[] = [
  {
    slug: "grok-app",
    name: "Grok App",
    href: "https://grok-app.com/?utm_source=usegrokbot.com&utm_medium=sponsor&utm_campaign=strip",
    logo: "/sponsors/grok-app.svg",
  },
];
