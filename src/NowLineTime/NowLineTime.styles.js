import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 2,
    alignItems: 'center'
  },
  timeLabelContainer: {
    position: "absolute",
    top: -(32 + 2) / 2,
    borderRadius: 5,
    width: 50,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  timeLabel: {

  }
});

export default styles;
