import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User, CreateUserDto } from '@shared/models';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private _repository: Repository<User>
  ) {}
  findAll(): Promise<User[]> {
    return this._repository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this._repository.findOneByOrFail({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this._repository.findOneByOrFail({ email });
  }

  async create(user: CreateUserDto): Promise<User> {
    try {
      return await this._repository.save(user);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError?.code === 'ER_DUP_ENTRY'
      ) {
        throw new HttpException('Email already exists.', HttpStatus.CONFLICT);
      }
      throw error;
    }
  }

  async update(id: number, user: Partial<User>) {
    try {
      return await this._repository.update(id, user);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError?.code === 'ER_DUP_ENTRY'
      ) {
        throw new HttpException('Email already exists.', HttpStatus.CONFLICT);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    await this._repository.delete(id);
  }
}
