import Form from "./components/Form";

function App() {
  return (
    <>
      <header className="bg-lime-600">
        <div className="max-w-4xl mx-auto flex justify-evenly">
          <h1 className="text-center tex-lg font-bold text-white uppercase">
            Contador de calorias
          </h1>
          <h2>hj</h2>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form />
        </div>
      </section>
    </>
  );
}

export default App;
