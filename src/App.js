import { useState } from "react";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import SearchInput from "./components/SearchInput";
import Info from "./components/Info";
import Todos from "./components/Todos";
import Empty from "./components/Empty";

function App() {
  // Menghandle state pada react component
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([
    { title: "Hoodie CoolBoy", count: 1 },
    { title: "Sepatu Sneakers", count: 1 },
    { title: "Coffe Americano", count: 1 },
    { title: "Masukan List Kamu...", count: 1 },
  ]);

  // Improvment handleSubmit untuk menambahkan sebuah properti baru ke dalam todos state
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) {
      alert("No blank list!");
      return;
    }

    const addedTodos = [
      ...todos,
      {
        title: value,
        count: 1,
      },
    ];

    setTodos(addedTodos);
    setValue("");
  };

  // Menghandle pengurangan dan penambahan dari object state todos START
  const handleAdditionCount = (index) => {
    const newTodos = [...todos];

    newTodos[index].count = newTodos[index].count + 1; // 2
    setTodos(newTodos);
  };

  const handleSubstractionCount = (index) => {
    const newTodos = [...todos];

    if (newTodos[index].count > 0) {
      // Selama jumlah count masih di atas 0
      // Bisa lakuin pengurangan
      newTodos[index].count = newTodos[index].count - 1; // 2
    } else {
      // Kalau sudah 0 dan masih dikurangin juga
      // Hapus array value dengan index yang sesuai
      newTodos.splice(index, 1);
    }
    setTodos(newTodos);
  };
  // Menghandle pengurangan dan penambahan dari object state todos END

  // Membuat getTotalCounts untuk Menghitung total counts dari semua properti todos START
  const getTotalCounts = () => {
    const totalCounts = todos.reduce((total, num) => {
      return total + num.count;
    }, 0);

    return totalCounts;
  };
  // Membuat getTotalCounts untuk Menghitung total counts dari semua properti todos END

  return (
    <>
      <Navbar />

      <Container>
        <SearchInput
          onSubmit={handleSubmit}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />

        <Info
          todosLength={todos.length}
          totalCounts={getTotalCounts()}
          onDelete={() => setTodos([])}
        />

        {todos.length > 0 ? (
          <Todos
            todos={todos}
            onSubstraction={(index) => handleSubstractionCount(index)}
            onAddition={(index) => handleAdditionCount(index)}
          />
        ) : (
          <Empty />
        )}
      </Container>
    </>
  );
}

export default App;
