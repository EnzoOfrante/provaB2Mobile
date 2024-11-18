import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { useRouter } from "expo-router";
import { supabase } from "../API/supabaseClient";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      Alert.alert(
        "Sucesso",
        "Conta criada! Verifique seu e-mail para confirmar."
      );
      router.push("/login");
    } catch (error: any) {
      Alert.alert("Erro ao criar conta", error.message);
    }
  };

  return (
    <LinearGradient
      colors={["#FF6F61", "#FFA500", "#FFD700"]}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Título com animação */}
        <Animatable.Text
          animation="fadeInDown"
          duration={2000}
          style={styles.title}
        >
          Crie sua Conta!
        </Animatable.Text>

        {/* Caixa de Entrada de Dados com animação */}
        <Animatable.View
          animation="fadeInUp"
          duration={2000}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor="#FFF"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#FFF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </Animatable.View>

        {/* Botões estilizados */}
        <Animatable.View
          animation="bounceIn"
          delay={500}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.buttonText}>Voltar para Login</Text>
          </TouchableOpacity>
        </Animatable.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#FFF",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FF4500",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButton: {
    backgroundColor: "#FFD700",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RegisterScreen;
