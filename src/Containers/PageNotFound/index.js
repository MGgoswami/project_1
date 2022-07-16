import react from 'react';

export default function PageNotFound() {

    return (
        <div className='container-fluid w-100 vh-100 d-flex justify-content-center align-items-center bg-secondary'>
            <div className='container page_container'>
                <header className='home_header'><h1>Error 404</h1></header>
                <div className='user_holder'>
                    <h3>Oops page not found !</h3>
                </div>
                <footer className='text-center mb-4 home_footer'>
                    <hr />
                    <button type="submit" className="btn btn-outline-dark" onClick={() => { window.location.href = '/login'; }}>Back</button>
                </footer>
            </div>
        </div>
    );
}