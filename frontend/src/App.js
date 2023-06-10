import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_SHORTLINKS_API_URL || 'http://localhost:5000/shortlinks';

const App = () => {
    const [shortLinks, setShortLinks] = useState([]);
    const [formData, setFormData] = useState({
        slug: '',
        iosPrimary: '',
        iosFallback: '',
        androidPrimary: '',
        androidFallback: '',
        web: ''
    });
    const [showForm, setShowForm] = useState(false);
    const [edit, setEdit] = useState(false);


    const fetchShortLinks = async () => {
        let response;
        try {
            response = await axios.get(API_URL);
            if (!response.data.shortLinks) {
                showToaster(response.data.msg, {type: 'error'});
                return;
            }
            setShortLinks(response.data.shortLinks);
            showToaster(response.data.msg, {type: 'success'});
        } catch (error) {
            showToaster(error.response.data.msg, {type: 'error'});
            console.error('Error fetching short links:', error);
        }
    };

    const showToaster = (msg, type) =>
        toast(msg, {type: type},);

    useEffect(() => {
        fetchShortLinks();
    }, []);
    const fetchSingleShortLinkBasedOnEnv = async (slug) => {

        try {
            const response = await axios.get(`${API_URL}/${slug}`);
            window.open(response.data, '_blank', "noreferrer");
        } catch (error) {
            showToaster(error.response.data.msg, {type: 'error'});
            console.error('Error fetching short links:', error);
        }
    }

    const handleFormChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let newDate = {
            slug: formData.slug,
            ios: {
                primary: formData.iosPrimary,
                fallback: formData.iosFallback
            },
            android: {
                primary: formData.androidPrimary,
                fallback: formData.androidFallback
            },
            web: formData.web
        };
        let res;

        try {
            if (edit) {
                res = await axios.put(`${API_URL}/${formData.slug}`, newDate);
                if (!res.data.savedShortLink) {
                    showToaster(res.data.msg, {type: 'error'});
                    return;
                }
                showToaster(res.data.msg, {type: 'success'});
            } else {
                res = await axios.post(API_URL, newDate);
                if (!res.data.savedShortLink) {
                    showToaster(res.data.msg, {type: 'error'});
                    return;
                }
                showToaster(res.data.msg, {type: 'success'});
            }
            setFormData({
                slug: '',
                iosPrimary: '',
                iosFallback: '',
                androidPrimary: '',
                androidFallback: '',
                web: ''
            });
            fetchShortLinks();
            setShowForm(false);
        } catch (error) {
            showToaster(error.response.data.msg, {type: 'error'});
            console.error('Error creating short link:', error);
        }
    };

    /*const handleEditShortLink = async (slug) => {
        try {
            const response = await axios.put(`http://localhost:5000/shortlinks/${slug}`, formData);
            setFormData({
                slug: '',
                iosPrimary: '',
                iosFallback: '',
                androidPrimary: '',
                androidFallback: '',
                web: ''
            });
            fetchShortLinks();
        } catch (error) {
            console.error(`Error editing short link ${slug}:`, error);
        }
    };
    */

    const handleCreateShortLink = (link) => {
        if (link) {
            setEdit(true);
            setFormData({
                slug: link.slug,
                iosPrimary: link.ios.primary,
                iosFallback: link.ios.fallback,
                androidPrimary: link.android.primary,
                androidFallback: link.android.fallback,
                web: link.web
            });
        } else {
            setEdit(false);
            setFormData({
                slug: '',
                iosPrimary: '',
                iosFallback: '',
                androidPrimary: '',
                androidFallback: '',
                web: ''
            });
        }
        setShowForm(true);
    };

    return (

        <div className="container">
            <ToastContainer/>
            <h1 className="mt-4 mb-4">Smart Link Shortener</h1>
            <div className="row m-4">
                <div className="col-md-12">
                    <div className="card" style={{width: "fit-content"}}>
                        <div className="card-header">Short Links</div>
                        <div className="card-body">
                            {shortLinks.length > 0 ? (
                                <table className="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Slug</th>
                                        <th>iOS Primary</th>
                                        <th>iOS Fallback</th>
                                        <th>Android Primary</th>
                                        <th>Android Fallback</th>
                                        <th>Web</th>
                                        <th>Actions</th>
                                        <th>Active Link</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {shortLinks.map((link) => (
                                        <tr key={link.slug}>
                                            <td>{link.slug}</td>
                                            <td>{link.ios.primary}</td>
                                            <td>{link.ios.fallback}</td>
                                            <td>{link.android.primary}</td>
                                            <td>{link.android.fallback}</td>
                                            <td>{link.web}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => handleCreateShortLink(link)}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-info btn-sm"
                                                    onClick={() => fetchSingleShortLinkBasedOnEnv(link.slug)}
                                                >
                                                    Active Link
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No short links available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row m-4">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            {showForm ? 'Create Short Link' : 'Actions'}
                        </div>
                        <div className="card-body">
                            {showForm ? (
                                <form onSubmit={handleFormSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="slug">Slug:</label>
                                        {!edit ? <input
                                            type="text"
                                            name="slug"
                                            id="slug"
                                            className="form-control"
                                            value={formData.slug}
                                            onChange={handleFormChange}
                                        /> : <p>{formData.slug}</p>}

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="iosPrimary">iOS Primary:</label>
                                        <input
                                            type="text"
                                            name="iosPrimary"
                                            id="iosPrimary"
                                            className="form-control"
                                            value={formData.iosPrimary}
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="iosFallback">iOS Fallback:</label>
                                        <input
                                            type="text"
                                            name="iosFallback"
                                            id="iosFallback"
                                            className="form-control"
                                            value={formData.iosFallback}
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="androidPrimary">Android Primary:</label>
                                        <input
                                            type="text"
                                            name="androidPrimary"
                                            id="androidPrimary"
                                            className="form-control"
                                            value={formData.androidPrimary}
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="androidFallback">Android Fallback:</label>
                                        <input
                                            type="text"
                                            name="androidFallback"
                                            id="androidFallback"
                                            className="form-control"
                                            value={formData.androidFallback}
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="web">Web:</label>
                                        <input
                                            type="text"
                                            name="web"
                                            id="web"
                                            className="form-control"
                                            value={formData.web}
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-2">
                                        {edit ? 'Update' : 'Create'}
                                    </button>
                                    <button
                                        className="btn btn-secondary mt-2 ml-2"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            ) : (
                                <button className="btn btn-success mt-4 " onClick={() => handleCreateShortLink()}>
                                    Create Short Link
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default App;
