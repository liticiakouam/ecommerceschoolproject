import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, } from "react-hook-form";
import * as yup from "yup";
import {useTranslation } from 'react-i18next';
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Stack, IconButton, InputAdornment, TextField} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import Iconify from '../../../components/iconify';
import Language from '../../../pages/TestLangauge';

// ----------------------------------------------------------------------*
const Swal = require('sweetalert2');

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(2).max(32).required(),
});


export default function LoginForm() {
  
const navigate = useNavigate();

  const {t,i18n}=useTranslation();
  const [load,setLoad] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = (data) => {
        if(data.email==="afowa@gmail.com" && data.password === "12345678"){
          
          localStorage.setItem('role', JSON.stringify('admin'));
          localStorage.setItem('auth', JSON.stringify(true));
          
          navigate('/app', { replace: true });
          
        }else{
          Swal.fire({
            title: 'Mauvaise Authentification',
            text: 'Veillez Saisir des identifiants Valide',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }

   
/*    axios.post(

    ).then().catch(
    
      Swal.fire({
       title: 'Mauvaise Authentification',
       text: 'Veillez Saisir des identifiants Valide',
       icon: 'error',
       confirmButtonText: 'OK'
     })
    
    )
     */
     
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
    <>
       
      <Stack spacing={3}>
        <TextField 
        disabled={load}
         {...register("email")}
        name="email" 
        placeholder={t("login.placeholder1")}
        label={t("login.label1")} />
     <p>{errors.email?.message}</p>
        <TextField
          disabled={load}
          {...register("password")}
          name="password"
          placeholder={t("login.placeholder2")}
          label={t("login.label2")}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
         <p>{errors.password?.message}</p>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
        <Language/>
      </Stack>
        
      <LoadingButton  loading={load} fullWidth size="large" type="submit" variant="contained" >
        {t("login.button1")}
      </LoadingButton>
    </>
  
    </form>
  );
}
