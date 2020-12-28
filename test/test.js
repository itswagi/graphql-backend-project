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

var idpub
var idbook
var idreader
var idchecked

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
        const testReaderRow = await prisma.readers.create({
            data: {
                name: "Test Reader",
                email: "",
                password: "",
                address: "",
                phone: ""
            }
        })
        idreader = testReaderRow.id
        const testCheckedRow = await prisma.checkedOut.create({
            data: {
                book: {
                    connect: {
                        isbn: idbook
                    }
                },
                reader: {
                    connect: {
                        id: idreader
                    }
                },
                checkout_date: "",
                returned: false,
                returned_date: "",
                duration: 1,
            }    
        })
        idchecked = testCheckedRow.id
    } catch(err){
        return err
    }
})
afterAll( async () => {
        await prisma.checkedOut.delete({
            where: { id: idchecked }
        })
        await prisma.books.delete({
            where: { isbn: idbook }
        })
        await prisma.readers.delete({
            where: { id: idreader }
        })
        await prisma.publishers.delete({
            where: { id: idpub }
        })
        await prisma.$disconnect()
        
})


describe('Publishers', () => {
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
                findPublisherById(id: ${idpub}){
                    id
                    name
                    year_publication
                }
            }
        `
        const result = await query({
            query: testQuery
        })
        const expected = {
            id: idpub,
            name: 'Publisher Test',
            year_publication: 2020
        }
        expect(result.data.findPublisherById).toEqual(expected)
    })

    it('Updates publisher by Id', async () => {
        const testMutation = gql`
            mutation{
                updatePublisher(id: ${idpub}, name: "Publisher Updated"){
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
            id: idpub,
            name: 'Publisher Updated',
            year_publication: 2020
        }

        expect(result.data.updatePublisher).toEqual(expected)

        await prisma.publishers.update({
            where: {
                id: idpub
            },
            data: {
                name: "Publisher Test"
            }
        })
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

        await prisma.books.update({
            where: {
                isbn: idbook
            },
            data: {
                title: "Book Test"
            }
        })
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
    it('Creates a CheckedOut', async () => {
        const testMutation = gql`
            mutation{
                createCheckedOut(book_isbn: ${idbook}, reader_id: ${idreader}){
                    id
                    book {
                        isbn
                        title
                        price
                        publisher {
                            id
                            name
                            year_publication
                        }
                    }
                    reader {
                        id
                        name
                        email
                    }
                    checkout_date
                    returned_date
                    returned
                    duration
                    }
                }
        `

        const result = await mutate({ mutation: testMutation})
        const expected = {
            id: result.data.createCheckedOut.id,
            book: {
                isbn: idbook,
                title: "Book Test",
                price: 1.0,
                publisher: {
                    id: idpub,
                    name: "Publisher Test",
                    year_publication: 2020
                }
            },
            reader: {
                id: idreader,
                name: "Test Reader",
                email: ""
            },
            checkout_date: null,
            returned_date: null,
            returned: false,
            duration: null
        }
        expect(result.data.createCheckedOut).toEqual(expected)

        await prisma.checkedOut.delete({
            where: { id: result.data.createCheckedOut.id }
        })
    })
    it('Gets a CheckedOut by Id', async () => {
        const testQuery = gql`
            query{
                findCheckedOutById(id: ${idchecked}){
                    id
                    book {
                        isbn
                        title
                        price
                        publisher {
                            id
                            name
                            year_publication
                        }
                    }
                    reader {
                        id
                        name
                        email
                    }
                    checkout_date
                    returned_date
                    returned
                    duration
                }
            }
        `
        const result = await query({query: testQuery})

        const expected = {
            id: idchecked,
            book: {
                isbn: idbook,
                title: "Book Test",
                price: 1.0,
                publisher: {
                    id: idpub,
                    name: "Publisher Test",
                    year_publication: 2020
                }
            },
            reader: {
                id: idreader,
                name: "Test Reader",
                email: ""
            },
            checkout_date: "",
            returned_date: "",
            returned: false,
            duration: 1
        }
        expect(result.data.findCheckedOutById).toEqual(expected)
    })
    it('Updates a CheckedOut by Id', async () => {

    })
    it('Deletes a CheckedOut by Id', async () => {

    })
})