package wedding.core.services.users.impl;

import com.google.gson.JsonObject;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.jackrabbit.api.JackrabbitSession;
import org.apache.jackrabbit.api.security.principal.PrincipalManager;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.Group;
import org.apache.jackrabbit.api.security.user.User;
import org.apache.jackrabbit.value.ValueFactoryImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wedding.core.services.product.PortalProduct;
import wedding.core.services.users.PortalUserManager;
import wedding.core.services.users.beans.PortalUser;
import wedding.core.utils.WeddingUtils;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Value;
import javax.jcr.query.Query;
import javax.jcr.query.QueryResult;
import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.*;

@Component
@Service(PortalUserManager.class)
public class PortalUserManagerImpl implements PortalUserManager {

    private static final Logger LOG = LoggerFactory.getLogger(PortalUserManagerImpl.class);

    private static final String QUERY_USER_EXIST = "/jcr:root/home/users/wedding/users//*[@userID = '%s' and @authType = '%s']";

    private static final String QUERY_GET_USER = "/jcr:root%s/catalog//*[@isActive = 'true']";

    @Reference
    private WeddingUtils weddingUtils;

    public boolean addPortalUserViaEmail(final String email, String pass) {
        LOG.info("TRY ADD NEW USER WITH NAME : " + email);
        User user = null;
        try {
            String pathToNewUserFolder = "/home/users/wedding/users" + "/" + email.substring(0, 1);
            PrincipalManager principalManager = getJackrabbitSession().getPrincipalManager();
            Principal principal = principalManager.getPrincipal(email);
            if (principal == null) {
                user = getJackrabbitSession().getUserManager().createUser(email, pass, new Principal() {
                    public String getName() {
                        return email;
                    }
                }, pathToNewUserFolder);
                user.setProperty("./profile/email", ValueFactoryImpl.getInstance().createValue(email));
                user.setProperty("verifiedStatus", ValueFactoryImpl.getInstance().createValue(false));
                Group portalUsers = (Group) getJackrabbitSession().getUserManager().getAuthorizable("wedding-users");
                Authorizable authorizable = getJackrabbitSession().getUserManager().getAuthorizable(user.getPrincipal());
                portalUsers.addMember(authorizable);
                getJackrabbitSession().move(user.getPath(), pathToNewUserFolder + "/" + email);
                getJackrabbitSession().save();
                LOG.info("USER SUCCESS CREATE");
                return true;
            } else {
                LOG.info("USER WITH THAT NAME ALREADY EXIST : " + email);
                return false;
            }
        } catch (RepositoryException e) {
            LOG.error(e.getMessage());
        }
        LOG.info("FAILED ADD NEW USER");
        return false;
    }

    public boolean updateSeller(String email, Date birthday, int age, String firstName, String lastName, String phoneNumber, String sex) {
        return false;
    }

    public boolean updateUser(String email, Date birthday, int age, String firstName, String lastName, String phoneNumber) {
        return false;
    }

    public boolean deleteUser(String email) {
        return false;
    }

    public boolean addNewSeller(String email, String pass) {
        return false;
    }

    public void addVerifyStatus(String email) {
        try {
            PrincipalManager principalManager = getJackrabbitSession().getPrincipalManager();
            Principal principal = principalManager.getPrincipal(email);
            if (principal != null) {
                Authorizable authorizable = (User) getJackrabbitSession().getUserManager().getAuthorizable(principal);
                authorizable.setProperty("verifiedStatus", ValueFactoryImpl.getInstance().createValue(true));
                getJackrabbitSession().save();
                LOG.info("USER SUCCESS VERIFY ON JCR LAYER");
            } else {
                LOG.info("FAIL VERIFY USER. THAT NAME DOESN'T EXIST : " + email);
            }
        } catch (RepositoryException e) {
            LOG.error(e.getMessage());
        }
    }

    public boolean isVerify(String email) {
        try {
            PrincipalManager principalManager = getJackrabbitSession().getPrincipalManager();
            Principal principal = principalManager.getPrincipal(email);
            if (principal != null) {
                Authorizable authorizable = (User) getJackrabbitSession().getUserManager().getAuthorizable(principal);
                Value[] verifiedStatus = authorizable.getProperty("verifiedStatus");
                if (verifiedStatus.length > 0 && verifiedStatus[0].getBoolean()) {
                    return true;
                }
            } else {
                LOG.info("USER DOESN'T EXIST");
            }
        } catch (RepositoryException e) {
            LOG.error(e.getMessage());
        }
        return false;
    }

    public PortalUser getPortalUser(String email) {
        PortalUser portalUser = new PortalUser();
        portalUser.setEmail(email);
        try {
            Authorizable authorizable = weddingUtils.getAdminSession().getUserManager().getAuthorizable(email);
            QueryResult result = weddingUtils.getAdminSession().getWorkspace().getQueryManager().
                    createQuery(String.format(QUERY_GET_USER, authorizable.getPath()), Query.XPATH).execute();
            NodeIterator nodeIterator = result.getNodes();
            while (nodeIterator.hasNext()) {
                Node searchNode = nodeIterator.nextNode();
                PortalProduct portalProduct = new PortalProduct();
            }
        } catch (RepositoryException e) {
            LOG.error("FAIL TO BUILD USER. Details:" + e.getMessage());
        }
        return portalUser;
    }

    @Override
    public PortalUser getPortalUser(String id, String authType) {
        PortalUser portalUser = new PortalUser();
        try {
            QueryResult queryResult = weddingUtils.getAdminSession().getWorkspace().getQueryManager().
                    createQuery(String.format(QUERY_USER_EXIST, id, authType), Query.XPATH).execute();
            NodeIterator nodeIterator = queryResult.getNodes();
            if (nodeIterator.hasNext()) {
                Node profile = nodeIterator.nextNode();
                portalUser.setFirstName(profile.getProperty("firstName").getString());
                portalUser.setLastName(profile.getProperty("lastName").getString());
                portalUser.setEmail(profile.getProperty("email").getString());
                portalUser.setCity(profile.getProperty("city").getString());
            }
        } catch (RepositoryException e) {
            LOG.error(e.getMessage());
        }
        return portalUser;
    }

    @Override
    public boolean isUserExist(String userID, String authType) {
        try {
            QueryResult queryResult = weddingUtils.getAdminSession().getWorkspace().getQueryManager().
                    createQuery(String.format(QUERY_USER_EXIST, userID, authType), Query.XPATH).execute();
            return queryResult.getNodes().hasNext();
        } catch (RepositoryException e) {
            LOG.error(e.getMessage());
        }
        return false;
    }

    public JsonObject getPortalUserInfoAsJson(String email) {
        PortalUser portalUser = getPortalUser(email);
        JsonObject jsonUser = new JsonObject();
        jsonUser.addProperty("name", portalUser.getEmail());
        return jsonUser;
    }

    @Override
    public boolean addPortalUserViaSocial(String userID, String type, String email, String firstName, String lastName, String city, String authType) {
        LOG.info("TRY ADD NEW USER WITH NAME : " + email);
        User user = null;
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM");
            String pathToNewUserFolder = "/home/users/wedding/users" + "/" + email.substring(0, 1) + "/" + dateFormat.format(new Date());
            PrincipalManager principalManager = getJackrabbitSession().getPrincipalManager();
            Principal principal = principalManager.getPrincipal(email);
            if (principal == null) {
                user = getJackrabbitSession().getUserManager().createUser(email, "user", () -> email, pathToNewUserFolder);
                user.setProperty("./profile/userID", ValueFactoryImpl.getInstance().createValue(userID));
                user.setProperty("./profile/email", ValueFactoryImpl.getInstance().createValue(email));
                user.setProperty("./profile/authType", ValueFactoryImpl.getInstance().createValue(authType));
                user.setProperty("./profile/type", ValueFactoryImpl.getInstance().createValue(type));
                user.setProperty("./profile/firstName", ValueFactoryImpl.getInstance().createValue(firstName));
                user.setProperty("./profile/lastName", ValueFactoryImpl.getInstance().createValue(lastName));
                user.setProperty("./profile/city", ValueFactoryImpl.getInstance().createValue(city));
                user.setProperty("verifiedStatus", ValueFactoryImpl.getInstance().createValue(true));
                Group portalUsers = (Group) getJackrabbitSession().getUserManager().getAuthorizable("wedding-users");
                Authorizable authorizable = getJackrabbitSession().getUserManager().getAuthorizable(user.getPrincipal());
                portalUsers.addMember(authorizable);
                getJackrabbitSession().move(user.getPath(), pathToNewUserFolder + "/" + email);
                getJackrabbitSession().save();
                LOG.info("USER SUCCESS CREATE");
                return true;
            } else {
                LOG.info("USER WITH THAT NAME ALREADY EXIST : " + email);
                return false;
            }
        } catch (RepositoryException e) {
            LOG.error(e.getMessage());
        }
        LOG.info("FAILED ADD NEW USER");
        return false;
    }

    @Override
    public boolean addPartner(String userID, String type, String email, String speciality, String name, String city, String phone, String authType) {
        LOG.info("TRY ADD NEW USER WITH NAME : " + email);
        User user = null;
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM");
            String pathToNewUserFolder = "/home/users/wedding/users" + "/" + email.substring(0, 1) + "/" + dateFormat.format(new Date());
            PrincipalManager principalManager = getJackrabbitSession().getPrincipalManager();
            Principal principal = principalManager.getPrincipal(email);
            if (principal == null) {
                user = getJackrabbitSession().getUserManager().createUser(email, "user", new Principal() {
                    public String getName() {
                        return email;
                    }
                }, pathToNewUserFolder);
                user.setProperty("./profile/type", ValueFactoryImpl.getInstance().createValue(type));
                user.setProperty("./profile/userID", ValueFactoryImpl.getInstance().createValue(userID));
                user.setProperty("./profile/authType", ValueFactoryImpl.getInstance().createValue(authType));
                user.setProperty("./profile/email", ValueFactoryImpl.getInstance().createValue(email));
                user.setProperty("./profile/name", ValueFactoryImpl.getInstance().createValue(name));
                user.setProperty("./profile/speciality", ValueFactoryImpl.getInstance().createValue(speciality));
                user.setProperty("./profile/phone", ValueFactoryImpl.getInstance().createValue(phone));
                user.setProperty("./profile/city", ValueFactoryImpl.getInstance().createValue(city));
                user.setProperty("verifiedStatus", ValueFactoryImpl.getInstance().createValue(true));
                Group portalUsers = (Group) getJackrabbitSession().getUserManager().getAuthorizable("wedding-users");
                Authorizable authorizable = getJackrabbitSession().getUserManager().getAuthorizable(user.getPrincipal());
                portalUsers.addMember(authorizable);
                getJackrabbitSession().move(user.getPath(), pathToNewUserFolder + "/" + email);
                getJackrabbitSession().save();
                LOG.info("USER SUCCESS CREATE");
                return true;
            } else {
                LOG.info("USER WITH THAT NAME ALREADY EXIST : " + email);
                return false;
            }
        } catch (RepositoryException e) {
            LOG.error(e.getMessage());
        }
        LOG.info("FAILED ADD NEW USER");
        return false;
    }

    public JackrabbitSession getJackrabbitSession() {
        return weddingUtils.getAdminSession();
    }
}
