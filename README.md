# gulis-middleware
> the search api for ptt beauty

[![Build Status](https://travis-ci.org/Purple-Ninja/gulis-middleware.svg?branch=master)](https://travis-ci.org/Purple-Ninja/gulis-middleware)
[![Coverage Status](https://coveralls.io/repos/github/Purple-Ninja/gulis-middleware/badge.svg?branch=master)](https://coveralls.io/github/Purple-Ninja/gulis-middleware?branch=master)

### Quick start

```
npm install
npm start
```

Or you can specify the mongodb uri by setting the `env`

```
MONGOURI=mongodb://[HOST]:[PORT]/[Database] node app.js
```


#### GET `/beauty/search`

| Name | description | Type |
| ---- | ----------- | ---- |
| keyword | search keyword | string |
| push | push number | number |
| tag | title tag | string |
| limit | 2 | number |

#### POST `/beauty/feedback`

| Name | description | Type |
| ---- | ----------- | ---- |
| like | user's action | boolean |
| imgid | image id | number |
| userid | user id | string |

#### POST `/beauty/logging`

| Name | description | Type |
| ---- | ----------- | ---- |
| raw | user's raw input | string |
| meta | push number | object |

#### GET `/beauty/trending`

| Name | description | Type |
| ---- | ----------- | ---- |
| userid | user id | string |

