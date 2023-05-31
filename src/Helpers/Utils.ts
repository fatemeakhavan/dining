import moment from 'moment-jalaali';
import { RefreshToken } from './RefreshToken';

export const toPersinaDigit = (digits: number | string): string => {
  const fa = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return digits.toString().replace(/[0-9]/g, function (w) {
    return fa[+w];
  });
};

export const FaDate = (standardTime: string) => {
  try {
    moment.loadPersian({
      dialect: 'persian-modern',
    });
    return toPersinaDigit(moment(standardTime, 'YYYY-MM-DDTHH:mm:ssZ').format('HH:mm:ss  -  jDD jMMMM jYYYY'));
  } catch {
    return '_';
  }
};

export const FaDateFromTimestamp = (timestamp: number) => {
  const newDate = new Date(timestamp);
  try {
    const standardTime =
      newDate.getFullYear() +
      '-' +
      ('0' + (newDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + newDate.getDate()).slice(-2) +
      'T' +
      ('0' + newDate.getHours()).slice(-2) +
      ':' +
      ('0' + newDate.getMinutes()).slice(-2) +
      ':' +
      ('0' + newDate.getSeconds()).slice(-2);
    return FaDate(standardTime);
  } catch (error) {
    return '-';
  }
};

export const IsJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const findHeaderLevel = (
  hString: string,
): {
  tag: string;
  level: number;
} => {
  let i;
  const tags = [
    { tag: '<h1', level: 1 },
    { tag: '<h2', level: 2 },
    { tag: '<h3', level: 3 },
    { tag: '<h4', level: 4 },
    { tag: '<h5', level: 5 },
    { tag: '<h6', level: 6 },
  ];
  const tag = hString.substr(0, 3);
  for (i = 0; i < tags.length; i++) {
    if (tag === tags[i].tag) break;
  }

  return tags[i];
};

export const getId = (content: string) => {
  const startPattern = 'id="';
  const startIndex = content.indexOf(startPattern);
  if (startIndex !== -1) {
    const endIndex = content.indexOf('"', startIndex + startPattern.length);
    return content.substring(startIndex + startPattern.length, endIndex);
  }
  return null;
};

export const isClasorAdmin = () => {
  return localStorage.getItem('POD_APPADMIN') === 'true';
};

export const translateVersionStatus = (status: string, state: string) => {
  let translated;
  switch (status) {
    case 'editing':
      translated = 'پیش نویس';
      break;
    case 'pending':
      translated = 'در انتظار تایید';
      if (state === 'draft') {
        translated = 'در انتظار تایید مدیر مخزن';
      } else if (state === 'version') {
        translated = 'در انتظار عمومی شدن';
      }
      break;
    case 'rejected':
      translated = 'رد شده';
      break;
    case 'accepted':
      translated = 'تایید شده';
      break;
    case 'public':
      translated = 'عمومی';
      break;
    case 'private':
      translated = 'خصوصی';
      break;
    default:
      translated = status;
  }
  return translated;
};

export const fileTypeIs = (extension: string): 'VIDEO' | 'AUDIO' | 'IMAGE' | null => {
  const videoExtensions = ['mp4', 'mov', 'wmv', 'flv', 'avi', 'avi', 'avchd', 'webm', 'mkv', 'ogv'];
  const audioExtensions = ['mp3', 'aac', 'ogg', 'flac', 'alac', 'wav', 'aiff', 'dsd'];
  const imageExtensions = ['tif', 'tiff', 'gif', 'png', 'eps', 'jpeg', 'jpg', 'raw'];

  if (videoExtensions.includes(extension)) {
    return 'VIDEO';
  } else if (audioExtensions.includes(extension)) {
    return 'AUDIO';
  } else if (imageExtensions.includes(extension)) {
    return 'IMAGE';
  }
  return null;
};

export const checkTokens = async (content: string) => {
  const expireTime = window.localStorage.getItem('POD_APPEXPIRE_TIME');
  if (expireTime && +new Date() - parseInt(expireTime) > 800000) {
    await RefreshToken();
    const token = window.localStorage.getItem('POD_APP:ACCESS_TOKEN');
    content = content.replace(/(Authorization=)+([a-zA-Z0-9]+)+&/g, `Authorization=${token}&`);
    return content;
  } else {
    return content;
  }
};

export const getFileIcon = (extension: string) => {
  const filesTypeSupported = [
    'docx',
    'doc',
    'xls',
    'xlsx',
    'gif',
    'jpg',
    'jpeg',
    'mkv',
    'mp3',
    'mp4',
    'pdf',
    'png',
    'rar',
    'txt',
    'zip',
    'mov',
    'webm',
  ];
  return filesTypeSupported.includes(extension) ? extension : 'unknown';
};

export const bytesToSize = (bytes: number) => {
  const TBVal = 1024 * 1024 * 1024 * 1024;
  const GBVal = 1024 * 1024 * 1024;
  const MBVal = 1024 * 1024;
  const KBVal = 1024;

  if (bytes >= TBVal) {
    return (bytes / TBVal).toFixed(2) + '  TB';
  } else if (bytes >= GBVal) {
    return (bytes / GBVal).toFixed(2) + '  GB';
  } else if (bytes >= MBVal) {
    return (bytes / MBVal).toFixed(2) + '  MB';
  } else if (bytes >= KBVal) {
    return (bytes / KBVal).toFixed(2) + '  KB';
  } else if (bytes >= 0) {
    return bytes.toString() + '  Byte';
  }

  return '0 Byte';
};

export const getFileExtension = (filename: string) => {
  const re = /(?:\.([^.]+))?$/;
  return re.exec(filename)?.[1];
};
