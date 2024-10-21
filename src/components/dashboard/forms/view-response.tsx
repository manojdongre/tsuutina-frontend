import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import apiService from '@/services/api-service';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

// Define the interfaces
interface FormField {
  label: string;
  _id: string;
}

interface ResponseData {
  _id: string;
  formId: string;
  responses: {
    label: string;
    value: string;
  }[];
  submittedAt: string;
}

const ResponsesTable: React.FC = () => {
  const [data, setData] = useState<ResponseData[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const params = useParams();
  const formId = params.id as string;

  // Fetch form structure to get labels
  const fetchFormLabels = async () => {
    try {
      const response = await apiService.getFormById(formId);
      const labels = response.data.data.fields.map((field: any) => field.label);
      setColumns(labels.concat(['submittedAt'])); // Add 'submittedAt' as a column
    } catch (error) {
      console.error('Error fetching form labels:', error);
    }
  };

  // Fetch responses for the form
  const fetchFormResponses = async () => {
    try {
      const response = await apiService.getResponsesByFormId(formId);
      setData(response.data.data.responses);
    } catch (error) {
      console.error('Error fetching form responses:', error);
    }
  };

  useEffect(() => {
    fetchFormLabels();
    fetchFormResponses();
  }, [formId]);

  return (
    <Container>
      <Typography variant="h4" my={2}>
        Responses
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                {columns.map((column) => {
                  const response = row.responses.find((r) => r.label === column);
                  return (
                    <TableCell key={column}>
                      {column === 'submittedAt' ? new Date(row.submittedAt).toLocaleString() : response?.value || ''}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ResponsesTable;
