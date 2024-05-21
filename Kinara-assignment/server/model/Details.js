import mongoose from 'mongoose';

const DetailsSchema = new mongoose.Schema({
  grade: String,
  name: String,
  id: Number,
  age: Number,
 },{ timestamps: true });

const StudentDetails = mongoose.model('StudentDetails', DetailsSchema);

export default StudentDetails;
