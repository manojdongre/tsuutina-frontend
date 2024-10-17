import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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

// Define the ResponseData interface
interface ResponseData {
  _id: string;
  formId: string;
  responses: Record<string, string>;
  createdAt: string;
}

const ResponsesTable: React.FC = () => {
  const [data, setData] = useState<ResponseData[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const params = useParams();
  const formId = params.id as string;

  // Dummy data simulating API response
  const dummyData: ResponseData[] = [
    {
      _id: '1',
      formId: formId,
      responses: {
        name: 'Shubham',
        age: '22',
        gender: 'Male',
      },
      createdAt: new Date().toISOString(),
    },
    {
      _id: '2',
      formId: formId,
      responses: {
        name: 'Vineet',
        age: '30',
        gender: 'Male',
      },
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
      _id: '3',
      formId: formId,
      responses: {
        name: 'Manoj',
        age: '32',
        gender: 'Male',
      },
      createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    },
  ];

  useEffect(() => {
    // Simulating fetching data
    const fetchResponses = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Set dummy data
      setData(dummyData);

      // Setting dynamic columns based on the first response
      if (dummyData.length > 0) {
        const dynamicColumns = Object.keys(dummyData[0].responses).concat(['createdAt']);
        setColumns(dynamicColumns);
      }
    };

    fetchResponses();
  }, []);

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
                <TableCell key={column}>{column.replace(/_/g, ' ')}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                {columns.map((column) => (
                  <TableCell key={column}>
                    {column === 'createdAt' ? new Date().toLocaleString() : row.responses[column] ?? ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ResponsesTable;
