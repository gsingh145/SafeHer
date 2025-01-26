import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b69189', // Primary background color
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  map: {
    width: '100%',
    height: '50%',
  },
  text: {
    color: '#000000', // Updated text color to black
    fontSize: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000', // Updated title text color to black
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 50,
    width: '80%',
  },
  submitButtonContainer: {
    marginTop: 120,
    width: '80%',
  },
  button: {
    backgroundColor: '#debf9e', // Updated button background color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#000000', // Updated button text color to black
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerContainer: {
    width: '90%',
    height: 8,
    borderRadius: 10,
    marginBottom: 100,
    justifyContent: 'center',
  },
  picker: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 10,
  },
  headerStyle: {
    headerStyle: { backgroundColor: '#b69189' }, // Updated header background color
    headerTintColor: '#000000', // Updated header title color to black
    headerTitleStyle: { fontWeight: 'bold' },
  },
  textInput: {
    width: 300,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'top',
    marginBottom: 30,
    marginTop: 30,
    backgroundColor: '#d3d3d3', // Updated to light grey background
    borderColor: '#debf9e', // Updated border color
    borderWidth: 1,
    borderRadius: 5,
    color: '#000000', // Updated text input color to black
  }
});
