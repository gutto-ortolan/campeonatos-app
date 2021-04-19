import React from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import Estilos from "./style";

const Partidas = ({ navigation, route }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  //const token = "test_61458dbd071037525bd16a65cc0db2";
  const token = "live_358c973ee51076fc2513b0659f025b";
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
        const partidas = data.chaves;

        const lista = partidas.map((item) => {
          const partida = {};
          const { nome, partida_ida } = item;
          partida.time_m = partida_ida.time_mandante;
          partida.placar_m = partida_ida.placar_mandante;
          partida.time_v = partida_ida.time_visitante;
          partida.placar_v = partida_ida.placar_visitante;
          partida.chave_nome = nome;
          partida.partida_id = partida_ida.partida_id;
          partida.data_realizacao = partida_ida.data_realizacao;
          partida.hora_realizacao = partida_ida.hora_realizacao;
          partida.estadio = partida_ida.estadio.nome_popular;
          return partida;
        });

        lista.sort(function (a, b) {
          return a.partida_id < b.partida_id
            ? -1
            : a.partida_id > b.partida_id
            ? 1
            : 0;
        });
        setData(lista);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }

  return (
    <SafeAreaView style={Estilos.background}>
      <View style={Estilos.container}>
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <FlatList
            style={{ width: "100%" }}
            data={data}
            keyExtractor={(id, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={Estilos.containerPartidas}>
                <Text style={Estilos.nomeChave}>{item.chave_nome}</Text>
                <View style={Estilos.containerInfos}>
                  <View style={Estilos.viewLinha}>
                    <Text style={Estilos.textoData}>
                      {item.data_realizacao}
                    </Text>
                    <Text style={Estilos.textoEstadio}>{item.estadio}</Text>
                    <Text style={Estilos.textoHora}>
                      {item.hora_realizacao}
                    </Text>
                  </View>
                  <View style={Estilos.viewLinha}>
                    <View style={Estilos.containerPlacarM}>
                      <Text style={{ fontSize: 15 }}>
                        {item.time_m.nome_popular}
                      </Text>
                    </View>
                    <View style={Estilos.containerMarcadores}>
                      <Text style={Estilos.textoMarcadoresM}>
                        {item.placar_m}
                      </Text>
                      <Text style={Estilos.textoX}>x</Text>
                      <Text style={Estilos.textoMarcadoresV}>
                        {item.placar_v}
                      </Text>
                    </View>
                    <View style={Estilos.containerPlacarV}>
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
