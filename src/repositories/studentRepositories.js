import { Student } from "../models/index.js"
const getAllStudents = async ({
    page, size, searchString
}) => {
    let filteredStudent = await Student.aggregate([
        {
            $match: {}

        },
        {
            $skip: (page - 1) * size
        },
        {
            $limit: size
        }
    ])
    return filteredStudent
}

const insertStudent = async ({
    name,
    email,
    languages,
    gender,
    phoneNumber,
    address
}) => {
    const student = await Student.create({
        name,
        email,
        languages,
        gender,
        phoneNumber,
        address
    })
}

const updateStudent = async({
    name,
    email,
    languages,
    gender,
    phoneNumber,
    address
}) => {
    
}

export default { getAllStudents, insertStudent }