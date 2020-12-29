import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const TagGeneration = React.lazy(() => import('./views/features/maincomponents/TagGeneration'));


const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/taggeneration', name: 'TagGeneration', component: TagGeneration },
];

export default routes;
