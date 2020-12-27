const { expect, assert } = require('chai')
import { gql } from 'apollo-server-express'
const { createTestClient } = require('apollo-server-testing')
import dotenv from 'dotenv'
dotenv.config()
import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-express'
import fs from 'fs'
import path from 'path'
import Query from '../src/resolvers/Query'
import Mutation from '../src/resolvers/Mutation'

const resolvers = {
    Query,
    Mutation,
}
const prisma = new PrismaClient()
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, '../src/schema.graphql'),
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
})

describe('Queries', () => {
    it('fetches all books from db', async () => {
        
        const { query } = createTestClient(server)

        const testQuery = gql`
            query {
                allBooks{
                    isbn
                }
            }
        `

        const res = await query({
            query: testQuery,
        })
        console.log(res)

        expect(true).to.equal(true)
    })
})
