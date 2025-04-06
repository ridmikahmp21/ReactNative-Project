import React, { useContext, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { HospitalContext } from '../context/HospitalContext';
import HospitalDetailsCard from '../components/HospitalDetailsCard';

const CardScreen = ({ route }) => {
  const { username } = route.params;
  const { hospitals, isLoading, totalReacts, toggleReact } = useContext(HospitalContext);
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3399FF" />
        <Text style={{ marginTop: 10, fontSize: 16 }}>Loading hospitals...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Hi, {username}</Text>
          <Text style={styles.subGreeting}>Welcome Back 👋</Text>
        </View>
        <View style={styles.reactsBox}>
          <Text style={styles.reactsLabel}>Total Reacts</Text>
          <Text style={styles.totalReactsText}>{totalReacts}</Text>
        </View>
      </View>

      {/* Search Box */}
      <View style={styles.searchBoxContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search Hospital Details..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Hospital List */}
      <FlatList
        data={hospitals}
        renderItem={({ item, index }) => (
          <HospitalDetailsCard
            item={item}
            onReact={() => toggleReact(index)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF3FA',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#3399FF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subGreeting: {
    color: '#e0f0ff',
    fontSize: 14,
    marginTop: 2,
  },
  reactsBox: {
    alignItems: 'flex-end',
  },
  reactsLabel: {
    color: '#e0f0ff',
    fontSize: 14,
  },
  totalReactsText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBoxContainer: {
    marginBottom: 20,
  },
  searchBox: {
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default CardScreen;
