import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
  nomeChave: {
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
  },
  containerPartidas: {
    alignItems: "center",
    marginBottom: 10,
  },
  containerInfos: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#6666",
    padding: 5,
    width: "90%",
    height: 50,
  },
  viewLinha: {
    flexDirection: "row",
  },
  textoData: {
    fontSize: 8,
    marginRight: 3,
    fontWeight: "bold",
  },
  textoEstadio: {
    fontSize: 8,
    marginRight: 3,
  },
  textoHora: {
    fontSize: 8,
    fontWeight: "bold",
  },
  containerPlacarM: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
    justifyContent: "flex-end",
  },
  containerMarcadores: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
  },
  textoMarcadoresM: {
    fontSize: 15,
    marginRight: 5,
    fontWeight: "bold",
  },
  textoX: {
    fontSize: 15,
    fontWeight: "bold",
  },
  textoMarcadoresV: {
    fontSize: 15,
    marginLeft: 5,
    fontWeight: "bold",
  },
  containerPlacarV: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
  },
});
