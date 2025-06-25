export interface Accommodation {
  id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  images?: string[];
  capacity?: number;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type AccommodationInput = Omit<Accommodation, 'id' | 'images'> & {
  imageFiles?: File[];           
};

export interface AccommodationResponse {
  accommodations: Accommodation[];
  total?: number;
  page: number;
  limit: number;
  totalPages?: number;
  hasMore?: boolean;
}