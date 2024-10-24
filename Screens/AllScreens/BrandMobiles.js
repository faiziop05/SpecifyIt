import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../Colors";
import { SCREEN_HEIGHT } from "../../ScreenSize";

const BrandMobiles = ({ route, navigation }) => {
  const { BrandData } = route.params;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Set false initially to avoid showing spinner at the start
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    if (isLoading || !hasMore) return; // Prevent multiple calls when already loading or no more data

    setIsLoading(true); // Set loading as soon as the function is called

    try {
      if (BrandData) {
        const ReqBody = {
          route: "device-list-by-brand",
          brand_id: BrandData.brand_id,
          brand_name: BrandData.brand_name,
          page: page,
        };
        const res = await axios.post(
          "https://script.google.com/macros/s/AKfycbxNu27V2Y2LuKUIQMK8lX1y0joB6YmG6hUwB1fNeVbgzEh22TcDGrOak03Fk3uBHmz-/exec",
          ReqBody
        );
        if (res.status === 200) {
          const newData = res.data.data.device_list;
          setData((prev) => [...prev, ...newData]); // Append new data to the state

          if (res.data.data.total_page && res.data.data.total_page > page) {
            setPage((prev) => prev + 1); // Increase the page for the next fetch
          } else {
            setHasMore(false); // No more pages
          }
        } else {
          console.error("Error: Non-200 status code:", res.status);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(); // Fetch data initially when the component is mounted
  }, []);

  const handleItemClick = (key) => {
    navigation.navigate("SpecsDetails", {
      metadata: { key },
    });
  };

  const RenderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleItemClick(item.key)}
        style={styles.HomeItemWrapper}
      >
        {item.device_image && (
          <>
            <Image
              source={{ uri: item.device_image }}
              style={styles.HomeItemImage}
            />
            <Text style={styles.HomeItemTitle}>{item.device_name}</Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {data.length === 0 && isLoading ? ( // Show loading indicator if no data is available yet
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            size={"large"}
            style={styles.activityIndicator}
            color={Colors.ORANGE}
          />
        </View>
      ) : (
        <FlatList
          data={data} // Corrected to pass the actual data array
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={(item) => item.key.toString()} // Ensure each item has a unique key
          onEndReached={fetchData} // Fetch next page when end reached
          onEndReachedThreshold={0.7} // Trigger fetch when 50% from the bottom
          ListFooterComponent={() =>
            isLoading ? (
              <ActivityIndicator style={{paddingBottom:100,
                marginBottom:100
              }} size="large" color={Colors.ORANGE} />
            ) : null
          }
        />
      )}
    </View>
  );
};

export default BrandMobiles;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLACK,
    padding: 5,
    minHeight: SCREEN_HEIGHT,
  },
  activityIndicatorWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "80%",
  },
  HomeItemWrapper: {
    backgroundColor: Colors.DARK_BLUE,
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
  },
  HomeItemTitle: {
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
});
