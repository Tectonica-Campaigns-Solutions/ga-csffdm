export const pathToModel = (model = null, slug = '') => {
  if (model === 'basicPage') {
    return `/${slug}`;
  } else if (model === 'work') {
    return `/work/${slug}`;
  } else if (model === 'post') {
    return `/post/${slug}`;
  } else if (model === 'event') {
    return `/event/${slug}`;
  } else if (model === 'organization') {
    return `/organization/${slug}`;
  } else if (model === 'resource') {
    return `/resources/${slug}`;
  } else if (model === 'form') {
    return `/take-action/${slug}`;
  } else if (model === 'conference') {
    return `/conference/${slug}`;
  } else if (model === 'conference_subtopic') {
    return `/conference/${slug}`;
  } else {
    return `/${slug}`;
  }
};

export const isArray = (array) => {
  return Array.isArray(array) && array.length > 0;
};

export const getCtaUrl = (cta) => {
  if (typeof cta === 'string') {
    return '/' + cta;
  }

  if (cta.model) {
    const { apiKey: model } = cta.model;
    return pathToModel(model, cta.slug);
  }

  if (cta.content?.model) {
    const { apiKey: model } = cta.content?.model;
    return pathToModel(model, cta.content?.slug);
  }

  if (cta.link?.content?.model) {
    const { apiKey: model } = cta.link?.content?.model;
    return pathToModel(model, cta.link?.content?.slug);
  }

  if (cta.content?.slug) {
    return `/${cta.content.slug}`;
  }

  if (cta.slug) {
    return `/${cta.slug}`;
  }

  const url = cta.link?.content ? '/' + cta.link?.content?.slug : cta.link?.url;
  return url;
};

export const formatDate = (rawDate) => {
  if (!rawDate) {
    return 'Invalid date';
  }

  const date = new Date(rawDate);

  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  // Get the month name
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthName = months[date.getMonth()];

  // Get the day and year
  const day = date.getDate();
  const year = date.getFullYear();

  // Construct the formatted date string
  const formattedDate = `${monthName} ${day}, ${year}`;

  return formattedDate;
};

export const formatDateAsYYMMDD = (rawDate) => {
  const date = new Date(rawDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const newDateString = `${year}-${month}-${day}`;
  return newDateString;
};

export const convertTime = (dateTimeString) => {
  const date = new Date(dateTimeString);

  // Get hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format hours and minutes with leading zeros if necessary
  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  const formattedTime = formattedHours + ':' + formattedMinutes;

  return formattedTime;
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + '...';
  }
};

export const MapCountry = {
  DR: 'Drenthe',
  FL: 'Flevoland',
  FR: 'Fryslân',
  GE: 'Gelderland',
  GR: 'Groningen',
  LI: 'Limburg',
  NB: 'Noord-Brabant',
  NH: 'Noord-Holland',
  OV: 'Overijssel',
  UT: 'Utrecht',
  ZE: 'Zeeland',
  ZH: 'Zuid-Holland',
};

// Time utils
export function formatRelativeDate(inputDate) {
  const dateFix = new Date(inputDate);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const inputYear = dateFix.getFullYear();
  const inputMonth = dateFix.getMonth();
  const inputDay = dateFix.getDate();

  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  const tomorrowYear = tomorrow.getFullYear();
  const tomorrowMonth = tomorrow.getMonth();
  const tomorrowDay = tomorrow.getDate();

  if (inputYear !== todayYear) {
    // Show year if it's a different year
    return `${inputDay} ${getMonthName(inputMonth)} ${inputYear}`;
  } else if (inputMonth === todayMonth && inputDay === todayDay) {
    // Today
    return `Vandaag ${formatTime(dateFix)}`;
  } else if (inputYear === tomorrowYear && inputMonth === tomorrowMonth && inputDay === tomorrowDay) {
    // Tomorrow
    return `Morgen ${formatTime(dateFix)}`;
  } else {
    // Other dates in the same year
    return `${inputDay} ${getMonthName(inputMonth)} ${formatTime(dateFix)}`;
  }
}

function getMonthName(monthIndex) {
  const months = ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  return months[monthIndex];
}

function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export const prepareQueryParam = (value) => {
  if (!value) return '';
  return value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]/g, '');
};

export function truncateToWords(str, n) {
  // Split the string into an array of words
  const words = str.split(' ');

  // If the number of words is less than or equal to n, return the original string
  if (words.length <= n) {
    return str;
  }

  // Slice the array to get the first n words and join them back into a string
  return words.slice(0, n).join(' ');
}