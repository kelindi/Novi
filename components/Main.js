import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
class Main extends Component {
    state = {name: ''}

    onChangeText = name => this.setState({name});
  render() {
    return (<View>
        <TextInput
        onChangeText={this.onChangeText}
        style={styles.nameInput}
        placeholder="John Doe"
        value={this.state.name}
        />
    </View>
    );
  }
}
const offset = 24;
const styles = StyleSheet.create({
    nameInput: {
        height: offset * 2,
        margin: offset,
        paddingHorizontal: offset,
        borderColor: '#111111',
        borderWidth: 1,
    },
});

export default Main;