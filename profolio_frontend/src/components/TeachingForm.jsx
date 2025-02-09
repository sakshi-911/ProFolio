import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const teachingSchema = yup.object({
  courseName: yup.string().required("Course Name is required"),
  courseCode: yup.string(),
  institution: yup.string().required("Institution is required"),
  department: yup.string(),
  semester: yup.string().required("Semester is required"),
  duration: yup.string(),
  level: yup.string().oneOf(["Undergraduate", "Postgraduate", "PhD"]).required("Level is required"),
  description: yup.string(),
  methodologies: yup.array().of(yup.string()),
  materials: yup.array().of(
    yup.object({
      title: yup.string().required("Material title is required"),
      link: yup.string().url("Invalid URL")
    })
  ),
  studentFeedback: yup.array().of(
    yup.object({
      year: yup.number().integer().positive(),
      rating: yup.number().positive().max(5),
      comments: yup.string()
    })
  ),
  guestLectures: yup.array().of(
    yup.object({
      title: yup.string().required("Lecture title is required"),
      speaker: yup.string().required("Speaker is required"),
      date: yup.date()
    })
  )
}).required();

const TeachingForm = ({ initialValues, onSubmit }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(teachingSchema),
    defaultValues: initialValues
  });

  const submit = async (data) => {
    try {
      await onSubmit(data);
      navigate('/admin/teaching'); // Redirect after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {/* Input fields for all teaching properties */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseName">Course Name</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="courseName" type="text" {...register("courseName")} />
        {errors.courseName && <p className="text-red-500 text-xs italic">{errors.courseName.message}</p>}
      </div>
      {/* Course Code, Institution, Department, Semester, Duration, Level, Description, etc. */}
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
      </div>
    </form>
  );
};

export default TeachingForm;
