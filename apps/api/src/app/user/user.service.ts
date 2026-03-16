import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    return this._repository.findOneBy({ id });
  }

  create(user: CreateUserDto): Promise<User> {
    return this._repository.save(user);
  }

  update(id: number, user: Partial<User>) {
    return this._repository.update(id, user);
  }

  async remove(id: number): Promise<void> {
    await this._repository.delete(id);
  }
}
