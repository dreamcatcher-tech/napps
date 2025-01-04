import ytdl, { type downloadOptions } from '@distube/ytdl-core'

const pickFormatAndName = async (
  url: string,
  prefix: string,
  options: ytdl.downloadOptions,
) => {
  const info = await ytdl.getInfo(url)
  const chosen = ytdl.chooseFormat(info.formats, options)
  if (!chosen?.container) {
    throw new Error('No suitable format found')
  }

  const ext = chosen.container.toLowerCase()
  const lastPart = prefix.split('/').pop() || prefix

  if (lastPart.includes('.')) {
    const prefixExt = lastPart.split('.').pop()?.toLowerCase()
    if (prefixExt !== ext) {
      throw new Error(
        `Prefix extension ${prefixExt} does not match format extension ${ext}`,
      )
    }
  }
  const fileName = prefix.endsWith(`.${ext}`) ? prefix : `${prefix}.${ext}`
  return { fileName, info }
}

export const audio = async (
  url: string,
  prefix: string,
  lowest = false,
): Promise<string> => {
  console.log('ytdl.version', ytdl.version)
  const options: downloadOptions = {
    filter: 'audioonly',
    quality: lowest ? 'lowestaudio' : 'highestaudio',
    playerClients: ['IOS', 'WEB_CREATOR'],
  }
  const { fileName, info } = await pickFormatAndName(url, prefix, options)
  console.log('got fileName:', fileName)

  let file: Deno.FsFile | null = null
  try {
    file = await Deno.open(fileName, { create: true, write: true })
    const stream = ytdl.downloadFromInfo(info, options)

    // Manually pipe Node stream to Deno file
    for await (const chunk of stream) {
      const data = chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk)
      await file.write(data)
    }
    console.log('stream completed')
    stream.destroy()
    file.close()

    return fileName
  } catch (err) {
    console.error('error', err)
    if (file) {
      file.close()
      try {
        await Deno.remove(fileName)
      } catch {
        // Ignore
      }
    }
    throw err
  }
}

export const video = async (
  url: string,
  prefix: string,
  lowest = false,
): Promise<string> => {
  console.log('ytdl.version', ytdl.version)
  const options = { quality: lowest ? 'lowestvideo' : 'highestvideo' }
  const { fileName, info } = await pickFormatAndName(url, prefix, options)

  let file: Deno.FsFile | null = null
  try {
    file = await Deno.open(fileName, { create: true, write: true })
    const stream = ytdl.downloadFromInfo(info, options)

    for await (const chunk of stream) {
      const data = chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk)
      await file.write(data)
    }
    file.close()

    return fileName
  } catch (err) {
    if (file) {
      file.close()
      try {
        await Deno.remove(fileName)
      } catch {
        // Ignore
      }
    }
    throw err
  }
}
