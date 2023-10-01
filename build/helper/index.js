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
exports.uploadBase64Data = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const uploadBase64Data = (slug, thumbnail) => __awaiter(void 0, void 0, void 0, function* () {
    const base64Data = thumbnail.replace('data:image/jpeg;base64,', '');
    yield promises_1.default.writeFile(`src/public/${slug}.jpg`, base64Data, 'base64');
});
exports.uploadBase64Data = uploadBase64Data;
