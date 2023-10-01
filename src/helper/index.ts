import fs from 'fs/promises'

export const uploadBase64Data = async (slug: string, thumbnail: string) => {
  const base64Data = thumbnail.replace('data:image/jpeg;base64,', '')
  await fs.writeFile(`src/public/${slug}.jpg`, base64Data, 'base64')
}

