import { gql } from '@apollo/client';

export const GET_ALL_SHOES = gql`
  query GetAllShoes {
    getAllShoes {
      category
      description
      gender
      id
      image
      model
      size
      sku
      stock
      variants {
        id
        size
        sku
        stock
      }
    }
  }
`;
