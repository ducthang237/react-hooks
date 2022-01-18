import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { productService, alertService } from '@/services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        detail: Yup.string()
            .required('Detail is required'),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        console.log('data = ', data);
        return isAddMode
            ? createProduct(data)
            : updateProduct(id, data);
    }

    function createProduct(data) {
        return productService.create(data)
            .then(() => {
                alertService.success('Product added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateProduct(id, data) {
        return productService.update(id, data)
            .then(() => {
                alertService.success('Product updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get product and set form fields
            productService.getById(id).then(product => {
                const fields = ['name', 'detail'];
                fields.forEach(field => setValue(field, product.data.data[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add product' : 'Edit product'}</h1>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Name</label>
                    <input name="name" type="text" ref={register} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Detail</label>
                    <input name="detail" type="text" ref={register} className={`form-control ${errors.detail ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.detail?.message}</div>
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