import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {BASIC_COLOR} from '../constants/Constant';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Animated, Easing } from 'react-native';

const numStars = 5

export default class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            animation: new Animated.Value(1),
            size: 0,
            enableRating: false,
        }
    }

    rate = star => {
        this.setState({ rating: star });
        this.props.getRating(star);
    }

    animate = () => {
        Animated.timing(this.state.animation, {
          toValue: 2,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true
        }).start(() => {
          this.state.animation.setValue(1);
        });
    }

    render() {
        let stars = [];

        const animateScale = this.state.animation.interpolate({
            inputRange: [1, 1.5, 2],
            outputRange: [1, 1.4, 1]
        });

        const animateOpacity = this.state.animation.interpolate({
            inputRange: [1, 1.2, 2],
            outputRange: [1, 0.5, 1]
        });

        const animateWobble = this.state.animation.interpolate({
            inputRange: [1, 1.25, 1.75, 2],
            outputRange: ['0deg', '-5deg', '5deg', '0deg']
        });

        const animationStyle = {
            transform: [{ scale: animateScale }, {rotate: animateWobble}],
            opacity: animateOpacity
        }

        for(let x = 1; x <= numStars; x++) {
            stars.push(
            <TouchableWithoutFeedback
                key={x}
                onPress={() => {
                    if (this.props.enableRating) {
                        this.rate(x);
                        this.animate();
                    } else {
                        return null
                    }
                }}
            >
                {
                    this.props.enableRating ? (
                        <Animated.View style={x <= this.state.rating ? animationStyle : null}>
                            <Star
                                filled = {x <= this.state.rating ? true : false}
                                size = {this.props.size}
                            />
                        </Animated.View>
                    ) : (
                        <Animated.View>
                            <Star
                                filled = {x <= this.props.rating ? true : false}
                                size = {this.props.size}
                            />
                        </Animated.View>
                    )
                }
                
            </TouchableWithoutFeedback>
            )
        }

        return (
            <View style={styles.container}>
                {stars}
            </View>
        )
    }
}

class Star extends React.Component {
    render () {
      return <Icon
        name={this.props.filled === true ? "star": "star-o"}
        color={BASIC_COLOR}
        size={this.props.size}
        style={{ marginHorizontal: 5 }}
      />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    }
})
