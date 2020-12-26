import { ApolloError } from 'apollo-server'
import { APP_SECRET, getReaderId } from '../utils'

const book = async (parent, args, context) => {
    return await context.prisma.books.findMany()
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

export default {
    book, findBookById
}