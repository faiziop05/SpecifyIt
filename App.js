import 'react-native-reanimated'
import "./gesture-handler";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "./Colors";
import Feather from "@expo/vector-icons/Feather";
import { Button, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Home, Welcome, SpecsDetails ,ImagesScreen,SearchMobileScreen, BrandMobiles} from "./Screens";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.DARK_BLUE },
          headerTintColor: Colors.WHITE,
          headerTitleStyle: { fontWeight: "bold" ,fontSize:22},
          headerBackTitleVisible:false,
          headerTitleAlign: "center",
          headerShadowVisible: false, // Hides the shadow line below the header
          headerBackgroundContainerStyle: { backgroundColor: Colors.DARK_BLUE },
        }}
        >
        <Stack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={Welcome}
          />
        <Stack.Screen name="SpecsDetails" component={SpecsDetails} options={{ title: "Specifications" }}/>
        <Stack.Screen name="ImagesScreen" component={ImagesScreen} options={{ title: "Images" }}/>
        <Stack.Screen name="BrandMobiles" component={BrandMobiles} options={{ title: "Mobiles" }}/>
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{ title: "Home", headerLeft:false }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.DARK_BLUE,
          borderColor: "#000",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: Colors.ORANGE,
        tabBarInactiveTintColor: Colors.GRAY,
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
        tabBarIconStyle: { marginTop: 5 },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={24}
              color={focused ? Colors.ORANGE : Colors.GRAY}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SearchMobileScreen"
        component={SearchMobileScreen}
        options={{
          title:"Search",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="search"
              size={24}
              color={focused ? Colors.ORANGE : Colors.GRAY}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <MyStack />
      <StatusBar style="light" />
    </>
  );
}
