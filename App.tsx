import React, { useEffect, useState } from "react";
import { View, Text, FlatList,Image, StyleSheet, ActivityIndicator,ListRenderItem,} from "react-native";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function App() {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProdutos(data);
        setCarregando(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.imagem} />

      <Text style={styles.titulo} numberOfLines={2}>
        {item.title}
      </Text>

      <Text style={styles.categoria}>{item.category}</Text>

      <Text style={styles.preco}>R$ {item.price.toFixed(2)}</Text>

      <Text style={styles.descricao} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.ratingBox}>
        <Text style={styles.ratingTexto}>
          ⭐ {item.rating.rate} ({item.rating.count} avaliações)
        </Text>
      </View>
    </View>
  );

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
        <Text style={{ marginTop: 10 }}>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Loja Virtual</Text>

      <FlatList
        data={produtos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#EAF1FB", // azul suave elegante 
  },

  header: {
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 25,
    color: "#D4AF37", // dourado elegante
    textShadowColor: "#0D47A1",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginVertical: 12,
    padding: 15,
    borderRadius: 14,
    
    // borda dourada suave
    borderWidth: 1.3,
    borderColor: "#D4AF37",

    // sombra azul royal
    shadowColor: "#0D47A1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },

  imagem: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
    marginBottom: 10,
  },

  titulo: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0D47A1",
    marginBottom: 5,
    letterSpacing: 0.8,
  },

  categoria: {
    fontSize: 14,
    color: "#5A5A5A",
    marginBottom: 5,
    fontStyle: "italic",
  },

  preco: {
    fontSize: 20,
    fontWeight: "900",
    color: "#D4AF37", // dourado
    marginBottom: 10,
    letterSpacing: 1,
  },

  descricao: {
    fontSize: 14,
    color: "#333",
    marginBottom: 12,
    lineHeight: 19,
  },

  ratingBox: {
    backgroundColor: "#1565C020", // azul royal com opacidade
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#0D47A1",
  },

  ratingTexto: {
    fontSize: 14,
    color: "#0D47A1",
    fontWeight: "700",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
