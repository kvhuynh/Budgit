import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { createUser } from "../services/internalApiService";


interface State {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string
  showPassword: boolean;
  showConfirmPassword: boolean;
  firstNameError: string,
  lastNameError: string,
  emailError: string,
  passwordError: string,
}

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword : "",
  showPassword: false,
  showConfirmPassword: false,
  firstNameError: "",
  lastNameError: "",
  emailError: "",
  passwordError: "",
}

const Register = () => {
  const [values, setValues] = useState<State>(initialState);

  // debugging purposes only
  // useEffect(() => { 
  //   console.log(values)
  // }, [values])

  const navigate = useNavigate();


  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
      
    };
    
  const handleSetErrors = (errorKey: string, errorMessage: string) => {
    setValues((values) => ({
      ...values, [errorKey]: errorMessage
    }))

  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  

  const handleSubmit = (event: any) => {
    event.preventDefault();
  
    // set all errors to default
    // setValues(initialState)
    setValues({...values, firstNameError: "", lastNameError: "", emailError: "", passwordError: "", })
    
    createUser(values)
      .then((user: any) => {
        console.log(user.errors);
        
        if (user.errors !== undefined) {
          console.log("what");
          
          for (let i = 0; i < user.errors.length; i++) {
            const errorKey = user.errors[i].path + "Error";
            handleSetErrors(errorKey, user.errors[i].message)    
          }
        } else {
          navigate("/dashboard")
        }
      })
      .catch((err: any) => {
        console.log(err);
      })

    
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          display: 'flex',
          flexDirection: 'column',
        }}
        noValidate
        autoComplete="off"
      >
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">First Name</InputLabel>
            <Input onChange={ handleChange("firstName") } />
          </FormControl>
        {values.firstNameError}

          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Last Name</InputLabel>
            <Input onChange={ handleChange("lastName") } />
          </FormControl>
        {values.lastNameError}


          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
            <Input onChange={ handleChange("email") } />
          </FormControl>
          {values.emailError}

          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={ handleChange('password') }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {values.passwordError}


          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showConfirmPassword ? 'text' : 'password'}
              value={values.confirmPassword}
              onChange={ handleChange('confirmPassword') }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          
      </Box>
      <Button variant="outlined" type="submit">Submit</Button>
    </form>
  );
}

export default Register;