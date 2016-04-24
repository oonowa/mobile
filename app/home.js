import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';

class Home extends Component{
    render() {
        return (
            <View>
            <Text style={styles.text}>
            ¡Hola!
            </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    text: {
    }
});

module.exports = Home;
