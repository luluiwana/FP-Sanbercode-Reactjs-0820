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
        name: "", 
        platform: "", 
        release: 0,
        singlePlayer: 0,
        genre: "",
        multiplayer: 0,
        image_url: "", 
        id: null})

    useEffect(() => {
        if (movieData === null) {
            axios.get(`http://backendexample.sanbercloud.com/api/data-game`)
            .then(res => {
                setmovieData(res.data.map(el=>{ 
                    return {
                        id: el.id, 
                        name: el.name, 
                        platform: el.platform, 
                        release: el.release,
                        singlePlayer: el.singlePlayer,
                        genre: el.genre,
                        multiplayer: el.multiplayer,
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
            name: film.name, 
            platform: film.platform, 
            release: film.release, 
            singlePlayer: film.singlePlayer,
            genre: film.genre,
            multiplayer: film.multiplayer,
            image_url: film.image_url,
            id: idFilm})
    }

    const handleChange = (event) => {
        let typeOfInput = event.target.name

        switch(typeOfInput) {
            case "name":{
                setInput({...input, name: event.target.value});
                break
            }
            case "platform":{
                setInput({...input, platform: event.target.value});
                break
            }
            case "release":{
                setInput({...input, release: event.target.value});
                break
            }
            case "singlePlayer":{
                setInput({...input, singlePlayer: event.target.value});
                break
            }
            case "genre":{
                setInput({...input, genre: event.target.value});
                break
            }
            case "multiplayer":{
                setInput({...input, multiplayer: event.target.value});
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

        let name = input.name
        let platform = input.platform
        let genre = input.genre
        let image_url = input.image_url

        if(input.id === null) {
            axios.post(`http://backendexample.sanbercloud.com/api/movies`, {
                name, 
                platform, 
                release:input.release, 
                singlePlayer:input.singlePlayer, 
                genre, 
                multiplayer:input.multiplayer,
                image_url
            })
            .then(res => {
                setmovieData([...movieData, {
                    id: res.data.id,
                    name, 
                    platform, 
                    release:input.release, 
                    singlePlayer:input.singlePlayer, 
                    genre, 
                    multiplayer:input.multiplayer,
                    image_url
                }])
            })
        } else {
            axios.put(`http://backendexample.sanbercloud.com/api/movies/${input.id}`, {
                name:input.name, 
                platform:input.platform, 
                release:input.release, 
                singlePlayer:input.singlePlayer, 
                genre:input.genre, 
                multiplayer:input.multiplayer,
                image_url:input.image_url
            })
            .then(() => {
                let data = movieData.find(el => el.id === input.id)
                data.name = name 
                data.platform = platform 
                data.release = input.release 
                data.singlePlayer = input.singlePlayer 
                data.genre = genre 
                data.multiplayer = input.multiplayer
                data.image_url = image_url
                setmovieData([...movieData])
            })
        }

        setInput({
            name: "", 
            platform: "", 
            release: 0,
            singlePlayer: 0,
            genre: "",
            multiplayer: 0, 
            image_url: "",
            id: null
        })
    }

    return(
        <>
        <div className={classes.body}>
        <div className="section">

        <h1>Daftar Game</h1>
        <table>
        <thead>
        <tr>
        <th>No</th>
        <th>Nama</th>
        <th>Platform</th>
        <th>Tahun Rilis</th>
        <th>Genre</th>
        <th>Single Player</th>
        
        <th>Multi Player</th>
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
                    <td>{item.name}</td>
                    <td>{item.platform}</td>
                    <td>{item.release}</td>
                    <td>{item.genre}</td>
                    <td>{item.singlePlayer}</td>
                    
                    <td>{item.multiplayer}</td>
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
        <h1>Form Daftar Game</h1>

        <form onSubmit={handleSubmit}>
        <table>

        <tr>
        <td>Judul</td>
        <td><input  name="name" type="text" value={input.name} onChange={handleChange}/></td>
        </tr>

        <tr>
        <td>Deskripsi</td>
        <td>
        <input  name="platform" type="textArea" value={input.platform} onChange={handleChange}/></td>
        </tr>

        <tr>
        <td>Tahun</td>
        <td><input  name="release" type="text" value={input.release} onChange={handleChange}/></td>
        </tr>

        <tr>
        <td>Durasi</td>
        <td><input  name="singlePlayer" type="text" value={input.singlePlayer} onChange={handleChange}/></td>
        </tr>

        <tr>
        <td>Genre</td>
        <td><input  name="genre" type="text" value={input.genre} onChange={handleChange}/></td>
        </tr>

        <tr>
        <td>Rating</td>
        <td><input  name="multiplayer" type="text" value={input.multiplayer} onChange={handleChange}/></td>
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