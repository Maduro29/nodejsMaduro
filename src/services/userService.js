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
                    attributes: {
                        exclude: 'password'
                    }
                })
                const checkPassword = compareSync(password, user.password);
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

module.exports = {
    handleLogin: handleLogin,
    getUsers: getUsers
}