import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/test', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/read-crud', homeController.readCRUD);
    router.get('/edit-crud', homeController.editCRUD);
    router.get('/edit-done-crud', homeController.editDoneCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    router.get('/delete-done-crud', homeController.deleteDoneCRUD);


    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-user', userController.getUsers);

    return app.use('/', router);
}

module.exports = initWebRoutes