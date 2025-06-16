export interface Car {
  vin: string;
  mark_id: string;
  folder_id: string;
  modification_id: string;
  color: string;
  price: number;
  year: number;
  images?: CarImages;
  model_name: string;
  generation_name: string;
  booking_allowed: boolean;
  registry_year?: number;
  run: number;
  engine_volume: number;
  engine_power: string;
  body_type: string;
  isFavorite?: boolean;
  inCompare?: boolean;
}

type CarImages = {
  image: string[];
};
