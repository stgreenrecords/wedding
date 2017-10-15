package wedding.core.services.binary;

import org.apache.sling.api.resource.ResourceResolver;
import wedding.core.services.binary.impl.BinaryFile;
import wedding.core.services.binary.impl.Type;

import java.util.EnumMap;
import java.util.List;

public interface BinaryUploaderService {
    void updateRepositoryBinariesAndClose(ResourceResolver resourceResolver, String userID, EnumMap<Type, List<BinaryFile>> files);
}
