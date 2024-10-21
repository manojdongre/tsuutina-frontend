'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import apiService from '@/services/api-service';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';

import UploadContainer from '@/components/dashboard/upload-container';

interface DirectoryItem {
  _id?: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  imageUrl?: string;
  hours: string;
}

function EditDirectoryPage(): React.JSX.Element {
  const router = useRouter();
  const { id } = useParams();
  const [directory, setDirectory] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchDirectory(id.toString());
    }
  }, [id]);

  const fetchDirectory = async (id: string) => {
    try {
      const response = await apiService.getDirectoryItemById(id);
      setDirectory(response.data.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleSave = async () => {
    try {
      if (directory?._id) {
        await apiService.updateDirectoryItem(directory._id, directory);
        router.push(`/dashboard/directory`);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!directory) {
    return <Typography>Loading...</Typography>;
  }

  const handleImageUploadSuccess = async (url: string) => {
    console.log('Uploaded Image URL:', url);

    Swal.fire({
      title: 'Image Upload Success',
      text: 'The image has been uploaded successfully.',
      icon: 'success',
      confirmButtonText: 'Okay',
    });

    // Update the directory's imageUrl field
    setDirectory((prevDirectory: any) => {
      if (prevDirectory) {
        return { ...prevDirectory, imageUrl: url };
      }
      return prevDirectory;
    });
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Edit Directory
      </Typography>
      <TextField
        label="Name"
        fullWidth
        value={directory.name}
        onChange={(e) => {
          setDirectory({ ...directory, name: e.target.value });
        }}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Address"
        fullWidth
        value={directory.address}
        onChange={(e) => {
          setDirectory({ ...directory, address: e.target.value });
        }}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Phone"
        fullWidth
        value={directory.phone}
        onChange={(e) => {
          setDirectory({ ...directory, phone: e.target.value });
        }}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Website"
        fullWidth
        value={directory.website}
        onChange={(e) => {
          setDirectory({ ...directory, website: e.target.value });
        }}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Hours"
        fullWidth
        value={directory.hours}
        onChange={(e) => {
          setDirectory({ ...directory, hours: e.target.value });
        }}
        sx={{ mb: 2 }}
      />

      <UploadContainer uploadType="history" onUploadSuccess={handleImageUploadSuccess} />

      <Button variant="contained" sx={{ mt: 3 }} onClick={handleSave}>
        Save
      </Button>
    </Container>
  );
}

export default EditDirectoryPage;
