export type UserRole = 'CUSTOMER' | 'ADMIN' | 'SUPPORT';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface UserSummary {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}
