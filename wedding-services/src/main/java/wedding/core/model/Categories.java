package wedding.core.model;

public class Categories {

    private String[] categoryList;

    public Categories(String[] categoryList) {
        this.categoryList = categoryList;
    }

    public String[] getCategoryList() {
        return categoryList;
    }

    public void setCategoryList(String[] categoryList) {
        this.categoryList = categoryList;
    }
}
