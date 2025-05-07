package com.example.libraryManagement.dto;

import com.example.libraryManagement.model.BookCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {
    private Long id;

    @NotBlank
    @Size(max = 200)
    private String title;

    @NotBlank
    @Size(max = 100)
    private String author;

    @Size(max = 20)
    private String isbn;

    @NotNull
    private Integer publicationYear;

    private String description;

    private BookCategory category;

    private Integer availableCopies;

    private String addedBy;
}