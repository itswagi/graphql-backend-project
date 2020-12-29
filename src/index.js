import dotenv from 'dotenv'
dotenv.config()
import { PrismaClient } from '@prisma/client'
import { ApolloError, ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginInlineTrace, AuthenticationError } from "apollo-server-core";
import express from 'express'
import fs from 'fs'
import path from 'path'
import Query from './resolvers/Query'
import Books from './resolvers/Books'
import Mutation from './resolvers/Mutation'
import CheckedOut from './resolvers/CheckedOut'
import { getUserId  } from './utils'

const app = express()

const resolvers = {
    Query,
    Mutation,
    Books,
    CheckedOut,
}

const prisma = new PrismaClient()

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: ({ req }) => {
        return {
          ...req,
          prisma,
          userId:
            req && req.headers.authorization
              ? getUserId(req)
              : null
        };
    },
    formatError: (err) => {
        return err
    },
    introspection: true,
    playground: true,
    // debug: false
    plugins: [ApolloServerPluginInlineTrace()]
})

server.applyMiddleware({app})

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}${server.graphqlPath}`)
})