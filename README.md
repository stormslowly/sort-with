# a sort utils stolen from ramda.js


## usage


```typescript

import {sortWith, ascendBy, descendBy } from 'sort-with'


sortWith(
	[ascendBy('title'), descendBy('sorce')],
	movies
)

// or


const sort = sortWith([ascendBy('title'), descendBy('sorce')])

const sorted = sort(movies)

````

thx for reading here


