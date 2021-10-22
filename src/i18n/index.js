import arMessages from './messages/ar.json';

import caMessages from './messages/ca.json';
import heMessages from './messages/he.json';
import idMessages from './messages/id.json';
import plMessages from './messages/pl.json';
import ruMessages from './messages/ru.json';
import thMessages from './messages/th.json';
import ukMessages from './messages/uk.json';

// no need to import en messages-- they are in the defaultMessage field
import es419Messages from './messages/es_419.json';
import frMessages from './messages/fr.json';
import kokrMessages from './messages/ko_KR.json';
import ptbrMessages from './messages/pt_BR.json';
import zhcnMessages from './messages/zh_CN.json';

const messages = {
  ar: arMessages,
  ca: caMessages,
  he: heMessages,
  id: idMessages,
  pl: plMessages,
  ru: ruMessages,
  th: thMessages,
  uk: ukMessages,
  'es-419': es419Messages,
  fr: frMessages,
  'zh-cn': zhcnMessages,
  'ko-kr': kokrMessages,
  'pt-br': ptbrMessages,
};

export default messages;
