import { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl'
import { mapboxApiKey } from '../util/api'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Icon } from '@chakra-ui/react'

class Map extends Component<any, any> {
  render() {
    const MyMap = ReactMapboxGl({
      accessToken: mapboxApiKey
    });

    return (<MyMap
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: 'inherit',
        width: '100%'
      }}
      center={[this.props.lon, this.props.lat]}
    >
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={[this.props.lon, this.props.lat]} />
      </Layer>
      <Marker
        anchor='center'
        coordinates={[this.props.lon, this.props.lat]}
      >
        <Icon
          as={FaMapMarkerAlt}
          color='red.400'
          boxSize='12'
        />
      </Marker>
    </MyMap>)
  }
}

export default Map