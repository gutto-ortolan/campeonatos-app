import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Campeonatos({ navigation }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const token = "test_61458dbd071037525bd16a65cc0db2";
  //const token = "live_358c973ee51076fc2513b0659f025b";

  useEffect(() => {
    axios
      .get(`https://api.api-futebol.com.br/v1/campeonatos/2/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setData([data]);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(id, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.botao}
                onPress={() => {
                  navigation.navigate("Fases", {
                    idCampeonato: item.campeonato_id,
                  });
                }}
              >
                <View style={styles.containerLista}>
                  <Text style={styles.item}>{item.nome_popular}</Text>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                    }}
                    source={{ uri: item.logo }}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    fontSize: 20,
    marginBottom: 10,
    color: "#222",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginTop: 100,
  },
  containerLista: {
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    backgroundColor: "#b2afce",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
  },
  titulo: {
    fontSize: 25,
    marginBottom: 10,
  },
});
