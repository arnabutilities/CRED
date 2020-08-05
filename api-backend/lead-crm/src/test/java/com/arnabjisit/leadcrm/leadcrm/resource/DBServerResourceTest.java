package com.arnabjisit.leadcrm.leadcrm.resource;

import com.arnabjisit.leadcrm.leadcrm.LeadCrmApplication;
import com.arnabjisit.leadcrm.leadcrm.model.Lead;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = LeadCrmApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class DBServerResourceTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @LocalServerPort
    private int port;

    @Autowired
    ConversionService conversionService;

    private String getRootUrl() {
        return "http://localhost:" + port;
    }

    @Test
    public void testGetLeads() {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Object> entity = new HttpEntity<Object>(null, headers);
        ResponseEntity<Object> response = restTemplate.exchange(getRootUrl() + "/app/api/someuser",
                HttpMethod.GET, entity, Object.class );
        assertNotNull(response.getBody());
    }

    @Test
    public void testGetAllLeads() {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Object> entity = new HttpEntity<Object>(null, headers);
        ResponseEntity<Lead[]> employees = restTemplate.exchange(getRootUrl() + "/app/api/list",HttpMethod.POST, entity, Lead[].class);
        assertNotNull(employees.getBody());
        assertTrue(conversionService.convert(employees.getBody(), ArrayList.class).size() > 0);
        assertTrue(conversionService.convert(employees.getBody(), ArrayList.class).get(0).getClass().equals(Lead.class));
       // System.out.println(conversionService.convert(employees.getBody(), ArrayList.class).get(0).getClass());

//        assertNotNull(employee);
    }

    @Test
    public void testAddLead() {
        Lead employee = new Lead();
        employee.setFirstName("admin");
        employee.setLastName("admin");
        employee.setDob("20/03/1982");
        employee.setDepartment("Dep 1");
        employee.setGender("male");
        ResponseEntity<Lead> postResponse = restTemplate.postForEntity(getRootUrl() + "/app/api/add", employee, Lead.class);
        System.out.println(postResponse.getBody());
        assertTrue(postResponse.getBody().getFirstName().equals("admin"));
        assertNotNull(postResponse);
    }
}
