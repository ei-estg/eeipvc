import { readdirSync } from 'fs'
import path from "path";

export const getCommandFilesPath = () => {
  const COMMANDS_PATH = path.join(__dirname, '..', 'extensions', 'commands', 'groups')

  const dirs = readdirSync(COMMANDS_PATH)
  return dirs.flatMap(
    dir => {
      const files = readdirSync(
        path.join(COMMANDS_PATH, dir),
        {
          withFileTypes: true
        }
      ).filter(fileOrDir => fileOrDir.isFile())

      return files.map(file => path.join(COMMANDS_PATH, dir, file.name))
    }
  )
}
