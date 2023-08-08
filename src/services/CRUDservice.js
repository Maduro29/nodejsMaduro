import bcrypt from 'bcryptjs';
import db from '../models';
import { resolveInclude } from 'ejs';

const hassPassword = async (password) => {
    // generate crypt

    return new Promise(async (resolve, reject) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hass = await bcrypt.hash(password, salt);
            resolve(hass);
        } catch (e) {
            reject(e);
        }
    })
}

const createUser = async (data) => {
    console.log(data);
    return new Promise(async (resolve, reject) => {
        try {
            const hass = await hassPassword(data.password);
            db.users.create({
                email: data.email,
                password: hass,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
        } catch (e) {
            reject(e)
        }
    })
    console.log(hass)
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listUsers = await db.users.findAll({
                raw: true
            });
            resolve(listUsers);
        } catch (e) {
            reject(e);
        }
    })
}

const getUserById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.users.findOne({
                where: { id: data.id },
                raw: true
            })
            resolve(user);
        } catch (e) {
            reject(e);
        }
    })
}

const editDoneCRUD = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.users.findOne({
                where: { id: data.id },
            });
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            user.phoneNumber = data.phoneNumber;
            user.gender = data.gender;
            await user.save();
            resolve();
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser: createUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    editDoneCRUD: editDoneCRUD
}