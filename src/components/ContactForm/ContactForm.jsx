import { useDispatch } from 'react-redux';
import { addContact } from 'redux/contacts/operations';
import { Card, Button, TextField } from '@mui/material';
import { useState } from 'react';

export function ContactForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [nameError, setNameError] = useState(null);
  const [numberError, setNumberError] = useState(null);

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (
      !event.target.elements.name.value.match(
        event.target.elements.name.pattern
      )
    ) {
      setNameError(true);
    }
    if (
      !event.target.elements.number.value.match(
        event.target.elements.number.pattern
      )
    ) {
      setNumberError(true);
    }
    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
    setNameError(false);
    setNumberError(false);
  };

  return (
    <Card
      component="form"
      sx={{
        py: '35px',
        px: '30px',
        mx: 'auto',
        mb: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '350px',
        autoComplete: 'off',
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        required
        error={nameError}
        label="Name"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        variant="standard"
        color="primary"
        size="small"
        inputProps={{
          pattern: "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
        }}
        autoComplete="off"
        helperText="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      />
      <TextField
        required
        error={numberError}
        label="Number"
        type="tel"
        name="number"
        value={number}
        variant="standard"
        color="primary"
        size="small"
        onChange={handleChange}
        inputProps={{
          pattern: '^([+]?[s0-9]+)?(d{3}|[(]?[0-9]+[)])?([-]?[s]?[0-9])+$',
        }}
        helperText="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
      />
      <Button type="submit" variant="contained">
        Add contact
      </Button>
    </Card>
  );
}
