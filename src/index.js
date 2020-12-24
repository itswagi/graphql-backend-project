const { PrismaClient } = require ('@prisma/client')
const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Books {
        isbn: Int!
        title: String
        price: Float
        quantity: Int
        publisher_id: Int
        publisher: Publishers!
    }
    type Publishers {
        id: Int!
        name: String
        year_publication: Int
    }
    type Readers {
        id: Int!
        name: String
        email: String
        password: String
        address: String
        phone: String
    }
    type CheckedOut {
        id: Int!
        isbn_book: Int
        book: [Books!]!
        reader_id: Int
        reader: [Readers!]!
        checkedout_date: String
        returned: Boolean
        returned_date: String
        duration: Int
    }
    type Query {
        book: [Books]
    }

`

const resolvers = {
    Query: {
        book: async (parent, args, context) => {
            return context.prisma.books.findMany()
        },
    },
    Books: {
        publisher: async (parent, args, context) => {
            console.log(parent.publisher_id)
            return context.prisma.publishers.findUnique({
                where: {id : parent.publisher_id}
            }) 
        }
    }
    // Publishers: async (parent, args, context) => {
    //     console.log("1")
    //     return context.prisma.publishers.findUnique({
    //         where: {id : parent.publisher_id}
    //     })
    // }
}
const prisma = new PrismaClient()

const server = new ApolloServer({
    typeDefs,
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