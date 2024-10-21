'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiService from '@/services/api-service';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { Box, Button, Container, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';

import UploadContainer from '@/components/dashboard/upload-container';

interface Image {
  url: string;
}

function AddCarouselPage(): React.JSX.Element {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [images, setImages] = useState<Image[]>([{ url: '' }]);
  const [error, setError] = useState<string | null>(null);

  // Add a new image field
  const handleAddImage = () => {
    setImages([...images, { url: '' }]);
  };

  // Remove an image by index
  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  // Handle the successful upload by storing the URL in the images array
  const handleUploadSuccess = (index: number, url: string) => {
    const newImages = images.map((image, i) => (i === index ? { ...image, url } : image));
    setImages(newImages);
  };

  // Save the carousel data, including image URLs
  const handleSave = async () => {
    try {
      const formData: any = {
        name,
        images: images.filter((image) => image.url !== ''), // Only include images with valid URLs
      };

      // Check if any images have valid URLs
      if (formData.images.length === 0) {
        setError('Please upload at least one image');
        return;
      }

      // Send form data to the server
      const response = await apiService.createCarousel(formData);
      if (response.data.success) {
        router.push('/dashboard/carousel'); // Redirect on success
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  console.log(images);

  return (
    <Container>
      {error && <Typography color="error">{error}</Typography>}
      <Typography variant="h4" sx={{ mb: 3 }}>
        Add New Carousel
      </Typography>
      <Box sx={{ mb: 3 }}>
        <TextField label="Carousel Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} required />
      </Box>

      {/* Render an UploadContainer for each image */}
      {images.map((image, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <UploadContainer
            uploadType="carousel"
            onUploadSuccess={(url) => handleUploadSuccess(index, url)} // Update image URL on successful upload
          />
          <IconButton onClick={() => handleRemoveImage(index)}>
            <RemoveIcon />
          </IconButton>
        </Box>
      ))}

      <Typography>Preview:</Typography>
      <Grid container spacing={2}>
        {images?.length &&
          images?.map((image, index) => (
            <Grid key={index} item xs={4}>
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <img src={image.url} style={{ width: '300px', height: '300px' }} />
              </Box>
            </Grid>
          ))}
      </Grid>

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddImage} startIcon={<AddIcon />}>
        Add Image
      </Button>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Carousel
        </Button>
        <Button variant="outlined" onClick={() => router.back()}>
          Cancel
        </Button>
      </Stack>
    </Container>
  );
}

export default AddCarouselPage;
