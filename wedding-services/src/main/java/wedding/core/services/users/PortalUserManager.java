package wedding.core.services.users;

import com.google.gson.JsonObject;
import wedding.core.services.users.beans.PortalUser;

import java.util.Date;

public interface PortalUserManager {

    boolean addPortalUserViaEmail(String email, String pass);

    boolean updateSeller(String email, Date birthday, int age, String firstName, String lastName, String phoneNumber, String sex);

    boolean updateUser(String email, Date birthday, int age, String firstName, String lastName, String phoneNumber);

    boolean deleteUser(String email);

    boolean addNewSeller(String email, String pass);

    void addVerifyStatus(String email);

    boolean isVerify(String email);

    PortalUser getPortalUser(String email);

    PortalUser getPortalUser(String id, String authType);

    boolean isUserExist(String userID, String authType);

    public JsonObject getPortalUserInfoAsJson(String email);

    boolean addPortalUserViaSocial(String userID, String type, String email, String firstName, String lastName, String city, String authType);

    boolean addPartner(String userID, String type, String email, String speciality, String name, String city, String phone, String authType);
}
