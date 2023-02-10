const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.SECRET
const MONGODB_URI = process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    deleteBook(title: String!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.count({}),
    authorCount: async () => await Author.count({}),
    allBooks: async (root, args) => {
      const author = args.author && await Author.findOne({name: args.author})

      if (args.author && args.genre) {
        const byAuthorGenre = await Book.find({
          author: author._id,
          genres: args.genre
        }).populate('author', { name: 1, born: 1 })
        return byAuthorGenre
      }
      else if (args.author) {
        const byAuthor = await Book.find({
          author: author._id
        }).populate('author', { name: 1, born: 1 })
        return byAuthor
      }
      else if (args.genre) {
        const byGenre = await Book.find({
          genres: args.genre
        }).populate('author', { name: 1, born: 1 })
        return byGenre
      }
      else {
        return await Book.find({}).populate('author', { name: 1, born: 1 })
      }
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      console.log('context:', context)
      return context.currentUser
    }
  },
  Author: { // Altering default resolver
    name: (root) => root.name, // not necessary (example)
    bookCount: async (root) => {
      const bookCount = await Book.count({author: root._id})
      return bookCount
    }
  },
  Mutation: {
    deleteBook: async (root, args, context) => {
      // Check for auth token
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const book = await Book.findOne({ title: args.title })
      if (!book) { return null }


      try {
        await book.remove()
      } catch (error) {
        throw new GraphQLError('Deleting book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            errorMessage: error.message
          }
        })
      }
      return book

    },
    addBook: async (root, args, context) => {
      // Check for auth token
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      let session, book

      try {
        session = await mongoose.startSession()
        session.startTransaction()

        let author = await Author.findOne({name: args.author}).session(session)
        if (!author) { // no author, create new
          author = new Author({name: args.author})
          await author.save({ session })
        }

        book = new Book({...args, author: author})
        await book.save({ session })

        await session.commitTransaction()

      } catch (error) {
        console.error(`Error saving book and author: ${error}`)
        if (session) {
          await session.abortTransaction()
        }
        throw new GraphQLError('Saving book and author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: {author: args.author, title: args.title},
            errorMessage: error.message
          }
        })

      } finally {
        if (session) {
          session.endSession()
        }
      }

      return book
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })

      // Check for auth token
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      if (!author) { return null }

      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving author born year failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
            errorMessage: error.message
          }
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        password: "secret",
        favouriteGenre: args.favouriteGenre
      })

      return user.save()
        .catch(error => {
          throw new GraphQLError('User saving failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              errorMessage: error.message
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError("wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: 4001 },
  context: async ({req, res}) => {
    const auth = req ? req.headers.authorization : null
    // console.log('auth: ', auth)
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
