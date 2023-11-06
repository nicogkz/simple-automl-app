
import {useState,useRef, useEffect} from 'react'
import {postEstimation} from '../apis/apis'

//transaction_date":"2013.9123","house_age":"17","dist_to_nearest_mrt_station":"837.7233","number_of_convenience_stores":"10","latitude":"24.96334","longitude":"121.54767"}



const Estimator = ({onEstimateValueChange,onLatitudeValueChange,onLongitudeValueChange}) => {


    const [transactionDate,setTransactionDate] = useState(2013.9123)
    const [houseAge,setHouseAge] = useState(17)
    const [distToNearestMrtStation,setDistToNearestMrtStation] = useState(837.7233)
    const [numberOfConvenienceStores,setNumberOfConvenienceStores] = useState(10)
    const [lat,setLat] = useState(24.96334)
    const [lon,setLon] = useState(121.54767)
    const [estimationPred,setEstimationPred] = useState(null)
    //const estimationPredRef = useRef(null);
    const [msg,setMsg] = useState("")
    
    const postData = () => {
        console.log("click estimation")
        setMsg("")
        let data = {
            transaction_date:transactionDate
            ,house_age:houseAge
            ,dist_to_nearest_mrt_station:distToNearestMrtStation
            ,number_of_convenience_stores:numberOfConvenienceStores
            ,latitude:lat
            ,longitude:lon
        }

        postEstimation(data)
        .then((res)=>{
            if(res.status===200){
                setEstimationPred(parseFloat(res.data[0]['prediction'].replace("[", "").replace("]", "")))
                
            }
            else {
                setMsg("Oups, something got wrong with the API...")   
            }

            
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=>(
        onEstimateValueChange(estimationPred)
    ),[estimationPred])

    useEffect(()=>(
        onLatitudeValueChange(lat)
    ),[lat])

    useEffect(()=>(
        onLongitudeValueChange(lon)
    ),[lon])

    return (
        <div>
            <h2>Enter your parameters and get an estimation:</h2>
            <section>

            </section>
            <section>
                <form onSubmit={(e)=>{
                        e.preventDefault()
                        postData()
                        }}>

                    <label>Transaction Date (Format is like 2013.250 meaning 2013 March):</label>
                    <input
                        type="text"
                        value={transactionDate}
                        className="form-control"
                        onChange={e => setTransactionDate(e.target.value)}
                    /> 

                    <label>House Age</label>
                    <input
                        type="text"
                        value={houseAge}
                        className="form-control"
                        onChange={e => setHouseAge(e.target.value)}
                    /> 

                    <label>Distance to MRT Station (Subway):</label>
                    <input
                        type="text"
                        value={distToNearestMrtStation}
                        className="form-control"
                        onChange={e => setDistToNearestMrtStation(e.target.value)}
                    /> 

                    <label>Number of convenience stores:</label>
                    <input
                        type="text"
                        value={numberOfConvenienceStores}
                        className="form-control"
                        onChange={e => setNumberOfConvenienceStores(e.target.value)}
                    /> 

                    <label>Latitude:</label>
                    <input
                        type="text"
                        value={lat}
                        className="form-control"
                        onChange={e => setLat(e.target.value)}
                    /> 

                    <label>Longitude:</label>
                    <input
                        type="text"
                        value={lon}
                        className="form-control"
                        onChange={e => setLon(e.target.value)}
                    /> 

                    <button type="submit" className="btn-validation" > Get an estimation</button>
                </form>
            </section>
            <section>
                    {estimationPred!==null && 
                        (
                            <div id="results">
                                <h3>Result:</h3>
                                <p><span>{estimationPred.toFixed(2)} </span><em>(*)</em></p>
                                <p><em>(*) 10000 New Taiwan Dollar/Ping, where Ping is a local unit, 1 Ping = 3.3 meter squared. Data from <a href="https://archive.ics.uci.edu/dataset/477/real+estate+valuation+data+set" target="_blank">UCI</a></em></p>
                            </div>
                        )
                        
                    }
            </section>
            
            
        </div>
    )
}

export default Estimator