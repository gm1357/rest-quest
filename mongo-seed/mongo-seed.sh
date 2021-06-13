#!/bin/bash

mongoimport --host mongodb --db rest-quest --collection items --type json --file /mongo-seed/items.json --jsonArray
mongoimport --host mongodb --db rest-quest --collection places --type json --file /mongo-seed/places.json --jsonArray
mongoimport --host mongodb --db rest-quest --collection routes --type json --file /mongo-seed/routes.json --jsonArray