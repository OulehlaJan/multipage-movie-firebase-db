import { useState } from 'react'
import { projectFirestore } from '../firebase/config'
import './Form.css'

// Main Form component
const Form = () => {
    const [error, setError] = useState(false)
    // State variables for handling form data and errors
    const [title, setTitle] = useState('')
    const [rating, setRating] = useState(null)
    const [genre, setGenre] = useState('')
    const [minAge, setMinAge] = useState(null)
    const [year, setYear] = useState(null)
    const [time, setTime] = useState(null)
    const [director, setDirector] = useState('')
    const [nation, setNation] = useState('')
    const [description, setDescription] = useState('')

    // Function to display error messages
    const showError = (message) => {
        setError(message)
        setTimeout(() => {
            setError(false)
        }, 2000)
    }

    // Function to handle form submission
    const submitForm = async (e) => {
        e.preventDefault()

        // Checking if all fields are filled
        if (!title || !rating || !genre || !minAge || !year || !time || !director || !nation || !description) {
            showError('Všechna pole musí být vyplněna')
            return
        }

        const newMovie = {
            title,
            rating: parseInt(rating),
            genre,
            minAge: parseInt(minAge),
            year: parseInt(year),
            time: parseInt(time),
            director,
            nation,
            description
        }

        try {
            // Adding new movie to Firestore
            await projectFirestore.collection('movies').add(newMovie)
            // Clearing form fields after successful submission
            setTitle('')
            setRating('')
            setGenre('')
            setMinAge('')
            setYear('')
            setTime('')
            setDirector('')
            setNation('')
            setDescription('')
        } catch (err) {
            showError('Film nebyl přidán' + err.message)
        }
    }

    return <section>
        <form onSubmit={submitForm}>
            {error && <p className='error-message'>{error}</p>}
            <input
                type='text'
                placeholder='Název filmu'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <input
                type='number'
                placeholder='Hodnocení (max 100%)'
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                min={0}
                max={100}
            />
            <input
                type='text'
                placeholder='Žánr'
                onChange={(e) => setGenre(e.target.value)}
                value={genre}
            />
            <input
                type='number'
                placeholder='Minimální věk'
                onChange={(e) => setMinAge(e.target.value)}
                value={minAge}
                min={1}
                max={21}
            />
            <input
                type='number'
                placeholder='Rok'
                onChange={(e) => setYear(e.target.value)}
                value={year}
                min={1895}
                max={2024}
            />
            <input
                type='number'
                placeholder='Délka filmu'
                onChange={(e) => setTime(e.target.value)}
                value={time}
                min={1}
            />
            <input
                type='text'
                placeholder='Režisér'
                onChange={(e) => setDirector(e.target.value)}
                value={director}
            />
            <input
                type='text'
                placeholder='Země původu'
                onChange={(e) => setNation(e.target.value)}
                value={nation}
            />
            <textarea
                className='description'
                type='text'
                placeholder='Popis filmu'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />
            <input
                type='submit'
                value='Přidat'
            />
        </form>
    </section>
}

export default Form