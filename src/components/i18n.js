import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector) // auto-detect browser language
  .use(initReactI18next) // pass i18n to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome, {{name}}!",
          login: "Login",
          logout: "Logout",
          profile: "Profile"
        }
      },
      hi: {
        translation: {
          welcome: "स्वागत है, {{name}}!",
          login: "लॉगिन",
          logout: "लॉग आउट",
          profile: "प्रोफ़ाइल"
        }
      },
      te: {
        translation: {
          welcome: "స్వాగతం, {{name}}!",
          login: "లాగిన్",
          logout: "లాగ్ అవుట్",
          profile: "ప్రొఫైల్"
        }
      }
    },
    fallbackLng: "en", // default language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
