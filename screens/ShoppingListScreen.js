// screens/ShoppingListScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ShoppingListContext } from '../context/ShoppingListContext';

const ShoppingListScreen = () => {
  const { items, clearList, saveShoppingList } = useContext(ShoppingListContext);
  const [listName, setListName] = useState('');

  const handleSaveList = () => {
    if (listName.trim() !== '') {
      saveShoppingList(listName);
      setListName(''); // tekstfeltet tømmes
    } else {
      alert('Indtast et navn til indkøbslisten.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Indkøbsliste</Text>

          {items.length > 0 ? (
            <FlatList
              data={items}
              renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
              keyExtractor={item => item.id.toString()} // Ensure unique keys
            />
          ) : (
            <Text style={styles.emptyListText}>Listen er tom.</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Navn på indkøbsliste"
            value={listName}
            onChangeText={setListName}
          />
          <Button title="Gem Indkøbsliste" onPress={handleSaveList} />
          <Button title="Ryd Indkøbsliste" onPress={clearList} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
  emptyListText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default ShoppingListScreen;
