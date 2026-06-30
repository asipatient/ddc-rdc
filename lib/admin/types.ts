export type UserRole = "super_admin" | "editor" | "contributor";

export type ContentStatus = "draft" | "published" | "archived";
export type MessageStatus = "nouveau" | "lu" | "traite" | "archive";
export type SubscriberStatus = "active" | "inactive";
export type ImpactVerificationStatus = "verified" | "provisional" | "incomplete" | "to_verify" | "consolidating";

export type BaseContent = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category?: string;
  image?: string;
  date?: string;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};

export type ContentClassification = {
  impact?: string;
  relatedAxis?: string;
  relatedProgram?: string;
  author?: string;
  partners?: string;
  location?: string;
  gallery?: string[];
  needsReview?: boolean;
  featured?: boolean;
};

export type NewsPost = BaseContent & ContentClassification;

export type AdminArticle = BaseContent & ContentClassification & {
  period?: string;
  objectives?: string;
  targetAudience?: string;
  linkedDocuments?: string[];
  testimonials?: string[];
};

export type AdminRealisation = BaseContent & ContentClassification & {
  axisId?: string;
  programId?: string;
  images?: string[];
};

export type AdminProgram = BaseContent & {
  objectives?: string;
  axisId?: string;
  beneficiaries?: string;
  targetAudience?: string;
  activities?: string;
  ctaLabel?: string;
  ctaHref?: string;
  order?: number;
};

export type AdminAxis = BaseContent & {
  programIds?: string[];
  icon?: string;
  order?: number;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo?: string;
  shortBiography?: string;
  biography: string;
  fullBiography?: string;
  institutionalRole?: string;
  email?: string;
  phone?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  socialUrl?: string;
  displayOrder?: number;
  showOnHome?: boolean;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
};

export type AdminDocument = BaseContent & {
  fileUrl?: string;
  documentType?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  audience: string;
  photo?: string;
  quote: string;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
};

export type Partner = {
  id: string;
  name: string;
  partnershipType: string;
  logo?: string;
  website?: string;
  description: string;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
};

export type IncomingMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  requestType: string;
  subject: string;
  message: string;
  sourceForm: string;
  status: MessageStatus;
  createdAt: string;
  readAt?: string;
  archivedAt?: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  name?: string;
  status: SubscriberStatus;
  source: string;
  createdAt: string;
  confirmedAt?: string;
};

export type ImpactMetric = {
  id: string;
  label: string;
  value: string;
  note?: string;
  description?: string;
  verificationStatus?: ImpactVerificationStatus;
  internalNotes?: string;
  source?: string;
  internalComment?: string;
  icon?: string;
  order?: number;
  isVisible?: boolean;
  status?: ContentStatus;
  updatedAt: string;
};

export type SiteSettings = {
  siteName?: string;
  email: string;
  phone: string;
  address: string;
  paypalUrl: string;
  slogan: string;
  shortDescription: string;
  logo?: string;
  favicon?: string;
  footerText?: string;
  impactTitle?: string;
  impactSubtitle?: string;
  impactText?: string;
  impactButtonLabel?: string;
  impactButtonHref?: string;
  socialLinks: Array<{ label: string; href: string }>;
  updatedAt: string;
};

export type AdminStore = {
  articles: AdminArticle[];
  newsPosts: NewsPost[];
  realisations: AdminRealisation[];
  programs: AdminProgram[];
  axes: AdminAxis[];
  teamMembers: TeamMember[];
  documents: AdminDocument[];
  testimonials: Testimonial[];
  partners: Partner[];
  impactMetrics: ImpactMetric[];
  messages: IncomingMessage[];
  newsletterSubscribers: NewsletterSubscriber[];
  siteSettings: SiteSettings;
};

export type CollectionKey = Exclude<keyof AdminStore, "siteSettings">;

export type AdminSession = {
  email: string;
  role: UserRole;
  issuedAt: number;
};
