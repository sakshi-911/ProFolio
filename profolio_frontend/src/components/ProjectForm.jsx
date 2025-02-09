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
    images: yup.array().of(yup.mixed()), // Allow file objects
    videos: yup.array().of(yup.mixed())  // Allow file objects
}).required();

const ProjectForm = ({ initialValues, onSubmit, onCancel }) => {
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
        <form onSubmit={handleSubmit(submit)} className="max-w-3xl mx-auto bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 text-white">
            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="title">Title</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" {...register("title")} />
                {errors.title && <p className="text-red-500 text-xs italic">{errors.title.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="description">Description</label>
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" {...register("description")} />
                {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="technologies">Technologies (comma-separated)</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="technologies" type="text" {...register("technologies")}
                 placeholder="e.g., React, Node.js, MongoDB"/>
                {errors.technologies && <p className="text-red-500 text-xs italic">{errors.technologies.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="fieldOfStudy">Field of Study</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fieldOfStudy" type="text" {...register("fieldOfStudy")} />
                {errors.fieldOfStudy && <p className="text-red-500 text-xs italic">{errors.fieldOfStudy.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="collaborators">Collaborators (comma-separated)</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="collaborators" type="text" {...register("collaborators")} placeholder="e.g., John Doe, Jane Smith"/>
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="startDate">Start Date</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="startDate" type="date" {...register("startDate")} />
                {errors.startDate && <p className="text-red-500 text-xs italic">{errors.startDate.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="endDate">End Date</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="endDate" type="date" {...register("endDate")} />
                {errors.endDate && <p className="text-red-500 text-xs italic">{errors.endDate.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="status">Status</label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="status" {...register("status")}>
                    <option value="planning">Planning</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On Hold</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                {errors.status && <p className="text-red-500 text-xs italic">{errors.status.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="fundingSource">Funding Source</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fundingSource" type="text" {...register("fundingSource")} />
                {errors.fundingSource && <p className="text-red-500 text-xs italic">{errors.fundingSource.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="fundingAmount">Funding Amount</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fundingAmount" type="number" {...register("fundingAmount")} />
                {errors.fundingAmount && <p className="text-red-500 text-xs italic">{errors.fundingAmount.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="publications">Publications (comma-separated)</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="publications" type="text" {...register("publications")} placeholder="Publication 1, Publication 2"/>
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="githubLink">GitHub Link</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="githubLink" type="text" {...register("githubLink")} />
                {errors.githubLink && <p className="text-red-500 text-xs italic">{errors.githubLink.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="liveDemo">Live Demo Link</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="liveDemo" type="text" {...register("liveDemo")} />
                {errors.liveDemo && <p className="text-red-500 text-xs italic">{errors.liveDemo.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="images">Images (Multiple)</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="images" type="file" {...register("images")} multiple />
                {errors.images && <p className="text-red-500 text-xs italic">{errors.images.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="videos">Videos (Multiple)</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="videos" type="file" {...register("videos")} multiple />
                {errors.videos && <p className="text-red-500 text-xs italic">{errors.videos.message}</p>}
            </div>

            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
                {onCancel && (
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={onCancel}>Cancel</button>
                )}
            </div>
        </form>
    );
};

export default ProjectForm;
