import { gql } from "graphql-request";

export const UnitFragment = gql`
  fragment UnitFragment on unit {
    id
    name
    description
    leases {
      id
      amount
      unit_id
      start_date
      end_date
      active
      created_at
    }
  }
`;

export const createUnit = gql`
  ${UnitFragment}
  mutation CreateUnit($name: String!, $description: String!, $property_id: Int!) {
    createUnit(name: $name, description: $description, property_id: $property_id) {
      ...UnitFragment
    }
  }
`;
