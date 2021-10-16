# hidden-service

## Usage

```javascript
import { start } from "hidden-service"

const { hostname } = await start({
  port: 80, // Same as { 80: 80 } or { 80: "127.0.0.1:80" }
})

console.log(hostname) // n72...uqd.onion
```

## API

### `const { hostname, tor, hiddenServiceDirectory } = await start(options)`

`options`:

```javascript
{
  port: 80, // Default port, maps to 127.0.0.1:80
  privateKey: undefined // Optional Ed25519 private key
}
```

- `tor` spawned `ChildProcess`.
- `hostname` onion hostname (n72...uqd.onion).
- `hiddenServiceDirectory` directory containing (`hs_ed25519_secret_key`, `hs_ed25519_public_key`, `hostname`) (created using `fs.mkdtemp`).

Resolves once Tor is fully bootstrapped.

### `const privateKey = await getRandomPrivateKey()`

`privateKey`, 32 byte `Uint8Array` with a random Ed25519 private key (re-exported from [noble-ed25519](https://github.com/paulmillr/noble-ed25519)).

### `const secretKey = await getSecretKey(privateKey)`

`secretKey`, 96 byte `Uint8Array` [expanded](https://github.com/torproject/tor/blob/22552ad88e1e95ef9d2c6655c7602b7b25836075/src/ext/ed25519/ref10/keypair.c#L27) and tagged `privateKey`.

### `const publicKey = await getPublicKey(privateKey)`

`publicKey`, 64 byte `Uint8Array` tagged `publicKey`.

### `const hostname = getHostname(publicKey)`

`hostname`, version 3 onion address.
