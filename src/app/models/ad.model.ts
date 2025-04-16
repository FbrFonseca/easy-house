export interface Ad {
  id?: string;
  title: string;
  adType: string;
  eircode: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  images: string[]; 
  views: number;
  bookmarks: number;
  createdAt: any;
  ownerId: string;
  bookmarked?: boolean;
  latitude?: number;
  longitude?: number;
}