import {getDomainCookies} from "./accessToken.js";
import jsforce from "jsforce";






	
async function ConnexionSF() {
	const cc =  await getDomainCookies();
	console.log(cc);
	conn = new jsforce.Connection({
		instanceUrl : 'https://'+cc[0],
		accessToken : cc[1]
		});
    return conn;

}

let conn = ConnexionSF();


export function executeQuery(query) {


	conn.then((cc) => {
		cc.query(query, function(err, result) {
		if (err) { return alert(err); }
		if(result.records.length){
			let data = result.records.map(currentItem => {
	            let obj = Object.assign({}, currentItem);
	            delete obj.attributes;
	            return obj;
	        });
			console.log(data);
		}
	}); });
}


export function createSObject(name,data){

	conn.then((cc) => {
	cc.sobject(name).create(data, function(err, ret) {
		if (err || !ret.success) { return console.error(err, ret); }
		console.log("Created record id : " + ret.id);
	  });

	}); 
}

export function deleteSObject(name,id){
	conn.then((cc) => {
	cc.sobject(name).destroy(id, function(err, ret) {
		if (err || !ret.success) { return console.error(err, ret); }
		console.log('Deleted Successfully : ' + ret.id);
	});
	}); 
}


export function updateSObject(name,data){
    conn.then((cc) => {
    cc.sobject(name).update(data, function(err, ret) {
		if (err || !ret.success) { return console.error(err, ret); }
		console.log('Updated Successfully : ' + ret.id);
		// ...
	  });

	}); 


}