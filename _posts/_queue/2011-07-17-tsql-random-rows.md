---
layout: post
category : code
tagline: 
tags : [ tsql, code, tips, tricks ]
---
{% include JB/setup %}

Sometimes it can be useful to randomly select a value (or row) from a table. One easy way to do this is to sort the table using a column that contains random values, and then select the first row. The following query illustrates this concept.

~~~
-- initialize example data
DECLARE @Data TABLE (Id int IDENTITY(1,1), Caption varchar(25))

INSERT INTO @Data (Caption)
SELECT 'Apple'
UNION SELECT 'Orange'
UNION SELECT 'Banana'
UNION SELECT 'Pear'
UNION SELECT 'Mango'
UNION SELECT 'Kiwi'

-- query
SELECT TOP 1
Caption
FROM @Data
ORDER BY NEWID()
~~~

Every time you run this query, you’ll be presented with a random fruit from the list.

It’s worth noting that this isn’t the fastest code in the world. While it’s fine for rarely-run data samples, I wouldn’t use it in an oft-called production routine.

-- Joe