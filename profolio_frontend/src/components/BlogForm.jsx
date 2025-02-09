import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const blogSchema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  author: yup.string().required("Author is required"),
  tags: yup.array().of(yup.string()),
  image: yup.string().url("Invalid URL"),
  published: yup.boolean()
}).required();

const BlogForm = ({ initialValues, onSubmit }) => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(blogSchema),
    defaultValues: initialValues
  });

  const submit = async (data) => {
    try {
      await onSubmit(data);
      navigate('/admin/blogs'); // Redirect after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" {...register("title")} />
        {errors.title && <p className="text-red-500 text-xs italic">{errors.title.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Content</label>
        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="content" {...register("content")} />
        {errors.content && <p className="text-red-500 text-xs italic">{errors.content.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">Author</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="author" type="text" {...register("author")} />
        {errors.author && <p className="text-red-500 text-xs italic">{errors.author.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">Tags (comma-separated)</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tags" type="text" {...register("tags")} />
        {errors.tags && <p className="text-red-500 text-xs italic">{errors.tags.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image URL</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="text" {...register("image")} />
        {errors.image && <p className="text-red-500 text-xs italic">{errors.image.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="published">Published</label>
        <input className="mr-2 leading-tight" type="checkbox" id="published" {...register("published")} />
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
      </div>
    </form>
  );
};

export default BlogForm;
