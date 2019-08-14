import { Button } from '@material-ui/core';
import * as React from 'react';
import inversifyServices from 'src/inversifyServices';
import Maybe from './Maybe';

const { i18n } = inversifyServices.common.i18NService;
const toggleLanguage = () => i18n.changeLanguage(i18n.language === 'ko' ? 'en' : 'ko');

const LanguageToggleButton: React.FC = () =>
  <Button onClick={toggleLanguage} style={{ minWidth: 'initial' }}>
    <Maybe test={!!i18n.language}>
      <img src={`/static/images/flags/${i18n.language === "ko" ? "en" : "ko"}.png`} width="20px" />
    </Maybe>
  </Button>

export default LanguageToggleButton;