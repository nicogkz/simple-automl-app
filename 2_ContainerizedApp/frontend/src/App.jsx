

import { useState,useEffect } from 'react'
import Estimator from './components/Estimator'
import Map from './components/Map'
import { testAPI } from './apis/apis'
import './App.css'

function App() {
  const [apiStatus,setApiStatus] = useState("")
  const [estimationRef,setEstimationRef] = useState(null)
  const [latRef,setLatRef] = useState(24.96334)
  const [lonRef,setLonRef] = useState(121.54767)

  useEffect(()=>{
    setApiStatus("")
    testAPI()
    .then(r=>{
      if(r.status===200){
        setApiStatus("API is up and running!")
      }
      else {
        setApiStatus("Oups, There is an issue with the API...")
      }
    })
    .catch((err)=>{
      console.log(err)
      setApiStatus("API is NOT live!")
    })
  },[])

  const handleEstimationValue = (estimationPred) => {
    console.log("Value from Estimator component:", estimationPred);
    setEstimationRef(estimationPred)
  };

  const handleLatitudeValue = (estimationPred) => {
    console.log("LAT Value from Estimator component:", estimationPred);
    setLatRef(estimationPred)
  };

  const handleLongitudeValue = (estimationPred) => {
    console.log("LON Value from Estimator component:", estimationPred);
    setLonRef(estimationPred)
  };

  const getData = (data) => {
    console.log("APP is getting values from Map:",data.lat,data.lng)
    setLatRef(data.lat)
    setLonRef(data.lng)
  }

  /*
  const getDataLat = (lat) => {
    console.log("APP is getting LAT values from Map:",lat)
    setLatRef(lat)
  }

  const getDataLon = (lon) => {
    console.log("APP is getting LON values from Map:",lon)
    setLonRef(lon)
  }
  */


  return (
    <main>
      <h1>Real Estate Price estimator</h1>
      <section className="mechanics">
          {<p id="api-status">{apiStatus}</p>}
        <article className="left">
          
          <Estimator 
            onEstimateValueChange={handleEstimationValue}
            onLatitudeValueChange={handleLatitudeValue}
            onLongitudeValueChange={handleLongitudeValue}

          />
        </article>

        <article className="right">
            <h2>Put a map on it!</h2>
            <Map 
              lat={latRef} 
              lon={lonRef}
              estimation={estimationRef}
              onClickMap={getData}
              
            />
        </article>
        
      </section>

      <section className='pseudo-footer'>
        <p>This is a demo App of course and we can go much further of course :)</p>
        <p>A Data Science App demo by <a href="https://www.linkedin.com/in/nicolasgakrelidz/" target="_blank">Nicolas Gakrelidz</a></p>
      </section>
      
    </main>
  )
}

export default App
