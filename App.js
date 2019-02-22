

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import PhotoView from 'react-native-photo-view';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const options = {
  title: 'select image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Zoomer = ({ uri, style }) => (<PhotoView
  source={{ uri }}
  minimumZoomScale={1}
  maximumZoomScale={Number.MAX_SAFE_INTEGER}
  androidScaleType="center"
  style={style} />);

export default class App extends Component {

  state = {
    uri: '',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };


  onImgSelect = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        this.setState({
          uri: response.uri,
        });
      }
    });
  }

  onLayout = () => {
    const { width, height } = Dimensions.get('window');
    this.setState({
      width,
      height,
    })
  }

  render() {
    if (this.state.uri) {
      const { width, height } = this.state;
      return (<View style={styles.container} onLayout={this.onLayout}>
        <Zoomer uri={this.state.uri} style={{ width, height }} />
      </View>);
    }
    return (
      <View style={styles.container}>
        <Button title="select image to critter zoom upon" onPress={this.onImgSelect} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
