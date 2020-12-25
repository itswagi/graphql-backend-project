const publisher = async (parent, args, context) => {
    console.log('1')
    return await context.prisma.publishers.findUnique({
        where: {
            id: parent.publisher_id
        }
    })
}


export default {
    publisher
}