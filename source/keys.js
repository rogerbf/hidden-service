import { getPublicKey, utils } from "noble-ed25519"

const { randomPrivateKey } = utils

const expand = async (privateKey) => {
  const hash = await utils.sha512(privateKey)

  hash[0] &= 248
  hash[31] &= 63
  hash[31] |= 64

  return hash
}

const secretKeyPrefix = new Uint8Array([
  61, 61, 32, 101, 100, 50, 53, 53, 49, 57, 118, 49, 45, 115, 101, 99, 114, 101,
  116, 58, 32, 116, 121, 112, 101, 48, 32, 61, 61, 0, 0, 0,
]) // == ed25519v1-secret: type0 ==\x00\x00\x00

const getSecretKey = async (privateKey) => {
  const expanded = await expand(privateKey)
  const secretKey = new Uint8Array(96)

  secretKey.set(secretKeyPrefix, 0)
  secretKey.set(expanded, 32)

  return secretKey
}

const publicKeyPrefix = new Uint8Array([
  61, 61, 32, 101, 100, 50, 53, 53, 49, 57, 118, 49, 45, 112, 117, 98, 108, 105,
  99, 58, 32, 116, 121, 112, 101, 48, 32, 61, 61, 0, 0, 0,
]) // == ed25519v1-public: type0 ==\x00\x00\x00

const getPrefixedPublicKey = async (privateKey) => {
  const publicKey = new Uint8Array(64)

  publicKey.set(publicKeyPrefix, 0)
  publicKey.set(await getPublicKey(privateKey), 32)

  return publicKey
}

export { getPrefixedPublicKey as getPublicKey, getSecretKey, randomPrivateKey }
