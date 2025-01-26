import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d5a6bd',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  map: {
    width: '100%',
    height: '50%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff', // White for better readability
  },
  text: {
    color: '#4a4a4a',
    marginBottom: 10,
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark text for contrast
  },
  buttonContainer: {
    padding: 10,
    width: '100%', // Ensures consistent alignment
  },
  pickerContainer: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    height: '100%',
    width: '100%',
  },
  headerStyle: {
    headerStyle: { backgroundColor: '#d5a6bd' },
    headerTintColor: '#4a4a4a', // Change the title color here
    headerTitleStyle: { fontWeight: 'bold' },
  },
});
