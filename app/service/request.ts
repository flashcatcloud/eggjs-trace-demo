var request = require("request")
// options interface follow https://github.com/request/request#requestoptions-callback
export default function (options) {
  return new Promise((resolve, reject) => {
    request(options, function (error, response) {
      if (error) reject(error)
      let result = {}
      try {
        result = JSON.parse(response.body)
      } catch (e) {}
      resolve(result)
    })
  })
}
