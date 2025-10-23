import { Image } from "@rneui/themed";
import { useMemo } from "react";
import { /*Image as RNImage,*/ StyleSheet, View } from "react-native";
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
            <Image
              source={{ uri: Image.resolveAssetSource(pinIcon).uri }}
              resizeMode="contain"
              style={styles.pinIcon}
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
