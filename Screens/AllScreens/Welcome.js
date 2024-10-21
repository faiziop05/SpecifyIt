import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../../Colors";
const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.WelcomeScreenWrapper}>
        <View>
          <Text style={styles.WelocmeText}>Welcome Back!</Text>
          <Text style={styles.WelocmeSubText}>
            Explore in-depth specifications, features, and comparisons of the
            latest and most popular mobile devices, helping you find the perfect
            match for your needs and preferences.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("MyTabs")}
          style={styles.ExploreBtn}
        >
          <Text style={styles.ExploreBtnText}>Explore</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.DARK_BLUE,
    flex: 1,
  },
  WelcomeScreenWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 80,
    padding: 20,
    marginBottom:30
  },
  WelocmeText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    fontStyle: "italic",
    marginBottom: 40,
    color: Colors.ORANGE,
  },
  WelocmeSubText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "italic",
    color: Colors.WHITE,
  },
  ExploreBtn: {
    width: 300,
    height: 50,
    backgroundColor: Colors.ORANGE,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  ExploreBtnText: {
    color: Colors.WHITE,
    fontWeight: "700",
    fontSize: 18,
  },
});
