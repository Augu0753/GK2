import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Velkommen til Indkøbslisten</Text>

      <ScrollView contentContainerStyle={styles.buttonContainer}>
        {/* Knap til at gå til indkøbslisten */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ShoppingList')}>
          <Text style={styles.buttonText}>Gå til Indkøbsliste</Text>
        </TouchableOpacity>

        {/* Knap til at tilføje en vare */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddItem')}>
          <Text style={styles.buttonText}>Tilføj Vare</Text>
        </TouchableOpacity>

        {/* Knap til at finde supermarkeder i nærheden */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NearbyStores')}>
          <Text style={styles.buttonText}>Find Supermarkeder i Nærheden</Text>
        </TouchableOpacity>

        {/* Knap til at gå til opskrifter */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recipes')}>
          <Text style={styles.buttonText}>Se Opskrifter</Text>
        </TouchableOpacity>

        {/* Knap til at se gemte indkøbslister */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SavedShoppingLists')}>
          <Text style={styles.buttonText}>Se Gemte Indkøbslister</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%', // Giver knapperne plads til at strække sig over skærmen
    alignItems: 'center', // Centerer knapperne horisontalt
  },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginVertical: 10,
    elevation: 3, // Skyggeeffekt for dybde
    width: '90%', // Gør knapperne bredere
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
