// LibrarySection.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  LibraryContainer,
  SidebarContainer,
  Content,
  LibraryHeader,
  BookList,
  BookItem,
  BookTitle,
  BorrowButton,
} from '../../styles/LibraryStyles';

const LibrarySection = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/library/getall');
      setBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleBorrowBook = (id) => {
    // Implement borrow book functionality here
    console.log(`Book with ID ${id} has been borrowed.`);
  };

  return (
    <LibraryContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <LibraryHeader>Library</LibraryHeader>
        <BookList>
          {books.map((book) => (
            <BookItem key={book._id}>
              <BookTitle>{book.bookname}</BookTitle>
              <p>Author: {book.author}</p>
              <BorrowButton onClick={() => handleBorrowBook(book._id)}>Borrow</BorrowButton>
            </BookItem>
          ))}
        </BookList>
      </Content>
    </LibraryContainer>
  );
};

export default LibrarySection;
// import React, { useState } from 'react';
// // import { FilePlus } from 'lucide-react';

// const UploadFilePage = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (selectedFile) {
//       alert(`File uploaded: ${selectedFile.name}`);
//     } else {
//       alert('Please select a file to upload.');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg p-6 rounded-2xl max-w-md w-full text-center">
//         <h2 className="text-2xl font-bold mb-4">Submission</h2>
//         <form onSubmit={handleSubmit}>
//           <label className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer hover:border-blue-500">
//             <div className="flex flex-col items-center">
//               <FilePlus className="w-8 h-8 text-gray-500" />
//               <span className="mt-2 text-gray-600">Click to upload file</span>
//             </div>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="hidden"
//             />
//           </label>
//           {selectedFile && (
//             <p className="mt-3 text-gray-700">Selected file: {selectedFile.name}</p>
//           )}
//           <button
//             type="submit"
//             className="mt-5 w-full bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LibrarySection;