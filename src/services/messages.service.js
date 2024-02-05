import { messagesManager } from "../dao/managers/messages.manager.js";

export const findAll = async () => {
    const messages = messagesManager.findAll();
    return messages;
};

export const findByField = async (obj) => {
    const message = messagesManager.findByField(obj);
    return message;
};

export const createOne = async (obj) => {
    const newMessage = messagesManager.createOne(obj);
    return message;
};
