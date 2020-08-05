package com.arnabjisit.leadcrm.leadcrm.resource;

import com.arnabjisit.leadcrm.leadcrm.model.Lead;
import com.arnabjisit.leadcrm.leadcrm.repository.LeadsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.spring.web.json.Json;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/app/api")
public class DBServerResource {

    private LeadsRepository leadsRepository;

    public DBServerResource(LeadsRepository leadsRepository) {
        this.leadsRepository = leadsRepository;
    }

    @GetMapping("/{username}")
    public List<String> getLeads(@PathVariable("username") final String username) {
        return leadsRepository.findByUserName(username)
        .stream()
        .map(lead -> lead.getJson().toString())
        .collect(Collectors.toList());
    }

    @PostMapping ("/list")
    public List<Json> getAllLeads() { //@RequestBody final String username
        return leadsRepository.findAll()
                .stream()
                .map(Lead::getJson)
                .collect(Collectors.toList());
    }

    @PostMapping ("/add")
    public ResponseEntity<Lead> addLead(@RequestBody final Lead lead) {
       // leadsRepository.save(lead);
        return new ResponseEntity<Lead>(leadsRepository.save(lead), HttpStatus.OK);
    }
}
