import 'dotenv/config'
import cors from 'cors'
import http from 'node:http'

import express, { Application } from 'express'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { expressMiddleware } from '@apollo/server/express4'
import resolvers from './graphql/resolvers'

import './connetBd'

const typeDefs = `#graphql
  # This "Book" type defines the queryable fields for every book in our data source.
type Album {
  id: ID
  title_album: String
  description: String
  base64_img: String
  slug: String
}

type Imagen {
  base64_img: String
  description: String
}

input InputAlbum {
  title_album: String
  description: String
  base64_img: String
}

input InputImage {
  description: String
  base64_img: String
  album_id: String
}

type Query {
  allAlbum: [Album]
  showImages(slug: String): [Imagen]
}

type Mutation {
  addAlbum(input: InputAlbum): String!
  addImagen(input: InputImage): String!
}
`  

const schema = makeExecutableSchema({ resolvers, typeDefs })

const port = process.env.PORT || 4000

async function startApolloServer() {
  const app: Application = express()

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    // resolvers,
    // typeDefs,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start();
  
  app.use(cors())
  app.get('/', (_, res) => res.send('API ANTAROSHA - JDesign'))
  app.use(express.json({ limit: '5mb'}))
  

  app.use(
    '/graphql',
    expressMiddleware(server),
  )

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))

  console.log(`http://${process.env.IP}:${port}/graphql`)

}

startApolloServer()