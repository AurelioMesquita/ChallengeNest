import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import Message from 'src/db/models/message-entity';
import User from 'src/db/models/user-entity';
import RepoService from '../repo.service';
import MessageInput from './input/message.input';

@Resolver()
export default class MessageResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Message])
  public async getMessages(): Promise<Message[]> {
    return this.repoService.messageRepo.find();
  }
  @Query(() => Message)
  public async getMessageFromUser(
    @Args('userId') userId: number,
  ): Promise<Message[]> {
    return this.repoService.messageRepo.find({ where: { userId } });
  }

  @Query(() => Message, { nullable: true })
  public async getMessage(@Args('id') id: number): Promise<Message> {
    return this.repoService.messageRepo.findOne(id);
  }
  @Mutation(() => Message)
  public async createUser(@Args('data') input: MessageInput): Promise<Message> {
    const mesage = this.repoService.messageRepo.create();
    mesage.content = input.content;
    mesage.userId = input.user.connect.id;
    return this.repoService.userRepo.save(mesage);
  }

  @ResolveProperty()
  public async getUser(@Parent() parent: Message): Promise<User> {
    return this.repoService.userRepo.findOne(parent.userId);
  }
}
