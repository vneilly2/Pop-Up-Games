# Project Name

> Pop Up Games:

```sh
Find, create, and join pick up games in your local area
(billion dollar idea btw)
```

## Team

- **Product Owner**: Peter Gierke
- **Scrum Master**: Max Berkowitz
- **Development Team Members**: Sophia Lee, Yuqi Zhu

## Table of Contents

1.  [Usage](#Usage)
1.  [Requirements](#requirements)
1.  [Development](#development)
    1.  [Installing Dependencies](#installing-dependencies)
    1.  [Tasks](#tasks)
1.  [Team](#team)
1.  [Contributing](#contributing)

## Usage

> Have fun with the best project this side of the sun

## Requirements

- Node 8.11.3
- /config/config.js file containing:
  - exports.SECRET = secret for session
  - exports.DBPASS = the password for the user root for mysql on your computer (blank string for no password)
  - exports.GMAPS_API = api key for googlemaps (Geocoding API and Maps JavaScript API enabled on the key)
- for heroku:
  - NODE_ENV = 'production'
  - NPM_CONFIG_PRODUCTION = true
  - whatever msql database you want to use (we used ClearDB MySQL :: Database):
    - DATABASE_URL = the url given to you via CLEARDB_DATABASE_URL upon setting up ClearDB or whatever else you use
  - GMAPS_API = your api key
  - SECRET = secret for session

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Roadmap

View the project roadmap [here](https://github.com/BlastOffInc/Pop-Up-Games/pulls)

## Contributing

[Upstream](https://github.com/BlastOffInc/Pop-Up-Games)
