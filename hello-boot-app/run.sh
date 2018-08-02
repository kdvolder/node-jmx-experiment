#!/bin/bash

port=9999
echo "Launching boot app..."
echo "JMX will be accessible via this url: service:jmx:rmi://localhost:${port}/jndi/rmi://localhost:${port}/jmxrmi"

java -Dcom.sun.management.jmxremote.ssl=false \
    -Dcom.sun.management.jmxremote.authenticate=false \
    -Dcom.sun.management.jmxremote.port=${port} \
    -Dcom.sun.management.jmxremote.rmi.port=${port} \
    -Djava.rmi.server.hostname=localhost \
    -Dcom.sun.management.jmxremote.local.only=false \
    -Dspring.application.admin.enabled=true \
    -jar target/*.jar
