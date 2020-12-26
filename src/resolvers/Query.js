import { ApolloError } from 'apollo-server'
import { APP_SECRET, getReaderId } from '../utils'

const allBooks = async (parent, args, context) => {
    try{
        return await context.prisma.books.findMany()
    }catch(err){
        return err
    }
}

const findBookById = async (parent, args, context) => {
    try{
        const book = await context.prisma.books.findUnique({
            where: {
                isbn: args.isbn
            }
        })
        if(!book){
            throw new ApolloError(
                'Can not find specified Book', 404
                )
        }
        return book
    } catch(err){
        return err
    }
}

const allPublishers = async (parent, args, context) => {
    try{
        return await context.prisma.publishers.findMany()
    } catch(err){
        return err
    }
}

const allCheckedOut = async (parent, args, context) => {
    try{
        return await context.prisma.checkedOut.findMany()
    } catch(err){
        return err
    }
}

export default {
    allBooks,
    findBookById,
    allPublishers,
    allCheckedOut
}