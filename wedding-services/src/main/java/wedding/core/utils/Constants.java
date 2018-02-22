package wedding.core.utils;

public class Constants {

    static final String USER_QUERY = "SELECT * FROM [nt:base] AS user WHERE ISDESCENDANTNODE([/home/users/wedding/users]) AND NAME() = 'profile' AND user.[userId] = '%s'";
}
