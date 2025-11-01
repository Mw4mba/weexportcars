// Testimonials loaded from reviews.json
import rawReviews from './reviews.json';

export interface Testimonial {
  id: number;
  name: string;
  date: string;
  rating: number;
  text: string;
  reviews?: number;
  photos?: number;
  owner_response?: string | null;
  location?: string;
}

// Map the JSON shape into the Testimonial type and add sequential ids
export const TESTIMONIALS: Testimonial[] = (rawReviews as any[]).map((r, idx) => ({
  id: idx + 1,
  name: r.reviewer || `Reviewer ${idx + 1}`,
  date: r.date || '',
  rating: r.rating || 5,
  text: r.review || '',
  reviews: r.reviews,
  photos: r.photos,
  owner_response: typeof r.owner_response === 'undefined' ? null : r.owner_response,
  location: r.location || undefined,
}));
