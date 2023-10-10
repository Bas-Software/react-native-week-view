import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useDerivedValue,
    withTiming,
} from 'react-native-reanimated';
import PropTypes from 'prop-types';

import { minutesInDay } from '../utils/dates';
import { minutesInDayToTop } from '../utils/dimensions';
import styles from './NowLineTime.styles';
import { useVerticalDimensionContext } from '../utils/VerticalDimContext';
import moment from "moment";

const UPDATE_EVERY_MILLISECONDS = 60 * 1000; // 1 minute

const useMinutesNow = (updateEvery = UPDATE_EVERY_MILLISECONDS) => {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const intervalCallbackId = setInterval(
            () => setNow(new Date()),
            updateEvery,
        );

        return () => intervalCallbackId && clearInterval(intervalCallbackId);
    }, [setNow, updateEvery]);

    return minutesInDay(now);
};

const NowLineTime = ({ beginAgendaAt, color, width, nowLineStyle, nowTimeLabelStyle, nowTimeLabelContainerStyle, formatTimeLabel }) => {
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
                    width,
                },
                animatedStyle,
                nowLineStyle
            ]}
        >
            <View style={[
                styles.timeLabelContainer,
                {
                    backgroundColor: color,
                },
                nowTimeLabelContainerStyle,
            ]}>
                <Text
                    style={[
                        styles.timeLabel,
                        nowTimeLabelStyle
                    ]}
                >
                    {moment().startOf('day').add(minutesNow, 'minutes').format(formatTimeLabel)}
                </Text>
            </View>
        </Animated.View>
    );
};

NowLineTime.propTypes = {
    width: PropTypes.number.isRequired,
    beginAgendaAt: PropTypes.number,
    color: PropTypes.string,
    nowLineStyle: PropTypes.object,
    nowCircleStyle: PropTypes.object,
};

NowLineTime.defaultProps = {
    color: '#e53935',
    beginAgendaAt: 0,
};

export default React.memo(NowLineTime);
