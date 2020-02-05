
const URL_ROOT = 'http://localhost:5000';

export function getCategoryList(){
	const request = fetch(`${URL_ROOT}/api/categoryList`,{
		method:'GET'
	})
	.then(function(response){
		console.log(response);
	})
	return{
		type:'CATEGORY_LIST',
		payload:request
	}
}