import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from "bcrypt"
import { Users, Roles } from '../entities/users.entity';

@Injectable()
export class AuthRepository {
    @Inject('AUTH_REPOSITORY') private readonly AUTH_REPOSITORY: typeof Users

    async findOneUsername(username: string){
      const user = await this.AUTH_REPOSITORY.findOne<Users>({ where: { username: username } })
      return user
    }
    async comparePassword(password: string, userPassword: string) {
      const matchPasswords = await bcrypt.compare(password, userPassword);
      return matchPasswords;
    }

    async findAllRole(username){
       let permissions: any;
        const users = await this.AUTH_REPOSITORY.findOne<Users>({
               where: { username: username },
               include: [{
                model: Roles,
             }]
            }) 
            // .then((rolen: any) => rolen.forEach(el => {
            //   console.log('el', el.roleId);
              
              // el.dataRoleId.forEach(element => {
              //   console.log(element);
                
              //   permissions.push(element.dataValues);
              // });
          // }))
            // })
            
            // permissions = users.roleId[0].dataValues.roleName  ;   
            .then((roleId: any) => roleId.forEach(el => {
              console.log('el', el.dataRoleId);
            }))
            // console.log('users.roleId' , users.roleId;
            
        return permissions
    }
}    