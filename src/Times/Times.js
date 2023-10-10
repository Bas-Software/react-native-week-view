import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import styles from './Times.styles';
import { useVerticalDimensionContext } from '../utils/VerticalDimContext';
import NowLineTime from '../NowLineTime/NowLineTime';

const Times = ({
  times,
  containerStyle,
  textStyle,
  hourLabelContainerStyle,
  width,
  showNowTime,
  nowLineColor,
  beginAgendaAt,
  lineHeight,
  nowLineStyle,
  nowTimeLabelStyle,
  nowTimeLabelContainerStyle,
  formatTimeLabel,
}) => {
  const { timeLabelHeight } = useVerticalDimensionContext();
  const lineStyle = useAnimatedStyle(() => ({
    height: withTiming(timeLabelHeight.value),
  }));

  return (
    <View style={[styles.container, containerStyle, { width }]}>
      {showNowTime && (
        <NowLineTime
          width={width}
          beginAgendaAt={beginAgendaAt}
          color={nowLineColor}
          lineHeight={lineHeight}
          nowLineStyle={nowLineStyle}
          nowTimeLabelStyle={nowTimeLabelStyle}
          nowTimeLabelContainerStyle={nowTimeLabelContainerStyle}
          formatTimeLabel={formatTimeLabel}
        />
      )}
      {times.map((time) => (
        <Animated.View key={time} style={[styles.label, lineStyle]}>
          <View style={[hourLabelContainerStyle]}>
            <Text style={[styles.text, textStyle]}>{time}</Text>
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

Times.propTypes = {
  times: PropTypes.arrayOf(PropTypes.string).isRequired,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  width: PropTypes.number.isRequired,
  lineHeight: PropTypes.number,
  nowLineStyle: PropTypes.object,
  nowTimeLabelStyle: PropTypes.object,
  nowTimeLabelContainerStyle: PropTypes.object,
  formatTimeLabel: PropTypes.string,
};

export default React.memo(Times);
