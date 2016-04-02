# tail.log
A light weight web log tail tool, watch everything in your browser!

[![NPM](https://nodei.co/npm/tail.log.png)](https://nodei.co/npm/tail.log/)

### Setup

1. `npm install tail.log`
2. `cd tail.log && npm install && cd node_modules`
3. `node ./server.js /path/to/your.log`

Note: This is not a library, it's a server program actually, we will try to make it a command line tool.

**Since 1.0.7, a built-in basic auth are integrated, see updates.~~It's suggested to have a base authentication on your web server to prevent malicious log snooping.~~**

### Screenshoots

<img src='http://netd.mindfine.com/pictures/dev/tail.log.youdar.png' width='625'/>

### Updates

#### Update 1.0.7:

The Basic Authentication: youdar:youdarpass

Generate: `htpasswd -b users.htpasswd youdar youdarpass`

#### Modified from: https://gist.github.com/karmi/718035

* Fixed some errors, while node has changed a lot.
