# Start with One - Cathy

### install dependencies
```
yarn
```

### run a development server including watching your javascript and less files
Requires the cloud SDK for python (https://cloud.google.com/appengine/docs/standard/python/download) so you can run the dev_appserver.py and Python 2. 

```
yarn start
```

### deploy to gcloud
```
yarn run deploy
```

### Note: you can add additional gcloud parameters to the end.
### In the following command --quiet [-q] removes interactive prompts from gcloud
```
yarn run deploy -q
```
