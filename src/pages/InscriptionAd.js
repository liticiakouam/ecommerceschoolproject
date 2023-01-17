import { Helmet } from 'react-helmet-async';
import Paper from '@mui/material/Paper';
import { LoadingButton } from '@mui/lab';
import TextField from '@mui/material/TextField';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, } from "react-hook-form";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import FormControl from '@mui/material/FormControl';
// @mui
import {useTranslation } from 'react-i18next';
import {  Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import "../Styles/Pages/Incription.css";

const Swal = require('sweetalert2');

// ----------------------------------------------------------------------

function InscriptionAd() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
      };
    

  const mdUp = useResponsive('up', 'md');
  
  const {t,i18n}=useTranslation();

  const schema = yup.object().shape({
    Nom: yup.string().required(t("enregistrerUser.ErOb")),
    Prenom: yup.string().required(t("enregistrerUser.ErOb")),
    Numero: yup.number(t("enregistrerUser.ErNumero")).integer(t("enregistrerUser.ErNumero")).required(t("enregistrerUser.ErOb")),
    Email: yup.string().email().required(t("enregistrerUser.ErOb")),
    Password: yup.string().min(8).required(t("enregistrerUser.ErOb")),
  
  });


   const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
       
      Swal.fire({
        title: 'Enregistrer avec succes',
        text: data.Nom,
        icon: 'success',
        confirmButtonText: 'OK'
      })
    }


  return (
    
    <>
      <Helmet>
        <title> {t("enregistrerUser.titre")} </title>
      </Helmet>
       <div >
       <form  onSubmit={handleSubmit(onSubmitHandler)}>
    <Paper  sx={{padding:'34px', marginTop:'30px', margin:'32px',width:'fit-content'}} elevation={5} > 
     
           <Divider id='text1'>{t("enregistrerUser.titre")}</Divider>
    <Stack spacing={4}  >
   <Stack spacing={4} direction='row'>
   <Stack  spacing={2} direction='column'>
    <Typography>{t("enregistrerUser.t1")}</Typography>
   <TextField 
   required
    {...register("Prenom")}
       label={t("enregistrerUser.l1")}
       variant='outlined'
       />
       <p id='error'>{errors.Prenom?.message}</p>
 <TextField 
 required
     {...register("Nom")}
       label={t("enregistrerUser.l2")}
       variant='outlined'
       />
        <p id='error'>{errors.Nom?.message}</p>
   </Stack>
  
   <Stack spacing={2}  direction='column'>
   <Typography>Infos Adresse</Typography>
   <TextField 
   required
    {...register("Numero")}
       label={t("enregistrerUser.l3")}
       variant='outlined'
       />
        <p id='error'>{errors.Numero?.message}</p>
 <TextField 
 required
  {...register("Email")}
       type="email"
       label={t("enregistrerUser.l4")}
       variant='outlined'
       />
        <p id='error'>{errors.Email?.message}</p>
   </Stack>
   </Stack>

   <Typography>Identification</Typography>
   <Stack spacing={4}  >
    
    <TextField
        {...register("Password")}
        label={t("enregistrerUser.l5")}
        variant='outlined'
        />

    </Stack>
    <Typography>Role</Typography>
   <Stack spacing={4}  >
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
           <MenuItem value={10}>Administrateur</MenuItem>
          <MenuItem value={20}>Gestionnaire</MenuItem>
        </Select>
      </FormControl>

    </Stack>
    <Stack spacing={4} direction="row">
     <LoadingButton variant='contained' type="submit" >{t("enregistrerUser.butv")}</LoadingButton>
     <Button variant='contained' type='reset'  color='error'>{t("enregistrerUser.butr")}</Button>
    </Stack>
       
       </Stack>
       
       </Paper>  
       </form>   
        </div>
    </>
  );
}

export default InscriptionAd;