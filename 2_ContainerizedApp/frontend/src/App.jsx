

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
  const [latRefMap,setLatRefMap] = useState(24.96334)
  const [lonRefMap,setLonRefMap] = useState(121.54767)

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
    //console.log("Value from Estimator component:", estimationPred);
    setEstimationRef(estimationPred)
  };

  const handleLatitudeValue = (lat) => {
    //console.log("LAT Value from Estimator component:", lat);
    setLatRef(lat)
  };

  const handleLongitudeValue = (lon) => {
    //console.log("LON Value from Estimator component:", lon);
    setLonRef(lon)
  };

  
  const getData = (data) => {
    //console.log("APP is getting values from Map:",data.lat,data.lng)
    setLatRefMap(data.lat)
    setLonRefMap(data.lng)
  }
  

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

            onCoordsValueChangeMapLat={latRefMap}
            onCoordsValueChangeMapLon={lonRefMap}
            

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
        <p>This is a Data Science demo App and we can go much further of course :)</p>
        <p>by <a href="https://www.linkedin.com/in/nicolasgakrelidz/" target="_blank">Nicolas Gakrelidz</a></p>
      </section>
      
    </main>
  )
}

export default App
