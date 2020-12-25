const publisher = async (parent, args, context) => {
    return context.prisma.publishers.findUnique({
        where: {
            id: parent.publisher_id
        }
    })
}

export default {
    publisher
}