const graphql = require('graphql')
const _ = require('lodash')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphql

//dummy data
let userData = [
    {name: 'Joe', id: '1', age: 38, profession: 'mechanic'},
    {name: 'Lily', id: '2', age: 20, profession: 'driver'},
    {name: 'Tahlia', id: '3', age: 28, profession: 'recruiter'},
    {name: 'Jimmy', id: '4', age: 18, profession: 'musician'},
    {name: 'Daniel', id: '5', age: 6, profession: 'kid'}
]

let hobbyData = [
    {id: '1', title: 'soccer ', description: 'mechanic', userId: '1'},
    {id: '2', title: 'programmer', description: 'mechanic', userId: '2'},
    {id: '3', title: 'doctor', description: 'mechanic', userId: '4'},
    {id: '4', title: 'painter', description: 'mechanic', userId: '4'},
    {id: '5', title: 'play guitar', description: 'mechanic', userId: '5'}
]

let postData = [
    {id: '1', comment: 'How you going man?', userId: '1'},
    {id: '2', comment: 'I like that movie', userId: '4'},
    {id: '3', comment: 'Your hair looks great!', userId: '3'},
    {id: '4', comment: 'You are awesome', userId: '3'},
    {id: '5', comment: 'What a nice goal!', userId: '333'}
]

//Create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString},
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postData, {userId: parent.id})
            }
        },
        hobbys: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(hobbyData, {userId: parent.id})
            }
        }
    })
})

//hobby type
const HobbyType = new GraphQLObjectType({
    name: 'hobby',
    description: 'Hobby description',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        userId: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(userData, {id: parent.userId})
            }
        }
    })
})

//post type
const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post descrition',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        userId: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(userData, {id: parent.userId})
            }
        }
    })
})

//Root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'root query',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                //we resolve with data, get and return data from
                //a datasource
                return _.find(userData, {id: args.id})
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return userData
            }
        },

        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                return _.find(hobbyData, {id: args.id})
            }
        },

        hobbies: {
            type: GraphQLList(HobbyType),
            resolve(parent, args) {
                return hobbyData
            }
        },

        post: {
            type: PostType,
            args: {id: {type: GraphQLString}},

            resolve(parent, args) {
                return _.find(postData, {id: args.id})
            }
        },

        posts: {
            type: GraphQLList(PostType),
            resolve(parent, args) {
                return postData
            }
        },
    }
})

//Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                age: {type: GraphQLID},
                profession: {type: GraphQLString}
            },
            resolve(parent, args) {
                let user = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                }
                return user
            }
        },

        createPost: {
            type: PostType,
            args: {
                // id: {type: GraphQLID},
                comment: {type: GraphQLString},
                userId: {type: GraphQLString},
            },
            resolve(parents, args) {
                return {
                    // id: args.id,
                    comment: args.comment,
                    userId: args.userId
                }
            }
        },

        createHobby: {
            type: HobbyType,
            args: {
                title: {type: GraphQLString},
                description: {type: GraphQLString},
                userId: {type: GraphQLString}
            },
            resolve(parent, args) {
                return {
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})


