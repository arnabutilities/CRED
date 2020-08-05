package com.arnabjisit.leadcrm.leadcrm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.arnabjisit.leadcrm.leadcrm.repository")
@SpringBootApplication
public class LeadCrmApplication {

	public static void main(String[] args) {
		SpringApplication.run(LeadCrmApplication.class, args);
	}

}
