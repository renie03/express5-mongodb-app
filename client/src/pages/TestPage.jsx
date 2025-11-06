import SmartImage from "../components/shared/SmartImage";

const TestPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SmartImage
        src="/forest.avif"
        alt="forest"
        className="h-[500px] w-[500px] rounded-xl"
      />
    </div>
  );
};

export default TestPage;
