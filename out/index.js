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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const accounts_json_1 = __importDefault(require("./accounts.json"));
const url = "https://io.scelgozero.it/auth.html#/login/";
const username = accounts_json_1.default[0].username;
const password = accounts_json_1.default[0].password;
const loginInputSelector = "form input[type='text']";
const pswInputSelector = "form input[type='password']";
const submitSelector = "form button[type='submit']";
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({ headless: false });
    const page = yield browser.newPage();
    yield page.goto(url);
    // wait for submit button
    yield page.waitForSelector(submitSelector);
    //type user
    yield page.type(loginInputSelector, username);
    //type password
    yield page.type(pswInputSelector, password);
    // submit form
    yield page.click(submitSelector);
    yield browser.close();
}))();
