const log4js = require('log4js');
const mongodb = require('mongodb').MongoClient;
const packageInfo = require('../package.json');

var initialFolder = function (options) {
	var folderArray = [];
	var projectName = options.name;
    var homePath = path.join(process.env.HOME || process.env.USERPROFILE, projectName);
    console.log(process.env.HOME);
	// var configPath = path.join(homePath, "config/");
	// var uploadPath = path.join(homePath, "uploads/");
	// var logPath = path.join(homePath, "logs/");
	// var projectPath = process.argv[2];
	// var tmpPath = path.join(homePath, "tmp/");
	// var UUID = dvalue.guid();

	// var createFolder = function (folder) {
	// 	if(!folder) { return Promise.resolve(true); }
	// 	return new Promise((resolve, reject) => {
	// 		fs.exists(folder, function (rs) {
	// 			if(!rs) {
	// 				fs.mkdir(folder, function (e, d) {
	// 					if(e) { reject(e); }
	// 					else { resolve(folder); }
	// 				});
	// 			}
	// 			else {
	// 				resolve(folder);
	// 			}
	// 		});
	// 	});
	// };

	// var createPID = function (v) {
	// 	new Promise((resolve, reject) => {
	// 		var PID = process.pid;
	// 		fs.writeFile(pathPID, PID, function(e) {
	// 			if(e) { reject(e); }
	// 			else { resolve(v); }
	// 		});
	// 	});
	// };
	// var createUUID = function (homepath) {
	// 	if(!fs.existsSync(pathUUID)) {
	// 		fs.writeFile(pathUUID, UUID, function(err) {});
	// 	}
	// 	else {
	// 		UUID = fs.readFileSync(pathUUID).toString();
	// 	}
	// 	return Promise.resolve();
	// };

	// folderArray.push(
	// 	{key: 'project', path: projectPath},
	// 	{key: 'config', path: configPath},
	// 	{key: 'upload', path: uploadPath},
	// 	{key: 'log', path: logPath}
    // );
	// return folderArray.reduce((pre, curr) => {
	// 	return pre.then(res => {
	// 		res = !!res? res: { UUID: UUID, path: { home: homePath }};
	// 		return createFolder(curr.path).then(nextRes => {
	// 			res.path[curr.key] = curr.path
	// 			return res;
	// 		});
	// 	});
	// }, createFolder(homePath).then(createPID).then(createUUID));
};

initialFolder(packageInfo)