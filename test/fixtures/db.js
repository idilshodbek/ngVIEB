"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDatabase = exports.userOne = exports.userOneId = void 0;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userOneId = new mongoose.Types.ObjectId();
exports.userOneId = userOneId;
const userOne = {
    _id: userOneId,
    tel: 'mike@example.com',
    password: '123456#',
    name: "John Wick",
    tokens: [{
            token: jwt.sign({ _id: userOneId }, "somesupersecretsecret")
        }]
};
exports.userOne = userOne;
const setupDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    // await userModel.deleteMany();
    // await new userModel(userOne).save();
});
exports.setupDatabase = setupDatabase;
