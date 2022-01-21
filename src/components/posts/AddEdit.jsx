import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { postService, alertService } from '@/services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        body: Yup.string()
            .required('Body is required'),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, setError, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createPost(data)
            : updatePost(id, data);
    }

    function createPost(data) {
        return postService.create(data)
            .then(() => {
                alertService.success('Post added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                alertService.error;
                const messages = Object.values(error.response.data.data);
                if (error.response.status === 422) {
                    setError('apiError', { messages });
                }
            });
    }

    function updatePost(id, data) {
        return postService.update(id, data)
            .then(() => {
                alertService.success('Post updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get post and set form fields
            postService.getById(id).then(post => {
                const fields = ['title', 'body'];
                fields.forEach(field => setValue(field, post.data.data[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add post' : 'Edit post'}</h1>
            { errors.apiError && errors.apiError.messages.map(err => 
                <div className="alert alert-danger mt-3 mb-0">{err}</div>
            )}
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Title</label>
                    <input name="title" type="text" ref={register} className={`form-control ${errors.title ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.title?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Body</label>
                    <input name="body" type="text" ref={register} className={`form-control ${errors.body ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.body?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>          
        </form>
    );
}

export { AddEdit };