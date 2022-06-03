import { Controller, Get } from '@nestjs/common';
import RepoSevice from './repo.service';

@Controller()
export class AppController {
  constructor(private readonly repoService: RepoSevice) {}

  @Get()
  async getHello(): Promise<string> {
    return `There are ${await this.repoService.messageRepo.count()} existent messages`;
  }
}
