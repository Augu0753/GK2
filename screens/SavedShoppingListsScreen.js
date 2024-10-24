// screens/SavedShoppingListsScreen.js
import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { ShoppingListContext } from '../context/ShoppingListContext';

const SavedShoppingListsScreen = ({ navigation }) => {
  const { shoppingLists } = useContext(ShoppingListContext);

  // Kontroller, om der er indkøbslister at vise
  if (!shoppingLists || shoppingLists.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ingen gemte indkøbslister</Text>
        <Button title="Tilbage til Indkøbsliste" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  // Renderer et enkelt listeelement (underliste)
  const renderListItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listName}>{item.name}</Text>
        {/* Kontrollér, om underlisten 'items' eksisterer og ikke er tom */}
        {item.items && item.items.length > 0 ? (
          <FlatList
            data={item.items}
            renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
            keyExtractor={(item) => item.id || item.name}  // Unik nøgle for underliste-elementer
          />
        ) : (
          <Text style={styles.noItemsText}>Ingen varer i denne indkøbsliste</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gemte Indkøbslister</Text>
      {/* FlatList til hovedlister */}
      <FlatList
        data={shoppingLists}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id || item.name}  // Unik nøgle for hovedlisterne
      />
      <Button title="Tilbage til Indkøbsliste" onPress={() => navigation.goBack()} />
    </View>
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
  listItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  listName: {
    fontSize: 20,
    fontWeight: '600',
  },
  item: {
    fontSize: 16,
    padding: 5,
  },
  noItemsText: {
    fontStyle: 'italic',
    color: 'gray',
    paddingTop: 10,
  },
});

export default SavedShoppingListsScreen;
