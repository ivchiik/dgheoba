import { useTranslation } from "react-i18next";

import { changeLanguage, SUPPORTED_LANGUAGES, type Language } from "@/i18n";

export const useSettings = () => {
  const { i18n } = useTranslation();

  const handleSelectLanguage = (next: Language) => {
    void changeLanguage(next);
  };

  return {
    currentLanguage: i18n.language,
    languages: SUPPORTED_LANGUAGES,
    handleSelectLanguage,
  };
};
