import { Image, StyleSheet, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Colors } from "../../Colors";

const SCREEN_WIDTH = Dimensions.get("window").width; // Get the screen width dynamically

const ImagesScreen = ({ route }) => {
  const { imagesArray } = route.params;
  const [imageDimensions, setImageDimensions] = useState({});
  const FetchImageSize = async (imageUrl, index) => {
    try {
      const dimensions = await new Promise((resolve, reject) => {
        Image.getSize(
          imageUrl,
          (width, height) => resolve({ width, height }), 
          (error) => reject(error) 
        );
      });
      setImageDimensions(prevDimensions => ({
        ...prevDimensions,
        [index]: dimensions,
      }));
    } catch (error) {
      console.error("Error fetching image size:", error);
    }
  };
  useEffect(() => {
    imagesArray.forEach((imageUrl, index) => {
      FetchImageSize(imageUrl, index);
    });
  }, [imagesArray]);

  const renderItem = ({ item, index }) => {
    const dimensions = imageDimensions[index] || { width: 100, height: 100 }; 
    const aspectRatio = dimensions.height / dimensions.width;
    const imageHeight = (SCREEN_WIDTH-5) * aspectRatio;

    return (
      <View>
        <Image
          source={{ uri: item }}
          style={[
            styles.image,
            {
              width: SCREEN_WIDTH-5, 
              height: imageHeight,
            }
          ]}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={imagesArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          maxToRenderPerBatch={5}

        />
      </View>
    </View>
  );
};

export default ImagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK_BLUE,
  },
  imageWrapper: {
    marginBottom: 10,
    paddingTop: "2.5%",
    height: "100%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center"
  },
  image: {
    resizeMode: "contain",
    borderRadius: 20,
    marginVertical: 10,
  },
});
