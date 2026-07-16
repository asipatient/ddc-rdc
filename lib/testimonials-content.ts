import "server-only";

import { readAdminStore } from "@/lib/admin/content-store";

export type PublicTestimonial = {
  name: string;
  role: string;
  quote: string;
  photo?: string;
};

export async function getPublicTestimonials(): Promise<PublicTestimonial[]> {
  const store = await readAdminStore();

  return store.testimonials
    .filter((testimonial) => testimonial.status === "published")
    .map((testimonial) => ({
      name: testimonial.name,
      role: testimonial.role,
      quote: testimonial.quote,
      photo: testimonial.photo
    }));
}
