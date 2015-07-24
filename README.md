# Onboarding project for JavaScript  

This is a JavaScript project for all new developers to complete before venturing into our web frontend codebase.  

Once you complete this project and went through code review you will have a much better understanding of JavaScript
and it's superset, TypeScript, that we use for development.  

## Technologies you will encouter  

1. HTML  
1. CSS  
1. JavaScript  
1. TypeScript  
1. JQuery  

## Brief  

You task is to build a grid/table in TypeScript that fetches data from a server and displays it. Here are the requirements:  
1. The grid should cover the entire screen. The browser scrollbar should not appear.  
1. The columns widths should be distributed evenly.  
1. Display column headings based on the data you get back from the web service.  
1. The grid should have controls to navigate through data. You can choose a suitable way of doing this.  
1. Display the first page of data when you open up page for first time.  
1. Don't use any third-party libraries. You can use vanilla JQuery if you want.  

## Web Service API  

The web service you will retrieve data from is a little Golang REST service that is packaged with this repository. It runs on port 2050. 
Here are the relevant API calls:

1. Get total number of records
	Path: HTTP GET /recordCount
	Response: Integer number in body of response
	Example response:
		200

1. Get column names  
	Path: HTTP GET /columns  
	Response: JSON in body of response
	Example response:
		{
			"Columns":	[
				"ID",
				"City",
				"Population"			
			]
		}

1. Get records  
	Path: HTTP GET /records/{from}/{to}   
	Response: JSON in body of response  
	The order of entries in a record corresponds to the order of the columns returned by the /columns API  
	Example response:
		{
			"Records": 	[
				[0, "Cape Town", 3500000],
				[1, "New York", 8500000],
				[2, "Johannesburg", 4500000]
			]
		}

## Code Review  

The code review will take the following into account:  
1. Was the brief correctly followed, does the grid work as expected  
1. Is the code style according to [JavaScript Style Guide](https://imqssoftware.atlassian.net/wiki/display/AR/Javascript+Style+Guide)  
1. User-centric thinking - is the grid easy to use  
1. Suitable comments  
1. Performance considerations   
1. Aesthetics  

## Pre-requisites  

1. You need to have set up your development environment [as described here](https://imqssoftware.atlassian.net/wiki/display/AR/Dev+Environment).  
1. You can use either Microsoft Visual Studio Pro or Microsoft Visual Studio Express for Web as IDE  

## Getting Started  

1. Fork this GIT repository under your own GIT account  
1. Create a new TypeScript project with an index.html file in the root of the repository  
1. Under the Web section of the project properties under Servers, change the dropdown to "External Host" and the project URL to http://localhost:2050  
1. Run runserver.bat in the root of the repository  
1. Open up your browser and point it to [http://localhost:2050](http://localhost:2050)  
1. Get coding!  
