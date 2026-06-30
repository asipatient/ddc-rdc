import "server-only";

import { readAdminStore } from "@/lib/admin/content-store";

export type PublicPartner = {
  name: string;
  logo?: string;
  partnershipType?: string;
  description?: string;
  website?: string;
};

export async function getPublicPartners() {
  const store = await readAdminStore();
  return store.partners
    .filter((partner) => partner.status === "published")
    .map((partner): PublicPartner => ({
      name: partner.name,
      logo: partner.logo,
      partnershipType: partner.partnershipType,
      description: partner.description,
      website: partner.website
    }));
}
