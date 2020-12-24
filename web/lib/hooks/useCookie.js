import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function useCookie(name) {
  const [cookie, setCookie] = useState(null);

  useEffect(() => {
    setCookie(Cookies.get(name));
  }, []);

  return {
    cookie,
    setCookie
  };
}
