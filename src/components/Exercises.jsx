import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  console.log(exercises);

  const [currentPage, setcurrentPage] = useState(1);
  const exercisePerPage = 9;

  const indexOfLastExercise = currentPage * exercisePerPage;
  const indexofFirstExercise = indexOfLastExercise - exercisePerPage;
  const currentExercises = exercises.slice(
    indexofFirstExercise,
    indexOfLastExercise
  );

  const paginate = (e, value) => {
    setcurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchExerciseData = async () => {
      let exerciseData = [];
      if (bodyPart === 'all') {
        exerciseData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises',
          exerciseOptions
        );
      } else {
        exerciseData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }
      setExercises(exerciseData);
    };
    fetchExerciseData();
  }, [bodyPart]);

  return (
    <Box
      id='exercises'
      sx={{
        mt: { lg: '110px' },
      }}
      mt='50px'
      p='20px'
    >
      <Typography variant='h3' mb='46px'>
        Showing Results
      </Typography>

      <Stack
        direction={'row'}
        sx={{ gap: { lg: '110px', xs: '50px' } }}
        flexWrap='wrap'
        justifyContent={'center'}
      >
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>
      <Stack mt='100px' alignItems={'center'}>
        {exercises.length > exercisePerPage && (
          <Pagination
            color='standard'
            shape='rounded'
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisePerPage)}
            size='large'
            page={currentPage}
            onChange={paginate}
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
