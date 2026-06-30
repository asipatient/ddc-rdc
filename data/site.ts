import { officialContact } from "./contact";
import { paypalDonationUrl } from "./donation";

export const site = {
  name: "Dynamique Debout Congolais",
  shortName: "DDC RDC",
  legalName: "DDC RDC",
  locale: "fr",
  futureLocales: ["en"],
  slogan: "Jeunesse, femmes et communautés debout pour un Congo juste, inclusif et durable.",
  description:
    "La DDC RDC mobilise la jeunesse et les femmes congolaises pour construire des communautés responsables, résilientes, créatives, inclusives et engagées dans la transformation démocratique, sociale, économique, culturelle et environnementale de la République Démocratique du Congo.",
  url: "https://ddcrdc.org",
  logo: "/images/logos/logo-ddc.png",
  logoMark: "/images/logos/logo-ddc-mark.png",
  favicon: "/favicon.png",
  donationUrl: paypalDonationUrl,
  donationPageUrl: "/faire-un-don",
  contact: {
    address: officialContact.address,
    phone: officialContact.phone,
    email: officialContact.email,
    social: [
      { label: "Facebook", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "X", href: "#" },
      { label: "YouTube", href: "#" }
    ]
  }
};

export const home = {
  heroTitle: "Mobiliser la jeunesse et les femmes pour transformer les communautés congolaises.",
  heroSubtitle:
    "La DDC RDC mobilise la jeunesse et les femmes congolaises pour construire des communautés responsables, résilientes, créatives, inclusives et engagées dans la transformation démocratique, sociale, économique, culturelle et environnementale de la République Démocratique du Congo.",
  reason:
    "La Dynamique Debout Congolais, DDC RDC, est une plateforme institutionnelle congolaise d'éveil citoyen, de leadership, d'autonomisation économique, de recherche, de culture, d'environnement, de paix et de développement communautaire.",
  reasonFollowUp:
    "Elle agit au plus près des réalités locales afin de permettre aux jeunes, aux femmes, aux enfants et aux communautés de réfléchir, se former, proposer des initiatives et participer activement à la construction de solutions durables.",
  vision:
    "La DDC RDC porte la vision d'une République Démocratique du Congo dans laquelle la jeunesse et les femmes sont responsables, compétentes, conscientes de leurs droits et devoirs, pleinement engagées dans la consolidation de la démocratie, la promotion de la justice sociale, le développement économique, la préservation de la culture, la protection de l'environnement et la transformation durable des communautés.",
  mission:
    "La mission de la DDC RDC est d'éveiller, former, encadrer, accompagner, connecter et mobiliser la jeunesse et les femmes congolaises autour des valeurs de citoyenneté responsable, de civisme, d'éthique, de discipline, de solidarité, de culture démocratique, de créativité, d'esprit d'initiative et d'engagement communautaire.",
  generalObjective:
    "L'objectif général de la DDC RDC est de faire émerger une jeunesse et une femme congolaise responsables, compétentes, engagées et conscientes de leur rôle dans la consolidation de la démocratie, capables de contribuer activement au développement économique, social, institutionnel, environnemental et culturel de la République Démocratique du Congo.",
  partnership:
    "La DDC RDC collabore avec les autorités publiques, les institutions éducatives, les organisations de la société civile, les mouvements communautaires, les partenaires techniques et financiers, les institutions de recherche, les médias, les acteurs culturels, les entreprises sociales et toute structure poursuivant des objectifs compatibles avec les siens.",
  donate:
    "Votre soutien permet à la DDC RDC de former des jeunes, accompagner des femmes, protéger les enfants, soutenir les initiatives communautaires, documenter les changements, promouvoir la culture démocratique et renforcer la résilience locale."
};
