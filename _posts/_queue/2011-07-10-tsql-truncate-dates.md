---
layout: post
category : code
tagline: 
tags : [ tsql, code, tips, tricks ]
---
{% include JB/setup %}

There are many times when you want to store a pure date in the database. Examples include date of birth, anniversaries, date of hire, etc… Before the 2008 version of SQL Server, there was no pure date data type. Dates were stored in `DATETIME` columns.

In another sceanrio, you may actually want to store the date and time, but perform queries on just the date part. For example, you may have a LastSeenOn column in your user table that stores the date and time that the user last accessed your application, but you want to write a query that shows all users who last accessed the system on a given date.

If you compare the LastSeenOn column with a specific date, the comparison will include the time component of the `DATETIME`. If you’re really lucky, you may catch a user or two who logged in at midnight on the date in question, but it’s much more likely that your query will return no rows. (In this case, you could craft your `WHERE` clause such that the LastSeenOn column is between a start date and an end date that spans 24 hours).

With SQL Server 2008, it’s easy to compare a pure date value (or a pure time value, although that’s typically not very useful). Just cast the `DATETIME` value to a `DATE`.

~~~
-- initialize example data
DECLARE @DateValue datetime
SET @DateValue = CAST(rand() * 45678 AS datetime)

-- the SQL 2008 query
SELECT @DateValue AS DateAndTime,
CAST(@DateValue AS date) AS DateOnly,
CAST(@DateValue AS time) AS TimeOnly
~~~

For versions of SQL Server prior to 2008, several tricks are commonly used to truncate the time from a `DATETIME` value. My favorite method is listed below.

~~~
-- the SQL 2005 / SQL 2000 query
SELECT @DateValue AS DateAndTime,
DATEADD(dd,DATEDIFF(dd,0,@DateValue),0) AS DateOnly
~~~

The `DATEADD` function adds some number of days (the ‘dd’ argument) to a known valid date (the integer value ’0′ in SQL maps to the date ’1/1/1900′). The number of days that `DATEADD` adds to ’1/1/1900′ is determined by the result of the `DATEDIFF` function, which calculates the number of days that have elapsed since ’1/1/1900′.

As I said, there are other methods, but I have my reasons for avoiding them. Feel free to Google.

-- Joe