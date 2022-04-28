export interface User {
  id: number;
  email: string;
  roles: string[];
  token?: string;
  profileId?: number;
}
