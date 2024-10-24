import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { ShoppingListContext } from '../context/ShoppingListContext'; // Importer ShoppingListContext

export default function RecipeScreen({ navigation }) {
  const { addItem } = useContext(ShoppingListContext); // Hook til at tilføje varer til indkøbslisten
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='); // Henter alle opskrifter
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecipes(data.meals);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleAddToShoppingList = (ingredients) => {
    // Tilføjer hver ingrediens til indkøbslisten
    ingredients.forEach(ingredient => {
      addItem(ingredient); // Brug addItem fra ShoppingListContext
    });
  };

  if (loading) return <ActivityIndicator size="large" color="#ff6347" />;
  if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

  const renderRecipeItem = ({ item }) => {
    const ingredients = Object.keys(item)
      .filter(key => key.startsWith('strIngredient') && item[key]) // Filtrerer ingredienser
      .map((key, index) => `${item[key]} - ${item[`strMeasure${index + 1}`]}`); // Mål til ingredienser

    return (
      <View style={styles.recipeBox}>
        <Text style={styles.recipeName}>{item.strMeal}</Text>
        <FlatList
          data={ingredients}
          renderItem={({ item }) => <Text style={styles.ingredient}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleAddToShoppingList(ingredients)}>
          <Text style={styles.buttonText}>Tilføj Ingredienser til Indkøbsliste</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Opskrifter</Text>
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={item => item.idMeal.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  recipeBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: '600',
  },
  ingredient: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});
