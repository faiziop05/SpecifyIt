import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SCREEN_WIDTH } from "../../ScreenSize";
import { Colors } from "../../Colors";
import axios from "axios";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const SearchMobileScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const serachData = async () => {
    try {
      const res = await axios.get(
        "https://script.google.com/macros/s/AKfycbxNu27V2Y2LuKUIQMK8lX1y0joB6YmG6hUwB1fNeVbgzEh22TcDGrOak03Fk3uBHmz-/exec?route=brand-list"
      );
      if (res.status == 200) {
        const sortedData =
          res &&
          res.data &&
          res.data.data.sort((a, b) => (a.brand_name < b.brand_name ? -1 : 1));
        setData(sortedData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    serachData();
  }, []);

  const handleSearch = (e) => {
    const filteredData = data.filter((item) =>
      String(item.brand_name).toLowerCase().includes(String(e).toLowerCase())
    );
    setSearch(filteredData);
  };
  const Renderitem = ({ item }) => {
    return (
      <>
        {item.key != "" && (
          <TouchableOpacity onPress={()=>navigation.navigate("BrandMobiles",{BrandData:item})} style={styles.BrandBtn}>
            <Text style={styles.BrandBtnText}>{item.brand_name}</Text>
            <MaterialIcons name="navigate-next" size={24} color="white" />
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={handleSearch}
        placeholder="Search"
        style={styles.SearchTextInput}
      />
      <FlatList
        data={data.length > 0 && (search || data)}
        renderItem={({ item }) => <Renderitem item={item} />}
        maxToRenderPerBatch={10}
      />
    </View>
  );
};

export default SearchMobileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  SearchTextInput: {
    width: SCREEN_WIDTH - 10,
    height: 40,
    backgroundColor: Colors.WHITE,
    borderRadius: 50,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 10,
    color: Colors.BLACK,
    marginBottom: 10,
  },
  BrandBtn: {
    backgroundColor: Colors.DARK_BLUE,
    width: SCREEN_WIDTH - 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 3,
    alignSelf: "center",
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  BrandBtnText: {
    color: Colors.WHITE,
    fontSize: 20,
  },
});
