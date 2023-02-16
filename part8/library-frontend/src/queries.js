import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query allAuthors{
  allAuthors {
    born
    name
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query allBooks($genre: String) {
  allBooks(genre: $genre) {
    genres
    published
    title
    author {
      name
    }
  }
}
`

export const ADD_BOOK = gql`
mutation AddBook(
  $title: String!,
  $author: String!,
  $published: Int!,
  $genres: [String!]!
  ) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    published
    title
    genres
    author {
      name
    }
  }
}
`

export const EDIT_AUTHOR = gql`
mutation Mutation($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    born
    name
    bookCount
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password)  {
    value
  }
}
`


export const DELETE_BOOK = gql`
mutation deleteBook($title: String!) {
  deleteBook(title: $title) {
    id
  }
}
`


export const ME = gql`
query me {
  me {
    username
    favouriteGenre
  }
}
`