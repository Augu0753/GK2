import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { ShoppingListContext } from '../context/ShoppingListContext';

export default function AddItemScreen({ navigation }) {
  const [itemName, setItemName] = useState('');
  const { addItem } = useContext(ShoppingListContext);

  const handleAddItem = () => {
    if (itemName.trim()) {
      addItem(itemName);
      setItemName('');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Indtast varenavn"
        value={itemName}
        onChangeText={setItemName}
      />
      <Button title="Tilføj vare" onPress={handleAddItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
