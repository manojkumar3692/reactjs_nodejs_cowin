import express from 'express';

// Controller
import { getDistrictsInfo } from '../controller/districtController.js'
import { getVaccineSlots } from '../controller/vaccineSlotsController.js'

const router = express.Router();

router.get('/getDistricts', getDistrictsInfo)
router.get('/getVaccineSlots', getVaccineSlots)


export default router;