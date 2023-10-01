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
const connetBd_1 = require("../../connetBd");
const url_slug_1 = require("url-slug");
const uid_1 = require("uid");
exports.default = {
    Query: {
        allAlbum: () => __awaiter(void 0, void 0, void 0, function* () {
            const [albums] = yield connetBd_1.pool.query('SELECT * FROM albums');
            return albums;
        }),
        showImages: ({} = {}, { slug }) => __awaiter(void 0, void 0, void 0, function* () {
            const [images] = yield connetBd_1.pool.query(`SELECT images.base64_img AS base64_img, images.description as description FROM albums JOIN images ON images.album_id=albums.id  WHERE albums.slug='${slug}'`);
            return images;
        })
    },
    Mutation: {
        addAlbum: ({} = {}, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const { title_album, description, base64_img } = input;
            const slug = (0, url_slug_1.convert)(title_album);
            yield connetBd_1.pool.query(`INSERT INTO albums (id, title_album, description, base64_img, slug) VALUES (NULL, '${title_album}', '${description}', '${base64_img}', '${slug}')`);
            return 'success';
        }),
        addImagen: ({} = {}, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const { description, base64_img, album_id } = input;
            const slug = (0, uid_1.uid)();
            yield connetBd_1.pool.query(`INSERT INTO images (id, album_id, description, base64_img, slug) VALUES (NULL, '${album_id}', '${description}', '${base64_img}', '${slug}')`);
            return 'success';
        })
    }
};
