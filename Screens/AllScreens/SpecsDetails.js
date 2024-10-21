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
const SpecsDetails = ({ route }) => {
  const { metadata } = route.params;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const RequestBody = {
    route: "device-detail",
    key: metadata.key,
  };

  const fetchData = async () => {
    try {
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

  // console.log(data.more_specification[0].title);

  return (
    <View style={styles.container}>
      <View>
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
            {!isLoading && data.more_specification.length > 0 && (
              <SectionList
                ListHeaderComponent={() => {
                  return (
                    <View style={styles.imageHeadingWrapper}>
                      <Image
                        source={{ uri: data?.device_image }}
                        style={styles.deviceImage}
                      />
                      <View style={styles.imageHeadingRightWrapper}>
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

                        <TouchableOpacity style={styles.MoreImagesButton}>
                          <Text style={styles.MoreImagesButtonText}>
                            More Pics{" "}
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
                sections={data.more_specification}
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
});

const da = {
  battery: "5000mAh",
  batteryType: "18W",
  body: "8.2mm thickness",
  camera: "50MP",
  chipset: "Snapdragon 4s Gen 2",
  comment: "Preliminary unofficial specifications",
  device_image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-14r.jpg",
  device_name: "Xiaomi Redmi A4",
  display_res: "1080x2400 pixels",
  display_size: '6.7"',
  key: "xiaomi_redmi_a4-13444",
  more_information: {
    "Popular from Xiaomi": [
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
    ],
    "Related Devices": [
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
    ],
  },
  more_specification: [
    { data: [Array], title: "Network" },
    { data: [Array], title: "Launch" },
    { data: [Array], title: "Body" },
    { data: [Array], title: "Display" },
    { data: [Array], title: "Platform" },
    { data: [Array], title: "Memory" },
    { data: [Array], title: "Main Camera" },
    { data: [Array], title: "Selfie camera" },
    { data: [Array], title: "Sound" },
    { data: [Array], title: "Comms" },
    { data: [Array], title: "Features" },
    { data: [Array], title: "Battery" },
    { data: [Array], title: "Misc" },
  ],
  os_type: "Android 14, HyperOS",
  pictures: [
    "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-a4-5g-11.jpg",
  ],
  prices: {},
  ram: "8GB RAM",
  release_date: "Exp. release 2024, November",
  storage: "128GB storage, microSDXC",
  video: "1080p",
};
