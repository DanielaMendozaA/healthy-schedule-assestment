import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { isString, isUUID } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user)
  }

    async findOneByTerm(term: string): Promise<User> {
    const strategies = [
      {
        condition: () => isUUID(term),
        query: () => this.userRepository.findOne({ where: { id: term } }),
      },
      {
        condition: () => isString(term),
        query: () => this.userRepository.findOne({ where: {email: term}})
        
      },
    ];
  
    const strategy = strategies.find(strategy => strategy.condition());

    if (!strategy) {
      throw new BadRequestException('Invalid search term. Must be a valid UUID or email');
    }
  
    const user = await strategy.query();
  
    return user;
  }

  async findByEmailWithPassword(email: string): Promise<Partial<User>>{
    const user = await this.userRepository.findOne({
      where: {email},
      select: {password: true, email: true, id: true}
    });
    
    if(!user)
      throw new NotFoundException("User not found")

    return user
  }
  
  
}
