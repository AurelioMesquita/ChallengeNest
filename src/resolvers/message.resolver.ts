import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import Message from 'src/db/models/message-entity';
import User from 'src/db/models/user-entity';
import RepoService from '../repo.service';
import MessageInput, { DeleteMessageInput } from './input/message.input';

@Resolver(() => Message)
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

  @Query(() => Message)
  public async getMessage(@Args('id') id: number): Promise<Message> {
    return this.repoService.messageRepo.findOne(id);
  }
  @Mutation(() => Message)
  public async createMessage(
    @Args('data') input: MessageInput,
  ): Promise<Message> {
    const mesage = this.repoService.messageRepo.create({
      userId: input.userId,
      content: input.content,
    });
    return this.repoService.messageRepo.save(mesage);
  }

  @Mutation(() => Message)
  public async deleteMessage(
    @Args('data') input: DeleteMessageInput,
  ): Promise<Message> {
    const message = await this.repoService.messageRepo.findOne(input.id);

    if (!message || message.userId !== input.userId)
      throw new Error(
        'Message does not exists or you are not the message author',
      );

    const copy = { ...message };

    await this.repoService.messageRepo.remove(message);

    return copy;
  }

  @ResolveField(() => User, { name: 'user' })
  public async getUser(@Parent() parent: Message): Promise<User> {
    return this.repoService.userRepo.findOne(parent.userId);
  }
}
