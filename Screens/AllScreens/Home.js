import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SectionList,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../Colors";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../ScreenSize";

import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://script.google.com/macros/s/AKfycbxNu27V2Y2LuKUIQMK8lX1y0joB6YmG6hUwB1fNeVbgzEh22TcDGrOak03Fk3uBHmz-/exec?route=recommended"
      );
      console.log(res.data);
      
      if (res.status == 200) {
        const sections = Object.keys(res.data.data).map((key) => ({
          title: res.data.data[key].title,
          data: res.data.data[key].data,
        }));
        setData(sections);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleItemClick = (key, id1, id2) => {
    navigation.navigate("SpecsDetails", {
      metadata: id1 && id2 ? { id1, id2 } : { key },
    });
  };

  return (
    <View style={styles.container}>
      <View>
       
        {
        isLoading && 
        <View style={styles.activityIndicatorWrapper}>

        <ActivityIndicator size={"large"} style={styles.activityIndicator} color={Colors.ORANGE} />
        </View>
        }

        <View style={styles.sectionListWrapper}>
          {data.length > 0 && (
            <SectionList
              sections={data}
              keyExtractor={(item, index) => item.key + "_" + index}
              renderItem={({ item }) => {
                return (

                    <TouchableOpacity
                      onPress={() =>
                        handleItemClick(
                          item.key,
                          item.device_one_id,
                          item.device_two_id
                        )
                      }
                      style={styles.HomeItemWrapper}
                    >
                      {item.device_image && (
                        <>
                          <Image
                            source={{ uri: item.device_image }}
                            style={styles.HomeItemImage}
                          />
                          <Text style={styles.HomeItemtitle}>
                            {item.device_name}
                          </Text>
                        </>
                      )}
                      {item.daily_hits && (
                        <View style={styles.HomeItemHitsitemWraper}>
                          <Text style={styles.HomeItemHitsNO}>{item.no}. </Text>
                          <View>
                            <Text style={styles.HomeItemtitle}>
                              {item.device_name}
                            </Text>
                            <Text style={styles.HomeItemHits}>
                              Daily Hits: {item.daily_hits}
                            </Text>
                          </View>
                        </View>
                      )}
                      {item.device_one_id && item.device_two_id && (
                        <Text style={styles.HomeItemtitle}>
                          {item.device_name}
                        </Text>
                      )}
                    </TouchableOpacity>

                );
              }}
              stickyHeaderHiddenOnScroll
              maxToRenderPerBatch={10}
              showsVerticalScrollIndicator={false}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.HomeItemheader}>{title}</Text>
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLACK,
    flex: 1,
    padding: 10,
  },
  activityIndicatorWrapper:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    position:"relative",
    height:'90%'
  },
  activityIndicator:{

   
  },

  HomeItemheader: {
    color: Colors.ORANGE,
    fontSize: 22,
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 5,
    backgroundColor: Colors.BLACK,
  },
  HomeItemWrapper: {
    backgroundColor: Colors.DARK_BLUE,
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    // alignItems:"center",
  },
  HomeItemtitle: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: "600",
    margin: 10,
  },
  HomeItemImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 10,
  },
  HomeItemHitsitemWraper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  HomeItemHitsNO: {
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: "700",
  },
  HomeItemHits: {
    color: Colors.ORANGE,
    marginHorizontal: 10,
  },
  sectionListWrapper: {
    display: "flex",
    flexDirection: "column",
  },
});
