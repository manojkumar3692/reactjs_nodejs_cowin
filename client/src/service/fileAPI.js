import axios from 'axios';

export default {
    getDistricts () {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:5000/getDistricts')
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            })
        })
    },

    getSlots (district_id, date) {
        let url = `${'http://localhost:5000/getVaccineSlots?district_id='+district_id+'&date='+date}`
        return new Promise((resolve, reject) => {
            axios.get(url)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
}