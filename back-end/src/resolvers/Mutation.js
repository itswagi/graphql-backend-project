import { ApolloError } from 'apollo-server-express'
import { AuthenticationError } from 'apollo-server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
    try{
        const password = await bcrypt.hash(args.password, 10)
        const user = await context.prisma.readers.create({ data: { ...args, password } })
        const token = jwt.sign({ userId: user.id }, APP_SECRET)
        return {
        token,
        user,
        }
    } catch(err){
        return err
    }
    
  }
  
  async function login(parent, args, context) {
      try{
        console.log(args)
        const user = await context.prisma.readers.findUnique({ where: { email: args.email } })
        if (!user) {
            throw new Error('No such user found')
        }
    
        const valid = await bcrypt.compare(args.password, user.password)
        if (!valid) {
            throw new Error('Invalid password')
        }
    
        const token = jwt.sign({ userId: user.id }, APP_SECRET)

        return {
        token,
        user,
        }
      } catch(err){
          return err
      }     
}
  

const createBook = async (parent, args, context, info) => {
    try{
        const { userId } = context
        if (!userId){
            throw new AuthenticationError('Please Login')
        }
        return await context.prisma.books.create({
            data: {
                title: args.title,
                price: args.price,
                quantity: args.quantity,
                publisher: {
                    connect: {
                        id: args.publisher_id
                    }
                }
            },
            include: {
                publisher: true
            }
        })
    } catch(err){
        return err
    }
}

const updateBook = async (parent, args, context, info) => {
    try{
        const { userId } = context
        if (!userId){
            throw new AuthenticationError('Please Login')
        }
        const {isbn, publisher_id, ...values} = args

        if(publisher_id)
            values.publisher = { connect: { id: publisher_id}}

        if(Object.keys(values).length === 0)
            throw new ApolloError("Missing attributes")

        return await context.prisma.books.update({
            where: {
                isbn: isbn
            },
            data: values,
            include: {
                publisher: true
            }
        })
    } catch(err){
        //console.log(err.meta.details.split(":")[1])
        return err
    }
}

const deleteBook = async (parent, args, context, info) => {
    try{
        const { userId } = context
        if (!userId){
            throw new AuthenticationError('Please Login')
        }
        if(!args.isbn)
            throw new ApolloError('Missing ISBN value')
        return await context.prisma.books.delete({
            where: {
                isbn: args.isbn
            },
            include: {
                publisher: true
            }
        })
    } catch(err){
        return err
    }
}

const createPublisher = async (parent, args, context) => {
    try{
        const { userId } = context
        if (!userId){
            throw new AuthenticationError('Please Login')
        }
        return await context.prisma.publishers.create({
            data: {
                ...args
            }
        })
    } catch(err){
        return err
    }
}

const updatePublisher = async (parent, args, context) => {
    try{
        const { userId } = context
        if (!userId){
            throw new AuthenticationError('Please Login')
        }
        const {id, ...values} = args

        if(Object.keys(values).length === 0)
            throw new ApolloError("Missing attributes")
        
        return await context.prisma.publishers.update({
            where: {
                id: id
            },
            data: {
                ...values
            }
        })
    } catch(err){
        return err
    }
}

const deletePublisher = async (parent, args, context) => {
    try{
        const { userId } = context
        if (!userId){
            throw new AuthenticationError('Please Login')
        }
        return await context.prisma.publishers.delete({
            where: {
                id: args.id
            }
        })
    }catch(err){
        return err
    }
}

const createCheckedOut = async (parent, args, context) => {
    try{
        const { userId } = context
        if (!userId){
            throw new AuthenticationError('Please Login')
        }
        const {book_isbn, reader_id, ...values} = args
        return await context.prisma.checkedOut.create({
            data: {
                book: {
                    connect: {
                        isbn: book_isbn
                    }
                },
                reader: {
                    connect: {
                        id: reader_id
                    }
                },
                ...values,
            },
            include: {
                book: {
                    include: {
                        publisher: true
                    }
                },
                reader: true,
            }
        })
    } catch(err){
        return err
    }
}

const updateCheckedOut = async (parent, args, context) => {
    try{
        const { userId } = context
        if (!userId){
            throw new AuthenticationError('Please Login')
        }
        const {id, ...values} = args
        if(Object.keys(values).length === 0)
            throw new ApolloError("Missing attributes")
        return await context.prisma.checkedOut.update({
            where: {
                id: id
            },
            data: {
                ...values
            },
            include: {
                book: {
                    include: {
                        publisher: true
                    }
                },
                reader: true
            }
        })
    } catch(err){
        return err
    }
}

const deleteCheckedOut = async (parent, args, context) => {
    try{
        const { userId } = context
        if (!userId){
            throw new AuthenticationError('Please Login')
        }
        return await context.prisma.checkedOut.delete({
            where: {
                id: args.id
            },
            include: {
                book: {
                    include: {
                        publisher: true
                    }
                },
                reader: true
            }
        })
    } catch(err){
        return err
    }
}


export default {
    signup,
    login,
    createBook,
    updateBook,
    deleteBook,
    createPublisher,
    updatePublisher,
    deletePublisher,
    createCheckedOut,
    updateCheckedOut,
    deleteCheckedOut
}