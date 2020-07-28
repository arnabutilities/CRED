package com.arnabjisit.leadcrm.leadcrm.model;

import springfox.documentation.spring.web.json.Json;

import javax.persistence.*;

@Entity
@Table(name="Lead", catalog = "tinycrm")
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "gender")
    private String gender;

    @Column(name = "dob_ts")
    private String dob;

    @Column(name = "department")
    private String department;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }
    public Json getJson(){

        return new Json("{" +
                "\"id\":" + id +
                ", \"userName\":\"" + userName + "\"" +
                ", \"firstName\":\"" + firstName + "\"" +
                ", \"dob\":\"" + dob + "\"" +
                ", \"gender\":\"" + gender + "\"" +
                ", \"lastName\":\"" + lastName +"\"" +
                ", \"department\":\"" + department +"\"" +
                '}');
    }

    public Lead() {
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}
