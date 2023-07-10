import { getDomainCookies } from "./accessToken.js";
import jsforce from "jsforce";

import { URL, AccessToken,PackageName } from "../constants";


async function ConnexionSFTest() {
	const cc = await getDomainCookies();
	console.log(cc);
	conn = new jsforce.Connection({
		instanceUrl: 'https://' + URL,
		accessToken: AccessToken
	});
	return conn;

}

let conn = ConnexionSFTest();


// async function ConnexionSF() {
// 	const cc =  await getDomainCookies();
// 	console.log(cc);
// 	conn = new jsforce.Connection({
// 		instanceUrl : 'https://'+cc[0],
// 		accessToken : cc[1]
// 		});
//     return conn;

// }

// let conn = ConnexionSF();






export function executeQuery(query) {
	return new Promise((resolve, reject) => {
	  if (conn) {
		conn.query(query, function (err, result) {
		  if (err) {
			reject(err);
		  } else {
			if (result.records.length) {
			  let data = result.records.map((currentItem) => {
				let obj = Object.assign({}, currentItem);
				delete obj.attributes;
				return obj;
			  });
			  resolve(data);
			} else {
			  resolve([]);
			}
		  }
		});
	  } else {
		reject(new Error('Connection not established.'));
	  }
	});
  }



export function createSObject(name, data) {

	conn.then((cc) => {
		cc.sobject(name).create(data, function (err, ret) {
			if (err || !ret.success) { return console.error(err, ret); }
			console.log("Created record id : " + ret.id);
		});

	});
}

export function deleteSObject(name, id) {
	conn.then((cc) => {
		cc.sobject(name).destroy(id, function (err, ret) {
			if (err || !ret.success) { return console.error(err, ret); }
			console.log('Deleted Successfully : ' + ret.id);
		});
	});
}


export function updateSObject(name, data) {
	conn.then((cc) => {
		cc.sobject(name).update(data, function (err, ret) {
			if (err || !ret.success) { return console.error(err, ret); }
			console.log('Updated Successfully : ' + ret.id);
			// ...
		});

	});


}


export function ToolingPackage() {
	return new Promise((resolve, reject) => {

		conn.then((cc) => {
			conn.tooling.query("select Id ,SubscriberPackage.Name from InstalledSubscriberPackage", function (err, result) {
				if (err) {
					reject(err);
				} else {
					if (result.records.length) {
						let c = checkPackageName(result);

						resolve(c);
					} else {
						resolve(false);
					}
				}
			});
		});
	});
}


export function toolingQuery(query) {
	return new Promise((resolve, reject) => {
		if (conn) {
		  conn.tooling.query(query, function (err, result) {
			if (err) {
			  reject(err);
			} else {
			  if (result.records.length) {
				let data = result.records.map((currentItem) => {
				  let obj = Object.assign({}, currentItem);
				  delete obj.attributes;
				  return obj;
				});
				resolve(data);
			  } else {
				resolve([]);
			  }
			}
		  });
		} else {
		  reject(new Error('Connection not established.'));
		}
	  });
}

function checkPackageName(jsonData) {

	const parsedData = jsonData;
	const records = parsedData.records;

	for (let i = 0; i < records.length; i++) {
		const record = records[i];
		const packageName = record.SubscriberPackage.Name;

		if (packageName === PackageName) {

			return true; // Package name found
		}
	}

	return false; // Package name not found
}