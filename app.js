const express = require('express')
const app = express()
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const newSchema = require('./schema/newSchema')

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: newSchema
}))

app.listen(4000, () => {
    console.log('Listen for request on my awesome port 4000');
})