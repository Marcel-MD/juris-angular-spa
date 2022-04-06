import { City } from '../city/city';
import { ProfileCategory } from '../profile-category/profile-category';

export interface ListProfile {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  description: string;
  imageName: string;
  status: string;
  price: number;
  rating?: number;
  address: string;
  profileCategory: ProfileCategory;
  city: City;
}
