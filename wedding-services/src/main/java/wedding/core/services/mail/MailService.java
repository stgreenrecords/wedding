package wedding.core.services.mail;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import java.util.Dictionary;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component(metatype = true, immediate = true)
@Service(MailService.class)
public class MailService {

    private static final Logger LOG = LoggerFactory.getLogger(MailService.class);

    private static final String PROPERTY_TEXT = "text";
    private static final String PROPERTY_SUBJECT = "subject";
    private static final String PROPERTY_RECIPIENTS = "recipients";

    @Property(value = "smtp.gmail.com")
    private static final String MAIL_HOST = "mail.host";

    @Property(intValue = 587)
    private static final String MAIL_PORT = "mail.port";

    @Property(value = "info@myevent.by")
    private static final String MAIL_USER = "mail.from.user";

    @Property(value = "MY EVENT BY")
    private static final String MAIL_NAME = "mail.from.name";

    @Property(value = "UTF-8")
    private static final String MAIL_CHARSET = "mail.charset";

    @Property(value = "info@myevent.by")
    private static final String MAIL_LOGIN = "mail.login";

    @Property(passwordValue = "you_can't_match_this_password")
    private static final String MAIL_PASSWORD = "mail.password";

    private ComponentContext componentContext;

    @Activate
    public void activate(ComponentContext componentContext) {
        this.componentContext = componentContext;
    }


    public boolean sendRichTextEmail(Resource mailResource) throws EmailException {
        Dictionary dictionary = componentContext.getProperties();
        HtmlEmail email = new HtmlEmail();
        email.setHostName(PropertiesUtil.toString(dictionary.get(MAIL_HOST), StringUtils.EMPTY));
        email.setStartTLSEnabled(true);
        email.setStartTLSRequired(true);
        email.setSSLOnConnect(true);
        email.setFrom(PropertiesUtil.toString(dictionary.get(MAIL_USER), StringUtils.EMPTY), PropertiesUtil.toString(dictionary.get(MAIL_NAME), StringUtils.EMPTY));
        email.setSmtpPort(PropertiesUtil.toInteger(dictionary.get(MAIL_PORT), 587));
        email.setCharset(PropertiesUtil.toString(dictionary.get(MAIL_CHARSET), StringUtils.EMPTY));
        email.setAuthenticator(
                new DefaultAuthenticator(PropertiesUtil.toString(dictionary.get(MAIL_LOGIN), StringUtils.EMPTY)
                        , PropertiesUtil.toString(dictionary.get(MAIL_PASSWORD), StringUtils.EMPTY)));
        return Optional.ofNullable(mailResource)
                .map(Resource::getValueMap)
                .filter(properties -> properties.containsKey(PROPERTY_TEXT))
                .map(properties -> send(properties, email))
                .orElse(false);
    }

    private boolean send(ValueMap properties, HtmlEmail email) {
        try {
            List<InternetAddress> internetAddresses = Optional.ofNullable(properties.get(PROPERTY_RECIPIENTS, String[].class))
                    .map(Stream::of)
                    .orElse(Stream.empty())
                    .map(recipient -> {
                        try {
                            return new InternetAddress(recipient);
                        } catch (AddressException e) {
                            LOG.error(e.getMessage());
                        }
                        return null;
                    })
                    .collect(Collectors.toList());
            email.setTo(internetAddresses);
            email.setSubject(properties.get(PROPERTY_SUBJECT, StringUtils.EMPTY));
            email.setHtmlMsg(properties.get(PROPERTY_TEXT, StringUtils.EMPTY));
            email.send();
        } catch (EmailException e) {
            LOG.error(e.getMessage());
        }
        return false;
    }

}
