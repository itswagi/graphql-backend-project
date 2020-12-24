const { PrismaClient } = require ('@prisma/client')
const { ApolloServer } = require('apollo-server')
const fs = require('fs');
const path = require('path');

const resolvers = {
    Query: {
        book: async (parent, args, context) => {
            return context.prisma.books.findMany()
        },
    },
    Books: {
        publisher: async (parent, args, context) => {
            return context.prisma.publishers.findUnique({
                where: {id : parent.publisher_id}
            }) 
        }
    }
}

const prisma = new PrismaClient()

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: {
        prisma,
    }
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );