import React, {useState, useEffect} from 'react' 
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop:20,
  },
  media: {
    height: 150,
  },
  page: {
    marginTop: 30,
    marginLeft: 40,
    marginRight: 40,
  },
  genre: {
    color: "white",
    fontSize: "10px",
    backgroundColor: "#EA2027",
    borderRadius: "2px",
    height: "12px",
    marginRight: 3,
  },
  year: {
    color: "white",
    fontSize: "10px",
    backgroundColor: "#EE5A24",
    borderRadius: "2px",
    height: "12px",
    marginRight: 3,
  },
  rating: {
    color: "white",
    fontSize: "10px",
    backgroundColor: "#F79F1F",
    borderRadius: "2px",
    height: "12px",
    marginRight: 3,
  },
  duration: {
    color: "white",
    fontSize: "10px",
    backgroundColor: "#FFC312",
    borderRadius: "2px",
    height: "12px",
    marginRight: 3,
  },
   search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    border: 1,
    borderStyle: "solid",
    borderColor: "grey",
    borderRadius: 15,
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '50ch',
      },
    },
  },
}));



export default function Movies() {
	const [movieData, setmovieData] = useState(null)
	const classes = useStyles();
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
            axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
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

            return (
              <div className={classes.page}>
                   <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Temukan Film"

              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

              <Grid container spacing={3} className={classes.root}>
              {
                movieData !== null && movieData.map((item, index) => {
                  return(
                    <>
                    <div key={item.id}></div>
                    <Grid item xs={3}>
                    <Link className={classes.link} to={"/movies/"+item.id}>
                    <Card className={classes.root}>
                    <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={item.image_url}
                    title={item.title} 
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    {item.title} 
                    </Typography>
                    <Chip className={classes.year} label={item.year} />
                    <Chip className={classes.rating} label={item.rating} />
                    <Chip className={classes.duration} label={item.duration+"min"} />

                    </CardContent>
                    </CardActionArea>
                   
                    </Card>
                    </Link>
                    </Grid>
                    
                    </>
                    )
                })
              }
              </Grid>


              </div>
              );
          }