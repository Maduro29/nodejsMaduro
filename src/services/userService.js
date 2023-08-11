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
            resolve(data)
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

module.exports = {
    handleLogin: handleLogin
}