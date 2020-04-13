import React, { FC } from 'react';
import { LoadScript, LoadScriptProps } from '@react-google-maps/api';

const libraries = ['places', 'geometry'];

const InitGoogle: FC = (props) => (
  <LoadScript
    id="script-loader"
    googleMapsApiKey="AIzaSyBRveOLn4H1lbWtmEiliGwo7s1tHajmhJE"
    language="cs"
    region="cz"
    libraries={libraries}
  >
    {props.children}
  </LoadScript>
);

export default InitGoogle;
