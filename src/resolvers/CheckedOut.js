const books = async (parent, args, context) => {
    console.log(parent)
    return await context.prisma.books.findUnique({
        where: {
            isbn: parent.book_isbn
        }
    })
}

const readers = async (parent, args, context) => {
    return await context.prisma.readers.findUnique({
        where: {
            id: parent.reader_id
        }
    })
}

export default {
    books, readers
}