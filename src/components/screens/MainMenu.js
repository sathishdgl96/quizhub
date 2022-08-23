import React from 'react';
import {
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as Font from 'expo-font';
import Button from '../Button';
import { startGameSelection } from '../../actions';
import { scale, moderateScale, verticalScale} from '../../Scaling';

// Game background image
const BACKGROUND_IMAGE = require('../../../assets/images/game_background.png');
const GAME_TITLE_FONT = require('../../../assets/fonts/SaucerBB.ttf');
const GAME_TITLE_FONT1 = require('../../../assets/fonts/Righteous-Regular.ttf');

const GITHUB_URL = 'https://github.com/computationalcore/react-native-trivia-quiz';

/**
 * @description	Main Menu screen.
 * @constructor
 * @param {Object} props - The props that were defined by the caller of this component.
 * @param {function} props.startGame - Callback when user clicks start game button.
 */
class MainMenu extends React.Component {

  constructor(props){
		super(props);
		/**
		 * @typedef {Object} ComponentState
		 * @property {Object[]} fontLoaded - Indicates whether custom fonts already loaded.
		 */

		/** @type {ComponentState} */
		this.state = {
			fontLoaded: false
		};
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      'game-title': GAME_TITLE_FONT,'select-font': GAME_TITLE_FONT1,
    });    
  
    this.setState({ fontLoaded: true });
  }

  /**
   * Open githubpage using default browser.
   */
  handleGithubClick = () => {
    Linking.canOpenURL(GITHUB_URL).then(supported => {
      if (supported) {
        Linking.openURL(GITHUB_URL);
      } else {
        console.log("Don't know how to open URI: " + GITHUB_URL);
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
            style={styles.imageBackground}
            source={BACKGROUND_IMAGE}
            resizeMode="cover"
          >
          {(this.state.fontLoaded) &&
          <View style={styles.gameTitleContainer}>
            <Text style={styles.gameTitle}> QuizHub </Text>
          </View>
          }
          <View style={styles.containers}>
            <Text style={styles.rulestitle}>INSTRUCTIONS</Text>
            <Text style={styles.rules}>1.Choose the category and level from the menu.</Text>
            <Text style={styles.rules}>2.Every question has 10 seconds time.</Text>
            <Text style={styles.rules}>3.Correct answer earns 1 point.</Text>
          </View>
          <Button style={styles.playButton} onPress={this.props.startGameSelection}>
            <Text style={styles.play}>PLAY.</Text>
          </Button>
        </ImageBackground>
      </View>
    )
  }
}

/**
 * MainMenu component StyleSheet.
 */
const styles = StyleSheet.create({
  play:{
    fontFamily:"select-font"
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  rulestitle:{
  
    fontSize:scale(30),
    fontFamily:"select-font",
    marginBottom:"10%",
    marginLeft:"10%"
  },
  containers:{
    marginBottom:'10%',
    elevation:20,
    shadowColor:"black",
    borderRadius:20,
    backgroundColor:"white",
    width:'80%',
    padding:"10%",
    marginLeft:"10%"
  },rules:{
    marginTop:"10%",
    fontFamily:"select-font",
    fontWeight:"normal",
    fontSize:scale(27)
  },
  gameTitleContainer: {
    flex: 1,
    marginTop: scale(60),
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  gameTitle: {
    fontFamily: "game-title",
    color: '#000000',
    marginTop:scale(70),
    fontSize: moderateScale(50)
  },
  playButton: {
    marginBottom: scale(100),
    width:scale(300),
    backgroundColor:'green',
    marginLeft:scale(100),
    borderRadius:120
  },
  githubButton: {
    marginBottom: scale(50),
    backgroundColor: '#DC143C'
  },
  imageBackground: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
});

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { startGameSelection })(MainMenu);