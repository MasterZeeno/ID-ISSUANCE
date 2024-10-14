import fs from 'node:fs'

export async function getMasterlist(filePath = './masterlist.json') {
  if (!fs.existsSync(filePath)) {
    return { error: `File not found: ${filePath}` }
  }
  return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' }))
}