import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import StudentSignUp from "./components/StudentSignUp/StudentSignUp";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import LibrarianLogin from "./components/LibrarianLogin/LibrarianLogin";
import StudentLogin from "./components/StudentLogin/StudentLogin";
import Home from "./components/Home/Home";
import AddLibrarian from "./components/AddLibrarian/AddLibrarian";
import AddBook from "./components/AddbBook/AddBook";
import ViewBooks from "./components/ViewBooks/ViewBooks";

const App = () => {
  return (
    <StyledApp className="App">
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/registerStudent" element={<StudentSignUp />} />
        <Route path="/loginStudent" element={<StudentLogin />} />
        <Route path="/loginLibrarian" element={<LibrarianLogin />} />
        <Route path="/loginAdmin" element={<AdminLogin />} />
        <Route path="/addLibrarian" element={<AddLibrarian />} />
        <Route path="/addBook" element={<AddBook />} />
        <Route path="/viewBooks" element={<ViewBooks />} />
      </Routes>
    </StyledApp>
  );
};

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default App;
