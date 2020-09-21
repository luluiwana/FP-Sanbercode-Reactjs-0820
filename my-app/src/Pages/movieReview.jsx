import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useParams } from "react-router-dom";
import axios from 'axios';
import React, {useState, useEffect} from 'react' 
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';



const useStyles = makeStyles((theme) => ({
  root: {
     display: 'flex',
  },
  page : {
    paddingTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 500,
  },
    controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },

}));
 
export default function MovieReview() {
  const classes = useStyles();
  const [movieData, setMovieData] = useState({})
  var {id} = useParams();

  useEffect(() => {
     fetchMovie()
  }, [])

  const fetchMovie = async() => {
      const res = await axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
      setMovieData(res.data)
   }

  return (
    <div className={classes.page}>
          <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h2" variant="h2">
            {movieData.title} ({movieData.year})
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {movieData.genre}
          </Typography>
          <Typography variant="subtitle1">
            <b>Rating</b> : {movieData.rating}
          </Typography>
          <Typography variant="subtitle1">
            <b>Durasi</b> : {movieData.duration} menit
          </Typography>
          <Typography variant="body1">
            <b>Deskripsi </b> : <br/>{movieData.description}
          </Typography>
          <Typography variant="body1">
            <b>Review </b> : <br/>{movieData.review}
          </Typography>
        </CardContent>
        </div>

      <CardMedia
        className={classes.cover}
        image={movieData.image_url}
        title={movieData.title}
      />
    </Card>
    </div>
  );
}