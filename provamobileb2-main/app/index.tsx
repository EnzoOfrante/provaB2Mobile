import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";

export default function Index() {
  const router = useRouter();
  const [dots, setDots] = useState(""); // Estado para os pontos

  useEffect(() => {
    // Animação dos pontos "..."
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "")); // Adiciona ou reseta os pontos
    }, 500);

    // Redireciona após 3 segundos
    const timeout = setTimeout(() => {
      router.replace("/login");
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Carregando{dots}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E90FF", // Fundo azul
  },
  loadingText: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
