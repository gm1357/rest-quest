#!/bin/bash

mongoimport --host mongo --db rest-quest --collection places --type json --file /places.json --jsonArray
mongoimport --host mongo --db rest-quest --collection routes --type json --file /routes.json --jsonArray