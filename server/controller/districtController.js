
import axios from 'axios';
 
export const getDistrictsInfo = async (req, res) => {
    let headers = {
        'Accept': 'application/json',
        'Accept-Language': 'hi_IN',
        // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
    }
    await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/31',{
        headers: headers
      })
    .then((response) => {
        let data = response.data.districts
        res.status(200).json({'status': 'success', data})        
    })
    .catch((error) => {
        res.status(400).json({'status': 'fail', msg: 'failed to get districts', error})  
    })
}





