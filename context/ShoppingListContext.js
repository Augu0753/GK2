// context/ShoppingListContext.js
import React, { createContext, useState, useEffect } from 'react';
import { db } from '../FireBase'; // Importere min db
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';

export const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [shoppingLists, setShoppingLists] = useState([]); // Gemte indkøbslister

  useEffect(() => {
    const fetchItems = async () => {
      const itemsCollection = collection(db, 'shoppingList');
      const itemSnapshot = await getDocs(itemsCollection);
      const itemList = itemSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemList);
    };
// Henter indkøbslister fra Firestore-databasen
    const fetchShoppingLists = async () => {
      const listsCollection = collection(db, 'savedShoppingLists');
      const listSnapshot = await getDocs(listsCollection);
      const listData = listSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setShoppingLists(listData);
    };

    fetchItems();
    fetchShoppingLists();
  }, []);

  const addItem = (name) => {
    setItems((prevItems) => [
      ...prevItems,
      { id: (prevItems.length + 1).toString(), name },
    ]);
  };

  const clearList = () => {
    setItems([]); // Tøm listen lokalt
  };
// Gemmer indkøbslisten i Firestore-databasen
  const saveShoppingList = async (listName) => {
    const newList = { name: listName, items };
    await addDoc(collection(db, 'savedShoppingLists'), newList);
    setShoppingLists((prevLists) => [...prevLists, newList]);
  };

  return (
    <ShoppingListContext.Provider value={{ items, addItem, clearList, saveShoppingList, shoppingLists }}>
      {children}
    </ShoppingListContext.Provider>
  );
};
