import "server-only";

import { teamMembers as staticTeamMembers } from "@/data/team";
import type { TeamMember as PublicTeamMember } from "@/data/types";
import { readAdminStore } from "@/lib/admin/content-store";

export async function getPublicTeamMembers() {
  const store = await readAdminStore();
  const adminMembers: PublicTeamMember[] = store.teamMembers
    .filter((member) => member.status === "published")
    .sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999))
    .map((member) => ({
      name: member.name,
      role: member.role,
      photo: member.photo || "",
      bio: member.shortBiography || member.biography || "Biographie à compléter.",
      roleDescription: member.institutionalRole,
      contactLabel: member.email ? "Contacter" : member.linkedinUrl || member.facebookUrl ? "Voir le profil" : undefined,
      contactHref: member.email ? `mailto:${member.email}` : member.linkedinUrl || member.facebookUrl || undefined
    }));

  return adminMembers.length ? adminMembers : staticTeamMembers;
}
