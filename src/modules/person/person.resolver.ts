import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Person } from 'src/modules/person/person.model';

@Resolver(() => Person)
export class PersonResolver {
  @Query(() => Person)
  async author(@Args('id', { type: () => Int }) id: number): Promise<Person> {
    return Promise.resolve({
      id,
      firstName: 'Saurav',
      lastName: 'Sahu',
    });
  }
}
