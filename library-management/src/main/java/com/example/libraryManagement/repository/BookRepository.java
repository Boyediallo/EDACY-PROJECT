package com.example.libraryManagement.repository;


import com.example.libraryManagement.model.Book;
import com.example.libraryManagement.model.BookCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitleContainingIgnoreCase(String title);

    List<Book> findByAuthorContainingIgnoreCase(String author);

    List<Book> findByCategory(BookCategory category);

    Optional<Book> findByIsbn(String isbn);
}