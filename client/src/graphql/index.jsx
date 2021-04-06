import { gql } from '@apollo/client';

export const GET_ALL = gql`
  query getAll {
    movies {
      _id
      title
      poster_path
      tags
    }
    
    series {
      _id
      title
      poster_path
      tags
    }
  }
`;