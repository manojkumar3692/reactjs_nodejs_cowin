
import axios from 'axios';
 
export const getDistrictsInfo = async (req, res) => {
    let headers = {
        'accept': 'application/json', 
        'Accept-Language': 'hi_IN',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'insomnia/2021.2.2',
    }
    await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/31',{
        headers: headers,
        withCredentials: true
      })
    .then((response) => {
        let data = response.data.districts
        res.status(200).json({'status': 'success', data})        
    })
    .catch((error) => {
        res.status(400).json({'status': 'fail', msg: 'failed to get districts', error})  
    })
}





