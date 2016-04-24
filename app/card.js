const React = require('react-native');

const {
    StyleSheet,
} = React;

// TODO: Plug colors etc with MKTheme
const style = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        borderColor: '#ffffff',
        borderWidth: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#000000',
        fontWeight: 'bold',
    },
    content: {
        padding: 15,
        color: 'rgba(0,0,0,.54)',
    },
    action: {
        borderStyle: 'solid',
        borderTopColor: 'rgba(0,0,0,.1)',
        borderTopWidth: 1,
        padding: 15,

    },
    menu: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: 'transparent',

    },
});

module.exports = style;
