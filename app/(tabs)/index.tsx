import { Image } from "@rneui/themed";
import { useEffect, useMemo, useRef } from "react";
import { /*Image as RNImage,*/ Animated, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import pinIcon from "@/assets/images/icon.png";
import { pins } from "@/data/pins";

export default function HomeScreen() {
  const initialRegion = {
    latitude: -37.8299899,
    longitude: 145.042019,
    latitudeDelta: 0.6,
    longitudeDelta: 0.6,
  };

  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000, // 2 seconds for one full rotation
        useNativeDriver: true,
      }).start(() => spin()); // Loop the animation
    };
    spin();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const memoPins = useMemo(() => {
    return pins
      .filter((_, i) => i % 8 === 0)
      .map((pin) => (
        <Marker
          key={pin.id}
          coordinate={pin.coordinate}
          tracksViewChanges={true}
        >
          <View style={styles.pinIconWrapper}>
            <Animated.Image
              source={{ uri: Image.resolveAssetSource(pinIcon).uri }}
              resizeMode="contain"
              style={[styles.pinIcon, { transform: [{ rotate: spin }] }]}
            />
          </View>
        </Marker>
      ));
  }, []);

  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
      onMapLoaded={() => console.log("MAP LOADED")}
      onPress={() => {
        console.log("MAP PRESSED");
      }}
      // onRegionChange={(region) => console.log("REGION CHANGE:", region)}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      {memoPins}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    display: "flex",
    flexGrow: 1,
  },
  pinIconWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 48 * 1.25,
    width: 48 * 1.25,
  },
  pinIcon: {
    height: 48,
    width: 48,
  },
});
