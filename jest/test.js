import { gql } from 'apollo-server-express'
import { createTestClient } from 'apollo-server-testing'
import dotenv from 'dotenv'
dotenv.config()
import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-express'
// import { Client } from 'pg'
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
const { query } = createTestClient(server)

beforeAll( async () => {
    // const connectionString = process.env.DATABASE_URL
    // console.log(connectionString)
    // const client = new Client({ connectionString })

    // const querySeedPub = `
    //     INSERT INTO "Publishers" (id, name, year_publication)
    //     VALUES (1, 'Publisher 1', 2020), (2, 'Publisher 2', 2019), (3, 'Publisher 3', 2018);
    // `
    // const querySeedReader = `
    //     INSERT INTO "Readers" (isbn, name, email, password, address, phone)
    //     VALUES (1, 'Me 1', 'me1@me.com', '12345', 'home1', '0900'), (2, 'Me 2', 'me2@me.com', '12345', 'home2', '0900');
    // `
    // const querySeedBook = `
    //     INSERT INTO "Books" (id, title, price, quantity, publisher_id)
    //     VALUES (1, 'Book 1', 1.0, 1, 1), (2, 'Book 2', 2.0, 2, 2);
    // `
    // const querySeedCheck = `
    //     INSERT INTO "CheckedOut" (id, book_isbn, reader_id, checkedout_date, returned, returned_date, duration)
    //     VALUES (1, 1, 1, null, false, null, 1), (2, 2, 2, null, false, null, 1);
    // `
    // try{
    //     await client.connect()
    //     await client.query(querySeedPub)
    //     await client.query(querySeedBook)
    //     //await client.query(querySeedReader)
    //     // await client.query(querySeedCheck)
    //     client.end()
    // } catch(error){
    //     console.log(error)
    // }
    

    
})

describe('Publishers', () => {
    it('Creates a publisher', async () => {
        
        const testQuery = gql`
            mutation {
                createPublisher(name: "Publisher Test", year_publication: 2021){
                    name
                    year_publication
                }
            }
        `
        const expected = {
            name: 'Publisher Test',
            year_publication: 2020
        }
        const res = await query({
            query: testQuery,
        })
        console.log(res.data.createPublisher)
        expect(res.data.createPublisher).toEqual(expected)
    })
})

