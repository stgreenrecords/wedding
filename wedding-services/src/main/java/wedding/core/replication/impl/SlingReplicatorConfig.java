package wedding.core.replication.impl;

import org.apache.felix.scr.annotations.*;
import wedding.core.replication.ReplicatorConfig;
import wedding.core.replication.model.ServerInfo;

import java.util.Map;

@Component(
        name = "SlingReplicatorConfig",
        label = "Sling Replicator Config",
        metatype = true,
        immediate = true,
        configurationFactory = true
)
@Service
public class SlingReplicatorConfig implements ReplicatorConfig {

    @Property(label = "Server URL")
    private static final String SERVER_URL = "replicator.sling.server.url";

    @Property(label = "User Name", value = "admin")
    private static final String USER_NAME = "replicator.sling.server.credential.name";

    @Property(label = "User Password", passwordValue = "")
    private static final String USER_PASSWORD = "replicator.sling.server.credential.password";

    private ServerInfo serverInfo;

    @Override
    public ServerInfo getServerInfo() {
        return serverInfo;
    }

    @Activate
    @Modified
    private void activate(final Map<String, Object> properties) {
        serverInfo = new ServerInfo(
                (String) properties.get(SERVER_URL),
                (String) properties.get(USER_NAME),
                (String) properties.get(USER_PASSWORD)
        );
    }

    @Deactivate
    private void deactivate() {
        serverInfo = null;
    }
}
