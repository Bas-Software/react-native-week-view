/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { minutesInDay } from './dates';

/**
 * Module operator.
 * When `num < 0`, works different than raw remainder operator: num % divider
 * */
export const mod = (num, divider) => ((num % divider) + divider) % divider;

export const useMinutesNow = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    let timeOutId = null;

    const updateNow = () => {
      setNow(new Date());
      timeOutId = setTimeout(
        updateNow,
        moment().endOf('minute').diff(moment()),
      );
    };

    updateNow();

    return () => timeOutId && clearTimeout(timeOutId);
  }, [setNow]);

  return minutesInDay(now);
};
