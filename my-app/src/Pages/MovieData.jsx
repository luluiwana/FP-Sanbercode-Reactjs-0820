import React, {useState, useEffect} from 'react' 
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    bottom:0,
  },
 body : {
    marginTop:30,
    marginLeft:50,
    marginRight:50,
  },
  button: {
    margin: theme.spacing(1),
    fontSize:5,
  },
}));

const DaftarFilm = () => {
    const classes = useStyles();
    const [movieData, setmovieData] = useState(null)
    const [input, setInput] = useState({
        title: "", 
        description: "", 
        year: 0,
        duration: 0,
        genre: "",
        rating: 0,
        image_url: "", 
        id: null})

    useEffect(() => {
        if (movieData === null) {
            axios.get(`http://backendexample.sanbercloud.com/api/data-movie`)
            .then(res => {
                setmovieData(res.data.map(el=>{ 
                    return {
                        id: el.id, 
                        title: el.title, 
                        description: el.description, 
                        year: el.year,
                        duration: el.duration,
                        genre: el.genre,
                        rating: el.rating,
                        image_url: el.image_url
                    }}))
            })
        }
    }, [movieData]);

    const deleteFilm = (event) => {
        let idFilm = parseInt(event.target.value)

        let newmovieData = movieData.filter(el => el.id !== idFilm)

        axios.delete(`http://backendexample.sanbercloud.com/api/movies/${idFilm}`)
        .then(res => {
            console.log(res)
        })

        setmovieData([...newmovieData])
    }

    const editForm = (event) => {
        let idFilm = parseInt(event.target.value)
        let film = movieData.find(x => x.id === idFilm)
        setInput({
            title: film.title, 
            description: film.description, 
            year: film.year, 
            duration: film.duration,
            genre: film.genre,
            rating: film.rating,
            image_url: film.image_url,
            id: idFilm})
    }

    const handleChange = (event) => {
        let typeOfInput = event.target.name

        switch(typeOfInput) {
            case "title":{
                setInput({...input, title: event.target.value});
                break
            }
            case "description":{
                setInput({...input, description: event.target.value});
                break
            }
            case "year":{
                setInput({...input, year: event.target.value});
                break
            }
            case "duration":{
                setInput({...input, duration: event.target.value});
                break
            }
            case "genre":{
                setInput({...input, genre: event.target.value});
                break
            }
            case "rating":{
                setInput({...input, rating: event.target.value});
                break
            }
            case "image_url":{
                setInput({...input, image_url: event.target.value});
                break
            }
            default: {break;}
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let title = input.title
        let description = input.description
        let genre = input.genre
        let image_url = input.image_url

        if(input.id === null) {
            axios.post(`http://backendexample.sanbercloud.com/api/movies`, {
                title, 
                description, 
                year:input.year, 
                duration:input.duration, 
                genre, 
                rating:input.rating,
                image_url
            })
            .then(res => {
                setmovieData([...movieData, {
                    id: res.data.id,
                    title, 
                    description, 
                    year:input.year, 
                    duration:input.duration, 
                    genre, 
                    rating:input.rating,
                    image_url
                }])
            })
        } else {
            axios.put(`http://backendexample.sanbercloud.com/api/movies/${input.id}`, {
                title, 
                description, 
                year:input.year, 
                duration:input.duration, 
                genre, 
                rating:input.rating,
                image_url
            })
            .then(() => {
                let data = movieData.find(el => el.id === input.id)
                data.title = title 
                data.description = description 
                data.year = input.year 
                data.duration = input.duration 
                data.genre = genre 
                data.rating = input.rating
                data.image_url = image_url
                setmovieData([...movieData])
            })
        }

        setInput({
            title: "", 
            description: "", 
            year: 0,
            duration: 0,
            genre: "",
            rating: 0, 
            image_url: "",
            id: null
        })
    }

    return(
        <>
        <div className={classes.body}>
        <div className="section">

        <h1>Daftar Film</h1>
        <table>
        <thead>
        <tr>
        <th>No</th>
        <th>Judul</th>
        <th>Deskripsi</th>
        <th>Tahun</th>
        <th>Durasi</th>
        <th>Genre</th>
        <th>Rating</th>
        <th>Gambar</th>
        <th>Opsi</th>
        </tr>
        </thead>
        <tbody>
        {
            movieData !== null && movieData.map((item, index) => {
                return(
                    <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.year}</td>
                    <td>{item.duration}</td>
                    <td>{item.genre}</td>
                    <td>{item.rating}</td>
                    <td><textarea style={{fontSize: 6 + 'px'}} disabled>{item.image_url}</textarea></td>
                    <td>
                  

                    <button value={item.id}  onClick={editForm}>Edit</button>
                    <button value={item.id} onClick={deleteFilm}>Hapus</button>
                    </td>
                    </tr>
                    )
            })
        }
        </tbody>
        </table>
        <br/>
        <br/>
        <h1>Form Daftar Film</h1>

        <form onSubmit={handleSubmit}>
        <table>

        <tr>
        <td>Judul</td>
        <td><input  name="title" type="text" value={input.title} onChange={handleChange}/></td>
        </tr>

        <tr>
        <td>Deskripsi</td>
        <td>
        <input  name="description" type="textArea" value={input.description} onChange={handleChange}/></td>
        </tr>

        <tr>
        <td>Tahun</td>
        <td><input  name="year" type="text" value={input.year} onChange={handleChange}/></td>
        </tr>

        <tr>
        <td>Durasi</td>
        <td><input  name="duration" type="text" value={input.duration} onChange={handleChange}/></td>
        </tr>

        <tr>
        <td>Genre</td>
        <td><input  name="genre" type="text" value={input.genre} onChange={handleChange}/></td>
        </tr>

        <tr>
        <td>Rating</td>
        <td><input  name="rating" type="text" value={input.rating} onChange={handleChange}/></td>
        </tr>

        <tr>
        <td>Gambar</td>
        <td><input  name="image_url" type="text" value={input.image_url} onChange={handleChange}/></td>
        </tr>

        </table>

        <button>Simpan</button>
        </form>

        </div>
        </div>

        </>
        )
    }

    export default DaftarFilm