package com.vodkamishkabalalaika.sling.restextension.example;

import com.vodkamishkabalalaika.sling.restextension.api.servlet.RestServlet;
import org.apache.felix.scr.annotations.sling.SlingServlet;

@SlingServlet(paths = "/services/rest/test")
public final class ExampleRestServlet extends RestServlet {}
