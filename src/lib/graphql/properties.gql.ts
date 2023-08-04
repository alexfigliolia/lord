import { gql } from "graphql-request";
import { issuesFragment } from "./issues.gql";

export const propertiesFragment = gql`
  properties {
    id
    name
    description
    address_1
    address_2
    city
    state
    zip_code
    images
  }
`;

export const propertiesByOrg = gql`
	query PropertiesByOrg($orgID: !Number) {
		property(organization_id: $orgID) {
			id 
			name        
			description 
			address_1   
			address_2   
			city        
			state       
			zip_code    
			images
      issues
		}
	}
`;

export const createPropertyMutation = gql`
  mutation CreateProperty(
    $name: String!
    $organization_id: Int!
    $description: String!
    $address_1: String!
    $address_2: String!
    $city: String!
    $state: String!
    $zip_code: String!
  ) {
    createProperty(
      name: $name
      organization_id: $organization_id
      description: $description
      address_1: $address_1
      address_2: $address_2
      city: $city
      state: $state
      zip_code: $zip_code
    ) {
      id
      name
      organization_id
      description
      address_1
      address_2
      city
      state
      zip_code
    }
  }
`;

export const queryPropertyByID = gql`
  query PropertyByID($id: Int!) {
    property(id: $id) {
      id
      name
      description
      address_1
      address_2
      city
      state
      zip_code
      images
      ${issuesFragment}
      units {
        leases {
          id   
          unit_id   
          start_date
          end_date 
          active   
          created_at
        }
      }
    }
  }
`;
