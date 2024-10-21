'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import apiService from '@/services/api-service';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Stack, TextField, Typography } from '@mui/material';

import UploadContainer from '@/components/dashboard/upload-container';

interface Image {
  _id?: string;
  url: string;
  isVisible: boolean;
}

interface CarouselType {
  _id: string;
  name: string;
  images: Image[];
  isActive: boolean;
}

function EditCarouselPage(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [name, setName] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [carousel, setCarousel] = useState<CarouselType | null>(null);
  const [newImageUrl, setNewImageUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchCarousel(id);
    }
  }, [id]);

  const fetchCarousel = async (carouselId: string) => {
    try {
      const response = await apiService.getCarouselById(carouselId);
      const carouselData = response.data.data;
      setCarousel(carouselData);
      setName(carouselData.name);
      setImages(carouselData.images);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  const handleAddImage = () => {
    if (newImageUrl.trim() !== '') {
      setImages([...images, { url: newImageUrl, isVisible: true }]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = images.map((image, i) => (i === index ? { ...image, url: value } : image));
    setImages(newImages);
  };

  const handleUploadSuccess = (url: string, index: number) => {
    const updatedImages = images.map((image, i) => (i === index ? { ...image, url } : image));
    setImages(updatedImages);
  };

  const handleSave = async () => {
    try {
      if (carousel) {
        const response = await apiService.updateCarousel(carousel._id, { name, images });
        if (response.data.success) {
          router.push('/dashboard/carousel');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  return (
    <Container>
      {error && <Typography color="error">{error}</Typography>}
      <Typography variant="h4" sx={{ mb: 3 }}>
        Edit Carousel
      </Typography>
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Carousel Name"
          fullWidth
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Box>

      {images.map((image, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            label="Image URL"
            fullWidth
            value={image.url}
            onChange={(e) => handleImageChange(index, e.target.value)}
          />
          <IconButton
            onClick={() => {
              handleRemoveImage(index);
            }}
          >
            <RemoveIcon />
          </IconButton>
          {/* UploadContainer for image upload */}
          <UploadContainer uploadType="carousel" onUploadSuccess={(url) => handleUploadSuccess(url, index)} />
        </Box>
      ))}

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="New Image URL"
          fullWidth
          value={newImageUrl}
          onChange={(e) => {
            setNewImageUrl(e.target.value);
          }}
          onBlur={handleAddImage}
        />
        <IconButton onClick={handleAddImage}>
          <AddIcon />
        </IconButton>
      </Box>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Carousel
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </Button>
      </Stack>
    </Container>
  );
}

export default EditCarouselPage;
