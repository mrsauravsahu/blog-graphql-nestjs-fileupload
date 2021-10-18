import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Person } from 'src/modules/person/person.model';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import * as fs from 'fs/promises';

@Resolver(() => Person)
export class PersonResolver {
  person: Person;

  public constructor() {
    this.person = {
      id: 1,
      firstName: 'Saurav',
      lastName: 'Sahu',
    };
  }

  @Query(() => Person)
  async author(@Args('id', { type: () => Int }) id: number): Promise<Person> {
    return { ...this.person, id };
  }

  @Mutation(() => Int, { name: 'coverPhoto' })
  async uploadCoverPhoto(
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<number> {
    try {
      const { createReadStream } = file;

      const stream = createReadStream();
      const chunks = [];

      const buffer = await new Promise<Buffer>((resolve, reject) => {
        let buffer: Buffer;

        stream.on('data', function (chunk) {
          chunks.push(chunk);
        });

        stream.on('end', function () {
          buffer = Buffer.concat(chunks);
          resolve(buffer);
        });

        stream.on('error', reject);
      });

      const base64 = buffer.toString('base64');
      // If you want to store the file, this is one way of doing
      // it, as you have the file in-memory as Buffer
      await fs.writeFile('upload.jpg', buffer);
      this.person.coverPhotoLength = base64.length;
      this.person.coverPhoto = base64;

      return base64.length;
    } catch (err) {
      return 0;
    }
  }
}
