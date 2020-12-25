import jwt from 'jsonwebtoken'
const APP_SECRET = "graphqlfullstack"

const getTokenPayload = (token) => jwt.verify(token, APP_SECRET)

const getReaderId = (req, authToken) => {
    if(req){
        const authHeader = req.headers.authorization
        if(authHeader) {
            const token = authHeader.replace('Bearer ', '')
            if(!token){
                throw new Error('No token found!')
            }
            const {readerId} = getTokenPayload(token)
            return readerId
        }
    } else if (authToken){
        const {readerId} = getTokenPayload(authToken)
        return readerId
    }

    throw new Error('Not authenticated')
}

export default { APP_SECRET, getReaderId}