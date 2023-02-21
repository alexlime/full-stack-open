import { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'


const Recommended = ({ show }) => {
  const tokenInStorage = localStorage.getItem('library-user-token')
  const [favGenre, setFavGenre] = useState('')

  const meQuery = useQuery(ME, {
    fetchPolicy: 'network-only',
    skip: !tokenInStorage,
  })

  const allBooksQuery = useQuery(ALL_BOOKS, {
    skip: !meQuery.data,
    variables: { genre: favGenre }
  })

  if (!show) {
    return null
  }

  if (meQuery.loading || allBooksQuery.loading) {
    return <div>loading...</div>
  }

  if (meQuery.data.me.favouriteGenre !== favGenre) {
    setFavGenre(meQuery.data.me.favouriteGenre)
  }

  const user = meQuery.data.me
  const favBooks = allBooksQuery.data.allBooks

  return (
    <div>
      <h2>recommendations for: {user.username} </h2>
      <p>Favourite genre: <strong>{user.favouriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended



// const Recommended = ({ show }) => {
//   const tokenInStorage = localStorage.getItem('library-user-token')

//   const [loadMe, dataMe] = useLazyQuery(ME, {fetchPolicy: 'network-only'})
//   const [loadFavBooks, dataFavBooks] = useLazyQuery(ALL_BOOKS)

//   console.log(dataMe.data, tokenInStorage)

//   useEffect(() => {
//     console.log('useEffect')
//     if (tokenInStorage) {
//       // console.log('fetching... inside useEffect')
//       const fetchUserData = async () => {
//         try {
//           const userData = await loadMe()
//           await loadFavBooks({
//             variables: { genre: userData.data.me.favouriteGenre }
//           })
//         } catch (error) { console.error(error) }
//       }
//       fetchUserData()
//     }
//   }, [tokenInStorage])

//   if (!show) {
//     return null
//   }

//   // if component rendered to early, before lazy queries are loaded return null
//   // should be better overall solution...
//   if (!(dataMe.data && dataMe.data.me)
//     || !(dataFavBooks.data && dataFavBooks.data.allBooks) ) {
//     return null
//   }

//   if (dataMe.loading || dataFavBooks.loading) {
//     return <div>loading...</div>
//   }

//   const user = dataMe.data.me
//   const favBooks = dataFavBooks.data.allBooks

//   return (
//     <div>
//       <h2>recommendations for: {user.username} </h2>
//       <p>Favourite genre: <strong>{user.favouriteGenre}</strong></p>
//       <table>
//         <tbody>
//           <tr>
//             <th></th>
//             <th>author</th>
//             <th>published</th>
//           </tr>
//           {favBooks.map((a) => (
//             <tr key={a.title}>
//               <td>{a.title}</td>
//               <td>{a.author.name}</td>
//               <td>{a.published}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {/*<button onClick={() => loadFavBooks()}>Load Me Query</button>*/}
//     </div>
//   )
// }

// export default Recommended
