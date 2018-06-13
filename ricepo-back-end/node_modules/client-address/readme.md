# client-address

Obtain client ipv6 / ipv4 address from Node HTTP / HTTPS request

> Easy to use Client Address Request Header parser

[![version][npm-version]][npm-url]
[![Downloads][npm-downloads]][npm-url]

**Features**

- Web Socket support
- Remote Address support
- Cluster Client IP Address support
- Real-IP Support
- Forwarded-For Support
- Proper address fall-through chain built in
- IPV4 from IPV6 address supported

## Installation

```sh
$ npm i client-address --save
```

## Usage

```js
const getClientAddress = require('client-address')

const handler = (req, res) {
  // Enforce IPV4 address
  let IPV4 = address.v4(req)

  // IPV6 or IPV4
  let IP = address(req)
}
```

## Documentation

**`getClientAddress(Object request) -> IPV6 / IPV4`**

Returns either a `IPV4` or `IPV6` address.

**`getClientAddress.v4(req) -> IPV4`**

Returns a `IPV4` address.

## License

[MIT](LICENSE) &copy; 2016 [Nijiko Yonskai](https://nijikokun.com)

[npm-url]: https://www.npmjs.com/package/client-address
[npm-license]: https://img.shields.io/npm/l/client-address.svg?style=flat-square
[npm-version]: https://img.shields.io/npm/v/client-address.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/client-address.svg?style=flat-square