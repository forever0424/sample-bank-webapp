import React, { useEffect, useState } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../shared/Logo';
import { button, root, link } from '../shared/styles';
import { isAuthenticated, login } from '../shared/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    ...root,
    color: 'white',
  },
  form: {
    width: '300px',
    color: '#ffffff',
  },
  button: { ...button, width: '150px' },
  linkButton: {
    color: '#00030e',
    textDecoration: 'none',
  },
  link,
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: '#000',
  },
}));

const Login = ({ history }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    branch: '',
    account: '',
    password: '',
    showPassword: false,
  });

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorTitle, setErrorTitle] = useState('');

  useEffect(() => {
    (async () => {
      const hasAuthenticated = await isAuthenticated();

      if (hasAuthenticated) {
        history.push('/my-account');
      } else {
        setError(true);
        setErrorTitle('Instructions');
        setErrorMsg('Branch: 0001 Account number: 12345 Password: Qwerty@123');
      }
    })();
  }, [history]);

  async function handleClick() {
    try {
      const branch = document.getElementById('branch').value;
      const account = document.getElementById('account').value;
      const password = document.getElementById('password').value;

      const loginIsSuccessful = await login(branch, account, password);

      if (loginIsSuccessful) {
        history.push('/my-account');
      } throw new Error();
    } catch (err) {
      setErrorTitle('Error');
      setErrorMsg('Login unsuccessful! Please, try again');
      setError(true);
    }
  }

  const handleCloseError = () => {
    setError(false);
    setErrorTitle('Error');
    setErrorMsg('');
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <Logo />
      <FormControl fullWidth={false} size="small" className={classes.form}>
        <TextField
          color="primary"
          id="branch"
          label="Branch:"
          InputProps={{
            style: { color: 'white' },
          }}
          InputLabelProps={{
            style: { color: 'white' },
            shrink: true,
          }}
          placeholder="0001"
          value={values.branch}
          onChange={handleChange('branch')}
        />
        <br />
        <TextField
          color="primary"
          id="account"
          label="Account Number:"
          InputProps={{
            style: { color: 'white' },
          }}
          InputLabelProps={{
            style: { color: 'white' },
            shrink: true,
          }}
          placeholder="12345"
          value={values.account}
          onChange={handleChange('account')}
        />
      </FormControl>
      <br />
      <FormControl fullWidth={false} size="small" className={classes.form}>
        <InputLabel htmlFor="password" style={{ color: '#fff' }} shrink>
          Password
        </InputLabel>
        <Input
          id="password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          placeholder="*****"
          style={{ color: '#fff' }}
          endAdornment={(
            <InputAdornment
              position="end"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </InputAdornment>
          )}
        />
      </FormControl>
      <br />
      <Button
        variant="outlined"
        size="large"
        fullWidth
        className={classes.button}
        onClick={handleClick}
      >
        <center>
          <b>Sign in</b>
        </center>
      </Button>
      <Modal
        className={classes.modal}
        open={error}
        onClose={handleCloseError}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={error}>
          <div className={classes.paper}>
            <h2>{errorTitle}</h2>
            <p>{errorMsg}</p>

            <Box display="flex" p={3} mx="auto" justifyContent="center">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseError}
              >
                OK
              </Button>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Login;
