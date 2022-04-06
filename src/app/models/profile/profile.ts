import { City } from '../city/city';
import { Education } from '../education/education';
import { Experience } from '../experience/experience';
import { ProfileCategory } from '../profile-category/profile-category';
import { Review } from '../review/review';

export interface Profile {
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
  educations: Education[];
  experiences: Experience[];
  reviews: Review[];
}
