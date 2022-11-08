const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im10YXlsb3IiLCJpZCI6IjYzNjNmZDRiMzg3MWU2ZmU2OGU0OTdjYiIsImlhdCI6MTY2NzQ5NzQ3OH0.yHb2V_-M8b1F0xqUlZKvpoGa9l1_3wLy3NmlYHTvZu4'

const resolvers = {
  Query: {
    // bookCount: (args) => books.filter(book => book.author === args.author).length
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async (root, args) => {
      return await Author.find({})
    },
    allBooks: async (root, args) => {

      // console.log('args provided: ', args.name, args.genre)
      if (!args.name && !args.genre) {
        return await Book.find({}).populate('author')
      }

      if (args.name) {
        const author = await Author.findOne({name: args.name})
        const authorId = author._id

        if (args.genre) {
          return await Book.find(
            { $and: [{author: { $eq: authorId } }, { genres: { $in: [args.genre] } } ] }
          ).populate('author')
        }

        return await Book.find(
          { author: { $eq: authorId } }
        ).populate('author')
      }

      if (args.genre) {
        return await Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      var author = await Author.findOne({ name: args.author })
      if (!author) {
        console.log('Author does not exist yet, adding...')
        author = new Author({name: args.author})
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      } else {
        console.log('Author already exists', author.name)
      }

      const book = new Book(
        {
          ...args,
          author: author, 
        }
      )

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      console.log('mutation args are:', args)
      // var newAuthor
      const exists = await Author.findOne({ name: args.name})
      console.log('exists value is:', exists)
      // const exists = authors.find(a => a.name === args.name)
      if (exists) {
        // newAuthor = new Author({name: exists.name, born: args.setBornTo})
        // console.log(newAuthor)
        // authors = authors.map(a => a.name === args.name ? newAuthor : a )
        exists.born = args.setBornTo
        try {
          await exists.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      return exists
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers