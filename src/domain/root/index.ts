import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';

const context = ({ req } : { req : Request }) => {
    return { req }
}

const server = new ApolloServer({
    typeDefs : gql`` ,
    resolvers : {} ,
    context ,
} as any)


startStandaloneServer(server , { listen : {port : 4000 } }).then(({url}) => {
    console.log(`server is run is the url : ${url}`)
})