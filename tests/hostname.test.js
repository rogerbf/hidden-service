import test from "ava"
import { getHostname } from "../source/hostname.js"

test("returns the expected hostname using prefixed keys", (assert) => {
  const publicKeyWithExpectedHostname = [
    [
      new Uint8Array([
        61, 61, 32, 101, 100, 50, 53, 53, 49, 57, 118, 49, 45, 112, 117, 98,
        108, 105, 99, 58, 32, 116, 121, 112, 101, 48, 32, 61, 61, 0, 0, 0, 226,
        181, 93, 168, 0, 250, 222, 222, 95, 117, 236, 221, 84, 75, 168, 241,
        130, 148, 179, 18, 63, 145, 100, 82, 229, 206, 255, 197, 127, 204, 54,
        123,
      ]),
      "4k2v3kaa7lpn4x3v5tovis5i6gbjjmysh6iwiuxfz374k76mgz53azqd.onion",
    ],
    [
      new Uint8Array([
        61, 61, 32, 101, 100, 50, 53, 53, 49, 57, 118, 49, 45, 112, 117, 98,
        108, 105, 99, 58, 32, 116, 121, 112, 101, 48, 32, 61, 61, 0, 0, 0, 78,
        53, 106, 184, 203, 126, 139, 135, 89, 147, 13, 28, 41, 201, 46, 4, 48,
        42, 54, 235, 46, 255, 7, 160, 158, 10, 137, 116, 81, 89, 245, 27,
      ]),
      "jy2wvoglp2fyowmtbuoctsjoaqycunxlf37qpie6bkexiukz6un6lnyd.onion",
    ],
    [
      new Uint8Array([
        61, 61, 32, 101, 100, 50, 53, 53, 49, 57, 118, 49, 45, 112, 117, 98,
        108, 105, 99, 58, 32, 116, 121, 112, 101, 48, 32, 61, 61, 0, 0, 0, 24,
        251, 189, 23, 16, 59, 232, 58, 26, 101, 80, 35, 24, 29, 104, 48, 116,
        58, 179, 16, 244, 158, 14, 31, 191, 17, 198, 183, 162, 107, 38, 139,
      ]),
      "dd532fyqhpudugtfkarrqhligb2dvmyq6spa4h57chdlpitle2f7r2yd.onion",
    ],
    [
      new Uint8Array([
        61, 61, 32, 101, 100, 50, 53, 53, 49, 57, 118, 49, 45, 112, 117, 98,
        108, 105, 99, 58, 32, 116, 121, 112, 101, 48, 32, 61, 61, 0, 0, 0, 127,
        30, 11, 66, 255, 224, 64, 54, 148, 3, 42, 53, 183, 94, 222, 253, 96, 97,
        217, 43, 35, 78, 97, 121, 117, 212, 187, 160, 202, 37, 213, 117,
      ]),
      "p4pawqx74badnfadfi23oxw67vqgdwjlenhgc6lv2s52bsrf2v23c2id.onion",
    ],
    [
      new Uint8Array([
        61, 61, 32, 101, 100, 50, 53, 53, 49, 57, 118, 49, 45, 112, 117, 98,
        108, 105, 99, 58, 32, 116, 121, 112, 101, 48, 32, 61, 61, 0, 0, 0, 168,
        212, 246, 187, 197, 170, 113, 50, 188, 253, 177, 195, 240, 181, 96, 117,
        83, 31, 163, 233, 196, 131, 224, 231, 214, 194, 215, 8, 68, 98, 221,
        125,
      ]),
      "vdkpno6fvjytfph5whb7bnlaovjr7i7jysb6bz6wyllqqrdc3v6raoid.onion",
    ],
  ]

  publicKeyWithExpectedHostname.forEach(([publicKey, expected]) => {
    const actual = getHostname(publicKey.subarray(32))

    assert.is(actual, expected)
  })
})

test("returns the expected hostname using Ed25519 public keys", (assert) => {
  const publicKey = new Uint8Array([
    226, 181, 93, 168, 0, 250, 222, 222, 95, 117, 236, 221, 84, 75, 168, 241,
    130, 148, 179, 18, 63, 145, 100, 82, 229, 206, 255, 197, 127, 204, 54, 123,
  ])

  const expected =
    "4k2v3kaa7lpn4x3v5tovis5i6gbjjmysh6iwiuxfz374k76mgz53azqd.onion"

  const actual = getHostname(publicKey)

  assert.is(actual, expected)
})
