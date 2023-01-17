
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useState } from 'react';
import {useTranslation } from 'react-i18next';


 export default function Language(){
    const {t,i18n}=useTranslation();
    const ChangeLanguage=(language)=>{
       i18n.changeLanguage(language)
    }
     const [Lang,SertLang]=useState(true);
    
  return (
    <div className="Multilanguage">
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="Français"
      >
        <Box id='box2' sx={{display: 'flex' }}>
        <FormControlLabel   onClick={()=>  ChangeLanguage("en")} value="English" control={<Radio />} label="English" />
        <FormControlLabel   onClick={()=>  ChangeLanguage("fr")} value="Français" control={<Radio />} label="Français" />
        </Box>
      </RadioGroup>
         
      <div> </div></div>
  );
}