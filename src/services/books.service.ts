import { Injectable, Inject, HttpException, BadRequestException, NotFoundException } from '@nestjs/common';
import { Book } from '../entities/books.entity';

@Injectable()
export class BooksService {
    [x: string]: any;
  constructor(
    @Inject('BOOKS_REPOSITORY') private readonly BOOKS_REPOSITORY: typeof Book) { }

  async findAll(): Promise<Book[]> {
    console.log('done');
    const books: any =  await this.BOOKS_REPOSITORY.findAll<Book>();
    console.log('books: ', books);
    
    return books
  }

  async findOne(req): Promise<Book> {
    let book: any = await this.BOOKS_REPOSITORY.findOne<Book>({ where: { _id: req.params.id } });
    console.log(book);
    return book
  }


  async updateBook(req): Promise<any> {

    if (req.params.id) {
      console.log(req.body);
      const book = req.body;
      await this.BOOKS_REPOSITORY.update<Book>(book, { where: { _id: req.params.id } })

      return new HttpException('Change is done', 200);

    } else return new BadRequestException()

  }

  async deleteBook(req): Promise<any> {
    console.log('del');
    if (req.params.id) {
      await this.BOOKS_REPOSITORY.destroy({ where: { _id: req.params.id } })

      return new HttpException('Del is done', 200);

    } else new BadRequestException()

  }

  async findBooksByTitle(req): Promise<Book[]> {
    const Sequelize = require('sequelize');
    const title = req.params.title
    console.log(title);
    const Op = Sequelize.Op;
    const books = await this.BOOKS_REPOSITORY.findAll<Book>({
      where:
      {
        title: {
          [Op.substring]: `${title}`
        }
      }
    });
    return books
  }

  async postBook(req): Promise<any> {
    console.log('22');
    console.log(req.body);
    
    if (req.body.name) {
      const book = req.body;
      await this.BOOKS_REPOSITORY.create<Book>(book)

      return new HttpException('Add is done', 201);

    } else new BadRequestException()

  }

}