import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import PropTypes from 'prop-types';

import { minutesInDayToTop } from '../utils/dimensions';
import styles from './NowLine.styles';
import { useVerticalDimensionContext } from '../utils/VerticalDimContext';
import { useMinutesNow } from '../utils/misc';

const NowLine = ({
  beginAgendaAt,
  color,
  width,
  nowLineStyle,
  nowCircleStyle,
  lineHeight,
  circleSize,
}) => {
  const { verticalResolution } = useVerticalDimensionContext();
  const minutesNow = useMinutesNow();

  const currentTop = useDerivedValue(() =>
    minutesInDayToTop(minutesNow, verticalResolution, beginAgendaAt),
  );

  const animatedStyle = useAnimatedStyle(() => ({
    top: withTiming(currentTop.value),
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderColor: color,
          borderTopWidth: lineHeight,
          width,
        },
        animatedStyle,
        nowLineStyle,
      ]}
    >
      <View
        style={[
          styles.circle,
          {
            backgroundColor: color,
            top: -(circleSize + lineHeight) / 2,
            height: circleSize,
            width: circleSize,
            borderRadius: circleSize,
          },
          nowCircleStyle,
        ]}
      />
    </Animated.View>
  );
};

NowLine.propTypes = {
  width: PropTypes.number.isRequired,
  beginAgendaAt: PropTypes.number,
  color: PropTypes.string,
  nowLineStyle: PropTypes.object,
  nowCircleStyle: PropTypes.object,
  lineHeight: PropTypes.number,
  circleSize: PropTypes.number,
};

NowLine.defaultProps = {
  color: '#e53935',
  beginAgendaAt: 0,
  lineHeight: 1.5,
  circleSize: 8,
};

export default React.memo(NowLine);
