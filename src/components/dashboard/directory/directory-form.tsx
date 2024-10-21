import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';

import UploadContainer from '../upload-container';

interface DirectoryFormProps {
  initialData?: {
    name: string;
    address: string;
    phone: string;
    website: string;
    hours: string;
    imageUrl: string;
  };
  onSubmit: (data: {
    name: string;
    address: string;
    phone: string;
    website: string;
    hours: string;
    imageUrl: string;
  }) => void;
}

const DirectoryForm: React.FC<DirectoryFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    website: '',
    hours: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleImageUploadSuccess = async (url: string) => {
    console.log('Uploaded Image URL:', url);

    Swal.fire({
      title: 'Image Upload Success',
      text: 'The image has been uploaded successfully.',
      icon: 'success',
      confirmButtonText: 'Okay',
    });

    // Update the directory's imageUrl field
    setFormData((prevDirectory: any) => {
      if (prevDirectory) {
        return { ...prevDirectory, imageUrl: url };
      }
      return prevDirectory;
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Directory Form
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Website"
        name="website"
        value={formData.website}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Hours"
        name="hours"
        value={formData.hours}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <UploadContainer uploadType="history" onUploadSuccess={handleImageUploadSuccess} />
      <Button sx={{ mt: 2 }} variant="contained" color="primary" type="submit">
        Save
      </Button>
    </Box>
  );
};

export default DirectoryForm;
