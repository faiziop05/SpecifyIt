import {
  ActivityIndicator,
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../Colors";
import axios from "axios";
import { SCREEN_HEIGHT } from "../../ScreenSize";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FlatList } from "react-native-gesture-handler";
const SpecsDetails = ({ route, navigation }) => {
  const { metadata } = route.params;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (key) => {
    try {
      const RequestBody = {
        route: "device-detail",
        key: metadata.key || key,
      };
      const res = await axios.post(
        "https://script.google.com/macros/s/AKfycbxNu27V2Y2LuKUIQMK8lX1y0joB6YmG6hUwB1fNeVbgzEh22TcDGrOak03Fk3uBHmz-/exec",
        RequestBody
      );
      if (res.status == 200) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchData2 = async (key) => {
    try {
      setIsLoading(true);
      const RequestBody = {
        route: "device-detail",
        key: key,
      };
      const res = await axios.post(
        "https://script.google.com/macros/s/AKfycbxNu27V2Y2LuKUIQMK8lX1y0joB6YmG6hUwB1fNeVbgzEh22TcDGrOak03Fk3uBHmz-/exec",
        RequestBody
      );
      if (res.status == 200) {
        setData(res.data.data);
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

  const handleMoreDevicePress = (key) => {
    fetchData2(key);
  };

  const RenderItem = ({ data }) => {
    return (
      <TouchableOpacity
        onPress={() => handleMoreDevicePress(data.key)}
        style={styles.FlatListItemBtn}
      >
        <Image
          source={{ uri: data.device_image }}
          style={styles.FlatlistImage}
        />
        <Text style={styles.FlatListitemTitle}>{data.device_name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {isLoading && (
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              size={"large"}
              style={styles.activityIndicator}
              color={Colors.ORANGE}
            />
          </View>
        )}
        {!isLoading && (
          <View style={styles.sectionListWrapper}>
            {!isLoading && data?.more_specification.length > 0 && (
              <SectionList
                ListHeaderComponent={() => {
                  return (
                    <View style={styles.imageHeadingWrapper}>
                      <Image
                        source={{ uri: data?.device_image }}
                        style={styles.deviceImage}
                      />
                      <View style={styles.imageHeadingRightWrapper}>
                        <View>
                          <Text style={styles.DevceNameHeading}>
                            {data?.device_name}
                          </Text>
                          <Text style={styles.DevceTempDetails}>
                            Battery: {data?.battery}
                          </Text>
                          <Text style={styles.DevceTempDetails}>
                            Camera: {data?.camera}
                          </Text>
                          <Text style={styles.DevceTempDetails}>
                            Dispay Size: {data?.display_size}
                          </Text>
                          <Text style={styles.DevceTempDetails}>
                            Chipset: {data?.chipset}
                          </Text>
                        </View>

                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("ImagesScreen", {
                              imagesArray: data?.pictures,
                            })
                          }
                          style={styles.MoreImagesButton}
                        >
                          <Text style={styles.MoreImagesButtonText}>
                            More Images
                          </Text>
                          <AntDesign
                            name="arrowright"
                            size={20}
                            color={Colors.ORANGE}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
                sections={data?.more_specification}
                keyExtractor={(item, index) => item.key + "_" + index}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.DeatailedSpecsWrapper}>
                      <Text style={styles.DetailedSpecsitems}>
                        <Text style={styles.DetailedSpecsitemsHeading}>
                          {item.title}:
                        </Text>{" "}
                        {item.data[0]}{" "}
                      </Text>
                    </View>
                  );
                }}
                ItemSeparatorComponent={() => {
                  return <View style={styles.ItemSeparatorComponent}></View>;
                }}
                stickyHeaderHiddenOnScroll
                maxToRenderPerBatch={10}
                showsVerticalScrollIndicator={false}
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={styles.itemSpecsHeader}>{title}</Text>
                )}
                ListFooterComponent={() => {
                  return (
                    <View>
                      <View>
                        <Text style={styles.MoreMobileHeading}>
                          {data.key && Object.keys(data.more_information)[0]}
                        </Text>
                        <FlatList
                          horizontal
                          maxToRenderPerBatch={5}
                          data={
                            data.key && Object.values(data.more_information)[0]
                          }
                          renderItem={({ item }) => <RenderItem data={item} />}
                        />
                      </View>
                      <View>
                        <Text style={styles.MoreMobileHeading}>
                          {data.key && Object.keys(data.more_information)[1]}
                        </Text>
                        <FlatList
                          horizontal
                          maxToRenderPerBatch={5}
                          data={
                            data.key && Object.values(data.more_information)[1]
                          }
                          renderItem={({ item }) => <RenderItem data={item} />}
                        />
                      </View>
                    </View>
                  );
                }}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default SpecsDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLACK,
    flex: 1,
    padding: 10,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  activityIndicatorWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "90%",
  },
  activityIndicator: {},
  imageHeadingWrapper: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#aaa2",
    borderRadius: 10,
    marginBottom: 20,
    padding: 5,
  },

  deviceImage: {
    resizeMode: "contain",
    width: 155,
    height: 200,
    borderRadius: 12,
  },
  imageHeadingRightWrapper: {
    marginLeft: 10,
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  MoreImagesButton: {
    alignSelf: "flex-start",
    justifyContent: "flex-end",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  MoreImagesButtonText: {
    color: Colors.ORANGE,
    fontSize: 20,
  },
  DevceNameHeading: {
    color: Colors.ORANGE,
    fontSize: 20,
  },
  DevceTempDetails: {
    color: Colors.WHITE,
  },
  itemSpecsHeader: {
    color: Colors.ORANGE,
    fontSize: 18,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderColor: Colors.LIGHT_BLUE,
  },
  ItemSeparatorComponent: {
    margin: 1,
  },
  sectionListWrapper: {
    padding: 10,
    backgroundColor: Colors.DARK_BLUE,
    marginTop: 10,
    borderRadius: 10,
  },

  DetailedSpecsitems: {
    color: Colors.WHITE,
    fontWeight: "400",
  },
  DetailedSpecsitemsHeading: {
    color: Colors.WHITE,
    fontWeight: "900",
  },
  MoreMobileHeading: {
    color: Colors.ORANGE,
    marginTop: 20,
    fontSize: 24,
  },
  FlatListItemBtn: {
    marginHorizontal: 5,
    flexDirection: "column",
    alignItems: "center",
    width: 100,
    padding: 5,
  },
  FlatListitemTitle: {
    color: Colors.WHITE,
  },
  FlatlistImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
});
