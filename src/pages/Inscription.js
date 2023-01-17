import { Helmet } from 'react-helmet-async';
import Paper from '@mui/material/Paper';
import { LoadingButton } from '@mui/lab';
import TextField from '@mui/material/TextField';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, } from "react-hook-form";
import axios from 'axios';
// @mui
import {useTranslation } from 'react-i18next';
import {  Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import "../Styles/Pages/Incription.css";


const Swal = require('sweetalert2');


// ----------------------------------------------------------------------




function Inscription() {
  const mdUp = useResponsive('up', 'md');
  
  const {t,i18n}=useTranslation();

  const schema = yup.object().shape({
    Nom: yup.string().required(t("enregistrerUser.ErOb")),
    Prenom: yup.string().required(t("enregistrerUser.ErOb")),
    Numero: yup.number(t("enregistrerUser.ErNumero")).required(t("enregistrerUser.ErOb")),
    Email: yup.string().email().required(t("enregistrerUser.ErOb")),
    Password: yup.string().required(t("enregistrerUser.ErOb")),
    ConfirmePassword: yup.string().required(t("enregistrerUser.ErOb")).oneOf([yup.ref('Password'),null],'Les Mots de passes ne sont pas identique')
  });


   const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
         
        axios.post("/person",{
          "firstname": data.Prenom,
          "lastname": data.Nom,
          "phoneNumber": data.phoneNumber,
          "email": data.Email,
          "password": data.password,
        }).then(function(response){
            Swal.fire({
              title: 'Enregistrer avec succes',
              text: data.Nom,
              icon: 'success',
              confirmButtonText: 'OK'
          })
        }).catch(function (error){
              console.log(error);
              Swal.fire({
                title: 'Server Error ',
                text: data.Nom,
                icon: 'error',
                confirmButtonText: 'OK'
              })
            });
     
    }


  return (
    
    <>
      <Helmet>
        <title> {t("enregistrerUser.titre")} </title>
      </Helmet>
       <div className='incription'>
       <form onSubmit={handleSubmit(onSubmitHandler)}>
    <Paper  sx={{padding:'34px',marginTop:'10%', margin:'32px',width:'fit-content'}} elevation={5} > 
     
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
   <Stack spacing={2}  >
    
    <TextField
    required
        {...register("Password")}
        label={t("enregistrerUser.l5")}
        type={'password'}
        variant='outlined'
        />
         <p id='error'>{errors.Password?.message}</p>
      <TextField
      required
        {...register("ConfirmePassword")}
        label={t("enregistrerUser.l6")}
        type={'password'}
        variant='outlined'
        />
          <p id='error'>{errors.ConfirmePassword?.message}</p>
    </Stack>
    <Stack spacing={4} id='footb' direction="row">
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

export default Inscription;