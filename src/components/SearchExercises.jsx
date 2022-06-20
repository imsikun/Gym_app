import React, { useEffect, useState } from 'react';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setbodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setbodyParts] = useState([]);

  useEffect(() => {
    const fetchExerciseData = async () => {
      const bodyPartsData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        exerciseOptions
      );
      setbodyParts(['all', ...bodyPartsData]);
    };
    fetchExerciseData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exerciseData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises',
        exerciseOptions
      );
      const searchedExercises = exerciseData.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.target.toLowerCase().includes(search) ||
          item.equipment.toLowerCase().includes(search) ||
          item.bodyPart.toLowercase().includes(search)
      );
      setSearch('');
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack alignItems='center' mt='17px' justifyContent='center' p='20px'>
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { lg: '44px', xs: '30px' },
        }}
        mb='50px'
        textAlign={'center'}
      >
        Awesome Exercise You <br /> Should Know
      </Typography>
      <Box position='relative' mb='72px'>
        <TextField
          sx={{
            input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
            width: { lg: '800px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px',
          }}
          height='76px'
          value={search}
          placeholder='Search Exercises'
          type='text'
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
          }}
        />
        <Button
          onClick={handleSearch}
          className='search-btn'
          sx={{
            bgcolor: '#FF2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '56px',
            position: 'aboslute',
            right: '0',
          }}
        >
          Search
        </Button>
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          p: '20px',
        }}
      >
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setbodyPart={setbodyPart}
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
