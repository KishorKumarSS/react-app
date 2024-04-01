import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const MainPage = lazy(() => import('../../page/MainPage.js'));

const loading = (
    <div className="spinner d-flex justify-content-center">
    <div className="spinner-border text-primary" role="status"></div>
  </div>
);

export const PageRoutes = () => {
    return (
        <Suspense fallback={loading}>
            <Routes>
                <Route path='/' element={<MainPage/>} />
                <Route path='*' element={<MainPage/>} />
            </Routes>
        </Suspense>
    );
};