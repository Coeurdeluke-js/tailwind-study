import React from 'react';
import { DashboardProvider } from '../../contexts/DashboardContext';
import DashboardLayout from './DashboardLayout';

const InitiateDashboard = () => {
  return (
    <DashboardProvider>
      <DashboardLayout userRank="Iniciado" />
    </DashboardProvider>
  );
};

export default InitiateDashboard;