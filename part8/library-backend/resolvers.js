const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const mongoose = require('mongoose')

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
      // Check for auth token
      // const currentUser = context.currentUser
      // if (!currentUser) {
      //   throw new GraphQLError('ME QUERY not authenticated', {
      //     extensions: {
      //       code: 'BAD_USER_INPUT',
      //     }
      //   })
      // }
      // console.log('me query context:', context)
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

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

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
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}


module.exports = resolvers