package wedding.core.services.users.beans;

import wedding.core.services.product.PortalProduct;

import java.util.Date;
import java.util.List;

public class PortalUser {

    private String firstName;
    private String lastName;
    private int age;
    private String sex;
    private Date dateOfRegistration;
    private Date birthday;
    private String phoneNumber;
    private String email;
    private String photoLink;
    private String city;
    private String path;


    public PortalUser() {

    }

    public Date getDateOfRegistration() {
        return dateOfRegistration;
    }

    public void setDateOfRegistration(Date dateOfRegistration) {
        this.dateOfRegistration = dateOfRegistration;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
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

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Override
    public String toString() {
        return "{" +
                "\"firstName\":\"" + firstName +
                "\", \"lastName\":\"" + lastName +
                "\", \"age\":\"" + age +
                "\", \"sex\":\"" + sex +
                "\", \"dateOfRegistration\":\"" + dateOfRegistration +
                "\", \"birthday\":\"" + birthday +
                "\", \"phoneNumber\":\"" + phoneNumber +
                "\", \"email\":\"" + email +
                "\", \"photoLink\":\"" + photoLink +
                "\", \"city\":\"" + city +
                "\"}";
    }
}
