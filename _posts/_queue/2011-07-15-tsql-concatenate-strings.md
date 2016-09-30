---
layout: post
category : code
tagline: 
tags : [ tsql, code, tips, tricks ]
---
{% include JB/setup %}

There several methods for building strings from multiple rows of data, but my favorite uses XML. This approach doesn’t require any loops or temporary variables (which cannot be used within a `VIEW`).

Another benefit is that the resulting query can be used as a subquery, in a common table expression (CTE), or anywhere that a normal query would be used.

~~~
-- init example data
DECLARE @Data TABLE (Id int IDENTITY(1,1), Caption varchar(25))
 
INSERT INTO @Data (Caption)
       SELECT 'Apple'
 UNION SELECT 'Orange'
 UNION SELECT 'Banana'
 UNION SELECT 'Pear'
 UNION SELECT 'Mango'
 UNION SELECT 'Kiwi'

-- query [version 1]
SELECT Caption + ','
  FROM @Data
 ORDER BY Caption
   FOR XML Path('')
~~~

The result of that query is “Apple,Banana,Kiwi,Mango,Orange,Pear,”. If that last comma bugs you, it can be eliminated using something similar to the following query. The only change from the first version is in the `SELECT` list.

~~~
-- query [version 2]
SELECT CASE WHEN ROW_NUMBER() OVER (ORDER BY Caption) > 1
            THEN ','
            ELSE '' END + Caption
  FROM @Data
 ORDER BY Caption
   FOR XML Path('')
~~~

Note that you could have removed the trailing comma using the `SUBSTRING` function on the resulting value, but that would make the query harder to embed as a subquery or CTE.

Also note that the result of these queries is technically (malformed) XML, but can easily be converted to a string using something similar to the following query.

~~~
-- query [version 3]
SELECT CAST((
  SELECT Caption + ','
    FROM @Data
   ORDER BY Caption
     FOR XML Path('')
) AS varchar(255))
~~~

-- Joe