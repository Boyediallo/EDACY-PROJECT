package com.example.libraryManagement.controller;


import com.example.libraryManagement.dto.BookDto;
import com.example.libraryManagement.model.Book;
import com.example.libraryManagement.model.BookCategory;
import com.example.libraryManagement.security.service.UserDetailsImpl;
import com.example.libraryManagement.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@Tag(name = "Livre", description = "API de gestion des livres")
public class BookController {
    @Autowired
    private BookService bookService;

    @Operation(summary = "Récupérer tous les livres", description = "Retourne une liste de tous les livres disponibles")
    @ApiResponse(responseCode = "200", description = "Liste des livres récupérée avec succès")
    @GetMapping
    public ResponseEntity<List<BookDto>> getAllBooks() {
        List<BookDto> books = bookService.getAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @Operation(summary = "Récupérer un livre par ID", description = "Retourne un livre unique en fonction de l'ID fourni")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Livre trouvé",
                    content = @Content(schema = @Schema(implementation = Book.class))),
            @ApiResponse(responseCode = "404", description = "Livre non trouvé")
    })
    @GetMapping("/{id}")
    public ResponseEntity<BookDto> getBookById(@PathVariable Long id) {
        BookDto book = bookService.getBookById(id);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @GetMapping("/search/title")
    public ResponseEntity<List<BookDto>> getBooksByTitle(@RequestParam String title) {
        List<BookDto> books = bookService.getBooksByTitle(title);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/search/author")
    public ResponseEntity<List<BookDto>> getBooksByAuthor(@RequestParam String author) {
        List<BookDto> books = bookService.getBooksByAuthor(author);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/search/category")
    public ResponseEntity<List<BookDto>> getBooksByCategory(@RequestParam BookCategory category) {
        List<BookDto> books = bookService.getBooksByCategory(category);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @Operation(summary = "Créer un nouveau livre", description = "Ajoute un nouveau livre à la base de données")
    @ApiResponse(responseCode = "201", description = "Livre créé avec succès")
    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<BookDto> createBook(@Valid @RequestBody BookDto bookDto,
                                              @AuthenticationPrincipal UserDetailsImpl userDetails) {
        BookDto createdBook = bookService.createBook(bookDto, userDetails.getUsername());
        return new ResponseEntity<>(createdBook, HttpStatus.CREATED);
    }

    @Operation(summary = "Mettre à jour un livre", description = "Met à jour les informations d'un livre existant")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Livre mis à jour avec succès"),
            @ApiResponse(responseCode = "404", description = "Livre non trouvé")
    })
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<BookDto> updateBook(@PathVariable Long id,
                                              @Valid @RequestBody BookDto bookDto) {
        BookDto updatedBook = bookService.updateBook(id, bookDto);
        return new ResponseEntity<>(updatedBook, HttpStatus.OK);
    }

    @Operation(summary = "Supprimer un livre", description = "Supprime un livre de la base de données")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Livre supprimé avec succès"),
            @ApiResponse(responseCode = "404", description = "Livre non trouvé")
    })
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok(new RuntimeException("Book deleted successfully!"));
    }
}