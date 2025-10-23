import { useMemo } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { pins } from "@/data/pins";

export default function HomeScreen() {
  const initialRegion = {
    latitude: -37.8299899,
    longitude: 145.042019,
    latitudeDelta: 0.6,
    longitudeDelta: 0.6,
  };

  const memoPins = useMemo(() => {
    return pins.map((pin) => (
      <Marker key={pin.id} coordinate={pin.coordinate} />
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
});
