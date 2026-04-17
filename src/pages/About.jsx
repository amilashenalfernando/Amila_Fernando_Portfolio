import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { FiCode, FiPenTool, FiCamera, FiTarget, FiUser, FiImage, FiVideo } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import {
    SiReact, SiJavascript, SiPython,
    SiTypescript, SiPostgresql,
    SiFigma
} from 'react-icons/si';
import { FaJava, FaNodeJs } from 'react-icons/fa';
import { TbBrandAdobeIllustrator } from 'react-icons/tb';

const ReactIcon = ({ size = "1em" }) => (
  <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const JavascriptIcon = ({ size = "1em" }) => (
  <svg width={size} height={size} viewBox="0 0 630 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="630" height="630" fill="#f7df1e"/>
    <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z"/>
  </svg>
);

const PythonIcon = ({ size = "1em" }) => (
  <svg width={size} height={size} viewBox="0.21 -0.077 110 110" xmlns="http://www.w3.org/2000/svg">
    <linearGradient id="py_grad1" gradientUnits="userSpaceOnUse" x1="63.8159" y1="56.6829" x2="118.4934" y2="1.8225" gradientTransform="matrix(1 0 0 -1 -53.2974 66.4321)">
      <stop offset="0" stopColor="#387EB8"/>
      <stop offset="1" stopColor="#366994"/>
    </linearGradient>
    <path fill="url(#py_grad1)" d="M55.023-0.077c-25.971,0-26.25,10.081-26.25,12.156c0,3.148,0,12.594,0,12.594h26.75v3.781 c0,0-27.852,0-37.375,0c-7.949,0-17.938,4.833-17.938,26.25c0,19.673,7.792,27.281,15.656,27.281c2.335,0,9.344,0,9.344,0 s0-9.765,0-13.125c0-5.491,2.721-15.656,15.406-15.656c15.91,0,19.971,0,26.531,0c3.902,0,14.906-1.696,14.906-14.406 c0-13.452,0-17.89,0-24.219C82.054,11.426,81.515-0.077,55.023-0.077z M40.273,8.392c2.662,0,4.813,2.15,4.813,4.813 c0,2.661-2.151,4.813-4.813,4.813s-4.813-2.151-4.813-4.813C35.46,10.542,37.611,8.392,40.273,8.392z"/>
    <linearGradient id="py_grad2" gradientUnits="userSpaceOnUse" x1="97.0444" y1="21.6321" x2="155.6665" y2="-34.5308" gradientTransform="matrix(1 0 0 -1 -53.2974 66.4321)">
      <stop offset="0" stopColor="#FFE052"/>
      <stop offset="1" stopColor="#FFC331"/>
    </linearGradient>
    <path fill="url(#py_grad2)" d="M55.397,109.923c25.959,0,26.282-10.271,26.282-12.156c0-3.148,0-12.594,0-12.594H54.897v-3.781 c0,0,28.032,0,37.375,0c8.009,0,17.938-4.954,17.938-26.25c0-23.322-10.538-27.281-15.656-27.281c-2.336,0-9.344,0-9.344,0 s0,10.216,0,13.125c0,5.491-2.631,15.656-15.406,15.656c-15.91,0-19.476,0-26.532,0c-3.892,0-14.906,1.896-14.906,14.406 c0,14.475,0,18.265,0,24.219C28.366,100.497,31.562,109.923,55.397,109.923z M70.148,101.454c-2.662,0-4.813-2.151-4.813-4.813 s2.15-4.813,4.813-4.813c2.661,0,4.813,2.151,4.813,4.813S72.809,101.454,70.148,101.454z"/>
  </svg>
);

const JavaIcon = ({ size = "1em" }) => (
  <svg width={size} height={size} viewBox="0 0 300 550" xmlns="http://www.w3.org/2000/svg">
    <path fill="#5382A1" d="M285.104,430.945h-2.038v-1.14h5.486v1.14h-2.024v5.688h-1.424V430.945z M296.046,431.242h-0.032 l-2.019,5.392h-0.924l-2.006-5.392h-0.025v5.392h-1.342v-6.828h1.975l1.86,4.835l1.854-4.835h1.968v6.828h-1.31V431.242z"/>
    <path fill="#5382A1" d="M102.681,291.324c0,0-14.178,8.245,10.09,11.035c29.4,3.354,44.426,2.873,76.825-3.259 c0,0,8.518,5.341,20.414,9.967C137.38,340.195,45.634,307.264,102.681,291.324"/>
    <path fill="#5382A1" d="M93.806,250.704c0,0-15.902,11.771,8.384,14.283c31.406,3.24,56.208,3.505,99.125-4.759 c0,0,5.936,6.018,15.27,9.309C128.771,295.215,30.962,271.562,93.806,250.704"/>
    <path fill="#F8981D" d="M168.625,181.799c17.896,20.604-4.702,39.145-4.702,39.145s45.441-23.458,24.572-52.833 c-19.491-27.394-34.438-41.005,46.479-87.934C234.974,80.177,107.961,111.899,168.625,181.799"/>
    <path fill="#5382A1" d="M264.684,321.369c0,0,10.492,8.645-11.555,15.333c-41.923,12.7-174.488,16.535-211.314,0.506 c-13.238-5.759,11.587-13.751,19.396-15.428c8.144-1.766,12.798-1.437,12.798-1.437c-14.722-10.371-95.157,20.364-40.857,29.166 C181.236,373.524,303.095,338.695,264.684,321.369"/>
    <path fill="#5382A1" d="M109.499,208.617c0,0-67.431,16.016-23.879,21.832c18.389,2.462,55.047,1.905,89.193-0.956 c27.906-2.354,55.927-7.359,55.927-7.359s-9.84,4.214-16.959,9.075c-68.475,18.009-200.756,9.631-162.674-8.79 C83.313,206.851,109.499,208.617,109.499,208.617"/>
    <path fill="#5382A1" d="M230.462,276.231c69.608-36.171,37.424-70.931,14.96-66.248c-5.506,1.146-7.961,2.139-7.961,2.139 s2.044-3.202,5.948-4.588c44.441-15.624,78.619,46.081-14.346,70.52C229.063,278.055,230.14,277.092,230.462,276.231"/>
    <path fill="#F8981D" d="M188.495,4.399c0,0,38.55,38.563-36.563,97.862c-60.233,47.568-13.735,74.69-0.025,105.678 c-35.159-31.722-60.961-59.647-43.651-85.637C133.663,84.151,204.049,65.654,188.495,4.399"/>
    <path fill="#5382A1" d="M116.339,374.246c66.815,4.277,169.417-2.373,171.847-33.988c0,0-4.671,11.985-55.219,21.503 c-57.028,10.732-127.364,9.479-169.081,2.601C63.887,364.361,72.426,371.43,116.339,374.246"/>
    <path fill="#5382A1" d="M105.389,495.048c-6.303,5.467-12.96,8.536-18.934,8.536c-8.527,0-13.134-5.113-13.134-13.314 c0-8.871,4.936-15.357,24.739-15.357h7.328V495.048 M122.781,514.671v-60.742c0-15.517-8.85-25.756-30.188-25.756 c-12.457,0-23.369,3.076-32.238,6.999l2.56,10.752c6.983-2.563,16.022-4.949,24.894-4.949c12.292,0,17.58,4.949,17.58,15.181v7.677 h-6.135c-29.865,0-43.337,11.593-43.337,28.994c0,15.017,8.878,23.553,25.594,23.553c10.745,0,18.766-4.436,26.264-10.928 l1.361,9.22H122.781z"/>
    <path fill="#5382A1" d="M180.825,514.671h-21.692l-26.106-84.96h18.943l16.199,52.2l3.601,15.699 c8.195-22.698,13.991-45.726,16.89-67.899h18.427C202.15,457.688,193.266,488.396,180.825,514.671"/>
    <path fill="#5382A1" d="M264.038,495.048c-6.315,5.467-12.984,8.536-18.958,8.536c-8.512,0-13.131-5.113-13.131-13.314 c0-8.871,4.948-15.357,24.749-15.357h7.34V495.048 M281.428,514.671v-60.742c0-15.517-8.872-25.756-30.185-25.756 c-12.466,0-23.382,3.076-32.247,6.999l2.556,10.752c6.986-2.563,16.042-4.949,24.907-4.949c12.283,0,17.579,4.949,17.579,15.181 v7.677h-6.145c-29.874,0-43.34,11.593-43.34,28.994c0,15.017,8.871,23.553,25.584,23.553c10.751,0,18.769-4.436,26.28-10.928 l1.366,9.22H281.428z"/>
    <path fill="#5382A1" d="M36.847,529.099c-4.958,7.239-12.966,12.966-21.733,16.206l-8.587-10.105 c6.673-3.424,12.396-8.954,15.055-14.105c2.3-4.581,3.252-10.485,3.252-24.604v-96.995h18.478v95.666 C43.311,514.038,41.802,521.663,36.847,529.099"/>
  </svg>
);

const NodeJsIcon = ({ size = "1em" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 442.37 270.929">
    <defs>
      <clipPath id="node_cp_a">
        <path d="M239.03 226.605l-42.13 24.317c-1.578.91-2.546 2.59-2.546 4.406v48.668c0 1.817.968 3.496 2.546 4.406l42.133 24.336c1.575.907 3.517.907 5.09 0l42.126-24.336c1.57-.91 2.54-2.59 2.54-4.406v-48.668c0-1.816-.97-3.496-2.55-4.406l-42.12-24.317c-.79-.453-1.67-.68-2.55-.68-.88 0-1.76.227-2.55.68"/>
      </clipPath>
      <linearGradient id="node_gr_b" x1="-.348" x2="1.251" gradientTransform="rotate(116.114 53.1 202.97) scale(86.48)" gradientUnits="userSpaceOnUse">
        <stop offset=".3" stopColor="#3E863D"/><stop offset=".5" stopColor="#55934F"/><stop offset=".8" stopColor="#5AAD45"/>
      </linearGradient>
      <clipPath id="node_cp_c">
        <path d="M195.398 307.086c.403.523.907.976 1.5 1.316l36.14 20.875 6.02 3.46c.9.52 1.926.74 2.934.665.336-.027.672-.09 1-.183l44.434-81.36c-.34-.37-.738-.68-1.184-.94l-27.586-15.93-14.582-8.39c-.414-.24-.863-.41-1.32-.53zm0 0"/>
      </clipPath>
      <linearGradient id="node_gr_d" x1="-.456" x2=".582" gradientTransform="rotate(-36.46 550.846 -214.337) scale(132.798)" gradientUnits="userSpaceOnUse">
        <stop offset=".57" stopColor="#3E863D"/><stop offset=".72" stopColor="#619857"/><stop offset="1" stopColor="#76AC64"/>
      </linearGradient>
      <clipPath id="node_cp_e">
        <path d="M241.066 225.953c-.707.07-1.398.29-2.035.652l-42.01 24.247 45.3 82.51c.63-.09 1.25-.3 1.81-.624l42.13-24.336c1.3-.754 2.19-2.03 2.46-3.476l-46.18-78.89c-.34-.067-.68-.102-1.03-.102-.14 0-.28.007-.42.02"/>
      </clipPath>
      <linearGradient id="node_gr_f" x1=".043" x2=".984" gradientTransform="translate(192.862 279.652) scale(97.417)" gradientUnits="userSpaceOnUse">
        <stop offset=".16" stopColor="#6BBF47"/><stop offset=".38" stopColor="#79B461"/><stop offset=".47" stopColor="#75AC64"/><stop offset=".7" stopColor="#659E5A"/><stop offset=".9" stopColor="#3E863D"/>
      </linearGradient>
    </defs>
    <path fill="#689f63" d="M218.647 270.93c-1.46 0-2.91-.383-4.19-1.12l-13.337-7.896c-1.992-1.114-1.02-1.508-.363-1.735 2.656-.93 3.195-1.14 6.03-2.75.298-.17.688-.11.993.07l10.246 6.08c.37.2.895.2 1.238 0l39.95-23.06c.37-.21.61-.64.61-1.08v-46.1c0-.46-.24-.87-.618-1.1l-39.934-23.04c-.37-.22-.86-.22-1.23 0l-39.926 23.04c-.387.22-.633.65-.633 1.09v46.1c0 .44.24.86.62 1.07l10.94 6.32c5.94 2.97 9.57-.53 9.57-4.05v-45.5c0-.65.51-1.15 1.16-1.15h5.06c.63 0 1.15.5 1.15 1.15v45.52c0 7.92-4.32 12.47-11.83 12.47-2.31 0-4.13 0-9.21-2.5l-10.48-6.04c-2.59-1.5-4.19-4.3-4.19-7.29v-46.1c0-3 1.6-5.8 4.19-7.28l39.99-23.07c2.53-1.43 5.89-1.43 8.4 0l39.94 23.08c2.58 1.49 4.19 4.28 4.19 7.28v46.1c0 2.99-1.61 5.78-4.19 7.28l-39.94 23.07c-1.28.74-2.73 1.12-4.21 1.12"/>
    <path fill="#689f63" d="M230.987 239.164c-17.48 0-21.145-8.024-21.145-14.754 0-.64.516-1.15 1.157-1.15h5.16c.57 0 1.05.415 1.14.978.78 5.258 3.1 7.91 13.67 7.91 8.42 0 12-1.902 12-6.367 0-2.57-1.02-4.48-14.1-5.76-10.94-1.08-17.7-3.49-17.7-12.24 0-8.06 6.8-12.86 18.19-12.86 12.79 0 19.13 4.44 19.93 13.98.03.33-.09.65-.31.89-.22.23-.53.37-.85.37h-5.19c-.54 0-1.01-.38-1.12-.9-1.25-5.53-4.27-7.3-12.48-7.3-9.19 0-10.26 3.2-10.26 5.6 0 2.91 1.26 3.76 13.66 5.4 12.28 1.63 18.11 3.93 18.11 12.56 0 8.7-7.26 13.69-19.92 13.69m48.66-48.89h1.34c1.1 0 1.31-.77 1.31-1.22 0-1.18-.81-1.18-1.26-1.18h-1.38zm-1.63-3.78h2.97c1.02 0 3.02 0 3.02 2.28 0 1.59-1.02 1.92-1.63 2.12 1.19.08 1.27.86 1.43 1.96.08.69.21 1.88.45 2.28h-1.83c-.05-.4-.33-2.6-.33-2.72-.12-.49-.29-.73-.9-.73h-1.51v3.46h-1.67zm-3.57 4.3c0 3.58 2.89 6.48 6.44 6.48 3.58 0 6.47-2.96 6.47-6.48 0-3.59-2.93-6.44-6.48-6.44-3.5 0-6.44 2.81-6.44 6.43m14.16.03c0 4.24-3.47 7.7-7.7 7.7-4.2 0-7.7-3.42-7.7-7.7 0-4.36 3.58-7.7 7.7-7.7 4.15 0 7.69 3.35 7.69 7.7"/>
    <path fill="#333" fillRule="evenodd" d="M94.936 90.55c0-1.84-.97-3.53-2.558-4.445l-42.356-24.37c-.715-.42-1.516-.64-2.328-.67h-.438c-.812.03-1.613.25-2.34.67L2.562 86.105C.984 87.025 0 88.715 0 90.555l.093 65.64c0 .91.47 1.76 1.27 2.21.78.48 1.76.48 2.54 0l25.18-14.42c1.59-.946 2.56-2.618 2.56-4.44V108.88c0-1.83.97-3.52 2.555-4.43l10.72-6.174c.796-.46 1.67-.688 2.56-.688.876 0 1.77.226 2.544.687l10.715 6.172c1.586.91 2.56 2.6 2.56 4.43v30.663c0 1.82.983 3.5 2.565 4.44l25.164 14.41c.79.47 1.773.47 2.56 0 .776-.45 1.268-1.3 1.268-2.21zm199.868 34.176c0 .457-.243.88-.64 1.106l-14.548 8.386c-.395.227-.883.227-1.277 0l-14.55-8.386c-.4-.227-.64-.65-.64-1.106V107.93c0-.458.24-.88.63-1.11l14.54-8.4c.4-.23.89-.23 1.29 0l14.55 8.4c.4.23.64.652.64 1.11zM298.734.324c-.794-.442-1.76-.43-2.544.027-.78.46-1.262 1.3-1.262 2.21v65c0 .64-.34 1.23-.894 1.55-.55.32-1.235.32-1.79 0L281.634 63c-1.58-.914-3.526-.914-5.112 0l-42.37 24.453c-1.583.91-2.56 2.6-2.56 4.42v48.92c0 1.83.977 3.51 2.56 4.43l42.37 24.47c1.582.91 3.53.91 5.117 0l42.37-24.48c1.58-.92 2.56-2.6 2.56-4.43V18.863c0-1.856-1.01-3.563-2.63-4.47zm141.093 107.164c1.574-.914 2.543-2.602 2.543-4.422V91.21c0-1.824-.97-3.507-2.547-4.425l-42.1-24.44c-1.59-.92-3.54-.92-5.13 0l-42.36 24.45c-1.59.92-2.56 2.6-2.56 4.43v48.9c0 1.84.99 3.54 2.58 4.45l42.09 23.99c1.55.89 3.45.9 5.02.03l25.46-14.15c.8-.45 1.31-1.3 1.31-2.22 0-.92-.49-1.78-1.29-2.23l-42.62-24.46c-.8-.45-1.29-1.3-1.29-2.21v-15.34c0-.916.48-1.76 1.28-2.216l13.26-7.65c.79-.46 1.76-.46 2.55 0l13.27 7.65c.79.45 1.28 1.3 1.28 2.21v12.06c0 .91.49 1.76 1.28 2.22.79.45 1.77.45 2.56-.01zm0 0"/>
    <path fill="#689f63" fillRule="evenodd" d="M394.538 105.2c.3-.177.676-.177.98 0l8.13 4.69c.304.176.49.5.49.85v9.39c0 .35-.186.674-.49.85l-8.13 4.69c-.304.177-.68.177-.98 0l-8.125-4.69c-.31-.176-.5-.5-.5-.85v-9.39c0-.35.18-.674.49-.85zm0 0"/>
    <g clipPath="url(#node_cp_a)" transform="translate(-78.306 -164.016)"><path fill="url(#node_gr_b)" d="M331.363 246.793l-118.715-58.19-60.87 124.174L270.49 370.97zm0 0"/></g>
    <g clipPath="url(#node_cp_c)" transform="translate(-78.306 -164.016)"><path fill="url(#node_gr_d)" d="M144.07 264.004l83.825 113.453 110.86-81.906-83.83-113.45zm0 0"/></g>
    <g clipPath="url(#node_cp_e)" transform="translate(-78.306 -164.016)"><path fill="url(#node_gr_f)" d="M197.02 225.934v107.43h91.683v-107.43zm0 0"/></g>
  </svg>
);

const PostgresqlIcon = ({ size = "1em" }) => (
  <svg width={size} height={size} viewBox="0 0 432.071 445.383" xmlns="http://www.w3.org/2000/svg">
    <g fillRule="nonzero" clipRule="nonzero" fill="none" stroke="#FFFFFF" strokeWidth="12.4651" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4">
      <path fill="#000000" stroke="#000000" strokeWidth="37.3953" strokeLinecap="butt" strokeLinejoin="miter" d="M323.205,324.227c2.833-23.601,1.984-27.062,19.563-23.239l4.463,0.392c13.517,0.615,31.199-2.174,41.587-7c22.362-10.376,35.622-27.7,13.572-23.148c-50.297,10.376-53.755-6.655-53.755-6.655c53.111-78.803,75.313-178.836,56.149-203.322 C352.514-5.534,262.036,26.049,260.522,26.869l-0.482,0.089c-9.938-2.062-21.06-3.294-33.554-3.496c-22.761-0.374-40.032,5.967-53.133,15.904c0,0-161.408-66.498-153.899,83.628c1.597,31.936,45.777,241.655,98.47,178.31 c19.259-23.163,37.871-42.748,37.871-42.748c9.242,6.14,20.307,9.272,31.912,8.147l0.897-0.765c-0.281,2.876-0.157,5.689,0.359,9.019c-13.572,15.167-9.584,17.83-36.723,23.416c-27.457,5.659-11.326,15.734-0.797,18.367c12.768,3.193,42.305,7.716,62.268-20.224 l-0.795,3.188c5.325,4.26,4.965,30.619,5.72,49.452c0.756,18.834,2.017,36.409,5.856,46.771c3.839,10.36,8.369,37.05,44.036,29.406c29.809-6.388,52.6-15.582,54.677-101.107"/>
      <path fill="#336791" stroke="none" d="M402.395,271.23c-50.302,10.376-53.76-6.655-53.76-6.655c53.111-78.808,75.313-178.843,56.153-203.326c-52.27-66.785-142.752-35.2-144.262-34.38l-0.486,0.087c-9.938-2.063-21.06-3.292-33.56-3.496c-22.761-0.373-40.026,5.967-53.127,15.902 c0,0-161.411-66.495-153.904,83.63c1.597,31.938,45.776,241.657,98.471,178.312c19.26-23.163,37.869-42.748,37.869-42.748c9.243,6.14,20.308,9.272,31.908,8.147l0.901-0.765c-0.28,2.876-0.152,5.689,0.361,9.019c-13.575,15.167-9.586,17.83-36.723,23.416 c-27.459,5.659-11.328,15.734-0.796,18.367c12.768,3.193,42.307,7.716,62.266-20.224l-0.796,3.188c5.319,4.26,9.054,27.711,8.428,48.969c-0.626,21.259-1.044,35.854,3.147,47.254c4.191,11.4,8.368,37.05,44.042,29.406c29.809-6.388,45.256-22.942,47.405-50.555 c1.525-19.631,4.976-16.729,5.194-34.28l2.768-8.309c3.192-26.611,0.507-35.196,18.872-31.203l4.463,0.392c13.517,0.615,31.208-2.174,41.591-7c22.358-10.376,35.618-27.7,13.573-23.148z"/>
      <path d="M215.866,286.484c-1.385,49.516,0.348,99.377,5.193,111.495c4.848,12.118,15.223,35.688,50.9,28.045c29.806-6.39,40.651-18.756,45.357-46.051c3.466-20.082,10.148-75.854,11.005-87.281"/>
      <path d="M173.104,38.256c0,0-161.521-66.016-154.012,84.109c1.597,31.938,45.779,241.664,98.473,178.316c19.256-23.166,36.671-41.335,36.671-41.335"/>
      <path d="M260.349,26.207c-5.591,1.753,89.848-34.889,144.087,34.417c19.159,24.484-3.043,124.519-56.153,203.329"/>
      <path strokeLinejoin="bevel" d="M348.282,263.953c0,0,3.461,17.036,53.764,6.653c22.04-4.552,8.776,12.774-13.577,23.155c-18.345,8.514-59.474,10.696-60.146-1.069c-1.729-30.355,21.647-21.133,19.96-28.739c-1.525-6.85-11.979-13.573-18.894-30.338 c-6.037-14.633-82.796-126.849,21.287-110.183c3.813-0.789-27.146-99.002-124.553-100.599c-97.385-1.597-94.19,119.762-94.19,119.762"/>
      <path d="M188.604,274.334c-13.577,15.166-9.584,17.829-36.723,23.417c-27.459,5.66-11.326,15.733-0.797,18.365c12.768,3.195,42.307,7.718,62.266-20.229c6.078-8.509-0.036-22.086-8.385-25.547c-4.034-1.671-9.428-3.765-16.361,3.994z"/>
      <path d="M187.715,274.069c-1.368-8.917,2.93-19.528,7.536-31.942c6.922-18.626,22.893-37.255,10.117-96.339c-9.523-44.029-73.396-9.163-73.436-3.193c-0.039,5.968,2.889,30.26-1.067,58.548c-5.162,36.913,23.488,68.132,56.479,64.938"/>
      <path fill="#FFFFFF" strokeWidth="4.155" strokeLinecap="butt" strokeLinejoin="miter" d="M172.517,141.7c-0.288,2.039,3.733,7.48,8.976,8.207c5.234,0.73,9.714-3.522,9.998-5.559c0.284-2.039-3.732-4.285-8.977-5.015c-5.237-0.731-9.719,0.333-9.996,2.367z"/>
      <path fill="#FFFFFF" strokeWidth="2.0775" strokeLinecap="butt" strokeLinejoin="miter" d="M331.941,137.543c0.284,2.039-3.732,7.48-8.976,8.207c-5.238,0.73-9.718-3.522-10.005-5.559c-0.277-2.039,3.74-4.285,8.979-5.015c5.239-0.73,9.718,0.333,10.002,2.368z"/>
      <path d="M350.676,123.432c0.863,15.994-3.445,26.888-3.988,43.914c-0.804,24.748,11.799,53.074-7.191,81.435"/>
      <path strokeWidth="3" d="M0,60.232"/>
    </g>
  </svg>
);
// Custom Adobe SVG Icon Components
const AdobePhotoshopIcon = ({ size = "1em" }) => (
  <svg width={size} height={size} viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg">
    <path d="M42.5,0h155C221,0,240,19,240,42.5v149c0,23.5-19,42.5-42.5,42.5h-155C19,234,0,215,0,191.5v-149 C0,19,19,0,42.5,0z" fill="#001E36"/>
    <path d="M54,164.1V61.2c0-0.7,0.3-1.1,1-1.1c1.7,0,3.3,0,5.6-0.1c2.4-0.1,4.9-0.1,7.6-0.2c2.7-0.1,5.6-0.1,8.7-0.2 c3.1-0.1,6.1-0.1,9.1-0.1c8.2,0,15,1,20.6,3.1c5,1.7,9.6,4.5,13.4,8.2c3.2,3.2,5.7,7.1,7.3,11.4c1.5,4.2,2.3,8.5,2.3,13 c0,8.6-2,15.7-6,21.3c-4,5.6-9.6,9.8-16.1,12.2c-6.8,2.5-14.3,3.4-22.5,3.4c-2.4,0-4,0-5-0.1c-1-0.1-2.4-0.1-4.3-0.1v32.1 c0.1,0.7-0.4,1.3-1.1,1.4c-0.1,0-0.2,0-0.4,0H55.2C54.4,165.4,54,165,54,164.1z M75.8,79.4V113c1.4,0.1,2.7,0.2,3.9,0.2H85 c3.9,0,7.8-0.6,11.5-1.8c3.2-0.9,6-2.8,8.2-5.3c2.1-2.5,3.1-5.9,3.1-10.3c0.1-3.1-0.7-6.2-2.3-8.9c-1.7-2.6-4.1-4.6-7-5.7 c-3.7-1.5-7.7-2.1-11.8-2c-2.6,0-4.9,0-6.8,0.1C77.9,79.2,76.5,79.3,75.8,79.4L75.8,79.4z" fill="#31A8FF"/>
    <path d="M192,106.9c-3-1.6-6.2-2.7-9.6-3.4c-3.7-0.8-7.4-1.3-11.2-1.3c-2-0.1-4.1,0.2-6,0.7c-1.3,0.3-2.4,1-3.1,2 c-0.5,0.8-0.8,1.8-0.8,2.7c0,0.9,0.4,1.8,1,2.6c0.9,1.1,2.1,2,3.4,2.7c2.3,1.2,4.7,2.3,7.1,3.3c5.4,1.8,10.6,4.3,15.4,7.3 c3.3,2.1,6,4.9,7.9,8.3c1.6,3.2,2.4,6.7,2.3,10.3c0.1,4.7-1.3,9.4-3.9,13.3c-2.8,4-6.7,7.1-11.2,8.9c-4.9,2.1-10.9,3.2-18.1,3.2 c-4.6,0-9.1-0.4-13.6-1.3c-3.5-0.6-7-1.7-10.2-3.2c-0.7-0.4-1.2-1.1-1.1-1.9v-17.4c0-0.3,0.1-0.7,0.4-0.9 c0.3-0.2,0.6-0.1,0.9,0.1c3.9,2.3,8,3.9,12.4,4.9c3.8,1,7.8,1.5,11.8,1.5c3.8,0,6.5-0.5,8.3-1.4c1.6-0.7,2.7-2.4,2.7-4.2 c0-1.4-0.8-2.7-2.4-4c-1.6-1.3-4.9-2.8-9.8-4.7c-5.1-1.8-9.8-4.2-14.2-7.2c-3.1-2.2-5.7-5.1-7.6-8.5c-1.6-3.2-2.4-6.7-2.3-10.2 c0-4.3,1.2-8.4,3.4-12.1c2.5-4,6.2-7.2,10.5-9.2c4.7-2.4,10.6-3.5,17.7-3.5c4.1,0,8.3,0.3,12.4,0.9c3,0.4,5.9,1.2,8.6,2.3 c0.4,0.1,0.8,0.5,1,0.9c0.1,0.4,0.2,0.8,0.2,1.2v16.3c0,0.4-0.2,0.8-0.5,1C192.9,107.1,192.4,107.1,192,106.9z" fill="#31A8FF"/>
  </svg>
);

const AdobePremierProIcon = ({ size = "1em" }) => (
  <svg width={size} height={size} viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg">
    <path d="M42.5,0h155C221,0,240,19,240,42.5v149c0,23.5-19,42.5-42.5,42.5h-155C19,234,0,215,0,191.5v-149      C0,19,19,0,42.5,0z" fill="#00005B"/>
    <path d="m57 164v-103c0-0.7 0.3-1.1 1-1.1 1.7 0 3.3 0 5.6-0.1 2.4-0.1 4.9-0.1 7.6-0.2s5.6-0.1 8.7-0.2 6.1-0.1 9.1-0.1c8.2 0 15 1 20.6 3.1 5 1.7 9.6 4.5 13.4 8.2 3.2 3.2 5.7 7.1 7.3 11.4 1.5 4.2 2.3 8.5 2.3 13 0 8.6-2 15.7-6 21.3s-9.6 9.8-16.1 12.2c-6.8 2.5-14.3 3.4-22.5 3.4-2.4 0-4 0-5-0.1s-2.4-0.1-4.3-0.1v32.1c0.1 0.7-0.4 1.3-1.1 1.4h-0.4-19c-0.8 0-1.2-0.4-1.2-1.3zm21.8-84.7v33.6c1.4 0.1 2.7 0.2 3.9 0.2h5.3c3.9 0 7.8-0.6 11.5-1.8 3.2-0.9 6-2.8 8.2-5.3 2.1-2.5 3.1-5.9 3.1-10.3 0.1-3.1-0.7-6.2-2.3-8.9-1.7-2.6-4.1-4.6-7-5.7-3.7-1.5-7.7-2.1-11.8-2-2.6 0-4.9 0-6.8 0.1-2-0.1-3.4 0-4.1 0.1z" fill="#9999FF"/>
    <path d="m147 85.2h17.5c1 0 1.8 0.7 2.1 1.6 0.3 0.8 0.5 1.6 0.6 2.5 0.2 1 0.4 2.1 0.5 3.1 0.1 1.1 0.2 2.3 0.2 3.6 3-3.5 6.6-6.4 10.7-8.6 4.6-2.6 9.9-3.9 15.2-3.9 0.7-0.1 1.3 0.4 1.4 1.1v0.4 19.5c0 0.8-0.5 1.1-1.6 1.1-3.6-0.1-7.3 0.2-10.8 1-2.9 0.6-5.7 1.5-8.4 2.7-1.9 0.9-3.7 2.1-5.1 3.7v51c0 1-0.4 1.4-1.3 1.4h-19.7c-0.8 0.1-1.5-0.4-1.6-1.2v-0.4-55.4c0-2.4 0-4.9-0.1-7.5s-0.1-5.2-0.2-7.8c0-2.3-0.2-4.5-0.4-6.8-0.1-0.5 0.2-1 0.7-1.1 0-0.1 0.2-0.1 0.3 0z" fill="#9999FF"/>
  </svg>
);

const AdobeLightroomIcon = ({ size = "1em" }) => (
  <svg width={size} height={size} viewBox="0 0 122.88 119.81" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.76,0h79.36c12.03,0,21.76,9.73,21.76,21.76v76.3c0,12.03-9.73,21.76-21.76,21.76H21.76 C9.73,119.81,0,110.08,0,98.05v-76.3C0,9.73,9.73,0,21.76,0L21.76,0z" fill="#001E36"/>
    <path d="M64.51,84.68H32.06c-0.58,0-0.81-0.29-0.81-0.91V31.44c-0.05-0.33,0.19-0.67,0.58-0.72c0.05,0,0.1,0,0.19,0 h10.02c0.24-0.05,0.58,0.14,0.58,0.43c0,0.05,0,0.1,0,0.14v42.99h23.67c0.53,0,0.67,0.24,0.58,0.72l-1.49,8.91 c0,0.24-0.14,0.48-0.29,0.62C64.89,84.64,64.7,84.68,64.51,84.68L64.51,84.68z" fill="#31A8FF"/>
    <path d="M72.7,43.71h8.96c0.53,0,0.91,0.34,1.05,0.81c0.19,0.34,0.34,0.77,0.43,1.2c0.1,0.53,0.19,1.05,0.24,1.58 c0.05,0.58,0.1,1.2,0.1,1.82c1.53-1.77,3.4-3.26,5.46-4.41c2.35-1.29,4.98-1.92,7.62-1.82c0.34-0.05,0.67,0.19,0.72,0.57 c0,0.05,0,0.1,0,0.19v10.02c0,0.43-0.24,0.58-0.81,0.58c-3.31-0.19-6.66,0.43-9.68,1.73c-1.01,0.48-2.01,1.05-2.78,1.92v26.12 c0,0.53-0.19,0.72-0.67,0.72h-9.97c-0.43,0.05-0.77-0.19-0.81-0.62c0-0.05,0-0.14,0-0.19V55.54c0-1.25,0-2.49-0.05-3.83 c-0.05-1.34-0.05-2.68-0.1-3.98c-0.05-1.15-0.14-2.25-0.29-3.4c-0.05-0.24,0.1-0.53,0.34-0.58C72.56,43.66,72.61,43.66,72.7,43.71 L72.7,43.71L72.7,43.71z" fill="#31A8FF"/>
  </svg>
);

const AdobeIllustratorIcon = ({ size = "1em" }) => (
  <svg width={size} height={size} viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
    <rect width="250" height="250" rx="42.74" ry="42.74" fill="#330000"/>
    <path d="M122.11,66.15h-37.41l-42.97,115.62h33.48l5.58-17.27h42.98l5.58,17.27h34.5l-41.73-115.62ZM102.27,135.65h-12.17l12.17-37.69,12.17,37.69h-12.17Z" fill="#ff9a00"/>
    <rect x="168.12" y="90.74" width="30.98" height="91.03" fill="#ff9a00"/>
    <path d="M200.12,74.28c.09,8.49-6.78,14.49-16.5,14.41-9.73.08-16.59-5.92-16.5-14.41-.09-8.49,6.78-14.49,16.5-14.41,9.73-.08,16.59,5.92,16.5,14.41Z" fill="#ff9a00"/>
  </svg>
);

const FigmaIcon = ({ size = "1em" }) => (
  <svg width={size} height={size} viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z" fill="#0acf83"/>
    <path d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z" fill="#a259ff"/>
    <path d="M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z" fill="#f24e1e"/>
    <path d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z" fill="#ff7262"/>
    <path d="M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z" fill="#1abcfe"/>
  </svg>
);

const tools = [
  { name: "React", icon: <ReactIcon size="1em" /> },
  { name: "JavaScript", icon: <JavascriptIcon size="1em" /> },
  { name: "Python", icon: <PythonIcon size="1em" /> },
  { name: "Java", icon: <JavaIcon size="1.4em" /> },
  { name: "Node.js", icon: <NodeJsIcon size="1.4em" /> },
  { name: "SQL", icon: <PostgresqlIcon size="1em" /> },
  { name: "Photoshop", icon: <AdobePhotoshopIcon size="1em" /> },
  { name: "Premiere Pro", icon: <AdobePremierProIcon size="1em" /> },
  { name: "Figma", icon: <FigmaIcon size="1em" /> },
  { name: "Illustrator", icon: <AdobeIllustratorIcon size="1em" /> },
  { name: "Lightroom", icon: <AdobeLightroomIcon size="1em" /> },
];

const skills = [
    {
        category: "Software Engineering",
        icon: <FiCode className="text-3xl text-yellow-400" />,
        items: ["React.js", "JavaScript", "Python", "Java", "Node.js", "SQL"]
    },
    {
        category: "Graphic Design",
        icon: <FiPenTool className="text-3xl text-red-400" />,
        items: ["Adobe Photoshop", "Adobe Premiere Pro", "Figma", "UI/UX Design", "Illustrator"]
    },
    {
        category: "Photography",
        icon: <FiCamera className="text-3xl text-orange-400" />,
        items: ["Portrait", "Event Photography", "Landscape", "Product Photography"]
    }
];

const About = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [activeTool, setActiveTool] = useState(null);

    return (
        <div className="w-full max-w-6xl mx-auto pt-10 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <span className="text-orange-600 dark:text-orange-400 font-semibold tracking-wider uppercase text-sm">Discover</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2">About <span className="text-gradient">Me</span></h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {/* Profile Image Column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="lg:col-span-1 h-full min-h-[400px]"
                >
                    <div className="relative h-full w-full rounded-2xl overflow-hidden glass-card group">
                        {/* Image Placeholder - REPLACE SRC WITH YOUR IMAGE */}
                        <img
                            src="/My/IMG_9738.JPG"
                            alt="Profile"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent transition-opacity duration-500
                            ${isDarkMode ? 'opacity-80' : 'opacity-0'}`} 
                        />

                        {/* Floating Tech Buttons */}
                        <div className="absolute bottom-6 left-2 right-2 flex flex-wrap justify-center gap-2">
                            <span 
                                onClick={() => scroller.scrollTo('projects', { smooth: true, duration: 500, offset: -100 })}
                                className="cursor-pointer px-4 py-2 rounded-full border border-orange-500/50 bg-orange-950/40 text-orange-200 hover:bg-orange-900/60 transition-all font-semibold text-sm backdrop-blur-md shadow-lg text-center"
                            >
                                Developer
                            </span>
                            <span 
                                onClick={() => navigate('/design')}
                                className="cursor-pointer px-4 py-2 rounded-full border border-red-500/50 bg-red-950/40 text-red-200 hover:bg-red-900/60 transition-all font-semibold text-sm backdrop-blur-md shadow-lg text-center"
                            >
                                Designer
                            </span>
                            <span 
                                onClick={() => navigate('/photos')}
                                className="cursor-pointer px-4 py-2 rounded-full border border-blue-500/50 bg-blue-950/40 text-blue-200 hover:bg-blue-900/60 transition-all font-semibold text-sm backdrop-blur-md shadow-lg text-center"
                            >
                                Photographer
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Content Column */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Personal Intro */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="glass-card p-8 flex flex-col justify-center flex-1"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 bg-[var(--glass-bg)] rounded-full text-text-primary">
                                <FiUser className="text-3xl" />
                            </div>
                            <h3 className="text-2xl font-bold">Who I Am</h3>
                        </div>
                        <p className="text-text-secondary leading-relaxed mb-4">
                            My background in Software Engineering and Data Science provides me with a structured, data-driven approach to problem-solving.
                            I focus on building high-performance web solutions and exploring the latest in tech.
                        </p>
                        <p className="text-text-secondary leading-relaxed">
                            As a Graphic Designer and Photographer, I believe technology should be beautiful.
                            I bridge the gap between complex engineering and user-centric design, creating experiences that are intuitive, accessible, and visually stunning.
                        </p>
                    </motion.div>

                    {/* Career Goals */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="glass-card p-8 flex flex-col justify-center flex-1 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-32 bg-orange-600/10 rounded-full blur-3xl" />

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="p-4 bg-[var(--glass-bg)] rounded-full text-text-primary">
                                <FiTarget className="text-3xl" />
                            </div>
                            <h3 className="text-2xl font-bold">My Vision</h3>
                        </div>
                        <p className="text-text-secondary leading-relaxed relative z-10">
                            I envision a future where technology and creativity are inseparable. I aim to grow into a role where I can architect full-stack solutions that are defined by clean code and exceptional visual storytelling.
                            My mission is to build digital products that feel as natural to use as they are inspiring to look at.
                        </p>
                    </motion.div>

                </div>
            </div>

            {/* Skills Section */}
            <h3 className="text-3xl font-bold text-center mb-10">My Skillset</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="group glass-card p-6 hover-lift border-t-4 border-t-transparent hover:border-t-orange-500 transition-all cursor-pointer bg-[var(--glass-bg)] hover:bg-orange-500/5 relative overflow-hidden"
                        onClick={() => {
                            if (skill.category === "Software Engineering") {
                                scroller.scrollTo('projects', { smooth: true, duration: 500, offset: -100 });
                            } else if (skill.category === "Graphic Design") {
                                navigate('/design');
                            } else if (skill.category === "Photography") {
                                navigate('/photos');
                            }
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 transition-all duration-500" />

                        <div className="mb-6 relative z-10 transition-transform group-hover:scale-110 duration-300 origin-left">
                            {skill.icon}
                        </div>

                        <h4 className="text-xl font-bold mb-4 relative z-10 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{skill.category}</h4>

                        <div className="flex flex-wrap gap-2 relative z-10">
                            {skill.items.map((item, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-[var(--glass-bg)] rounded-full text-sm text-text-secondary border border-[var(--glass-border)] transition-all duration-300 group-hover:bg-orange-500/20 group-hover:text-text-primary group-hover:border-orange-500/30"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Software Marquee Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-20 mb-10"
            >
                <div className="text-center mb-10">
                    <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm">Tech Stack</span>
                    <h3 className="text-3xl md:text-4xl font-bold mt-2">My <span className="text-gradient">Toolkit</span></h3>
                </div>

                <div className="relative w-screen ml-[calc(50%-50vw)] overflow-hidden py-6 bg-[var(--glass-bg)] backdrop-blur-sm border-y border-[var(--glass-border)]">
                    <div className="flex w-max">
                        {/* First Loop */}
                        <motion.div
                            className="flex gap-12 pr-12"
                            animate={{ x: ["0%", "-100%"] }}
                            transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                        >
                            {[...tools, ...tools].map((tool, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-3 min-w-[80px] group cursor-default"
                                    onClick={() => setActiveTool(activeTool === tool.name ? null : tool.name)}
                                >
                                    <div className={`flex items-center justify-center h-20 text-4xl md:text-5xl transition-transform duration-300 filter ${activeTool === tool.name ? 'grayscale-0 opacity-100 scale-110' : 'grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 group-hover:scale-110'}`}>
                                        {tool.icon}
                                    </div>
                                    <span className={`text-sm transition-colors ${activeTool === tool.name ? 'text-text-primary' : 'text-text-secondary/60 group-hover:text-text-primary'}`}>
                                        {tool.name}
                                    </span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Second Loop (Duplicate for seamless effect) */}
                        <motion.div
                            className="flex gap-12 pr-12"
                            animate={{ x: ["0%", "-100%"] }}
                            transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                        >
                            {[...tools, ...tools].map((tool, index) => (
                                <div
                                    key={`duplicate-${index}`}
                                    className="flex flex-col items-center gap-3 min-w-[80px] group cursor-default"
                                    onClick={() => setActiveTool(activeTool === tool.name ? null : tool.name)}
                                >
                                    <div className={`flex items-center justify-center h-20 text-4xl md:text-5xl transition-transform duration-300 filter ${activeTool === tool.name ? 'grayscale-0 opacity-100 scale-110' : 'grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 group-hover:scale-110'}`}>
                                        {tool.icon}
                                    </div>
                                    <span className={`text-sm transition-colors ${activeTool === tool.name ? 'text-text-primary' : 'text-text-secondary/60 group-hover:text-text-primary'}`}>
                                        {tool.name}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.div>

        </div>
    );
};

export default About;
