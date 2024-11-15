import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ) { }

  @Get(':term')
  async findOneByTerm(@Param('term') term: string) {

    const user = await this.userService.findOneByTerm(term);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user
  }


}
