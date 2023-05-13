const router = require("express").Router();
let Student = require("../models/student");

//insert
// http://localhost:8070/student/add
router.route("/add").post((req,res)=> {

    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student ({
        name,
        age,
        gender
    })

    newStudent.save().then(()=> {
        res.json("Student Added")
    }).catch((err)=> {
        console.log(err);
    })

})

//read
// http://localhost:8070/Student
router.route("/").get((req,res)=>{
    
    Student.find().then((student)=> {
        res.json(student)
    }).catch((err)=> {
        console.log(err)
    })

})

//update
// http//localhost:8070/student/update/(id)
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const {name, age, gender} = req.body;

    const updateStudent = {
        name,
        age,
        gender
    }

    const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then(() => {
        res.status(200).send({status: "user update"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
})

//delete
// http//localhost:8070/student/delete/(id)
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "user delete"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
    })
})

// only get 1 student ----
router.route("/get/:id").get(async(req, res) => {
    let userId = req.params.id;
    const user = await Student.findById(userId)
    .then((student) => {
        res.status(200).send({status: "user fetched", student})
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

module.exports = router;