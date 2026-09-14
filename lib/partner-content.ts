import "server-only";

import { readAdminStore } from "@/lib/admin/content-store";

export type PublicPartner = {
  name: string;
  logo?: string;
  partnershipType?: string;
  description?: string;
  website?: string;
};

const LOGO_MAP: Record<string, string> = {
  "ACNDC": "/images/partners/acndc.webp",
  "SADI RDC": "/images/partners/sadi.webp",
  "SFDC ASBL": "/images/partners/sfdc.webp",
  "UEA/CRESS": "/images/partners/cress-uea.webp"
};

const TYPE_MAP: Record<string, string> = {
  "Partenaire institutionnel": "Institutionnel",
  "Partenariat institutionnel": "Institutionnel",
  "Partenariat technique": "Technique",
  "Partenariat académique": "Académique"
};

const TYPE_OVERRIDE: Record<string, string> = {
  "Mairie de Bukavu": "Autorité locale",
  "Commune d'Ibanda": "Autorité locale"
};

export async function getPublicPartners() {
  const store = await readAdminStore();
  return store.partners
    .filter((partner) => partner.status === "published")
    .map((partner): PublicPartner => {
      let mappedType = TYPE_OVERRIDE[partner.name] || TYPE_MAP[partner.partnershipType || ""] || partner.partnershipType || "";

      let mappedDesc = partner.description;
      if (mappedDesc) {
        const lower = mappedDesc.toLowerCase();
        if (
          lower === "partenaire institutionnel de la ddc rdc." ||
          lower === "partenariat institutionnel de la ddc rdc." ||
          lower === "entreprise partenaire technique de la ddc rdc." ||
          lower.includes("institution publique locale, partenaire institutionnel") ||
          lower.includes("autorité locale, partenaire institutionnel") ||
          lower.includes("organisation non gouvernementale africaine, partenaire institutionnel") ||
          lower.includes("organisation de la société civile congolaise, partenaire institutionnel") ||
          lower.includes("partenaire technique de la ddc rdc")
        ) {
          mappedDesc = "";
        }
      }

      return {
        name: partner.name,
        logo: LOGO_MAP[partner.name] || partner.logo || "",
        partnershipType: mappedType,
        description: mappedDesc,
        website: partner.website
      };
    });
}
