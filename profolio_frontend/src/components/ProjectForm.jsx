import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const projectSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  technologies: yup.array().of(yup.string()).required("Technologies are required"),
  fieldOfStudy: yup.string().required("Field of study is required"),
  collaborators: yup.array().of(yup.string()),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().required("End date is required"),
  status: yup.string().required("Status is required"),
  fundingSource: yup.string().required("Funding source is required"),
  fundingAmount: yup.number().required("Funding amount is required").positive("Funding amount must be positive"),
  publications: yup.array().of(yup.string()),
  githubLink: yup.string().url("Invalid URL"),
  liveDemo: yup.string().url("Invalid URL"),
  images: yup.array().of(yup.string().url("Invalid URL")),
  videos: yup.array().of(yup.string().url("Invalid URL"))
}).required();

const ProjectForm = ({ initialValues, onSubmit }) => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(projectSchema),
    defaultValues: initialValues
  });

  const submit = async (data) => {
    try {
      await onSubmit(data);
      navigate('/admin/projects'); // Redirect after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {/* Input fields for all project properties */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" {...register("title")} />
        {errors.title && <p className="text-red-500 text-xs italic">{errors.title.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" {...register("description")} />
        {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
      </div>
      {/* Technologies, Field of Study, Collaborators, Dates, Status, Funding, Links, Images, Videos */}
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ProjectForm;
