import { GraphQLError } from 'graphql'
import { pool } from '../../connetBd'
import { uploadBase64Data } from '../../helper'
import { convert } from 'url-slug'
import { uid } from 'uid'

interface InputAlbum {
  input: {
    title_album: string
    description: string
    base64_img: string
  }
}

interface InputImage {
  input: {
    description: string
    base64_img: string
    album_id: string
  }
}

interface InputImage {
  slug: string
}

export default {
  Query: {
    allAlbum: async () => {
      const [albums] = await pool.query('SELECT * FROM albums')
      return albums
    },
    showImages: async ({ } = {}, { slug }: InputImage) => {
      const [images] = await pool.query(`SELECT images.base64_img AS base64_img, images.description as description FROM albums JOIN images ON images.album_id=albums.id  WHERE albums.slug='${slug}'`)
      return images
    }
  },

  Mutation: {
    addAlbum: async ({ } = {}, { input }: InputAlbum) => {
      const { title_album, description, base64_img } = input
      const slug = convert(title_album)
      await pool.query(`INSERT INTO albums (id, title_album, description, base64_img, slug) VALUES (NULL, '${title_album}', '${description}', '${base64_img}', '${slug}')`)
      return 'success'
    },
    addImagen: async ({ } = {}, { input }: InputImage) => {
      const { description, base64_img, album_id } = input
      const slug = uid()
      await pool.query(`INSERT INTO images (id, album_id, description, base64_img, slug) VALUES (NULL, '${album_id}', '${description}', '${base64_img}', '${slug}')`)
      return 'success'
    }
  }
}