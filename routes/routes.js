const express = require('express');
const router = express.Router()
const State = {
    states: require('../models/states.json'),
    setStates: function (data) { this.states = data }
}
const Funfact = require('../models/Funfacts');
const statesController = require('../controllers/statesController');


module.exports = router;



router.route('/states')
    .get(statesController.getAllStates)
    
//Working

    

router.route('/states/:state')
    .get(statesController.getOneState)

router.route('/states/:state/capital')
    .get(statesController.getCapital);

router.route('/states/:state/nickname')
    .get(statesController.getNickname);

router.route('/states/:state/population')
    .get(statesController.getPopulation);

router.route('/states/:state/admission')
    .get(statesController.getAdmission);


router.route('/states/:state/funfact')
    .get(statesController.getFunFacts)
router.route('/states/:state/funfact')
    
    .post(statesController.postFunFacts)
    .patch(statesController.updateFunFact);


//Update Funfact Method
router.patch('/states/:state/funfact', (req, res) => {
    res.send('Update by ID API')
})

//Delete Funfact Method
router.delete('/states/:state/funfact', (req, res) => {
    res.send('Delete by ID API')
})