import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import User from '../db/models/user-entity';
import RepoService from '../repo.service';
import UserInput from './input/users.input';

@Resolver()
export default class UserResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }
  @Query(() => User, { nullable: true })
  public async getUser(@Args('id') id: number): Promise<User> {
    return this.repoService.userRepo.findOne(id);
  }

  @Mutation(() => User)
  public async createUser(@Args('data') input: UserInput): Promise<User> {
    const autor = this.repoService.userRepo.create({ email: input.email });
    return this.repoService.userRepo.save(autor);
  }
}
