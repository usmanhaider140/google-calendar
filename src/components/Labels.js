import GlobalContext from '@/context/GlobalContext';
import React, { useContext } from 'react';

const Labels = () => {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <div>
      <h3 className='my-2 text-lg font-bold text-gray-700'>Labels</h3>
      {labels.map((label, index) => {
        return (
          <div
            key={index}
            className='flex items-center p-2 mb-2 text-gray-700 uppercase rounded'>
            <input
              type='checkbox'
              name='label'
              value={label.checked}
              onClick={() => updateLabel(label.label)}
              className={`form-checkbox w-4 h-4 mr-2 text-${label.label}-500 border-none rounded-full focus:ring-0`}
            />
            <span>{label.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Labels;
