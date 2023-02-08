import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    born
    name
    bookCount
  }
}`

export const ALL_BOOKS = gql`
query {
  allBooks {
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
mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    published
    title
    genres
    author
  }
}`

export const EDIT_AUTHOR = gql`
mutation Mutation($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    bookCount
    born
    name
  }
}`