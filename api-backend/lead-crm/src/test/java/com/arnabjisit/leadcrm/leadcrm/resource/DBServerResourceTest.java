package com.arnabjisit.leadcrm.leadcrm.resource;

import com.arnabjisit.leadcrm.leadcrm.LeadCrmApplication;
import com.arnabjisit.leadcrm.leadcrm.model.Lead;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Stack;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = LeadCrmApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class DBServerResourceTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @LocalServerPort
    private int port;

    private String getRootUrl() {
        return "http://localhost:" + port;
    }

    @Test
    public void testGetLeads() {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Object> entity = new HttpEntity<Object>(null, headers);
        ResponseEntity<Object> response = restTemplate.exchange(getRootUrl() + "/app/api/{username}",
                HttpMethod.GET, entity, Object.class );
        assertNotNull(response.getBody());
    }

    @Test
    public void testGetAllLeads() {
        Lead employee = restTemplate.postForObject(getRootUrl() + "/app/api/list","", Lead.class);
        System.out.println(employee.getFirstName());
        assertNotNull(employee);
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
        assertNotNull(postResponse);
        assertNotNull(postResponse.getBody());
    }
}