/**
 * @param {object|number} port
 * @returns {Array<string>} tor command line arguments
 */
const hiddenServicePort = (port) =>
  Object.prototype.toString.call(port) === "[object Number]"
    ? ["HiddenServicePort", `${port} 127.0.0.1:${port}`]
    : Object.entries(port).reduce((args, [port, destination]) => {
        if (!isNaN(Number(destination))) {
          destination = `127.0.0.1:${destination}`
        }

        args.push("HiddenServicePort", `${port} ${destination}`)

        return args
      }, [])

export { hiddenServicePort }
