
import axios from 'axios';
 
export const getVaccineSlots = async (req, res) => {
    const {district_id, date}  = req.query
    let headers = {
        'Accept': 'application/json',
        'Accept-Language': 'hi_IN',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
    }
    let url = `${'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id='+district_id+'&date='+date}`
    await axios.get(url,{
        headers: headers
      })
    .then((response) => {
        let data = response.data
        res.status(200).json({'status': 'success', data})        
    })
    .catch((error) => {
        res.status(400).json({'status': 'fail', msg: 'failed to get districts'})  
    })
}





