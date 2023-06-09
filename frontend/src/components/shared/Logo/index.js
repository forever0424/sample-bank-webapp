import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo.png';

const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
    textAlign: 'center',
    paddingBottom: '10px',
  },
  logo: {
    width: '150px',
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
      <span className={classes.title}>Sample Bank</span>
    </div>
  );
};

export default Logo;
