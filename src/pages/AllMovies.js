import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projectFirestore } from '../firebase/config'
import './AllMovies.css'

// Main AllMovies component
const AllMovies = () => {
    // State variables to hold the movies data and potential errors
    const [data, setData] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        // Setting up Firestore subscription to get movies data
        const unsubscribe = projectFirestore.collection('movies').onSnapshot((snapshot) => {
            if (snapshot.empty) {
                setError('Žádné filmy k vypsání')
                setData([])
            } else {
                let result = []
                snapshot.docs.forEach((oneMovie) => {
                    result.push({ id: oneMovie.id, ...oneMovie.data() })
                })
                setData(result)
            }
        }, (err) => setError(err.message)) // Handling any errors during subscription
        return () => unsubscribe() // Cleanup subscription on component unmount
    }, [])

    // Function to delete a movie by id
    const deleteMovie = (id) => {
        projectFirestore.collection('movies').doc(id).delete()
    }

    return <section className='all-movies'>
        {/* Display error message if any */}
        {error && <p>{error}</p>}
        {/* Loop through the movies data and display each movie */}
        {data.map((oneMovie) => {
            const { id, title } = oneMovie
            return <div className='one-movie' key={id}>
                <h1>{title}</h1>
                <div>
                    <Link className='more-info-link' to={`/one-movie/${id}`}>
                        <button>Více informací</button>
                    </Link>
                    <button onClick={() => deleteMovie(id)}>Smazat</button>
                </div>
            </div>
        })}
    </section>
}

export default AllMovies