var routesList = [{
	"path": "user/getUser/:id",
	"method": "get",
	"description": "get user information by id"
}, {
	"path": "user/findUser/:nameOrEmail",
	"method": "get",
	"description": "return list of user mail and name"
}, {
	"path": "user/getUserId/:email",
	"method": "get",
	"description": "get user id from email"
}, {
	"path": "user/resetPwd/:email",
	"method": "get",
	"description": "Reset user password and send him an email to confirm"
}, {
	"path": "user/getAllUser",
	"method": "get",
	"description": "Users list"
}, {
	"path": "user/update/:id/:pseudo/:email",
	"method": "post",
	"description": "Update user information from informations sent as body"
}, {
	"path": "user/delete/:id",
	"method": "post",
	"description": "delete user"
}, {
	"path": "user/validate/:token",
	"method": "get",
	"description": "validate user"
}, {
	"path": "user/connect/:email/:pwd",
	"method": "get",
	"description": "connect the user, returns a new jwt token"
}, {
	"path": "user/create/:pseudo/:pwd/:email",
	"method": "get",
	"description": "create a new user and send a email with a confirmation link"
}, {
	"path": "user/changPwd/:pwd/:newPwd",
	"method": "post",
	"description": "change user password"
}, {
	"path": "user/changEmail/:pwd/:newEmail",
	"method": "post",
	"description": "Update user email"
}, {
	"path": "classes/getStudentClassesById",
	"method": "get",
	"description": ""
}, {
	"path": "classes/getProfessorClassesById/",
	"method": "get",
	"description": "return the list of the professor classes"
}, {
	"path": "classes/getStudentListInClass/:classId",
	"method": "get",
	"description": "return the list of students in the class"
}, {
	"path": "classes/getProfessorListInClass/:classId",
	"method": "get",
	"description": "return the list of professors in the class"
}, {
	"path": "classes/getClassDetail/:classId",
	"method": "get",
	"description": "return the information about a class, its students, professors, files and exercices"
}, {
	"path": "classes/addStudentToClass/:id/:classId",
	"method": "post",
	"description": "add a student to a class"
}, {
	"path": "classes/removeStudentFromClass/:id/:classId",
	"method": "post",
	"description": "remove a student from a class"
}, {
	"path": "classes/removeProfessorFromClass/:id/:classId",
	"method": "post",
	"description": "remove a professor from a class"
}, {
	"path": "classes/addProfessorToClass/:id/:classId",
	"method": "post",
	"description": "add a professor to a class"
}, {
	"path": "classes/createClassroom/:name",
	"method": "post",
	"description": "create a class"
}, {
	"path": "messages/sendMessage/:IdDest/:subject/:msg",
	"method": "post",
	"description": "send a message to a user"
}, {
	"path": "messages/sendMessageToClass/:classId/:subject/:msg",
	"method": "post",
	"description": "send a message to a class"
}, {
	"path": "messages/getUserMsg",
	"method": "get",
	"description": "return the list the connected user messages"
}, {
	"path": "fichiers/getUserFileList",
	"method": "get",
	"description": "return the list the connected user files"
}, {
	"path": "fichiers/deleteFile/:fileId",
	"method": "post",
	"description": "delete a file"
}, {
	"path": "fichiers/getUserFile/:fileId",
	"method": "get",
	"description": "get a file from connected user"
}, {
	"path": "fichiers/getAllUserImages",
	"method": "get",
	"description": "get all images from connected user"
}, {
	"path": "fichiers/getImageURL/:fileId",
	"method": "get",
	"description": "get a public image URL for the connected user tu share it"
}, {
	"path": "fichiers/getClassRoomFile/:classId/:fileId",
	"method": "get",
	"description": "return the list of the class files"
}, {
	"path": "fichiers/uploadToUser/:filename/:dest",
	"method": "post",
	"description": "add an already uploaded file to a user file list"
}, {
	"path": "fichiers/uploadToExercice/:fileId/:exerciceId",
	"method": "post",
	"description": "add an already uploaded file to an exercice file list"
}, {
	"path": "fichiers/uploadToClass/:filename/:classId",
	"method": "post",
	"description": "add an already uploaded file to a class file list"
},  {
	"path": "exercices/addExerciceToClass/:id/:classId",
	"method": "post",
	"description": "add a exercice to a class"
}, {
	"path": "exercices/addExerciceToUser/:exerciceId",
	"method": "post",
	"description": "add a exercice to a class"
}, {
	"path": "exercices/removeExerciceFromUser/:exerciceId",
	"method": "post",
	"description": "remove a exercice from current connected user"
}, {
	"path": "exercices/getAllStoreExercicesNotOwned",
	"method": "get",
	"description": "return the list of all available exercice in the store that the current user do not own yet"
}, {
	"path": "exercices/getUserExercices",
	"method": "get",
	"description": "return the list of current connected user exercices"
}, {
	"path": "exercices/getExercice/:id",
	"method": "get",
	"description": "return an exercice from current connected user"
}, {
	"path": "exercices/getUserExerciceSolutionAndroid/:exerciceId",
	"method": "get",
	"description": "return last solution from user exercice"
}, {
	"path": "exercices/saveUserExerciceSolutionWeb/:exerciceId",
	"method": "post",
	"description": "save last solution from user exercice"
}, {
	"path": "exercices/addSuccessTest/:exerciceId",
	"method": "post",
	"description": "save tests result from a exercice to a user"
}, {
	"path": "exercices/getClassStudentPassedTests/:classId",
	"method": "get",
	"description": "return the liste of tests succeded for every user and exercice in a class"
}, {
	"path": "exercices/getUserPassedTests/:exerciceId",
	"method": "get",
	"description": "list of passed test for a user exercice"
}, {
	"path": "exercices/getUserExerciceSolutionWeb/:exerciceId",
	"method": "get",
	"description": "return last solution from user exercice"
}, {
	"path": "exercices/executeExercice",
	"method": "post",
	"description": "execute an exercice from android app"
},  {
	"path": "exercices/add",
	"method": "post",
	"description": "upload a new exercice passed in body"
}, {
	"path": "exercices/deleteFromClass/:exerciceId/:classId",
	"method": "post",
	"description": "remove an exercice from class exercices list"
}, {
	"path": "exercices/modify/:exerciceId",
	"method": "post",
	"description": "update an exercice"
}, {
	"path": "exercices/delete/:exerciceId",
	"method": "post",
	"description": "delete an exercice"
}
]
$(document).ready(function() {
	var routes = [];
	routesList.forEach(function(route, index){
		var categorie = route.path.substring(0, route.path.indexOf("/"))
		if (!routes.find(function(elem){return elem && elem.name == categorie;})){
			routes.push({name : categorie,
				list: []
			})
		}
		console.log(routes)
		routes.find(function(elem){return elem && elem.name == categorie;}).list.push(route);

	})
	console.log(routes)
	routes.forEach(function(categorie, index){
		var div = "<div style='border: solid; display: inline-flex' class=\"container\" \">" +
						"<h2>"+categorie.name+"</h2>\n" +
						"<button type=\"button\" class=\"btn btn-info\" data-toggle=\"collapse\" data-target=\"#info"+categorie.name+"\">open</button>"+
						"<div id=\"info"+categorie.name+"\" class=\"collapse\">" +
						"</div>\n" +
				"</div>"
		$("#routesList").append(div);
		categorie.list.forEach(function(route,index){
			var div = "<div  class=\"container\" data-toggle=\"collapse\" data-target=\"#info"+categorie.name+index+"\">" +
				"<h2>"+route.path+"</h2>\n" +
				"<div id=\"info"+categorie.name+index+"\" class=\"collapse\">" +
				"<div>Method : "+route.method+"</div>" +
				"<div>Description : "+route.description+"</div>" +
				"</div>\n" +
				"</div>"
			$("#info"+categorie.name).append(div);
		})
	})
})
