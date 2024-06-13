import Home from './screens/home'


function App() {
  return (
    <>
      <div className=' hidden md:block'>
        <Home />
      </div>
      <div className=' flex md:hidden justify-center items-center h-screen'>
        <p>content only visible above 768px</p>
      </div>
    </>
  );
}

export default App;
