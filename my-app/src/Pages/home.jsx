import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    margin:20,
    flexGrow: 1,
  },
   media: {
    height: 140,
  },
  link: {
    textDecoration:"none",
  },
}));

export default function MediaCard() {
  const classes = useStyles();

  return (
    <>
     <div className={classes.root}>
            <Grid container spacing={1}>
        <Grid item xs={6}>
        <Link className={classes.link} to="/movies">
        <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://img.freepik.com/free-vector/cinema-movie-concept_1302-12571.jpg?size=626&ext=jpg"
          title="Movie"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Jelajahi Film Terbaik
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Temukan ribuan film berkualitas di PLAYFIX
          </Typography>
        </CardContent>
      </CardActionArea>
     
      </Card>
      </Link>
        </Grid>
        <Grid item xs={6}>
           <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://img.freepik.com/free-vector/online-games-concept-illustration-with-computer_23-2148534483.jpg?size=626&ext=jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Jelajahi Game Terbaik
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Temukan ribuan game berkualitas di PLAYFIX
          </Typography>
        </CardContent>
      </CardActionArea>
      
      </Card>
        </Grid>
      </Grid>
    </div>
  </>
  );
}
