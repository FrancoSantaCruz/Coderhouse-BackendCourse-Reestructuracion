import { usersManager } from "../dao/managers/users.manager.js";

export const findAll = async () => {
    const users = usersManager.findAll();
    return users;
};

export const findById = async (id) => {
    const user = usersManager.findById(id);
    return user;
};

export const findByEmail = async (email) => {
    const user = usersManager.findByEmail(email);
    return user;
};

export const deleteOne  = async (id) => {
    const user = usersManager.deleteOne(id);
    return user;
};
