import React from "react";
import {
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
import Estilos from "./style";

export default function Campeonatos({ navigation }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  //const token = "test_61458dbd071037525bd16a65cc0db2";
  const token = "live_358c973ee51076fc2513b0659f025b";

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
    <SafeAreaView style={Estilos.background}>
      <View style={Estilos.container}>
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(id, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={Estilos.botao}
                onPress={() => {
                  navigation.navigate("Fases", {
                    idCampeonato: item.campeonato_id,
                  });
                }}
              >
                <View style={Estilos.containerLista}>
                  <Text style={Estilos.item}>{item.nome_popular}</Text>
                  <Image
                    style={Estilos.tamanhoImagem}
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