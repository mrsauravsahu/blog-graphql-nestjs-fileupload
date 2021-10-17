import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Person {
  @Field(() => Int)
  id: number;

  @Field()
  firstName?: string;

  @Field()
  lastName?: string;

  @Field(() => Int, { nullable: true })
  coverPhotoLength?: number = null;

  @Field(() => String, { nullable: true })
  coverPhoto?: string;

  private _coverPhoto?: Buffer;
}
