import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated
} from 'react-native';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modalbox';
import styles from './styles';

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 1948.524658203125;
const LONGITUDE = -101.230692739541;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class Home extends Component{
    watchID = (null: ?number);

    constructor(props) {
        super(props);
        this.state = {
            initialRegion: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            initialPosition: null,
            lastPosition: null,
            markers: [],
            route: [],
            polygons: [],
            loading: false
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = position;
                initialPosition.latitudeDelta = LATITUDE_DELTA;
                initialPosition.longitudeDelta = LONGITUDE_DELTA;

                this.setState({initialPosition});
            },
            (error) => { alert(error.message) },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lastPosition = position;
            var markers = this.state.markers;
            var route = this.state.route;

            position.coords.latlng = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            markers.push(position.coords);

            //route.push(position.coords);

            this.setState({lastPosition});
            this.setState({markers});
            //this.setState({route});
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    loading(show) {
        var loading = show;
        this.setState({loading});
    }

    onClan() {
        this.loading(true);

        fetch('https://api.oonowa.space/territories', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then( (response) => {
            this.loading(false);
            return response.json()
        })
        .then( (response) => {
            let polygons = response.data;

            polygons.forEach(function(territory){
                territory.coords = [];
                territory.boundaries.coordinates[0].forEach(function(coord){
                    territory.coords.push({
                        latitude: coord[0],
                        longitude: coord[1]
                    });
                });
                territory.center = {
                    latitude: territory.settlement.coordinates[0],
                    longitude: territory.settlement.coordinates[1]
                };
            });

            this.setState({polygons});
        })
        .catch( (error) => {
            alert('Hubo un error procesando tus datos');
            this.loading(false);
        });
    }

    onReport() {
        this.loading(true);
    }

    onResource() {
        this.loading(true);

        fetch('https://api.oonowa.space/resources', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then( (response) => {
            this.loading(false);
            return response.json()
        })
        .then( (response) => {
            let polygons = response.data;

            polygons.forEach(function(territory){
                territory.coords = [];
                territory.boundaries.coordinates[0].forEach(function(coord){
                    territory.coords.push({
                        latitude: coord[0],
                        longitude: coord[1]
                    });
                });
                territory.center = {
                    latitude: territory.settlement.coordinates[0],
                    longitude: territory.settlement.coordinates[1]
                };
            });

            this.setState({polygons});
        })
        .catch( (error) => {
            alert('Hubo un error procesando tus datos');
            this.loading(false);
        });
    }

    onSubscribe() {
        this.refs.subscribe.open();
    }

    render() {
        return (
            <View style={styles.page}>
            <MapView.Animated
            initialRegion={this.state.initialRegion}
            style={styles.map}
            >
            {this.state.markers.map(marker => (
                <MapView.Marker.Animated
                coordinate={marker.latlng}
                title='title'
                description='description'
                />
            ))}

            {this.state.polygons.map(polygon => (
                <MapView.Polygon coordinates={polygon.coords} fillColor={'#E36E46'} strokeColor={'#E36E46'}/>
            ))}

            {this.state.polygons.map(polygon => (
                <MapView.Marker.Animated
                coordinate={polygon.center}
                />
            ))}

            </MapView.Animated>
            <ActionButton buttonColor="#E85151">
            <ActionButton.Item buttonColor='#404A46' title="Clanes" onPress={() => {this.onClan()}}>
            <Icon name="android-people" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#B0304D' title="Reportes" onPress={() => {this.onReport()}}>
            <Icon name="document-text" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="Recursos" onPress={() => {this.onResource()}}>
            <Icon name="waterdrop" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#9cd26a' title="Subscríbete" onPress={() => {this.onSubscribe()}}>
            <Icon name="android-textsms" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            </ActionButton>
            <Spinner style={styles.spinner} isVisible={this.state.loading} size={90} type={'ThreeBounce'} color={'#404A46'}/>
            <Modal style={styles.modal} position={"bottom"} ref={"subscribe"}>
            <Text>
            Lo sentimos, actualmente no contamos con el servicio en tu zona
            </Text>
            </Modal>
            </View>
        );
    }
};

module.exports = Home;
