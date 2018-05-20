package com.vodkamishkabalalaika.sling.restextension.example;

import com.vodkamishkabalalaika.sling.restextension.api.model.RestApiModel;
import com.vodkamishkabalalaika.sling.restextension.api.annotation.RestModel;

@RestModel(extension = "test-model", modelMixin = "", modelNodeType = "")
public class MockModel implements RestApiModel {
}
