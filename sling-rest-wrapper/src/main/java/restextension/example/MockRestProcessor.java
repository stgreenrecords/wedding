package com.vodkamishkabalalaika.sling.restextension.example;

import org.apache.sling.api.SlingHttpServletRequest;
import com.vodkamishkabalalaika.sling.restextension.api.processor.RestProcessor;

public class MockRestProcessor implements RestProcessor {

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
