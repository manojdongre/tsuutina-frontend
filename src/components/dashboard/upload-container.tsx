import React, { useState } from 'react';
import apiService from '@/services/api-service';
import UploadIcon from '@mui/icons-material/Upload';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';

interface UploadContainerProps {
  uploadType: string; // Type of image, e.g., 'carousel', 'layout', 'history'
  onUploadSuccess: (url: string) => void; // Callback for successful image upload
}

const UploadContainer: React.FC<UploadContainerProps> = ({ uploadType, onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
      setUploadError(null); // Clear previous error
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', file); // Use 'image' as the field name

    try {
      const response = await apiService.uploadCarousel(formData);

      if (response.data.success) {
        onUploadSuccess(response.data.imageUrl); // Pass the uploaded image URL to the parent component
        Swal.fire({
          title: 'Image uploaded successfully',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setUploadError('Upload failed');
      }
    } catch (error) {
      setUploadError('Error uploading the image');
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        label="Select Image"
        variant="outlined"
        InputProps={{
          readOnly: true,
          endAdornment: (
            <IconButton component="label">
              <UploadIcon />
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </IconButton>
          ),
        }}
        value={file ? file.name : ''}
        fullWidth
      />
      <Button variant="contained" onClick={handleUpload} sx={{ ml: 2 }}>
        Upload
      </Button>
      {uploadError && <Typography color="error">{uploadError}</Typography>}
    </Box>
  );
};

export default UploadContainer;
