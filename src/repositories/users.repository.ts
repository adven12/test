
import { Injectable, Inject } from '@nestjs/common';
import { Users_roles, Users } from '../entities';

@Injectable()
export class UsersRepository {
    @Inject('USERS_REPOSITORY') public USERS_REPOSITORY: typeof Users
    
    async findAll(){
        return this.USERS_REPOSITORY.findAll<Users>();
    }
    async findOne(parametrs: any){
        return this.USERS_REPOSITORY.findOne<Users>(parametrs);
    }
    async update(body: Users, id: any){
        return this.USERS_REPOSITORY.update<Users>(body, { where: { id: id } });
    }
    async destroyUsers(parametrs: any){
        return this.USERS_REPOSITORY.destroy(parametrs)
    }
    async create(newUser: Users){
        return this.USERS_REPOSITORY.create<Users>(newUser);
    }
}

@Injectable()
export class UserRolesRepository {
    @Inject('USER_ROLES_REPO') public USER_ROLES_REPO: typeof Users_roles
    
    async destroyUserRoles(parametrs: any){
        return this.USER_ROLES_REPO.destroy(parametrs)
    }
    async create(newRole: any){
        return this.USER_ROLES_REPO.create<Users_roles>(newRole);
    }
}
