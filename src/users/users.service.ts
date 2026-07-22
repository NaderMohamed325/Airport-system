import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Passenger } from 'src/passengers/entities/passenger.entity';
import { Role } from './enums/role.enum';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  create(createUserDto: UsersDTO): Promise<User> {
    let user: User;

    switch (createUserDto.role) {
      case Role.passenger:
        user = new Passenger();
        break;
      default:
        user = new User();
    }

    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['id', 'name', 'email', 'isActive', 'roles'],
    });
  }

  findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
