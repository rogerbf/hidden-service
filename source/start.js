/**
 * @typedef {import("child_process").ChildProcess} ChildProcess
 * @typedef {import("./keys.js").PrivateKey} PrivateKey
 */

import { spawn } from "child_process"
import { chmod, mkdtemp, readFile, writeFile } from "fs/promises"
import { tmpdir } from "os"
import { join } from "path"
import { hiddenServicePort } from "./hidden-service-port.js"
import { getSecretKey } from "./keys.js"

/**
 * @param {object} [options]
 * @param {object|number} options.port
 * @param {PrivateKey} [options.privateKey] 32 byte Ed25519 private key
 *
 * @returns {Promise<{tor: ChildProcess, hostname: string, hiddenServiceDirectory: string}>}
 */
const start = async ({ port, privateKey } = { port: 80 }) => {
  const hiddenServiceDirectory = await mkdtemp(join(tmpdir(), "hs-"))

  if (privateKey) {
    const secretKey = await getSecretKey(privateKey)

    await writeFile(
      join(hiddenServiceDirectory, "hs_ed25519_secret_key"),
      secretKey
    )
  }

  await chmod(hiddenServiceDirectory, 0o700)

  const tor = spawn(
    "tor",
    ["HiddenServiceDir", hiddenServiceDirectory].concat(hiddenServicePort(port))
  )

  const hostname = await new Promise((resolve, reject) => {
    tor.on("exit", reject)
    tor.on("error", reject)

    tor.once("spawn", () => {
      tor.off("error", reject)
    })

    const bootstrapListener = (buffer) => {
      const data = buffer.toString()

      if (/Bootstrapped 100%/g.test(data)) {
        tor.off("exit", reject)
        tor.stdout.off("data", bootstrapListener)

        resolve(
          readFile(join(hiddenServiceDirectory, "hostname"), {
            encoding: "utf8",
          }).then((hostname) => hostname.trim())
        )
      }
    }

    tor.stdout.on("data", bootstrapListener)
  })

  return {
    tor,
    hostname,
    hiddenServiceDirectory,
  }
}

export { start }
