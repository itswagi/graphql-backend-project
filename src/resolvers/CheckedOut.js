const books = async (parent, args, context) => {
    console.log('1')
    console.log(parent)
    return await context.prisma.books.findUnique({
        where: {
            isbn: parent.book_isbn
        }
    })
}

const readers = async (parent, args, context) => {
    console.log('2')
    return await context.prisma.readers.findUnique({
        where: {
            id: parent.reader_id
        }
    })
}

export default {
    books, readers
}