import Card from "./components/Card/Card";

function App() {
  return (
    <>
      <Card
        name="Sydney"
        phone="111-111-1111"
        email="test@email.com"
        image={{
          url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
          alt: "cute cat",
        }}
        isFavorite={false}
      />
    </>
  );
}

export default App;
