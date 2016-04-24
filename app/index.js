import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';
import routes from './routes';
import Navigator from 'react-native-navigator';
import Home from './home';

const {
    Router,
    Route
} = Navigator;

class Index extends Component{
    render() {
        return (
            <Router component={Home} >
            <Route path="/home" component={Home}/>
            </Router>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        flex: 1
    }
});

module.exports = Index;
