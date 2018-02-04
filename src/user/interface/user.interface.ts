import { UserRole, UserStatus} from '../enum'

export interface IUser {
  readonly _id: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: UserRole;
  readonly status: UserStatus;
}