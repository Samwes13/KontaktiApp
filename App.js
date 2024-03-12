import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
      });
      setContacts(data);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactContainer}>
            <Text style={styles.name}>{item.name}</Text>
            {item.phoneNumbers && item.phoneNumbers.length > 0 && (
              <Text style={styles.phoneNumber}>{item.phoneNumbers[0].number}</Text>
            )}
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="Get Contacts" onPress={getContacts} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    
  },
  contactContainer: {
    paddingVertical: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 16,
    color: 'gray',
  },
  buttonContainer: {
    marginTop: 20,
  },
  
});

export default App;

