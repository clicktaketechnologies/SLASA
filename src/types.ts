export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  syllabus: string[];
  duration: string;
  fees: string;
  timings: string;
  icon: string;
  seoContent?: string;
  programFocus?: string;
  pricingStart?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface Stat {
  label: string;
  value: string;
  suffix: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}
