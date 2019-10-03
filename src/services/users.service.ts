import { Injectable, Inject, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Users, Users_roles, Roles } from '../entities/users.entity';
import * as bcrypt from "bcrypt"
import  { UsersRepository, UserRolesRepository } from '../repositories';
import { UserResponseModel } from '../models';

// interface User {
//   username: string,
//   password: string,
//   firstName: string,
//   avatar: string,
// }

@Injectable()
export class UsersService {
  constructor(
    public UsersRepository: UsersRepository,
    public UserRolesRepository: UserRolesRepository
  ) { }

  async findAll(): Promise<UserResponseModel> {
    const users: any = await this.UsersRepository.findAll();   
    return { 
       success: true,
       data: users 
    }       
  }

  async findOne(req): Promise<UserResponseModel> {
      const user = await this.UsersRepository.findOne({ attributes: ['id', 'firstName', 'email'], where: { id: req.params.id } });
      if (user) {
        return {
          success: true,
          data: user
        }
  }
}

  async getAvatar(req): Promise<UserResponseModel> {
      const users = await this.UsersRepository.findOne({ attributes: ['avatar'], where: { id: req.params.id } });
      console.log('users: ', users);
  
      // const avatar = users.dataValues.avatar
      if (users) {
        return {
          success: true,
          // data: avatar
        }
      }
  }

  async delete(req): Promise<UserResponseModel> {
      const check = await this.UsersRepository.findOne({ where: { _id: req.params.id } });
      if (check) {
        await this.UsersRepository.destroyUsers({ where: { _id: req.params.id } });
        return { 
          success: true,
          message: 'Delete is done'
        }
      }
  }

  async update(req): Promise<UserResponseModel> {
        const check = await this.UsersRepository.findOne({ where: { _id: req.params.id } });
        if (check) {
          await this.UsersRepository.update(req.body, { where: { _id: req.params.id } });
          return {
            success: true,
            message: 'Update is done'
          }
        }
  }

  async registerNewUser(req): Promise<UserResponseModel> {
    const avatar = 'data:image/png;base64,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'
    console.log('2');
    const registerObj = req.body;
    const errorObj = {
        errorFirstname: '',
        erroremail: '',
        errorPassword: ''
    }
    let stateValid = 0;  
    
    const inpRegExpr = new RegExp(/^[a-zA-Z]{3,}$/);
    const passWordExpr = new RegExp(/^[0-9]{3,}$/);
    const emailRegExpr = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
    
    if(!inpRegExpr.test(registerObj.firstname)){
        errorObj.errorFirstname = 'Error: допустимы буквы латинского алфавита менее 3-х';
        console.log('01');
    }else{++stateValid}
    //
    console.log('registerObj: ', registerObj.email);
    if(!emailRegExpr.test(registerObj.email)){   
        errorObj.erroremail = 'Error: uncorrectemail value!';
        console.log('02');
    }else{++stateValid}
    if(!passWordExpr.test(registerObj.password)){
        errorObj.errorPassword = 'Error: допустимы цифры не менее 3-х';
        console.log('03');
    }else{++stateValid}
    console.log('3', stateValid);
    if(stateValid === 3){
    const newUser: any = {
      _id: null,
      firstName: req.body.name,
      password: await bcrypt.hash(req.body.password, 10),
      username: req.body.email, 
      avatar: avatar
    };
    const matchUser: any = await this.UsersRepository.findOne({ where: { username: newUser.username } })
      if (!matchUser) {        
        await this.UsersRepository.create(newUser);
        const user: any = await this.UsersRepository.findOne({ attributes: ['_id'], where: { username: newUser.username } });       
        const newId = user.dataValues._id
        const newRole = {
          users_id: newId,
          roles_id: 2
        }
        await this.UserRolesRepository.create(newRole);
        return {
          success: true,
          message: "User Successfully created"
        }
  }}}}