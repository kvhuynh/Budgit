import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useState, useEffect } from "react";

import { createBudget } from "../services/internalApiService";

interface State {
  name: string,
  description: string
}

const initialState = {
  name: "",
  description: ""
}


export const CreateBudgetPopUp = (props: any) => {

  const [open, setOpen] = useState(false);
  // const [reload, setReload] = useState(props)

  const [budgetValues, setBudgetValues] = useState<State>(initialState);

  const handleClickOpen = () => {
      setOpen(true)
  }

  const handleClose = () => {
      setOpen(false)
  }

  const handleChange =
  (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudgetValues({ ...budgetValues, [prop]: event.target.value });
    
  };

  const handleSubmit = () => {
    setOpen(false)
    createBudget(budgetValues)
      .then((budget: any) => {
        props.reload();
        setBudgetValues({...budgetValues, name: "", description: ""})
        
      })
      .catch((error: any) => {
        console.log(error);
        
      })
  }

    return (
      <div>
      <Button variant="outlined" onClick={handleClickOpen}>
      + Create Budget
      </Button>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>New Budget</DialogTitle>
      <DialogContent>
          <DialogContentText>
          Enter a name and description for your budget!
          </DialogContentText>
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          fullWidth
          variant="standard"
          onChange={handleChange("name")}
          />
         <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Description"
          fullWidth
          variant="standard"
          onChange={handleChange("description")}
          />
      </DialogContent>
      <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
      </Dialog>
      </div>
      );
}

export default CreateBudgetPopUp;