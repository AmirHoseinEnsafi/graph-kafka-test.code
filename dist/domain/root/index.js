"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const main_1 = __importDefault(require("../graphql/type/mainType/main"));
// const context = ({ req } : { req : Request }) => {
//     return { req }
// }
const server = new server_1.ApolloServer({
    typeDefs: (0, graphql_tag_1.default) `${main_1.default}`,
    resolvers: {}
});
(0, standalone_1.startStandaloneServer)(server, { listen: { port: 4000 } }).then(({ url }) => {
    console.log(`server is run is the url : ${url}`);
});
