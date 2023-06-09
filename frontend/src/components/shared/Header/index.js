import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../../assets/img/logo.png';

const useStyles = makeStyles(() => ({
  exit: {
    textAlign: 'right',
    float: 'right',
    width: '40px',
    color: '#fff',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': { color: '#d4af37' },
  },
  title: {
    textAlign: 'left',
    float: 'left',
    width: '170px',
    fontSize: '25px',
    paddingRight: '5px',
  },
  root: {
    paddingBottom: '10px',
    width: '90vw',
    maxWidth: '500px',
  },
  logo: {
    textAlign: 'left',
    float: 'left',
    width: '40px',
  },
  logoImg: {
    width: '30px',
  },
}));

const Header = ({ title, historyParent, handleSignOutParent }) => {
  const classes = useStyles();

  const handleSignOut = async () => {
    historyParent.push('/');
  };

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <img src={logo} alt="logo" className={classes.logoImg} />
      </div>
      <div className={classes.title}>{title}</div>
      <div className={classes.exit}>
        <ExitToAppIcon onClick={handleSignOutParent || handleSignOut} />
      </div>
    </div>
  );
};

export default Header;
