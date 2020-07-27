package com.arnabjisit.leadcrm.leadcrm.repository;

import com.arnabjisit.leadcrm.leadcrm.model.Lead;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeadsRepository extends JpaRepository<Lead, Integer> {
    List<Lead> findByUserName (String username);
}
