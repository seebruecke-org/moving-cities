import { useState } from 'react';
import Cookies from 'js-cookie';

export default function useCookie(name) {
  const [cookie, setCookie] = useState(Cookies.get(name));

  const setCookieValue = (value) => {
    setCookie(value);

    if (value === null) {
      Cookies.remove(name);
    } else {
      Cookies.set(name, value);
    }
  };

  return {
    cookie,
    setCookie: setCookieValue
  };
}
