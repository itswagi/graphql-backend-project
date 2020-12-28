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
    beforeAll(async () => {
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
    afterAll( async () => {
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

    it('Updates publisher by Id', async () => {
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
    
    it('Deletes publisher by Id', async () => {

        const testRow = await prisma.publishers.create({
            data: {
                name: 'Publisher Test',
                year_publication: 2020
            }
        })

        const testMutation = gql`
            mutation{
                deletePublisher(id: ${testRow.id}){
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
            id: testRow.id,
            name: 'Publisher Test',
            year_publication: 2020 
        }

        expect(result.data.deletePublisher).toEqual(expected)
    })
})

describe('Books', () => {
    var idpub
    var idbook
    beforeAll( async () => {
        try{
            const testPubRow = await prisma.publishers.create({
                data: {
                    name: "Publisher Test",
                    year_publication: 2020
                }
                
            })
            idpub = testPubRow.id
            const testBookRow = await prisma.books.create({
                data: {
                    title: "Book Test",
                    price: 1.0,
                    quantity: 1,
                    publisher: {
                        connect: {
                            id: idpub
                        }
                    }
                }
            })
            idbook = testBookRow.isbn
        } catch(err){
            return err
        }
    })
    afterAll( async () => {
        try{
            await prisma.books.delete({
                where: {
                    isbn: idbook
                }
            })
            await prisma.publishers.delete({
                where: {
                    id: idpub
                }
            })
        } catch(err){
            return err
        }
    })

    it('Creates a book', async () => {
        const testMutation = gql`
            mutation {
                createBook(title: "Book Test", price: 1.0, quantity: 1, publisher_id: ${idpub}){
                    isbn
                    title
                    price
                    quantity
                    publisher {
                        id
                        name
                        year_publication
                    }
                }
            }
        `
        const result = await mutate({
            mutation: testMutation,
        })

        const expected = {
            isbn: result.data.createBook.isbn,
            title: 'Book Test',
            price: 1.0,
            quantity: 1,
            publisher: {
                id: idpub,
                name: 'Publisher Test',
                year_publication: 2020
            }
        }
        expect(result.data.createBook).toEqual(expected)

        await prisma.books.delete({
            where: {
                isbn: result.data.createBook.isbn
            }
        })
    })

    it('Gets a book by Id', async () => {
        const testQuery = gql`
            query {
                findBookById(isbn: ${idbook}){
                    isbn
                    title
                    price
                    quantity
                    publisher {
                        id
                        name
                        year_publication
                    }
                }
            }
        `
        const result = await query({ query: testQuery})
        const expected = {
            isbn: idbook,
            title: 'Book Test',
            price: 1.0,
            quantity: 1,
            publisher: {
                id: idpub,
                name: 'Publisher Test',
                year_publication: 2020
            }
        }
        expect(result.data.findBookById).toEqual(expected)

    })

    it('Updates a book by Id', async () => {
        const testMutation = gql`
            mutation {
                updateBook(isbn: ${idbook}, publisher_id: ${idpub}, title:"updated Book"){
                    isbn
                        title
                        price
                        quantity
                        publisher {
                            id
                            name
                            year_publication
                        }
                }
            }
        `
        const result = await mutate({mutation: testMutation})
        const expected = {
            isbn: idbook,
            title: 'updated Book',
            price: 1.0,
            quantity: 1,
            publisher: {
                id: idpub,
                name: 'Publisher Test',
                year_publication: 2020
            }
        }
        expect(result.data.updateBook).toEqual(expected)
    })

    it('Deletes a book by Id', async () => {
        const testRow = await prisma.books.create({
            data: {
                title: "Book Test",
                price: 1.0,
                quantity: 1,
                publisher: {
                    connect: {
                        id: idpub
                    }
                }
            }
        })

        const testMutation = gql`
            mutation {
                deleteBook(isbn: ${testRow.isbn}){
                    isbn
                    title
                    price
                    quantity
                    publisher {
                        id
                        name
                        year_publication
                    }
                }
            }
        `
        const result = await mutate({ mutation: testMutation})

        const expected = {
            isbn: testRow.isbn,
            title: 'Book Test',
            price: 1.0,
            quantity: 1,
            publisher: {
                id: idpub,
                name: 'Publisher Test',
                year_publication: 2020
            }
        }

        expect(result.data.deleteBook).toEqual(expected)
    })
})

describe('CheckedOut', () => {
    beforeAll( async () => {

    })
    afterAll( async () => {
        
    })
    it('Creates a CheckedOut', async () => {

    })
    it('Gets a CheckedOut by Id', async () => {

    })
    it('Updates a CheckedOut by Id', async () => {

    })
    it('Deletes a CheckedOut by Id', async () => {

    })
})