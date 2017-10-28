package wedding.core.servlets;

import org.apache.felix.scr.annotations.*;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;

@Component(metatype = true, immediate = true)
@Service
@Properties({
        @Property(name = "sling.servlet.paths", value = "/services/notifications")
})
public class MailServlet extends SlingAllMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(MailServlet.class);


    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {
        String action = request.getRequestPathInfo().getExtension();
        LOG.info("START NOTIFICATION PROCESS WITH ACTION : " + action);
        if (action.equals("registration")) {
            boolean status = sendRegistrationMail(request);
            LOG.info("REGISTRATION STATUS : " + status);
            PrintWriter writer = response.getWriter();
            if (status) {
                writer.print("registrationLetterSuccessSend");
            } else {
                writer.print("registrationLetterFailSend");
            }
        }
    }

    private boolean sendRegistrationMail(SlingHttpServletRequest request) {
        try {
/*            NewsLetter newsLetter = NewsletterHelper.fromRequest(request, newsletterService);
            newsLetter.setFromAddress(new InternetAddress("administration@wedding-gomel.com"));
            Iterator<com.day.cq.security.Authorizable> recipients = newsLetter.getMailingList().members();
            while (recipients.hasNext()) {
                LOG.info("TRY SEND LETTER TO : " + recipients.next().getName());
            }
            MailingStatus mailingStatus = newsletterService.sendNewsletter(newsLetter);
            mailingStatus.getStatusCode();
            LOG.info("REGISTRATION MAIL CODE : " + mailingStatus.getStatusCode());*/

/*
            Node registrationNode = request.getResourceResolver().adaptTo(Session.class).getNode("/content/campaigns/wedding/notifications/userValidation/jcr:content/text");
            if (registrationNode.hasProperty("text")){
                HtmlEmail email = new HtmlEmail();
                email.setCharset("UTF-8");
                String html = registrationNode.getProperty("text").getString();
                String userEmail = request.getParameter("email");
                String link = "<a href='"+request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+"/content/wedding/registration.verify."+ Base64.encodeBase64String(userEmail.getBytes())+".html'>Ссылка для подтверждения регистрации</a>";
                String repairHtml = html.replace("${user}",userEmail).replace("${linkToVerification}",link);
                email.setHtmlMsg(repairHtml);
                email.setFrom("administration@wedding-gomel.com");
                email.addTo(userEmail);
                mailservice.send(email);
                return true;
            }
*/

        } catch (Exception e) {
            LOG.error(e.getMessage());
        }
        return false;
    }
}