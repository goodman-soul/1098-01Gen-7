export type PetType = 'cat' | 'dog';

export type PetSize = 'small' | 'medium' | 'large';

export type DietHabit = 'regular' | 'frequent' | 'diet';

export type LivingSpace = 'apartment' | 'house' | 'studio';

export type ProductCategory = 'feeder' | 'water' | 'camera';

export type ConnectivityType = 'wifi' | 'bluetooth' | 'zigbee';

export type Severity = 'low' | 'medium' | 'high';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  images: string[];
  tags: string[];
  description: string;
  petType: PetType[];
  petSize: PetSize[];
  dietHabit: DietHabit[];
  livingSpace: LivingSpace[];
  connectivity: {
    type: ConnectivityType;
    description: string;
    setupSteps: string[];
  };
  consumables: {
    name: string;
    model: string;
    replaceCycle: string;
    price: number;
  }[];
  privacy: {
    encryption: string;
    localStorage: boolean;
    cloudStorage: boolean;
    permissions: string[];
  };
  specs: Record<string, string>;
}

export interface FaultItem {
  id: string;
  category: ProductCategory;
  title: string;
  severity: Severity;
  steps: {
    step: number;
    description: string;
  }[];
  relatedProducts?: string[];
}

export interface FilterOptions {
  petType?: PetType;
  petSize?: PetSize;
  dietHabit?: DietHabit;
  livingSpace?: LivingSpace;
  category?: ProductCategory;
}
