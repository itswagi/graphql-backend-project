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
const { query, mutate } = createTestClient(server)

beforeAll( async () => {

})

afterAll(async () => {
    await prisma.$disconnect()
})

describe('Publishers', () => {
    var id
    beforeEach(async () => {
        try{
            const testRow = await prisma.publishers.create({
                data: {
                    name: "Publisher Test",
                    year_publication: 2020
                }
            })
            id = testRow.id
        } catch(err){
            return err
        }
    })
    afterEach( async () => {
        try{
            const testRow = await prisma.publishers.delete({
                where: {
                    id: id
                }
            })
        } catch(err){
            return err
        }
    })
    it('Creates a publisher', async () => {
        
        const testMutation = gql`
            mutation {
                createPublisher(name: "Publisher Test", year_publication: 2020){
                    id
                    name
                    year_publication
                }
            }
        `
        const result = await mutate({
            mutation: testMutation,
        })

        const expected = {
            id: result.data.createPublisher.id,
            name: 'Publisher Test',
            year_publication: 2020
        }
        //id = result.data.createPublisher.id
        expect(result.data.createPublisher).toEqual(expected)

        await prisma.publishers.delete({
            where: {
                id: result.data.createPublisher.id
            }
        })
    })

    it('Gets a publisher by Id', async () => {
        const testQuery = gql`
            query{
                findPublisherById(id: ${id}){
                    id
                    name
                    year_publication
                }
            }
        `
        const result = await query({
            query: testQuery,
            variables: { id: 1}
        })
        const expected = {
            id: id,
            name: 'Publisher Test',
            year_publication: 2020
        }
        expect(result.data.findPublisherById).toEqual(expected)
    })

    it('Updates publisher', async () => {
        const testMutation = gql`
            mutation{
                updatePublisher(id: ${id}, name: "Publisher Updated"){
                    id
                    name
                    year_publication
                }
            }
        `
        const result = await mutate({
            mutation: testMutation
        })

        const expected = {
            id: id,
            name: 'Publisher Updated',
            year_publication: 2020
        }

        expect(result.data.updatePublisher).toEqual(expected)
    })



})

