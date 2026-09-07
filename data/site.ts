import { officialContact } from "./contact";
import { paypalDonationUrl } from "./donation";

export type SocialPlatform = "facebook" | "x" | "youtube" | "linkedin" | "instagram" | "tiktok";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  url: string;
  active: boolean;
};

export const site = {
  name: "Dynamique Debout Congolais",
  shortName: "DDC RDC",
  legalName: "DDC RDC",
  locale: "fr",
  futureLocales: ["en"],
  slogan: "Une jeunesse debout pour une nation congolaise forte !",
  description:
    "La DDC RDC mobilise en priorité la jeunesse congolaise pour construire des communautés responsables, résilientes, créatives, inclusives et engagées dans la transformation démocratique, sociale, économique, culturelle et environnementale de la République Démocratique du Congo.",
  url: "https://ddcrdc.org",
  logo: "/images/logos/logo-ddc.png",
  logoMark: "/images/logos/logo-ddc-mark.png",
  logoHorizontal: "/images/logos/logo-ddc-horizontal.png",
  favicon: "/favicon.png",
  footerText: "Tous droits réservés.",
  donationUrl: paypalDonationUrl,
  donationPageUrl: "/faire-un-don",
  contact: {
    address: officialContact.address,
    phone: officialContact.phone,
    email: officialContact.email,
    social: [
      { platform: "facebook" as SocialPlatform, label: "Facebook DDC RDC", url: "https://www.facebook.com/ddcrdc", active: true },
      { platform: "x" as SocialPlatform, label: "X (Twitter) DDC RDC", url: "https://x.com/ddcrdc", active: true },
      { platform: "youtube" as SocialPlatform, label: "YouTube DDC RDC", url: "https://www.youtube.com/@ddcrdc", active: false },
      { platform: "linkedin" as SocialPlatform, label: "LinkedIn DDC RDC", url: "https://www.linkedin.com/company/ddcrdc", active: false },
      { platform: "instagram" as SocialPlatform, label: "Instagram DDC RDC", url: "https://www.instagram.com/ddcrdc", active: false },
      { platform: "tiktok" as SocialPlatform, label: "TikTok DDC RDC", url: "https://www.tiktok.com/@ddcrdc", active: false }
    ] satisfies SocialLink[]
  }
};

export const home = {
  heroTitle: "Une jeunesse debout pour une nation forte !",
  heroSubtitle:
    "La DDC RDC accompagne la jeunesse congolaise dans sa formation citoyenne, sa participation à la vie publique et le développement de ses initiatives.",
  reason:
    "La Dynamique Debout Congolais (DDC RDC) est une plateforme d'action citoyenne qui mobilise en priorité la jeunesse, mais aussi les femmes et les communautés, pour relever les défis démocratiques, sociaux, économiques et environnementaux du pays.",
  reasonFollowUp:
    "La jeunesse congolaise est notre priorité institutionnelle. Nous agissons au plus près des réalités locales pour permettre aux jeunes, ainsi qu'aux femmes, aux enfants et aux communautés, de réfléchir, se former, proposer des initiatives et participer activement à la construction de solutions durables.",
  vision:
    "Une nation congolaise forte où la jeunesse est compétente et engagée ; où les communautés ne subissent plus, mais construisent leurs propres solutions. Ce Congo-là existe. Il commence ici, avec nous.",
  mission:
    "La DDC RDC forme une jeunesse qui pense, agit et innove, tout en accompagnant les initiatives des communautés qui refusent la résignation.",
  generalObjective:
    "L'objectif général de la DDC RDC est de faire émerger une jeunesse congolaise responsable, compétente et engagée, capable de contribuer activement au développement économique, social, institutionnel, environnemental et culturel, et de consolider une nation congolaise forte.",
  partnership:
    "La DDC RDC collabore avec les autorités publiques, les institutions éducatives, les organisations de la société civile, les mouvements communautaires, les partenaires techniques et financiers, les institutions de recherche, les médias, les acteurs culturels, les entreprises sociales et toute structure poursuivant des objectifs compatibles avec les siens.",
  donate:
    "Votre soutien permet à la DDC RDC de former la jeunesse, accompagner les femmes, protéger les enfants, soutenir les initiatives communautaires, documenter les changements, promouvoir la culture démocratique et renforcer la résilience locale."
};
