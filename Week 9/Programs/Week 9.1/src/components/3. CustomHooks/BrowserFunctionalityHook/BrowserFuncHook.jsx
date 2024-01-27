import useIsOnline from './useIsOnline';
import useMousePointer from './useDimensions';

const BrowserFuncHook = () => {
  const isOnline = useIsOnline();
  const mousePointer = useMousePointer();

  if (!isOnline) return 'User Offline!';

  return (
    <>
      <span>User Online!</span>
      <span>
        Your mouse position is {mousePointer.x} {mousePointer.y}
      </span>
    </>
  );
};

export default BrowserFuncHook;
