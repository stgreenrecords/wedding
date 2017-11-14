package wedding.core.replication.impl;

import org.apache.felix.scr.annotations.*;
import org.apache.jackrabbit.commons.JcrUtils;
import org.apache.sling.api.resource.Resource;
import wedding.core.replication.Replicator;
import wedding.core.replication.ReplicatorConfig;
import wedding.core.replication.model.ServerInfo;

import javax.jcr.*;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.*;

@Component(name = "Sling Replicator", immediate = true)
@Service
public class SlingReplicator implements Replicator {

    // from real node ${nodePath}.xml
    private static final String FAKE_TEST_NODE = "<temp xmlns:MP=\"http://ns.microsoft.com/photo/1.2/\" xmlns:pdf=\"http://ns.adobe.com/pdf/1.3/\" xmlns:mix=\"http://www.jcp.org/jcr/mix/1.0\" xmlns:s7userdata=\"http://www.day.com/s7userdata/1.0/\" xmlns:jcr=\"http://www.jcp.org/jcr/1.0\" xmlns:DICOM=\"http://ns.adobe.com/DICOM/\" xmlns:xmpBJ=\"http://ns.adobe.com/xap/1.0/bj/\" xmlns:album=\"http://ns.adobe.com/album/1.0/\" xmlns:prismusagerights=\"http://prismstandard.org/namespaces/prismusagerights/2.1/\" xmlns:prl=\"http://prismstandard.org/namespaces/prl/2.1/\" xmlns:xmpRights=\"http://ns.adobe.com/xap/1.0/rights/\" xmlns:exifEX=\"http://cipa.jp/exif/1.0/\" xmlns:dex=\"http://ns.optimasc.com/dex/1.0/\" xmlns:xmpNote=\"http://ns.adobe.com/xmp/note/\" xmlns:oak=\"http://jackrabbit.apache.org/oak/ns/1.0\" xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmlns:idPriv=\"http://ns.adobe.com/xmp/InDesign/private\" xmlns:slingevent=\"http://sling.apache.org/jcr/event/1.0\" xmlns:scg=\"http://www.adobe.com/social/scg/1.0\" xmlns:lr=\"http://ns.adobe.com/lightroom/1.0/\" xmlns:sv=\"http://www.jcp.org/jcr/sv/1.0\" xmlns:oauth=\"http://oauth.net/\" xmlns:cq=\"http://www.day.com/jcr/cq/1.0\" xmlns:stFNT=\"http://ns.adobe.com/xap/1.0/sType/Font#\" xmlns:tiff=\"http://ns.adobe.com/tiff/1.0/\" xmlns:stMfs=\"http://ns.adobe.com/xap/1.0/sType/ManifestItem#\" xmlns:rep=\"internal\" xmlns:prism=\"http://prismstandard.org/namespaces/basic/2.1/\" xmlns:plus=\"http://ns.useplus.org/ldf/xmp/1.0/\" xmlns:Iptc4xmpExt=\"http://iptc.org/std/Iptc4xmpExt/2008-02-29/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:psAux=\"http://ns.adobe.com/exif/1.0/aux/\" xmlns:xmpGImg=\"http://ns.adobe.com/xap/1.0/g/img/\" xmlns:social=\"http://www.adobe.com/social/1.0\" xmlns:Iptc4xmpCore=\"http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:xmpG=\"http://ns.adobe.com/xap/1.0/g/\" xmlns:pdfx=\"http://ns.adobe.com/pdfx/1.3/\" xmlns:acdsee=\"http://ns.acdsee.com/iptc/1.0/\" xmlns:s7sitecatalyst=\"http://www.day.com/s7sitecatalyst/1.0/\" xmlns:exif=\"http://ns.adobe.com/exif/1.0/\" xmlns:adobe_dam=\"http://www.adobe.com/adobe_dam/1.0\" xmlns:granite=\"http://www.adobe.com/jcr/granite/1.0\" xmlns:xmpDM=\"http://ns.adobe.com/xmp/1.0/DynamicMedia/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:xmpPLUS=\"http://ns.adobe.com/xap/1.0/PLUS/\" xmlns:crs=\"http://ns.adobe.com/camera-raw-settings/1.0/\" xmlns:vlt=\"http://www.day.com/jcr/vault/1.0\" xmlns:MicrosoftPhoto=\"http://ns.microsoft.com/photo/1.0\" xmlns:mediapro=\"http://ns.iview-multimedia.com/mediapro/1.0/\" xmlns:xmpTPg=\"http://ns.adobe.com/xap/1.0/t/pg/\" xmlns:dam=\"http://www.day.com/dam/1.0\" xmlns:viewerpreset=\"http://www.day.com/viewerpreset/1.0/\" xmlns:sling=\"http://sling.apache.org/jcr/sling/1.0\" xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\" xmlns:nt=\"http://www.jcp.org/jcr/nt/1.0\" xmlns:crx=\"http://www.day.com/crx/1.0\" jcr:primaryType=\"nt:unstructured\">\n" +
            "<qwe jcr:primaryType=\"nt:unstructured\"/>\n" +
            "</temp>";

    @Reference(
            bind = "bindConfig",
            unbind = "unbindConfig",
            referenceInterface = ReplicatorConfig.class,
            cardinality = ReferenceCardinality.MANDATORY_MULTIPLE,
            policy = ReferencePolicy.DYNAMIC
    )
    private List<ReplicatorConfig> configs;

    private Set<ServerInfo> serverInfoSet = new HashSet<>();

    @Override
    public void replicate(final String path) throws RepositoryException, IOException {
        for (final ServerInfo serverInfo : serverInfoSet) {
            replicate(path, serverInfo);
        }
    }

    @Override
    public void replicate(final Resource resource) throws IOException, RepositoryException {
        replicate(resource.getPath());
    }


    public void bindConfig(final ReplicatorConfig config) {
        serverInfoSet.add(config.getServerInfo());
    }

    public void unbindConfig(final ReplicatorConfig config) {
        serverInfoSet.remove(config.getServerInfo());
    }

    private void replicate(final String path, final ServerInfo serverInfo) throws RepositoryException, IOException {
        Session targetSession = null;
        try {
            final Repository targetRepository = JcrUtils.getRepository(serverInfo.getUrl());
            targetSession = targetRepository.login(new SimpleCredentials(serverInfo.getUserName(), serverInfo.getUserPassword()));

            targetSession.getWorkspace().importXML(path, new ByteArrayInputStream(FAKE_TEST_NODE.getBytes()), ImportUUIDBehavior.IMPORT_UUID_COLLISION_REPLACE_EXISTING);
        } finally {
            if (targetSession != null && targetSession.isLive()) {
                targetSession.logout();
            }
        }
    }
}
