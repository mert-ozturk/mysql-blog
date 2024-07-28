"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Link from 'next/link';

import { FC } from 'react';

import { Typography, Chip, Stack, Button, useTheme } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';

 


const NotFound = () => {
    const customTheme = useTheme();
    const router = useRouter()
 

  return (
    <>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '200px',
        height: '100%',
      }}
    >
      <Typography variant='h2'>
        <span style={{ color: customTheme.palette.primary.main }}>404. </span>
        Page Not Found!
      </Typography>
      <span style={{ marginTop: '48px', marginBottom: '24px' }}>
        Were you looking for the following pages?
      </span>
      <div style={{ marginBottom: '48px', display: 'flex', gap: '24px' }}>
        <Link href='/' passHref>
          <Button size='large' variant='outlined' startIcon={<HomeIcon />}>
            Home
          </Button>
        </Link>
        <Link href='/blog' passHref>
          <Button
            size='large'
            variant='outlined'
            startIcon={<MenuBookIcon />}
          >
            Blog
          </Button>
        </Link>
      </div>
      <span style={{ marginBottom: '24px' }}>
        Perhaps you want to learn about:
      </span>
      <Stack direction='row' spacing={1}>
       
      </Stack>
    </div>
    <style>{`
      .chip-tag:hover {
        color: ${customTheme.palette.secondary.main};
        border: 1px solid ${customTheme.palette.secondary.main};
      }
    `}</style>
  </>
  )
}

export default NotFound