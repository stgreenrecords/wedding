package wedding.core.utils;

import org.apache.commons.lang3.BooleanUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.request.RequestParameter;
import wedding.core.factory.BinaryFile;
import wedding.core.factory.BinaryFileFactory;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public final class BinaryFileUtil {

    private static final String MULTIPLE_PARAMETERS_PATTERN = "%s-%d";

    private BinaryFileUtil() {
    }

    public static List<BinaryFile> extractFromRequest(SlingHttpServletRequest request, Map<String, Boolean> keys) {
        return keys.entrySet()
                .stream()
                .flatMap(BinaryFileUtil.extractBinaryFiles(request))
                .collect(Collectors.toList());
    }

    private static Function<Map.Entry<String, Boolean>, Stream<BinaryFile>> extractBinaryFiles(SlingHttpServletRequest request) {
        return entry -> {
            if (BooleanUtils.isFalse(entry.getValue())) {
                return Stream.of(BinaryFileFactory.fromRequestParameter(request.getRequestParameter(entry.getKey())));
            }
            Stream.Builder<BinaryFile> binaryFileBuilder = Stream.builder();
            int index = 0;
            RequestParameter requestParameter;
            while ((requestParameter = getRequestParameter(request, entry, index)) != null) {
                binaryFileBuilder.add(BinaryFileFactory.fromRequestParameter(requestParameter));
                index++;
            }
            return binaryFileBuilder.build();
        };
    }

    private static RequestParameter getRequestParameter(SlingHttpServletRequest request, Map.Entry<String, Boolean> entry,
                                                        int index) {
        return request.getRequestParameter(String.format(MULTIPLE_PARAMETERS_PATTERN, entry.getKey(), index));
    }
}
