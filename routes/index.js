var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var userController = require('../controllers/user_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});
router.param('quizId', quizController.load); //autoload quiz:id
router.param('commentId', commentController.load);//autoload :conmmentId
router.param('userId', userController.load); //autoload: userId

//definicion de rutas de sesion

router.get('/login',  sessionController.new);     // formulario login
router.post('/login', sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión¿autologout??

//definicion de rutas de cuenta

   router.get('/user',  userController.new);     // formulario sign un
   router.post('/user',  userController.create);     // registrar usuario
   router.get('/user/:userId(\\d+)/edit',  sessionController.loginRequired, userController.edit);     // editar información de cuenta
   router.put('/user/:userId(\\d+)',  sessionController.loginRequired, userController.update);     // actualizar información de cuenta
   router.delete('/user/:userId(\\d+)',  sessionController.loginRequired, 				   userController.destroy);     // borrar cuenta


router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/new'                 , sessionController.loginRequired, 	quizController.new);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/:quizId(\\d+)/edit'  , sessionController.loginRequired,	quizController.edit);
router.post('/quizes/create'             , sessionController.loginRequired,	 quizController.create);
router.put('/quizes/:quizId(\\d+)'       , sessionController.loginRequired,	quizController.update);
router.delete('/quizes/:quizId(\\d+)'    , sessionController.loginRequired,	quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', 
	                                    sessionController.loginRequired, commentController.publish);
module.exports = router;
