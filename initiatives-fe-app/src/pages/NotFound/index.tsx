import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => [
  <p>Oops it seems this page doesn't exist or some error happened.</p>,
  <p> You can go to <Link to={'/'}>Home</Link></p>
]
