import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { SvgUri } from "react-native-svg";

const Partidas = ({ navigation, route }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const token = "test_61458dbd071037525bd16a65cc0db2";
  //const token = "live_358c973ee51076fc2513b0659f025b";
  const idFase = route.params?.idFase;

  useEffect(() => {
    partidas();
  }, []);

  function partidas() {
    axios
      .get(`https://api.api-futebol.com.br/v1/campeonatos/2/fases/${idFase}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        const chaves = data.chaves;

        const listCard = chaves.map((item) => {
          const result = {};
          const { nome, partida_ida } = item;
          result.time_m = partida_ida.time_mandante;
          result.placar_m = partida_ida.placar_mandante;
          result.time_v = partida_ida.time_visitante;
          result.placar_v = partida_ida.placar_visitante;
          result.chave_nome = nome;
          result.partida_id = partida_ida.partida_id;
          result.data_realizacao = partida_ida.data_realizacao;
          result.hora_realizacao = partida_ida.hora_realizacao;
          result.estadio = partida_ida.estadio.nome_popular;
          return result;
        });

        listCard.sort(function (a, b) {
          return a.partida_id < b.partida_id
            ? -1
            : a.partida_id > b.partida_id
            ? 1
            : 0;
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
            style={{ width: "100%" }}
            data={data}
            keyExtractor={(id, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ alignItems: "center", marginBottom: 10 }}>
                <Text
                  style={{
                    borderWidth: 1,
                    color: "#666",
                    borderColor: "#666",
                    borderRadius: 50,
                    fontSize: 7,
                    paddingRight: 1,
                    paddingLeft: 2,
                    marginBottom: -8,
                    backgroundColor: "white",
                    opacity: 1,
                    zIndex: 1,
                  }}
                >
                  {item.chave_nome}
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: "#6666",
                    padding: 5,
                    width: "90%",
                    height: 50,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 8,
                        marginRight: 3,
                        fontWeight: "bold",
                      }}
                    >
                      {item.data_realizacao}
                    </Text>
                    <Text style={{ fontSize: 8, marginRight: 3 }}>
                      {item.estadio}
                    </Text>
                    <Text style={{ fontSize: 8, fontWeight: "bold" }}>
                      {item.hora_realizacao}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "40%",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Text style={{ fontSize: 15 }}>
                        {item.time_m.nome_popular}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "20%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          marginRight: 5,
                          fontWeight: "bold",
                        }}
                      >
                        {item.placar_m}
                      </Text>
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        x
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          marginLeft: 5,
                          fontWeight: "bold",
                        }}
                      >
                        {item.placar_v}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "40%",
                      }}
                    >
                      <Text style={{ fontSize: 15 }}>
                        {item.time_v.nome_popular}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Partidas;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  item: {
    fontSize: 12,
    marginBottom: 10,
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },
  containerLista: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
  },
  titulo: {
    fontSize: 25,
    marginBottom: 10,
  },
});
