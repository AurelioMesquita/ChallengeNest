import { Field, InputType } from '@nestjs/graphql';
import UserInput from './users.input';

@InputType()
class MessageUserConnectInput {
  @Field()
  readonly id: number;
}

@InputType()
class messageUserInput {
  @Field({ nullable: true })
  readonly connect: MessageUserConnectInput;

  @Field({ nullable: true })
  readonly create: UserInput;
}

@InputType()
export default class MessageInput {
  @Field()
  readonly content: string;

  @Field()
  readonly user: messageUserInput;
}
