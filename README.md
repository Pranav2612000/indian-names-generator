# indian-names-generator
A fun project to test out deploying APIs on serverless cloud (https://www.serverless.com/cloud/). 
Returns a random array of Indian names

Live link: https://yellow-paper-abf36.cloud.serverless.com/names


Try it out
```curl
curl --request GET \
  --url 'https://yellow-paper-abf36.cloud.serverless.com/names?gender=female&seed=A&number=20'
```

## Request Params
| Param | Datatype | Default Value | Explanation |
| ----- | -------- | ------------- | ----------- |
|number | Integer | 1 | Number of random names required |
| first | Boolean | True | Should the first name be returned |
| last | Boolean | True | Should the last name be returned |
| gender | "male" or "female" or undefined | undefined |  gender of the names that are to be returned |



## Deployment

- Follow the instructions give [here](https://www.serverless.com/cloud/docs/getting-started) to install the required dependencies for serverless cloud
- Login and connect to the indian-names-generator project through the cli and dashboard
- Run `cloud deploy production` to deploy the changes to production
- To Run in dev mode, run with the `NODE_ENV` environment variable set to `"dev"`
