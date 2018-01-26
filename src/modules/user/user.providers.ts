
import { User } from './user.model';

export const UserProviders = [
  {
    provide: 'UserRepository',
    useValue: User,
  },
];