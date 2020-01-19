import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthSession } from 'expo';
import { getAutoFocusEnabled } from 'expo/build/AR';

class Main extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    name: '',
  };

  onPress = () =>
    this.props.navigation.navigate('Chat', { name: this.state.name });

  onChangeText = name => this.setState({ name });

  render() {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>ENTER YOUR NAME:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="Username"
          onChangeText={this.onChangeText}
          value={this.state.name}
        />
        <TouchableOpacity onPress={this.onPress}>
            <Text style={styles.buttonText}>Go</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const offset = 24;
const styles = StyleSheet.create({
  title: {
    flexDirection:'row',
    marginTop: offset,
    fontSize: 25,
    justifyContent:'center',
    alignItems: 'center',
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
    width: offset * 12,
    borderWidth: 2,
    borderRadius:10,
    fontSize:20,
    
  },
  buttonText: {
    flexDirection:'row',
    marginTop: offset,
    fontSize: 25,
    justifyContent:'center',
    alignItems: 'center',
    borderWidth: 2,
    paddingHorizontal:10,
    paddingVertical: 5,
    borderRadius:10,
    backgroundColor: '#48BD78',
  },
  center: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default Main;
