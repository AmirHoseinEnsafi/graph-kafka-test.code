import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';
import typeDefs from "../graphql/type/mainType/main"

const context = ({ req } : { req : Request }) => {
    return { req }
}

const server = new ApolloServer({
    typeDefs : gql`${typeDefs}` ,
    resolvers : {} ,
    context ,
} as any)


startStandaloneServer(server , { listen : {port : 4000 } }).then(({url}) => {
    console.log(`server is run is the url : ${url}`)
})