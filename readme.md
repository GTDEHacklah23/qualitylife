# qualitylife

Sample bare-bones frontend with relevant tooling

# Configuration

`.env` files are used for configuration. The following priority is used:

1. `prod.env`
2. `dev.env`
3. `local.env`

`prod.env` and `dev.env` are not checked into source control. `local.env` is checked in, but should not be used in production.

# Building

- `npm run build` - Build everything
- `npm run build-css` - Build only the CSS
- `npm run build-pack` - Build only the JS
- `npm run build-tsc` - Build only the webserver
- `npm run build-dev` - Build only CSS and client-side JS

# Running

- `npm run start` - Starts the webserver
- `npm run watch` - Starts the webserver and restarts on changes
- `npm run dev` - Rebuilts client-side files and starts the webserver

# Development

- Clone this repo using `git clone git@github.com:GTDEHacklah23/SampleWeb.git`
- Install dependencies using `npm install`
- Create a `dev.env` file with the following contents:

```
HTTP_PORT = 80
HTTPS_PORT = 443
KEY_PATH="path-to-certificates"
ENVIROMENT = "dev"
```

> `KEY_PATH` is the path to the directory containing the `key.pem` and `cert.pem` files.
> If it is not present, the server will only serve HTTP

- Compile evertyhing using `npm run build`
- Start the server using `npm start`

Go to http://localhost:80 (HTTP) or https://localhost:443 (HTTPS) to see the site.

When you are working on client-side code, you can use `npm run dev` instead to automatically rebuild the client-side code and restart the server.
