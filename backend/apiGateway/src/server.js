const { ApolloServer, gql } = require('apollo-server');

const urlAuth = 'http://localhost:5000/auth';
const urlAccount = 'http://localhost:6000/account';

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, World!',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen({ port: 4000 })
  .then(({ url }) =>
    console.log(`Apollo Server, GraphQL server running at ${url}`)
  );
