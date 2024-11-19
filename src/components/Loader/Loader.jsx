import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
  return (
    <RotatingLines
      visible={true}
      height="60"
      width="60"
      strokeColor="DodgerBlue"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
};

export default Loader;
