import "./App.css";
import Letter from "./components/letter/letter";
import VideoBg from "./components/video-bg/videoBg";
function App() {
  return (
    <div className="App">
      {/* doesn't really matter where this goes since it is pos of absolute but I am just going to leave this background on the top */}
      <VideoBg />
      <header className="App-header">
        <h1 className="app-title">For My Love </h1>
      </header>
      <Letter />
    </div>
  );
}

export default App;
