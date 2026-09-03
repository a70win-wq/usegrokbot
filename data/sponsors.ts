export type Sponsor = {
  slug: string;
  name: string;
  href: string;
  logo: string;
};

export const sponsors: readonly Sponsor[] = [
  {
    slug: "awesome-grok-bot",
    name: "Awesome Grok Bot",
    href: "https://github.com/RongleCat/awesome-grok-bot",
    logo: "/sponsors/awesome-grok-bot.png",
  },
];
