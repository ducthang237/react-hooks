import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import moment from 'moment'
import { useTranslation } from 'react-i18next';

import { postService, alertService } from '@/services';

function List({ match }) {
    const { path } = match;
    const [posts, setPosts] = useState(null);
    const [isPublished, setIsPublished] = useState(0);
    const [keyword, setKeyword] = useState('');

    const { t } = useTranslation();

    const currentUserId = sessionStorage.getItem('userId');
    const role = sessionStorage.getItem('roles');

    const fetchData = (pageNumber = 1) => {
        postService.getAll(pageNumber).then(res => {
            setPosts(res.data);
        });
    };

    const publishHandle = (id) => {
        postService.publish(id).then(post => {
            alertService.success('Post has been published !',  { keepAfterRouteChange: true });
            // console.log(posts.data);
            // const newPosts = posts.data.map(post => {
            //     if (post.id == id) {
            //         post.published = 1;
            //     }
            //     return post;
            // })
            // console.log(newPosts);
            //setPosts(newPosts);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    function deletePost(id) {
        if (confirm("Are you sure you want to delete this item?") == true) {
            setPosts(posts.map(x => {
                if (x.id === id) { x.isDeleting = true; }
                return x;
            }));
            postService.delete(id).then(() => {
                setPosts(posts => posts.filter(x => x.id !== id));
            });
        }
    }

    function searchHandle() {
        console.log('keyword = ', keyword);
        postService.getByKeyword(keyword).then(res => {
            console.log('res search = ', res);
        }).catch(err => console.log('err search = ', err));

        
    }

    function changeInputHandle(event) {
        setKeyword(event.target.value);
    }

    return (
        <div>
            <h1>{t('post.posts')}</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">{t('post.add_post')}</Link>
            <div className="search-block">
                <input name="search" type="text" className="form-control search-input" placeholder="Search for..."
                       onChange={(e) => changeInputHandle(e)}></input>
                <button className="btn btn-primary search-btn" onClick={() => searchHandle()} >Search</button>
            </div>
            
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '40%' }}>{t('post.title')}</th>
                        <th style={{ width: '20%' }}>{t('post.created_at')}</th>
                        <th style={{ width: '30%' }}>{t('post.created_by')}</th>
                        <th style={{ width: '10%' }}>{t('general.option')}</th>
                    </tr>
                </thead>
                <tbody>
                    {posts && posts.data && posts.data.map(post =>
                        <tr key={post.id}>
                            <td>{post.title}</td>
                            <td>{moment(post.created_at).format('YYYY/MM/DD')}</td>
                            <td>{post.user_id}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                {(currentUserId == post.user_id || role == 2) && 
                                <div id={`publish-${post.id}`}>
                                    {role == 2 && !post.published &&
                                    <a className="btn btn-sm btn-primary mr-1" onClick={() => publishHandle(post.id)}>{t('post.publish')}</a>
                                    }
                                    <Link to={`${path}/edit/${post.id}`} className="btn btn-sm btn-primary mr-1">{t('general.edit')}</Link>
                                    <button onClick={() => deletePost(post.id)} className="btn btn-sm btn-danger btn-delete-post" disabled={post.isDeleting}>
                                        {post.isDeleting 
                                            ? <span className="spinner-border spinner-border-sm"></span>
                                            : <span>{t('general.delete')}</span>
                                        }
                                    </button>
                                </div>
                                }
                                
                            </td>
                        </tr>
                    )}
                    {!posts &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {posts && posts.data && !posts.data.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No posts To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            <div>
                <Pagination
                    activePage={posts?.current_page ? posts?.current_page : 0}
                    itemsCountPerPage={posts?.per_page ? posts?.per_page : 0 }
                    totalItemsCount={posts?.total ? posts?.total : 0}
                    onChange={(pageNumber) => {
                        fetchData(pageNumber)
                    }}
                    pageRangeDisplayed={5}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First Page"
                    lastPageText="Last Lage"
                />
            </div>
        </div>
    );
}

export { List };