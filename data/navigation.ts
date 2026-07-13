import type { NavItem, NavLink } from "./types";
import { paypalDonationUrl } from "./donation";

export const navigation: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Qui sommes-nous ?",
    items: [
      { label: "À propos", href: "/a-propos" },
      { label: "Notre histoire", href: "/notre-histoire" },
      { label: "Vision & Mission", href: "/vision-mission" },
      { label: "Notre équipe", href: "/equipe" },
      { label: "Gouvernance", href: "/gouvernance" },
      { label: "Principes directeurs", href: "/principes-directeurs" }
    ]
  },
  {
    label: "Nos actions",
    items: [
      { label: "Axes d'intervention", href: "/axes-intervention" },
      { label: "Programmes", href: "/programmes" },
      { label: "Réalisations", href: "/realisations" },
      { label: "Impact", href: "/impact" },
      { label: "Zones d'intervention", href: "/zones-intervention" }
    ]
  },
  {
    label: "Publications",
    items: [
      { label: "Actualités", href: "/publications?categorie=Actualit%C3%A9s" },
      { label: "Rapports", href: "/publications?categorie=Rapports" },
      { label: "Notes de plaidoyer", href: "/publications?categorie=Notes%20de%20plaidoyer" },
      { label: "Documents institutionnels", href: "/documents-institutionnels" },
      { label: "Presse", href: "/presse" }
    ]
  },
  {
    label: "Agir avec nous",
    items: [
      { label: "Faire un don", href: paypalDonationUrl, external: true },
      { label: "Devenir membre", href: "/devenir-membre-benevole?mode=membre" },
      { label: "Devenir bénévole", href: "/devenir-membre-benevole?mode=benevole" },
      { label: "Devenir partenaire", href: "/partenaires" },
      { label: "Proposer une initiative", href: "/contact?type=Projet%20communautaire" },
      { label: "Opportunités", href: "/opportunites" }
    ]
  },
  { label: "Contact", href: "/contact" }
];

export const footerColumns: Array<{ title: string; links: NavLink[] }> = [
  {
    title: "Qui sommes-nous ?",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Notre histoire", href: "/notre-histoire" },
      { label: "Vision & Mission", href: "/vision-mission" },
      { label: "Notre équipe", href: "/equipe" },
      { label: "Gouvernance", href: "/gouvernance" }
    ]
  },
  {
    title: "Nos actions",
    links: [
      { label: "Axes d'intervention", href: "/axes-intervention" },
      { label: "Programmes", href: "/programmes" },
      { label: "Réalisations", href: "/realisations" },
      { label: "Impact", href: "/impact" },
      { label: "Zones d'intervention", href: "/zones-intervention" }
    ]
  },
  {
    title: "Publications",
    links: [
      { label: "Actualités", href: "/publications?categorie=Actualit%C3%A9s" },
      { label: "Rapports", href: "/publications?categorie=Rapports" },
      { label: "Notes de plaidoyer", href: "/publications?categorie=Notes%20de%20plaidoyer" },
      { label: "Documents institutionnels", href: "/documents-institutionnels" },
      { label: "Presse", href: "/presse" }
    ]
  },
  {
    title: "Agir avec nous",
    links: [
      { label: "Faire un don", href: paypalDonationUrl, external: true },
      { label: "Devenir membre / bénévole", href: "/devenir-membre-benevole" },
      { label: "Devenir partenaire", href: "/partenaires" },
      { label: "Opportunités", href: "/opportunites" },
      { label: "Contact", href: "/contact" }
    ]
  }
];
