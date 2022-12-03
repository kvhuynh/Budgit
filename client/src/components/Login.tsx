import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

import Button from '@mui/material/Button';

import { loginUser } from "../services/internalApiService";

import { useNavigate } from "react-router-dom"

interface State {
    email: string;
    password: string;
    validationError: string;
};

const initialState = {
    email: "kvhuynh820@gmail.com",
    password: "123456789",
    validationError: ""

}


export const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log(values);
        
    })

    const [values, setValues] = useState<State>(initialState);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        loginUser(values)
            .then((user) => {
                console.log(user);
                
                navigate(`/dashboard/`);
            })
            .catch((error: any) => {
                console.log(error);
                setValues({...values, validationError: "Invalid credentials"})
                
            })

    }

    const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
      
    };

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
                <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                <Input onChange={ handleChange("email") }  defaultValue="kvhuynh820@gmail.com"/>
              </FormControl>

    
              <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  onChange={ handleChange("password") }
                  defaultValue="123456789"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton

                      >

                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {values.validationError} 
          </Box>
          <Button variant="outlined" type="submit">Submit</Button>
        </form>
      );
}

export default Login;