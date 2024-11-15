import { FormControl, InputLabel, OutlinedInput } from '@mui/material'
import React from 'react'

export default function InputText({ placeholder = "",type='text',autocomplete="",onChangeFn}) {
  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password" onChange={e => onChangeFn(e.target.value)}>
        {placeholder}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        label={placeholder}
        type={type}
        autoComplete={autocomplete}
      />
    </FormControl>
  )
}
