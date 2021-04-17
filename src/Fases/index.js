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

const Fases = ({ navigation, route }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const token = "test_61458dbd071037525bd16a65cc0db2";
  //const token = "live_358c973ee51076fc2513b0659f025b";
  const idCampeonato = route.params?.idCampeonato;

  useEffect(() => {
    fases();
  }, []);

  function fases() {
    axios
      .get(`https://api.api-futebol.com.br/v1/campeonatos/2/fases/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        const fases = data;
        const listCard = fases.map((item) => {
          const result = {};
          const { nome, fase_id } = item;
          //verificar com o marcao o status finalizado
          if (
            nome === "Primeira Fase" ||
            nome === "Segunda Fase" ||
            nome === "Fase Única"
          ) {
            result.fase_nome = nome;
            result.fase_id = fase_id;
            return result;
          } else {
            return result;
          }
        });

        setData(listCard);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(id, index) => index.toString()}
            renderItem={({ item }) =>
              item.fase_nome ? (
                <TouchableOpacity
                  style={styles.botao}
                  onPress={() => {
                    navigation.navigate("Partidas", {
                      idFase: item.fase_id,
                    });
                  }}
                >
                  <View style={styles.containerLista}>
                    <Text style={styles.item}>{item.fase_nome}</Text>
                  </View>
                </TouchableOpacity>
              ) : null
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Fases;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    fontSize: 20,
    color: "#222",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginTop: 50,
  },
  containerLista: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
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
