export type IconKey =
  | "book"
  | "users"
  | "briefcase"
  | "shield"
  | "leaf"
  | "radar"
  | "heart"
  | "sparkles"
  | "search"
  | "palette"
  | "handshake"
  | "scale"
  | "target"
  | "globe"
  | "landmark"
  | "graduation"
  | "megaphone"
  | "network"
  | "child"
  | "layers"
  | "mail"
  | "calendar"
  | "donate"
  | "file"
  | "newspaper"
  | "map"
  | "clipboard"
  | "chart"
  | "hands";

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavItem =
  | NavLink
  | {
      label: string;
      items: NavLink[];
    };

export type Publication = {
  slug: string;
  title: string;
  date: string;
  period?: string;
  category: string;
  excerpt: string;
  body: string[];
  accent: "blue" | "gold" | "green" | "red";
  image?: string;
  status?: "draft" | "published";
  needsReview?: boolean;
  objectives?: string[];
  targetAudience?: string[];
  impact?: string[];
  location?: string;
  partners?: string[];
  relatedAxis?: string;
  relatedProgram?: string;
  gallery?: string[];
};

export type ActivityArticle = {
  id: string;
  title: string;
  slug: string;
  date: string;
  period: string;
  category: string;
  excerpt: string;
  content: string[];
  objectives: string[];
  targetAudience: string[];
  impact: string[];
  location: string;
  partners: string[];
  relatedAxis: string;
  relatedProgram: string;
  image: string;
  gallery: string[];
  status: "draft" | "published";
  needsReview: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Program = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: IconKey;
  axisSlug: string;
  excerpt?: string;
  objectives?: string[];
  targetAudience?: string[];
  activities?: string[];
  image?: string;
  order?: number;
};

export type Axis = {
  slug: string;
  title: string;
  description: string;
  icon: IconKey;
  image: string;
  programSlugs: string[];
  order?: number;
};

export type Realisation = {
  slug: string;
  dateLabel: string;
  dateIso: string;
  title: string;
  category: string;
  description: string;
  image: string;
  impact?: string[];
  relatedAxis?: string;
  relatedProgram?: string;
};

export type ImpactIndicator = {
  label: string;
  value: string;
  note?: string;
  description?: string;
  verificationStatus?: "verified" | "provisional" | "incomplete" | "to_verify" | "consolidating";
  icon: IconKey;
  order?: number;
};

export type SupportArgument = {
  title: string;
  description: string;
  icon: IconKey;
};

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  bio: string;
  roleDescription?: string;
  profileHref?: string;
  contactLabel?: string;
  contactHref?: string;
};

export type DocumentItem = {
  title: string;
  category: string;
  status: string;
  description: string;
  href?: string;
};

export type PartnerCategory = {
  title: string;
  description: string;
  icon: IconKey;
};

export type GovernanceItem = {
  title: string;
  description: string;
  status: string;
};

export type Opportunity = {
  title: string;
  audience: string;
  status: string;
  description: string;
};
