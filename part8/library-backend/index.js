const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v4: uuid } = require('uuid')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
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
    allAuthors: async () => await Author.find({})
  },
  Author: { // Altering default resolver
    name: (root) => root.name, // not necessary (example)
    bookCount: async (root) => {
      const bookCount = await Book.count({author: root._id})
      return bookCount
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      // Create new author or fetch existing:
      let author = await Author.findOne({name: args.author})
      if (!author) { // no author, create new
        author = new Author({name: args.author})
        try {
          await author.save()
        } catch (err) {
          console.log('Error saving an author', err)
        }
      }

      // add a book with new or existing author
      const book = new Book({...args, author: author})
      try {
        await book.save()
      } catch (err) {
        console.log('ERROR saving a book', err)
      }

      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) { return null }

      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})