import {useCallback} from 'react';
import t from '../i18n';

function useTranslate() {
  return useCallback((...args) => {
    return t(...args);
  }, []);
}

export default useTranslate;
