
import { Users } from '../entities/users.entity';

export const authProviders = [
  {
    provide: 'AUTH_REPOSITORY',
    useValue: Users,
  },
];