import React, { useState, useEffect } from 'react';
import * as moment from 'moment';
// Service
import SERVICEAPI from '../../service/fileAPI.js'

// Style
import './home.scss'
import TableComponent from '../Table/tableComponent.js';

function Home(props) {
   const [allDistricts, setDistricts] = useState([])
   const [allSlots, setSlots] = useState([])

   useEffect(() => {
       SERVICEAPI.getDistricts()
       .then((response) => {
           setDistricts(response.data)
       })
       .catch((error) => {
           alert('Failed to fetch')
       })
       
   }, [])

   const getSlots = (e) => {
        let district_id = e.target.value
        let date = moment().format('DD-MM-YYYY');
        SERVICEAPI.getSlots(district_id, date)
        .then((response) => {
            setSlots(response.data.centers || response.data)
        })
        .catch((error) => {
            alert('Failed to fetch ')
        })
   }

   const isDoseAvailable = (data) => {
        let isAvailableCount = data.filter((element) => 
        element.sessions.some((subElement) => subElement.available_capacity > 0))
        console.log(isAvailableCount)
        setSlots(isAvailableCount)
   }
    return (
        <div className="home">
            <div>
                <div>
                    <select className="home__select" onChange={(e)=> getSlots(e)}>
                        {
                            allDistricts.map((each) => <option key={each.district_id} value={each.district_id}>{each.district_name}</option>)
                        }
                    </select>
                    <button className="filterAction" onClick={() => isDoseAvailable(allSlots) }>Filter only Available Slots</button>
                </div>
            </div>
            <div>
                <TableComponent data={allSlots}/>
            </div>
        </div>
    );
}

export default Home;