import { gql } from '@apollo/client';

export const GET_TVSERIES = gql`
	query getSeries {
		series {
			_id
			title
			overview
			poster_path
			popularity
			tags
		}
	}
`;

export const GET_TVSERIES_BY_ID = gql`
	query getSerial($id: ID!) {
		serial(_id: $id) {
			_id
			title
			overview
			poster_path
			popularity
			tags
		}
	}
`

export const DELETE_TVSERIES = gql`
  mutation deleteTvSeries( $_id: ID! ) {
    deleteTvSeries(input: { _id: $_id }) {
      message
    }
  }
`