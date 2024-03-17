import AdminComponent from '@repo/ui/admin';
import { InputComponent } from '@repo/ui/input-component';
import React from 'react';

const Admin = () => {
  return (
    <div>
      <AdminComponent />
      <InputComponent>Child Inside Input Component</InputComponent>
    </div>
  );
};

export default Admin;
