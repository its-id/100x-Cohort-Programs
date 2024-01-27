import useIsOnline from './useIsOnline';

const BrowserFuncHook = () => {
  const isOnline = useIsOnline();

  if (!isOnline) return 'User Offline!';

  return (
    <>
      <span>User Online!</span>
    </>
  );
};

export default BrowserFuncHook;
