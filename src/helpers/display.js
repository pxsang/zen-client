import numbro from 'numbro';

export const numberFormat = number =>
  numbro(number || 0).format({thousandSeparated: true});

export const experienceFormat = experience =>
  numbro(experience || 0).format({
    thousandSeparated: true,
    mantissa: 1,
  });

export const ratingFormat = rating =>
  numbro(rating || 0).format({
    thousandSeparated: true,
    mantissa: 1,
  });

export const percentFormat = percent =>
  numbro(percent || 0).format({
    output: 'percent',
    mantissa: 1,
  });

export const getFullName = (firstName, lastName) => `${firstName} ${lastName}`;

export const priceFormat = price =>
  numbro(price || 0).formatCurrency({
    thousandSeparated: true,
    currencyPosition: 'postfix',
    currencySymbol: 'đ',
    spaceSeparated: true,
  });

export const phoneNumberFormat = phoneNumber => {
  if (!phoneNumber) return '';

  let cleaned = convertTo0PhoneNumber(phoneNumber);
  var match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);
  if (match) {
    return match[1] + ' ' + match[2] + ' ' + match[3];
  }

  return '';
};

export const convertTo0PhoneNumber = phone => {
  const cleanedPhone = phone.replace(/\s+/g, '');

  let phoneNumber = cleanedPhone;

  if (cleanedPhone.startsWith('+84')) {
    const removed84PhoneNumber = cleanedPhone.replace('+84', '');

    if (removed84PhoneNumber.startsWith('0')) {
      phoneNumber = removed84PhoneNumber;
    } else {
      phoneNumber = '0' + removed84PhoneNumber;
    }
  }

  return phoneNumber;
};

export const phoneValidator = phoneNumber => {
  if (phoneNumber.startsWith('0')) {
    return phoneNumber.length === 10;
  }

  return phoneNumber.length === 9;
};

export const distanceFormat = distance => {
  if (distance < 1000) {
    return `${distance}m`;
  }

  const km = distance / 1000;

  return `${km.toFixed(1)}km`;
};

// const REGEX_VALIDATE_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// export const emailValidator = email => {};
