import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { projectFirestore } from '../firebase/config'
import { useState, useEffect } from 'react'
import './OneMovie.css'

const OneMovie = () => {
    // State variables for movie data, error message, and loading status
    const [data, setData] = useState({})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const { movieId } = useParams()

    useEffect(() => {
          // Fetch movie data from Firestore
        const fetchMovie = async () => {
            try {
                const document = await projectFirestore.collection('movies').doc(movieId).get()
                if (document.exists) {
                    setData(document.data())
                } else {
                    setError('Žádný film k vypsání')
                }
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchMovie()
    }, [movieId])

    // Show loading message while data is being fetched
    if (loading) {
        return <p className='loading'>Načítání...</p>
    }

    return <section className='movie-all-details-box'>
        {error && <p>{error}</p>}
        <div className='heading'>
            <h1 className='movie-name'>{data.title}</h1>
            <p className='rating'>{data.rating}%</p>
        </div>
        <div className='movie-info-box'>
            <p>Žánr: {data.genre}</p>
            <p>Věk: {data.minAge}+</p>
            <p>Rok: {data.year}</p>
            <p>Délka: {data.time} minut</p>
            <p>Režisér: {data.director}</p>
            <p>{data.nation}</p>
        </div>
        <div className='description-box'>
            <h3 className='description-heading'>Obsah filmu</h3>
            <p className='description-text'>{data.description}</p>
        </div>
        <Link to={'/all-movies'}>
            <button className='back-to-movies-button'>Zpět na filmy</button>
        </Link>
    </section>
}

export default OneMovie