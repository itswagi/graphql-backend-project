const { ApolloError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQL-is-aw3some';

function getTokenPayload(token) {
    return jwt.verify(token, APP_SECRET);
}

function getUserId(req, authToken) {
  try{
    if (req) {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        if(token === 'Bearer')
          return null
        if (!token) {
          throw new ApolloError('No token found');
        }
        const { userId } = getTokenPayload(token);
        return userId;
      }
    } else if (authToken) {
      const { userId } = getTokenPayload(authToken);
      return userId;
    }
    throw new AuthenticationError('Not authenticated');
  } catch(err){
    throw err
  }
  
}


module.exports = {
  APP_SECRET,
  getUserId,
};