package com.vodkamishkabalalaika.sling.restextension.api.processor;

import org.apache.sling.api.SlingHttpServletRequest;

public abstract class AbstractRestProcessor implements RestProcessor {

    public abstract String getQuery();

    @Override
    public Object getObject(SlingHttpServletRequest request) {
        return null;
    }

    @Override
    public Object updateObject(SlingHttpServletRequest request) {
        return null;
    }

    @Override
    public Object createObject(SlingHttpServletRequest request) {
        return null;
    }

    @Override
    public Object deleteObject(SlingHttpServletRequest request) {
        return null;
    }
}
