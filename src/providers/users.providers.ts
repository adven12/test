import { Users, Roles , Users_roles} from '../entities/users.entity';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: Users,
  },
];

export const rolesProviders = [
  {
    provide: 'ROLES_REPOSITORY',
    useValue: Roles,
  },
];

export const usersrolesProviders = [
  {
    provide: 'USER_ROLES_REPO',
    useValue: Users_roles,
  },
];