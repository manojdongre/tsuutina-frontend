'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import apiService from '@/services/api-service';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';

function PreviewFormComponent() {
  const params = useParams();
  const router = useRouter();
  const [form, setForm] = useState<any | null>(null);
  const [responses, setResponses] = useState<any>({});
  const formId = params.id as string;

  useEffect(() => {
    if (formId) {
      apiService.getFormById(formId).then((response) => {
        if (response && response.data) {
          setForm(response.data.data);
        }
      });
    }
  }, [formId]);

  const handleChange = (fieldId: string, value: any) => {
    setResponses({
      ...responses,
      [fieldId]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Convert responses into API expected format
      const formattedResponses = Object.keys(responses).map((fieldId) => {
        const field = form?.fields.find((f: any) => f._id === fieldId);
        return {
          label: field?.label || '',
          value: responses[fieldId],
        };
      });

      // Send formatted response
      await apiService.createResponse(formId, { responses: formattedResponses });
      router.push('/dashboard/forms');
      alert('Form submitted successfully!');
    } catch (error) {
      alert('Failed to submit the form');
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" my={2}>
        {form.title}
      </Typography>
      <Typography variant="subtitle1" mb={4}>
        {form.description}
      </Typography>
      {form?.fields.map((field: any) => (
        <Box key={field._id} mb={3}>
          <Typography variant="body1" mb={1}>
            {field.label}
          </Typography>
          {/* Text Field */}
          {field.type === 'text' && (
            <TextField
              fullWidth
              value={responses[field._id] || ''}
              onChange={(e) => handleChange(field._id, e.target.value)}
              required={field.required}
            />
          )}
          {/* Select Field */}
          {field.type === 'select' && (
            <Select
              fullWidth
              value={responses[field._id] || ''}
              onChange={(e) => handleChange(field._id, e.target.value)}
              required={field.required}
            >
              {field.options.map((option: any, index: number) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          )}
          {/* Checkbox Field */}
          {field.type === 'checkbox' && (
            <FormControl>
              <FormGroup>
                {field.options.map((option: any, index: number) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={responses[field._id]?.includes(option) || false}
                        onChange={(e) => {
                          const newValue = e.target.checked
                            ? [...(responses[field._id] || []), option]
                            : (responses[field._id] || []).filter((o: any) => o !== option);
                          handleChange(field._id, newValue);
                        }}
                      />
                    }
                    label={option}
                  />
                ))}
              </FormGroup>
            </FormControl>
          )}
          {/* Radio Field */}
          {field.type === 'radio' && (
            <FormControl component="fieldset">
              <RadioGroup value={responses[field._id] || ''} onChange={(e) => handleChange(field._id, e.target.value)}>
                {field.options.map((option: any, index: number) => (
                  <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                ))}
              </RadioGroup>
            </FormControl>
          )}
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
}

export default PreviewFormComponent;

PreviewFormComponent.getLayout = function getLayout(page: React.ReactElement) {
  return page; // no layout applied
};
