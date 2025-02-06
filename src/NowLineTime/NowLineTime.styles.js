import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2,
    alignItems: 'center',
  },
  timeLabelContainer: {
    position: 'absolute',
    top: -(32 + 2) / 2,
    width: 50,
    height: 32,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeLabel: {
    color: 'white',
  },
});

export default styles;
