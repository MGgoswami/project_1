import React from 'react';
import './style.css';
import { useSelector } from 'react-redux';

export default function Loader() {
    const { isLoading } = useSelector((state) => state.loaderReducer);
    return (
        <div className={isLoading ? 'loader_holder' : 'd_none'}>
            <div className={'d-flex justify-content-center '}>
                <div className='spinner-border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </div>
            </div>
        </div>
    );
}
