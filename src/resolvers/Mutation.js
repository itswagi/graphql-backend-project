import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { APP_SECRET, getReaderId } from '../utils'

const signup = async (parent, args, context) => {
    const password = await bcrypt.hash(args.password, 10)
    const reader = await context.prisma.readers.create({
        data: {...args, password}
    })
    const token = jwt.sign({readerId: reader.id}, process.env.APP_SECRET)

    return { token, reader}
}

const login = async (parent, args, context) => {
    const reader = await context.prisma.readers.findUnique({
        where: {
            email: args.email
        }
    })
    if (!reader){
        throw new Error('No such user found')
    }
    const valid = await bcrypt.compare(args.password, user.password)
    if(!valid){
        throw new Error('Invalid Password')
    }
    const token = jwt.sign({readerId: reader.id}, process.env.APP_SECRET)

    return { token, reader }
}

const post = async (parent, args, context, info) => {
    console.log('hit')
    console.log(args)
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
        }
    })
}


export default { signup, login, post }