package com.example.kotlinspring.dao

import com.example.kotlinspring.data.Category
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.web.bind.annotation.CrossOrigin

@CrossOrigin("*")
@RepositoryRestResource
interface CategoryRepository : JpaRepository<Category?, Long?>