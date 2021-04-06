import { gql } from '@apollo/client';

export const GET_MOVIES = gql`
	query getMovies {
		movies {
			_id
			title
			overview
			poster_path
			popularity
			tags
		}
	}
`;

export const GET_MOVIE_BY_ID = gql`
	query getMovie($id: ID!) {
		movie(_id: $id) {
			_id
			title
			overview
			poster_path
			popularity
			tags
		}
	}
`

export const ADD_MOVIE = gql`
  mutation CreateMovie($input: MovieInput) {
    addMovie(input: $input) {
        _id
        title
				overview
				poster_path
				popularity
				tags
    }
  }
`;

export const EDIT_MOVIES = gql`
  mutation updateMovie($input: MovieInput) {
    updateMovie(input: $input) {
      title
      poster_path
      popularity
      overview
      tags
    }
  }
`

export const DELETE_MOVIES = gql`
  mutation deleteMovie( $_id: ID! ) {
    deleteMovie(input: { _id: $_id }) {
      message
    }
  }
`