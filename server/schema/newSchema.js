const graphql = require("graphql")
const _ = require("lodash")

const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema
} = graphql


const PersonType = new GraphQLObjectType ({
    name: "Person",
    description: "Person documentation ...",
    fields: () => ({
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: GraphQLInt},
        isMarried: {type: GraphQLBoolean},
        gpa: {type: GraphQLFloat}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'root query',
    fields: {
        person: {
            type: PersonType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                let personObj = {
                    name: null,
                    age: 35,
                    isMarried: true,
                    gpa: 23.6
                }
                return personObj
                //we resolve with data, get and return data from
                //a datasource
                // return _.find(userData, {id: args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})