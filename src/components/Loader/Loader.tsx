import { FC } from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Loader: FC = () => {
  return (
    <>
      <RotatingLines
        visible={true}
        width="60"
        strokeColor="DodgerBlue"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </>
  );
};

export default Loader;
