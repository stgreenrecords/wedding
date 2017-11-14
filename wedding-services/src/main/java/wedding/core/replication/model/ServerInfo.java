package wedding.core.replication.model;

public class ServerInfo {
    private final String url;
    private final String userName;
    private final String userPassword;

    public ServerInfo(String url, String userName, String userPassword) {
        this.url = url;
        this.userName = userName;
        this.userPassword = userPassword;
    }

    public String getUrl() {
        return url;
    }

    public String getUserName() {
        return userName;
    }

    public char[] getUserPassword() {
        return userPassword.toCharArray();
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        final ServerInfo that = (ServerInfo) o;

        if (url != null ? !url.equals(that.url) : that.url != null) return false;
        if (userName != null ? !userName.equals(that.userName) : that.userName != null) return false;
        return userPassword != null ? userPassword.equals(that.userPassword) : that.userPassword == null;
    }

    @Override
    public int hashCode() {
        int result = url != null ? url.hashCode() : 0;
        result = 31 * result + (userName != null ? userName.hashCode() : 0);
        result = 31 * result + (userPassword != null ? userPassword.hashCode() : 0);
        return result;
    }
}
