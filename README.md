# gulis-api


### GET ```/beauty/search```

| Name | description | Type |
| ---- | ----------- | ---- |
| keyword | search keyword | string |
| push | push number | number |
| tag | title tag | string |
| limit | 2 | number |

### POST ```/beauty/feedback```

| Name | description | Type |
| ---- | ----------- | ---- |
| like | user's action | boolean |
| imgid | image id | number |
| userid | user id | string |

### POST ```/beauty/logging```

| Name | description | Type |
| ---- | ----------- | ---- |
| raw | user's raw input | string |
| meta | push number | object |

### GET ```/beauty/trending```

| Name | description | Type |
| ---- | ----------- | ---- |
| userid | user id | string |

