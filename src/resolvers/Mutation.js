const post = async (parent, args, context) => {
    const newReader = await context.prisma.readers.create({
        data: {
            name: args.name,
            email: args.email,
            password: args.password,
            address: args.address,
            phone: args.phone
        }
    })
    return newReader
}

export default { post }