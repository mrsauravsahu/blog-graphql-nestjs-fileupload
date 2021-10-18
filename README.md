# blog-graphql-nestjs-fileupload

upload file via GraphQL with multipart requests.

the graphql queries and mutations are as follows - 

```graphql
type Query {
  author(id: Int!): Person!
}

type Mutation {
  profilePhoto(file: Upload!): Int!
}
```

the mutation accepts file and returns back the length in bytes.

The data stored in the app is in-memory and is **not** recommended for production.

To run the mutation, you can use Postman or directly use this cURL command

```bash
curl --location --request POST 'http://localhost:8080/graphql' \
--form 'operations="{\"query\": \"mutation updateProfilePhoto($file: Upload!) {   profilePhoto(file: $file)} \", \"variables\": {\"file\": null}}"' \
--form 'map="{\"0\": [\"variables.file\"]}"' \
--form '0=@"/Users/sauravsahu/Documents/personal/code/graphql-file/ss-unsplash.jpg"'
```

-S