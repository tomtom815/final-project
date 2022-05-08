const data = {
    states: require('../models/states.json'),
    setStates: function (data) { this.states = data }
}
const Funfact = require('../models/Funfacts');




const getAllStates = async (req, res) => {
    if(req.query.contig ===  "false"){
        const state1 = data.states.find(state => state.code === "HI" );
        const state2 = data.states.find(state => state.code === "AK" );
        const funfact1 = await Funfact.findOne({ stateCode: "HI" }).exec();
        const funfact2 = await Funfact.findOne({ stateCode: "AK" }).exec();
        const factAlone1 = {"funfact":[]};
        const factAlone2 = {"funfact": []};
        const stateFact1 = {...state1, ...factAlone1};
        const stateFact2 = {...state2, ...factAlone2};
        var allCombined = [];
        allCombined.push(stateFact1);
        allCombined.push(stateFact2);
        res.json(allCombined);
    }else if(req.query.contig === "true"){
        const allStates = data.states;
        const contigStates = [];
        for(let i = 0; i < allStates.length; i++){
            if(allStates[i].code === "HI" || allStates[i].code === "AK"){
                
            }else{contigStates.push(allStates[i])}
        }
        res.json(contigStates);
    }else{res.json(data.states)}
        

};
const getFunFacts = async (req, res) => {
    if (!req?.params?.state) return res.status(400).json({ 'message': 'State Code required.' });
    const funfact = await Funfact.findOne({ stateCode: req.params.state.toUpperCase() }).exec();
    if (!funfact) {
        return res.status(204).json({ "funfact": `No funfact found for state ${req.params.state.toUpperCase()}.` });
    }
    const randomFactAlone = funfact.funFact;
    res.json({"message": funfact.funFact[Math.floor(Math.random() * 3)]});
};

const getOneState = async (req, res) => {
    const state = data.states.find(state => state.code === req.params.state.toUpperCase() );
    const funfact = await Funfact.findOne({ stateCode: req.params.state.toUpperCase() }).exec();
    
        
    if (!state) {
        return res.status(400).json({ "message": `State Code ${req.params.state} not found` });
    }
    if(funfact != null){
        const factAlone = {"funfacts": funfact.funFact};
        const stateWithFact = {...state, ...factAlone};
        res.json(stateWithFact);
        }else{
            res.json(state);
        }
    


    
};

const postFunFacts = async (req, res) => {
    const fact = new Funfact({
        stateCode: req.body.stateCode,
        funfacts: req.body.funfacts
    })
    try{
        const factToSave = await fact.save();
        res.status(200).json(factToSave);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
};

const updateFunFact = async (req, res) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new:true };

        const result = await Funfact.findByIdAndUpdate(
            id, updatedData, options
        )
    }
    catch (error){
        res.status(400).json({ message: error. message })
    }
};


const getNonContigStates = async (req, res) => {
    const state1 = data.states.find(state => state.code === "HI" );
    const state2 = data.states.find(state => state.code === "AK" );
    const funfact1 = await Funfact.findOne({ stateCode: "HI" }).exec();
    const funfact2 = await Funfact.findOne({ stateCode: "AK" }).exec();
    const factAlone1 = {"funfact":[]};
    const factAlone2 = {"funfact": []};
    const stateFact1 = {...state1, ...factAlone1};
    const stateFact2 = {...state2, ...factAlone2};
    var allCombined = [];
    allCombined.push(stateFact1);
    allCombined.push(stateFact2);
    

    res.json(allCombined);
    
};

const getCapital =  (req, res) => {
    const state = data.states.find(state => state.code === req.params.state.toUpperCase() );
    const capital = {'state': state.state, 'capital': state.capital_city};
    if (!state) {
        return res.status(400).json({ "message": `State Code ${req.params.state} not found` });
    }
    res.json(capital);
};

const getNickname =  (req, res) => {
    const state = data.states.find(state => state.code === req.params.state.toUpperCase() );
    const nickName = {'state': state.state, 'nickname': state.nickname};
    if (!state) {
        return res.status(400).json({ "message": `State Code ${req.params.state} not found` });
    }
    res.json(nickName);
};

const getPopulation = (req, res) => {
    const state = data.states.find(state => state.code === req.params.state.toUpperCase() );
    const population = {'state': state.state, 'population': state.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")};
    if (!state) {
        return res.status(400).json({ "message": `State Code ${req.params.state} not found` });
    }
    res.json(population);
};

const getAdmission = (req, res) => {
    const state = data.states.find(state => state.code === req.params.state.toUpperCase() );
    const population = {'state': state.state, 'admission': state.admission_date};
    if (!state) {
        return res.status(400).json({ "message": `State Code ${req.params.state} not found` });
    }
    res.json(population);
};

const deleteFunfact = (req, res) => {
    const funfact = Funfact.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);
}

const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    res.json(data.employees);
}

const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    res.json(employee);
}

module.exports = {
    getAllStates,
    getFunFacts,
    getOneState,
    getNonContigStates,
    getCapital,
    getNickname,
    getPopulation,
    getAdmission,
    postFunFacts,
    updateFunFact,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}