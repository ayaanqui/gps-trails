import {
  Box,
} from '@chakra-ui/react';
import Park from '../types/Park';
import ParkBrief from './ParkBrief';

export default function ParkList({ parks }: { parks: Array<Park> }) {

  return (
    <>
      {parks.map(
        park => (
          <Box p='5' mb='3' key={`park#${park.id}`}>
            <ParkBrief park={park} />
          </Box>
        )
      )}
    </>
  )
}