const TestPage = () => {
  return (
    <div className="flex flex-col items-center my-5 gap-5">
      <p>Loading images...</p>
      <img src="/forest.avif" alt="" className="h-[800px] w-[600px]" />
      <p>Below the image</p>
      <img src="/forest.avif" alt="" className="h-[800px] w-[600px]" />
    </div>
  );
};

export default TestPage;
