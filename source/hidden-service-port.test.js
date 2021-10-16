import test from "ava"
import { hiddenServicePort } from "./hidden-service-port.js"

const hiddenServicePortArg = "HiddenServicePort"

test("number supplied as port", (assert) => {
  const port = 80
  const expected = [hiddenServicePortArg, "80 127.0.0.1:80"]
  const actual = hiddenServicePort(port)

  assert.deepEqual(actual, expected)
})

test("port mapping to another", (assert) => {
  const port = { 80: 8080 }
  const expected = [hiddenServicePortArg, "80 127.0.0.1:8080"]
  const actual = hiddenServicePort(port)

  assert.deepEqual(actual, expected)
})

test("port mapping to a different host", (assert) => {
  const port = { 80: "192.168.0.1:8080" }
  const expected = [hiddenServicePortArg, "80 192.168.0.1:8080"]
  const actual = hiddenServicePort(port)

  assert.deepEqual(actual, expected)
})

test("multiple ports", (assert) => {
  const port = { 80: "192.168.0.1:8080", 8080: 80 }

  const expected = [
    hiddenServicePortArg,
    "80 192.168.0.1:8080",
    hiddenServicePortArg,
    "8080 127.0.0.1:80",
  ]

  const actual = hiddenServicePort(port)

  assert.deepEqual(actual, expected)
})
