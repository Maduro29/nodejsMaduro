import db from "../models";
import bcrypt, { compareSync } from 'bcryptjs';


const handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            let isExist = await checkEmail(email);
            if (isExist) {
                let user = await db.users.findOne({
                    where: { email: email },
                    raw: true,
                })
                const checkPassword = compareSync(password, user.password);
                delete user.password;
                if (checkPassword) {
                    data.errCode = 0;
                    data.message = 'ok';
                    data.user = user;
                } else {
                    data.errCode = 3;
                    data.message = 'Wrong password';
                }
            } else {
                data.errCode = 2;
                data.message = `Email doesn't exist`;
            }
            resolve({
                status: (!data.errCode ? 200 : 500),
                data: data
            })
        } catch (e) {
            reject(e)
        }
    })
}

const checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.users.findOne({
                where: { email: email }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e)
        }
    })
}

const getUsers = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (id === 'ALL') {
                users = await db.users.findAll({
                    raw: true,
                    attributes: {
                        exclude: 'password'
                    }
                })
            } else if (id) {
                users = await db.users.findOne({
                    where: { id: 1 },
                    raw: true,
                    attributes: {
                        exclude: 'password'
                    }
                })
            }
            resolve(users);
        } catch (e) {
            reject(e)
        }
    })
}

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
    return new Promise(async (resolve, reject) => {
        try {
            let result = {};
            const emailCheck = await checkEmail(data.email);
            if (!emailCheck) {
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
                result.errCode = 0;
                result.message = 'Creation is done!';
            } else {
                result.errCode = 1;
                result.message = 'Email is existed. Please try another email!';
            }

            resolve(result)
        } catch (e) {
            reject(e)
        }
    })
}

const editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = {};
            let user = await db.users.findOne({
                where: { id: data.id },
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                result.errCode = 0;
                result.message = 'Editing is done!';
            } else {
                result.errCode = 1;
                result.message = 'Account is not existed!';
            }

            resolve(result);
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = {};
            let user = await db.users.findOne({
                where: { id: id },
            })
            if (!user) {
                result.errCode = 2;
                result.message = `User isn't existed`;
                resolve(result);
            }

            await user.destroy();

            result.errCode = 0;
            result.message = 'Deletion is done!';
            resolve(result);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleLogin: handleLogin,
    getUsers: getUsers,
    createUser: createUser,
    editUser: editUser,
    deleteUser: deleteUser
}