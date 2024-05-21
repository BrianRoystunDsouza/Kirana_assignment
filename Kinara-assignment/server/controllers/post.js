import fs from "fs"
import csvParser from 'csv-parser';
import DetailsSchema from '../model/Details.js';

async function paginateAndFilterStudentsFromCSV(page, pageSize, nameContains) {
  const students = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream('Student.csv')
      .pipe(csvParser())
      .on('data', (row) => {

        if (!nameContains || row.name.toLowerCase().includes(nameContains.toLowerCase())) {
          students.push(row);
        }
      })
      .on('end', () => {

        const startIdx = (page - 1) * pageSize;
        const endIdx = startIdx + pageSize;
        const paginatedStudents = students.slice(startIdx, endIdx);
        resolve({
          totalStudents: students.length,
          page,
          pageSize,
          students: paginatedStudents,
        });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

async function paginateAndFilterStudentsFromMongoDB(page, pageSize, nameContains) {
  let query = {};
  if (nameContains) {
    query.name = { $regex: nameContains, $options: 'i' };
  }
  const totalStudents = await DetailsSchema.countDocuments(query);
  const students = await DetailsSchema.find(query)
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  return {
    totalStudents,
    page,
    pageSize,
    students,
  };
}
export const getDetails = async (req, res) => {
  try {
    let students = [];
    const { page = 1, pageSize = 10, nameContains } = req.query;
    if (fs.existsSync('Student.csv')) {
      students = await paginateAndFilterStudentsFromCSV(Number(page), Number(pageSize), nameContains);
    } else {
      students = await paginateAndFilterStudentsFromMongoDB(Number(page), Number(pageSize), nameContains);
    };
    res.json(students);
  } catch (error) {
    console.error("Something went wrong:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

