package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ShowJmxUrl implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        String rmiport = System.getProperty("com.sun.management.jmxremote.rmi.port");
        String jmxport = System.getProperty("com.sun.management.jmxremote.port");
        if (rmiport!=null && jmxport!=null) {
            System.out.println("JMX available at: service:jmx:rmi://localhost:"+jmxport+"/jndi/rmi://localhost:"+rmiport+"/jmxrmi");
        }
    }
}