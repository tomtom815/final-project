const express = require('express');

const router = express.Router()
const app = express();
const cors = require('cors');
const State = {
    states: require('../models/states.json'),
    setStates: function (data) { this.states = data }
}
const Funfact = require('../models/Funfacts');
const statesController = require('../controllers/statesController');

app.use(cors());
module.exports = router;



router.route('/states')
    .get(cors(),statesController.getAllStates)
    
//Working

    

router.route('/states/:state')
    .get(cors(),statesController.getOneState)

router.route('/states/:state/capital')
    .get(cors(),statesController.getCapital);

router.route('/states/:state/nickname')
    .get(cors(),statesController.getNickname);

router.route('/states/:state/population')
    .get(cors(),statesController.getPopulation);

router.route('/states/:state/admission')
    .get(cors(),statesController.getAdmission);


router.route('/states/:state/funfact')
    .get(cors(),statesController.getFunFacts)
router.route('/states/:state/funfact')
    
    .post(cors(),statesController.postFunFacts)
    .patch(cors(),statesController.updateFunFact);


//Update Funfact Method
router.patch('/states/:state/funfact', cors(),(req, res) => {
    res.send('Update by ID API')
})

//Delete Funfact Method
router.delete('/states/:state/funfact',cors(), (req, res) => {
    res.send('Delete by ID API')
})