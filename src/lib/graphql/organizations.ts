export const organizationsByOwner = `
	query OrganizationsByOwner($id: !Number, $follow: Boolean) {
		organization(owner_id: $id, follow_all: $follow) {
			id  
			users   
			issues {
				id
				status
				type
				author
				title
				description
				assigned_id
				created_at
			}
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
				units
			}
		}
	}
`;
