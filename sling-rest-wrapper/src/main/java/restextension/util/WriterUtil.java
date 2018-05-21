package restextension.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class WriterUtil {

    private static final Logger LOG = LoggerFactory.getLogger(WriterUtil.class);
    private static final ObjectMapper MAPPER = new ObjectMapper();

    private WriterUtil() {
    }

    public static ObjectMapper getMapper() {
        return MAPPER;
    }

    public static String toJson(Object object) {
        try {
            return MAPPER.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            LOG.error(e.getMessage(), e);
            return "{}";
        }
    }
}
