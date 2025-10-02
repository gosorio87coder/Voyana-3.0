export enum PackageCategory {
  National = 'national',
  International = 'international',
}

export interface TravelPackage {
  id: number;
  imageUrl: string;
  duration: string;
  title: string;
  priceFrom: number;
  tag?: string;
  locations?: string[];
}