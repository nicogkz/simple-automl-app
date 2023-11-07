### A Very simple App to predict using Machine Learning a Real Estate value.

The use case is super simple: a real estate company wants to build a price per squared-meters estimator for houses in a specific area - Per the data available this relates to houses in Taiwan. The user fills some parameters and get an estimation.
Bonus: the user can see the house latitude longitude coordinates on a map and can also click the map to get the coordinates put in the estimator.

And of course we can do much more...

Status: WIP.

> APP UI: 
<img src="./Real Estate Pricing Estimator App Screenshot.png" />

<h2>Here is what you will have in it:</h2>
0/ 0_Investigation
> Data exploration (in the work folder), data prep and AutoML Model using FLAML. Some insights and viz are describing the data we have.
> Status: Done.

1/ 1_BackendAPI_test
> Let's test to get an estimation using a Flask API End point. Runs on: http://127.0.0.1:5000
> Status: Done. Potential other features possible.

2/ 2_ContainerizedAPP
> Let's add a basic React front end (Runs on: http://127.0.0.1:5173) to get estimations and containerized the whole app.
> Status: WIP.
> TO DO: Docker Container

<h2>Stack: Not tech for tech but let's explain what is supporting our app</h2>
* DS Packages: FLAML AutoML + the usual suspects Pandas, Scikit Learn, Seaborn, Leaflet, MatplotLib...
* Flask Backend
* React Frontend (using leaflet): Point of Interest here => use of props to send and get data from Child and Parent components.
* Docker

<h2>Useful Resources </h2>
## Data:
> from UCI : https://archive.ics.uci.edu/dataset/477/real+estate+valuation+data+set


## Some how to:
> Using conda, testing Flask is done with : 1/ export FLASK_APP=apidev.py 2/ flask run