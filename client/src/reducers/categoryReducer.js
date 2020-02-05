
export default function(state=[],action){
	switch (action.type){
		case 'CATEGORY_LIST':
			return {...state,list:action.payload,detail:[]}	
		default:
			return state
	}
}