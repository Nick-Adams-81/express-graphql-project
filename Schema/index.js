
const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient

const UserType = require('./TypeDefs/UserType')
const userData = require('../MOCK_DATA.json')

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      getAllUsers: { // name of GET route in rest 
        type: new GraphQLList(UserType),
        args: { id: { type: GraphQLInt } },
        resolve(parent, args) {
          return prisma.user.findMany({});
        },
      },
    },
  });
  
  const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createUser: { // name of POST route in rest
        type: UserType,
        args: {
          first_name: { type: GraphQLString },
          last_name: { type: GraphQLString },
          email: { type: GraphQLString },
        },
        resolve(parent, args) {
          return prisma.user.create({
            first_name: args.first_name,
            last_name: args.last_name,
            email: args.email,
          });
          return args
        },
      },
    },
  });

  module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })