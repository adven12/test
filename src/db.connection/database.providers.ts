import { Sequelize } from 'sequelize-typescript';
import { Book } from '../entities/books.entity';
import { Users, Users_roles, Roles } from '../entities/users.entity';
import env from '../environment/config'

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host:'127.0.0.1',
        port: 3306,
        username: 'artem',
        password: '1111',
        database: 'new',
        define: {
          timestamps: false
        }
      });
      sequelize.addModels([Book, Users, Users_roles, Roles]);
      await sequelize.sync();
      return sequelize;
    },
  }
]; 