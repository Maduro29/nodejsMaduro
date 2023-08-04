import bcrypt from 'bcryptjs';
import db from '../models';

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
                gender: data.gender === 1 ? true : false,
                roleId: data.roleId,
            })
        } catch (e) {
            reject(e)
        }
    })
    console.log(hass)
}

module.exports = {
    createUser: createUser
}