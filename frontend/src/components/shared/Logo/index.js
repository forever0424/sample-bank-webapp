import React from 'react';
import logo from '../../../assets/img/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '100px',
    margin: 0,
    textAlign: 'center',
    paddingBottom: '40px',
  },
  logo: {
    width: '200px',
  },
  title: {
    color: '#d4af37',
  },
}));

const Logo = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link to="/">
        <img src={logo} alt="logo" className={classes.logo} />
      </Link>
      <br />
      <span className={classes.title}>Serverless Bank</span>
    </div>
  );
};

export default Logo;