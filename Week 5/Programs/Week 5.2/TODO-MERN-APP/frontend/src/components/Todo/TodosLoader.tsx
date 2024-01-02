const TodosLoader = () => {
  return Array.from({ length: 5 }, (_, i) => (
    <div
      key={`currTod-${i}`}
      className='animate-pulse flex items-center bg-gray-700 justify-between py-2 px-4 rounded-lg mb-2 gap-4 border border-slate-400'
    >
      <div className='w-[70%] animate-pulse flex items-center gap-4'>
        <div className='w-[30%] h-10 bg-slate-500 rounded-md'></div>
        <div className='w-2 h-6 bg-slate-500 rounded-md'></div>
        <div className='w-[60%] h-10 bg-slate-500 rounded-md'></div>
      </div>
      <div className='w-[25%] animate-pulse flex gap-2 items-center justify-between'>
        <div className='w-full h-10 bg-emerald-600 rounded-md'></div>
      </div>
    </div>
  ));
};

export default TodosLoader;
