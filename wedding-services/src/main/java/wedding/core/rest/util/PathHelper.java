package wedding.core.rest.util;

import org.apache.commons.lang3.StringUtils;
import wedding.core.rest.site.RestFieldCore;

public class PathHelper {


    public static String getClassNameFromSelectors(String[] selectors){
        return selectors.length >= SELECTORS.CLASS_NAME.number + 1 ? selectors[SELECTORS.CLASS_NAME.getNumber()] : StringUtils.EMPTY;
    }

    public static String getSpecialityFromSelectors(String[] selectors){
        return selectors.length >= SELECTORS.SPECIALITY.number + 1 ? selectors[SELECTORS.SPECIALITY.getNumber()] : StringUtils.EMPTY;
    }

    public static String getCityFromSelectors(String[] selectors){
        return selectors.length >= SELECTORS.CITY.number + 1 ? selectors[SELECTORS.CITY.getNumber()] : StringUtils.EMPTY;
    }

    public static long getLimitSelectors(String[] selectors){
        return selectors.length >= SELECTORS.LIMIT.number + 1 ? Long.parseLong(selectors[SELECTORS.LIMIT.getNumber()]) : Integer.MAX_VALUE;
    }

    enum SELECTORS{

        CLASS_NAME(0), SPECIALITY(1), CITY(2), LIMIT(3);

        private int number;

        SELECTORS(int number){
            this.number = number;
        }

        public int getNumber() {
            return number;
        }
    }


}
