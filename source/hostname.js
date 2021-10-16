import base32 from "hi-base32"
import hash from "js-sha3"

const { sha3_256 } = hash

const onionVersion = new Uint8Array([3])

const checksumPrefix = new Uint8Array([
  46, 111, 110, 105, 111, 110, 32, 99, 104, 101, 99, 107, 115, 117, 109,
]) // ".onion checksum"

const calculateChecksum = (publicKey) => {
  const hashInput = new Uint8Array(48)

  hashInput.set(checksumPrefix, 0)
  hashInput.set(publicKey, 15)
  hashInput.set(onionVersion, 47)

  const hash = new Uint8Array(sha3_256.arrayBuffer(hashInput))

  return hash.slice(0, 2)
}

const getHostname = (publicKey) => {
  if (publicKey.length === 64) {
    publicKey = publicKey.slice(32)
  }

  const hostname = new Uint8Array(35)

  hostname.set(publicKey, 0)

  const checksum = calculateChecksum(publicKey)

  hostname.set(checksum, 32)
  hostname.set(onionVersion, 34)

  return base32.encode(hostname).toLowerCase() + ".onion"
}

export { getHostname }
