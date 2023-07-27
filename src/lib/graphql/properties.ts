export const propertiesByOrg = `
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
		}
	}
`;
