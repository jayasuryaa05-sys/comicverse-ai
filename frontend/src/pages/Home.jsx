import Button from "../components/Button";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">

      <h1 className="text-5xl font-bold text-green-400">
        ComicVerse AI
      </h1>

      <p className="mt-4 text-lg text-gray-300">
        Welcome to the AI Powered Comic Reading Platform
      </p>

      <div className="flex gap-4 mt-8">
        <Button text="Login" />
        <Button text="Register" />
        <Button text="Explore Comics" />
      </div>

    </div>
  );
}

export default Home;