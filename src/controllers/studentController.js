import { studentRepositories } from "../repositories/index.js"

const getAllStudents = async (req, res) => {
    const {page=1, size = 100, searchString = ''} = req.query
    size = (size >= 100) ? 100 : size
    res.status(200).json({
        message: 'Get students successfully',
        data: [
            {
                name: 'Nguyen Van A',
                email: 'nguyenvana@gmail.com',
                password: '123456'
            },
            {
                name: 'Dam Ngoc Khanh',
                email: 'khanh@gmail.com',
                password: '123456'
            }
        ]
    })
}



const getStudentById = async (req, res) => {
    res.send('GET student by id: ' + req?.params.id || "")
}

const insertStudent = async (req, res) => {
    try {
        const student = await studentRepositories.insertStudent(req.body)

        res.status(201).json({
            message: "Insert student successfully"
        })
    } catch(error) {
        debugger
        res.status(500).json({
            message: "Cann't insert student"
        })
    }
}

export default {getAllStudents, getStudentById, insertStudent}
