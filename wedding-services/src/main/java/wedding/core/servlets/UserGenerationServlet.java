package wedding.core.servlets;

import jdk.nashorn.internal.ir.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.jackrabbit.api.security.user.User;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.jackrabbit.commons.JcrUtils;
import org.apache.jackrabbit.rmi.value.SerialValueFactory;
import org.apache.jackrabbit.value.ValueFactoryImpl;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.jackrabbit.usermanager.CreateUser;
import org.apache.sling.jcr.base.util.AccessControlUtil;
import wedding.core.utils.WeddingResourceUtil;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.stream.IntStream;


@SlingServlet(paths = {"/services/usergeneration"})
public class UserGenerationServlet extends SlingSafeMethodsServlet {

    @Reference
    private CreateUser createUser;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        ResourceResolver resourceResolver = request.getResourceResolver();
        Session session = resourceResolver.adaptTo(Session.class);
        Random random = new Random();
        UserManager userManager = Optional.ofNullable(session)
                .map(s -> {
                    try {
                        return AccessControlUtil.getUserManager(s);
                    } catch (RepositoryException e) {
                        e.printStackTrace();
                    }
                    return null;
                }).orElse(null);
        IntStream.range(0, 9000)
                .forEach(i -> {
                    String name = WeddingResourceUtil.generateId(request, false);
                    try {
                        boolean isPartner = Math.random() < 0.5;
                        User user;
                        CITIES citeEnum = CITIES.getCity();
                        String city = citeEnum.name();
                        String cityName = citeEnum.getCityName();
                        CATEGORIES category = CATEGORIES.getCategory();
                        String pathToTheCity = "/home/users/wedding/partners/" + category.name();
                        if (isPartner) {
                            user = Objects.requireNonNull(userManager).createUser(name, "123", () -> name, pathToTheCity + "/" + city + "/" + name.substring(0, 1));
                        } else {
                            user = Objects.requireNonNull(userManager).createUser(name, "123", () -> name, "/home/users/wedding/users/" + city + "/" + name.substring(0, 2));
                        }
                        Node userNode = resourceResolver.getResource(user.getPath()).adaptTo(Node.class);
                        userNode.addMixin(WeddingResourceUtil.NT_WEDDING_RESOURCE_MIXIN);

                        Node avatar = resourceResolver.getResource(user.getPath()).adaptTo(Node.class).addNode("avatar");
                        JcrUtils.putFile(avatar, "26.jpg", "image/jpeg", resourceResolver.getResource("/etc/clientlibs/wedding/pages/images/assets/26.jpg").adaptTo(InputStream.class));
                        addPropertyToUser(user, "authType", AUTH_TYPES.getAuthType().name());
                        addPropertyToUser(user, WeddingResourceUtil.REQUEST_PARAMETER_WEDDING_RESOURCE_ID, name);
                        addPropertyToUser(user, "firstName", NAMES.getName().name());
                        addPropertyToUser(user, "lastName", SECOND_NAME.getName().name());
                        addPropertyToUser(user, "phone", "+37529" + random.nextInt(1000000) + 1000000);
                        addPropertyToUser(user, "email", getGeneratedUUID() + "@gmail.com");
                        addPropertyToUser(user, "vkLink", "http://vk.com/" + getGeneratedUUID());
                        addPropertyToUser(user, "facebookLink", "http://facebook.com/" + getGeneratedUUID());
                        addPropertyToUser(user, "instagramLink", "http://instagram.com/" + getGeneratedUUID());
                        addPropertyToUser(user, "city", citeEnum.getCityName());

                        if (isPartner) {

                            Node portfolio = userNode.addNode("portfolio");
                            resourceResolver.getResource("/etc/clientlibs/wedding/pages/images/assets")
                                    .listChildren()
                                    .forEachRemaining(resource -> {
                                        try {
                                            JcrUtils.putFile(portfolio, resource.getName(), "image/jpeg", resource.adaptTo(InputStream.class));
                                        } catch (RepositoryException e) {
                                            e.printStackTrace();
                                        }
                                    });

                            addPropertyToUser(user, "speciality", category.getCategoryName());
                            if (random.nextInt(10) == 5) {
                                addPropertyToUser(user, "./events/event/wedding:resourceId", getGeneratedUUID());
                                addPropertyToUser(user, "./events/event/title", getGeneratedUUID());
                                addPropertyToUser(user, "./events/event/weddingResourceType", "event");
                                addPropertyToUser(user, "./events/event/description", getGeneratedUUID());
                                user.setProperty("./events/event/startDate", ValueFactoryImpl.getInstance().createValue(new GregorianCalendar(2018, Math.round((float) Math.random() * 5) + 1, Math.round((float) Math.random() * 27) + 1)));
                                user.setProperty("./events/event/endDate", ValueFactoryImpl.getInstance().createValue(new GregorianCalendar(2018, Math.round((float) Math.random() * 4) + 5, Math.round((float) Math.random() * 27) + 1)));


                            }
                            int priceStart = random.nextInt(1000);
                            user.setProperty("priceStart", ValueFactoryImpl.getInstance().createValue(priceStart));
                            user.setProperty("priceEnd", ValueFactoryImpl.getInstance().createValue(priceStart + random.nextInt(200)));
                            user.setProperty("eventIds", ValueFactoryImpl.getInstance().createValue("test-event-id"));
                            user.setProperty("comments", new Value[] {
                                    ValueFactoryImpl.getInstance().createValue("<p><strong>comment</strong></p>"),
                                    ValueFactoryImpl.getInstance().createValue("<p>comment <em>comment </em>comment</p>"),
                                    ValueFactoryImpl.getInstance().createValue("<p>comment<sub>comment</sub></p>")
                            });
                            user.setProperty("videos", new Value[] {
                                    ValueFactoryImpl.getInstance().createValue("https://www.youtube.com/watch?v=tD99WhUKJR4"),
                                    ValueFactoryImpl.getInstance().createValue("https://www.youtube.com/watch?v=epJJimCVlyk")
                            });
                            user.setProperty("vipStatus", ValueFactoryImpl.getInstance().createValue(Math.random() < 0.5));
                            user.setProperty("bookedDates", SerialValueFactory.makeSerialValueArray(new Value[]
                                    {
                                            generateDateValue(random),
                                            generateDateValue(random),
                                            generateDateValue(random),
                                            generateDateValue(random),
                                            generateDateValue(random),
                                            generateDateValue(random),
                                            generateDateValue(random),
                                            generateDateValue(random),
                                            generateDateValue(random),
                                            generateDateValue(random)

                                    }));

                        } else {
                            if (random.nextInt(10) == 5) {
                                addPropertyToUser(user, "./tenders/tender/wedding:resourceId", getGeneratedUUID());
                                addPropertyToUser(user, "./tenders/tender/photoUrl", getGeneratedUUID());
                                addPropertyToUser(user, "./tenders/tender/weddingResourceType", "tender");
                                user.setProperty("./tenders/tender/datePublication", ValueFactoryImpl.getInstance().createValue(new GregorianCalendar(2018, Math.round((float) Math.random() * 5) + 1, Math.round((float) Math.random() * 27) + 1)));
                                user.setProperty("./tenders/tender/deadline", ValueFactoryImpl.getInstance().createValue(new GregorianCalendar(2018, Math.round((float) Math.random() * 4) + 5, Math.round((float) Math.random() * 27) + 1)));
                                addPropertyToUser(user, "./tenders/tender/shortText", getGeneratedUUID());
                                addPropertyToUser(user, "./tenders/tender/required", getGeneratedUUID());
                                addPropertyToUser(user, "./tenders/tender/offers", getGeneratedUUID());
                                addPropertyToUser(user, "./tenders/tender/city", city);
                                user.setProperty("./tenders/tender/moneyLimit", ValueFactoryImpl.getInstance().createValue(random.nextInt(1000)));

                            }
                        }
                        Objects.requireNonNull(session).save();
                    } catch (RepositoryException e) {
                        e.printStackTrace();
                    }
                });
    }

    private void addPropertyToUser(User user, String propertyName, String propertyValue) {
        try {
            user.setProperty(propertyName, ValueFactoryImpl.getInstance().createValue(propertyValue));
        } catch (RepositoryException e) {
            e.printStackTrace();
        }
    }

    private String getGeneratedUUID() {
        return UUID.randomUUID().toString();
    }

    private Value generateDateValue(Random random) {
        return ValueFactoryImpl.getInstance().createValue(new GregorianCalendar(2018, random.nextInt(11) + 1, random.nextInt(27) + 1));
    }

}

enum AUTH_TYPES {
    VK, GMAIL, FACEBOOK;

    static AUTH_TYPES getAuthType() {
        return AUTH_TYPES.values()[(int) (Math.random() * 3)];
    }
}

enum CITIES {
    gomel("Гомель"), vitebsk("Витебск"), grodno("Гродно"), mogilev("Могилёв"), brest("Брест"), minsk("Минск");

    private String cityName;


    CITIES(String cityName) {
        this.cityName = cityName;
    }

    public String getCityName() {
        return cityName;
    }


    static CITIES getCity() {
        return CITIES.values()[(int) (Math.random() * 6)];
    }
}

enum CATEGORIES {
    photographers("Фотографы"), videographers("Видеографы"), flowers("Цветы"), rest("Отдых"), cars("Автомобили"),
    restaurants("Рестораны"), dresses("Платья"),
    beauty("Салоны красоты"), show_program("Шоу-программа"), decor("Декор"), cakes("Торты"),
    organizers("Организаторы"), leading("Ведущие"), dance("Танцы"), music("Музыка"),
    hotels("Отели"), rings("Кольца"), accessories("Акксесуары"), costumes("Костюмы"), exclusive("Эксклюзив");

    private String categoryName;


    CATEGORIES(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    static CATEGORIES getCategory() {
        return CATEGORIES.values()[(int) (Math.random() * 20)];
    }
}

enum NAMES {
    Августа, Агапия, Агафа, Агафия, Агафоклия, Агафоника, Аглаида, Агна, Агния, Агриппина,
    Валентина, Валерия, Варвара, Варсима, Василисса, Васса, Вевея, Вера, Вероника, Вивея,
    Гаафа, Гаиана, Гаиания, Гали, Галина, Глафира, Гликерия, Голиндуха, Горгония, Готия,
    Дамара, Дария, Дасия, Денеготия, Дигна, Дикторина, Динара, Домината, Домна, Домника,
    Мавра, Макария, Македония, Макрина, Малфефа, Мамелхва, Мамика, Мамфуса, Манефа;

    static NAMES getName() {
        return NAMES.values()[(int) (Math.random() * 49)];
    }

}

enum SECOND_NAME {
    Абрамов,
    Авдеев,
    Агафонов,
    Аксёнов,
    Александров,
    Алексеев,
    Андреев,
    Анисимов,
    Антонов,
    Артемьев,
    Архипов,
    Афанасьев,
    Баранов,
    Белов,
    Белозёров,
    Белоусов,
    Беляев,
    Беляков,
    Беспалов,
    Бирюков,
    Блинов,
    Блохин,
    Бобров,
    Бобылёв,
    Богданов,
    Большаков,
    Борисов,
    Брагин,
    Буров,
    Быков,
    Васильев,
    Веселов,
    Виноградов,
    Вишняков,
    Владимиров,
    Власов,
    Волков,
    Воробьёв,
    Воронов,
    Воронцов,
    Гаврилов,
    Галкин,
    Герасимов,
    Голубев,
    Горбачёв,
    Горбунов,
    Гордеев,
    Горшков,
    Григорьев,
    Гришин,
    Громов,
    Гуляев,
    Гурьев,
    Гусев,
    Гущин,
    Давыдов,
    Данилов,
    Дементьев,
    Денисов,
    Дмитриев,
    Доронин,
    Дорофеев,
    Дроздов,
    Дьячков,
    Евдокимов,
    Евсеев,
    Егоров,
    Елисеев,
    Емельянов,
    Ермаков,
    Ершов,
    Ефимов,
    Ефремов,
    Жданов,
    Жуков,
    Журавлёв,
    Зайцев,
    Захаров,
    Зимин,
    Зиновьев,
    Зуев,
    Зыков,
    Иванков,
    Иванов,
    Игнатов,
    Игнатьев,
    Ильин,
    Исаев,
    Исаков,
    Кабанов,
    Казаков,
    Калашников,
    Калинин,
    Капустин;

    static SECOND_NAME getName() {
        return SECOND_NAME.values()[(int) (Math.random() * 94)];
    }

}

