import db from "../models";
import CRUDservice from "../services/CRUDservice";

const getHomePage = async (req, res) => {
    try {
        let data = await db.users.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.error(e);
    }

}

const getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

const getCRUD = (req, res) => {
    return res.render('test/crud.ejs')
}

const postCRUD = (req, res) => {
    CRUDservice.createUser(req.body);
    return res.send('hi');
}

const readCRUD = async (req, res) => {
    let listUsers = await CRUDservice.getAllUser();
    console.log(listUsers)
    return res.render('test/readcrud.ejs', {
        data: listUsers
    });
}

const editCRUD = async (req, res) => {
    let user = await CRUDservice.getUserById(req.query);
    return res.render('test/editcrud.ejs', {
        data: user
    });
}

const editDoneCRUD = async (req, res) => {
    console.log(req.query)
    await CRUDservice.editDoneCRUD(req.query);
    return res.send('oke');
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    readCRUD: readCRUD,
    editCRUD: editCRUD,
    editDoneCRUD: editDoneCRUD
}