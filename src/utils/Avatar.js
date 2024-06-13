import React from 'react';

const colorMap = {
    A: '#F9F9CD', B: '#FFDEBD', C: '#FFDEDE', D: '#FFCEE7', E: '#FFD7FF', F: '#EAD4FF', G: '#DEDEFF', H: '#CAE4FF', I: '#CCF6FF', J: '#B2F1D2', K: '#D3F3D3', L: '#DEF5C7', M: '#F9F9CD', N: '#FFDEBD', O: '#FFDEBD', P: '#FFCEE7', Q: '#FFD7FF', R: '#EAD4FF', S: '#DEDEFF', T: '#CAE4FF', U: '#CCF6FF', V: '#B2F1D2', W: '#D3F3D3', X: '#DEF5C7', Y: '#F9F9CD', Z: '#FFDEBD'
};
const Avatar = ({ name, size, textSize }) => {
    const initials = name.split(' ').map(n => n[0]).join('');
    const firstLetter = name[0].toUpperCase();
    const bgColor = colorMap[firstLetter] || '#CCCCCC';

    return (
        <svg width={size} height={size} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" fill={bgColor} />
            <text className=' uppercase' x="50" y="50" fontSize={textSize} textAnchor="middle" dominantBaseline="middle" fill="#111827" fontWeight={500} fontFamily="Poppins" >
                {initials}
            </text>
        </svg>
    );
};
export default Avatar;