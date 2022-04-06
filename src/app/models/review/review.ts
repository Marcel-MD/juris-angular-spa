export interface Review {
  id: number;
  profileId: number;
  firstName: string;
  lastName: string;
  description: string;
  rating: number;
  creationDate: Date;
}
