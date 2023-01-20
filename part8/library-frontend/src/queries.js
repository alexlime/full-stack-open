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
    author
    genres
    published
    title
  }
}`