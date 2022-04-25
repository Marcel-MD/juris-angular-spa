import { ProfileSortEnum } from '../enums/profile-sort.enum';
import { ProfileStatusEnum } from '../enums/profile-status.enum';

export interface ProfileQueryParams {
  pageSize?: number;
  pageNumber?: number;
  categoryId?: number;
  cityId?: number;
  status?: ProfileStatusEnum;
  sortBy?: ProfileSortEnum;
}
