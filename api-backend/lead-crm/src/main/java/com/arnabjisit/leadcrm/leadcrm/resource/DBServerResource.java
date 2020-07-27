package com.arnabjisit.leadcrm.leadcrm.resource;

import com.arnabjisit.leadcrm.leadcrm.model.Lead;
import com.arnabjisit.leadcrm.leadcrm.repository.LeadsRepository;
import org.springframework.web.bind.annotation.*;

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
        .map(lead -> lead.getFirstName())
        .collect(Collectors.toList());

    }

    @PostMapping ("/{username}")
    public List<String> getAllLeads(@PathVariable("username") final String username) {

        return leadsRepository.findByUserName(username)
                .stream()
                .map(lead -> lead.getFirstName())
                .collect(Collectors.toList());

    }

    @PostMapping ("/add")
    public List<String> addLead(@RequestBody final Lead lead) {
       // System.out.println("--------->>>>>  "+lead.getFirstName());
        //leadsRepository.save(lead);
        return leadsRepository.findByUserName("arnab")
                .stream()
                .map(l -> l.getFirstName())
                .collect(Collectors.toList());
    }
}
