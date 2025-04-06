import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    let currentErrors = {};

    if (!username.trim()) {
      currentErrors.username = 'Username is required.';
    }
    if (!password.trim()) {
      currentErrors.password = 'Password is required.';
    }

    setErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      navigation.navigate('card', { username }); 
    }
  };

  if (isLoading) {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../assets/animation/Animation.json')}
          autoPlay
          loop
          style={{ width: 300, height: 300 }}
        />
        <View style={{ marginTop: 40 }} />
        <Pressable style={styles.getStartedButton} onPress={() => navigation.navigate('login')}>
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <LottieView
          source={require('../assets/animation/Logo.json')}
          autoPlay
          style={{ width: 150, height: 150 }}
        />
      </View>

      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#555"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setErrors({ ...errors, username: '' });
        }}
      />
      {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#555"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrors({ ...errors, password: '' });
        }}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('signup')}>
        <Text style={styles.signupText}>
          <Text style={{ color: '#333' }}>Don't have an account? </Text>
          <Text style={{ color: '#007BFF', fontWeight: '600' }}>Register</Text>
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F7FB',
  },
  getStartedButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#F2F7FB',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 25,
    color: '#1A1A1A',
    fontWeight: '800',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A7C6FF',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
  },
  errorText: {
    color: '#D9534F',
    fontSize: 13,
    marginBottom: 5,
    marginLeft: 10,
  },
});

export default Login;
