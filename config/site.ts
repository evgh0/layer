export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "layer",
  description: "Visualisierung und Erzeugung von komplexen verschachtelten Mustern und geometrischen Strukturen.",
  navItems: [
    {
      label: "Startseite",
      href: "/",
    },
    {
      label: "Dokumentation",
      href: "/docs",
    },
    {
      label: "Preise",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Über uns",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profil",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projekte",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Kalender",
      href: "/calendar",
    },
    {
      label: "Einstellungen",
      href: "/settings",
    },
    {
      label: "Hilfe & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Abmelden",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
