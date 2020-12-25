const book = async (parent, args, context) => {
    return await context.prisma.books.findMany()
}

export default {
    book
}