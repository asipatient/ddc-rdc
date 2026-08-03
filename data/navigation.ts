import type { NavItem, NavLink } from "./types";
import { paypalDonationUrl } from "./donation";

export const navigation: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Qui sommes-nous",
    items: [
      { label: "À propos", href: "/a-propos" },
      { label: "Notre histoire", href: "/notre-histoire" },
      { label: "Vision & Mission", href: "/vision-mission" },
      { label: "Équipe", href: "/equipe" }
    ]
  },
  {
    label: "Nos actions",
    items: [
      { label: "Programmes", href: "/programmes" },
      { label: "Réalisations", href: "/realisations" },
      { label: "Impact", href: "/impact" }
    ]
  },
  { label: "Actualités", href: "/publications" },
  {
    label: "S'engager",
    items: [
      { label: "Devenir membre ou bénévole", href: "/devenir-membre-benevole" },
      { label: "Devenir partenaire", href: "/partenaires" },
      { label: "Opportunités", href: "/opportunites" }
    ]
  },
  { label: "Contact", href: "/contact" }
];

export const footerColumns: Array<{ title: string; links: NavLink[] }> = [
  {
    title: "Organisation",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Notre histoire", href: "/notre-histoire" },
      { label: "Équipe", href: "/equipe" },
      { label: "Contact", href: "/contact" }
    ]
  },
  {
    title: "Nos actions",
    links: [
      { label: "Programmes", href: "/programmes" },
      { label: "Réalisations", href: "/realisations" },
      { label: "Impact", href: "/impact" },
      { label: "Actualités", href: "/publications" }
    ]
  },
  {
    title: "S'engager",
    links: [
      { label: "Faire un don", href: paypalDonationUrl, external: true },
      { label: "Devenir membre / bénévole", href: "/devenir-membre-benevole" },
      { label: "Devenir partenaire", href: "/partenaires" }
    ]
  }
];
