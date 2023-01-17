import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import {initReactI18next} from "react-i18next";

// translations are already at
// '../public/locales/en/translation.json'
// which is the default for the xhr backend to load from

// passes i18n down to react-i18next
 i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
   
  lng:'fr',
  fallbackLng: "en",
  debug:true,

   detection:{
    order:['queryString','cookie'],
    caches:['cookie']
   },
   
   interpolation: {
    escapeValue: false, // react already safes from xss
  },


 });
 /*
 .init({
  // use en if detected lng is not available
 
  detection:{
        order:['queryString','cookie'],
        cache:['cookie']
  },

  
  interpolation: {
    escapeValue: false, // react already safes from xss
  },

 
});
*/

export default i18n;