

const publisher = async (parent, args, context) => {
    return await context.prisma.publishers.findUnique({
        where: {
            id: parent.publisher_id
        }
    })
}


export default {
    publisher,
}