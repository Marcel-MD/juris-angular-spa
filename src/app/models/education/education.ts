export interface Education {
  id: number;
  profileId: number;
  institution: string;
  speciality: string;
  startDate: Date;
  endDate?: Date;
}
