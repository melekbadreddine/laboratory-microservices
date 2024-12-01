package com.example.demo.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Tool;

public interface ToolRepository extends JpaRepository<Tool, Long>{
	List<Tool> findByDate (Date date);
	List<Tool> findBySource (String source);

}
