import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    bottom:0,
  },
  footer: {
  	color:"#352d33",
	backgroundColor: "#c0c0c0",
	marginTop:30,
  },
}));
 
export default function Footer() {
const classes = useStyles();
  return (
  	<Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      
        Playfix Indonesia
     {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}