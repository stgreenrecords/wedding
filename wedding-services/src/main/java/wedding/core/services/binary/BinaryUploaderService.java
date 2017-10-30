package wedding.core.services.binary;

import org.apache.sling.api.resource.ResourceResolver;
import wedding.core.services.binary.impl.BinaryFile;
import wedding.core.services.binary.impl.Type;

import java.util.List;
import java.util.Map;

public interface BinaryUploaderService {
    void updateRepositoryBinariesAndClose(ResourceResolver resourceResolver, String userID, Map<Type, List<BinaryFile>> files);
}
