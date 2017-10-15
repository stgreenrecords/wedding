package wedding.core.services.binary.impl;

public enum Type {
    AVATAR("avatar", "avatar"),
    PORTFOLIO("portfolio", "portfolio");

    private final String name;
    private final String relPath;

    Type(String name, String relPath) {
        this.name = name;
        this.relPath = relPath;
    }

    public String getName() {
        return name;
    }

    public String getRelPath() {
        return relPath;
    }
}
